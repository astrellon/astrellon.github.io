import { Editable } from "../common-types";

class WebGlConfig
{
    public readonly extension: any;
    public readonly linearExtension: any;
    public readonly glType: number;
    public readonly arrayType: Float32ArrayConstructor | null

    constructor (extension: any, linearExtension: any | null, glType: number, arrayType: Float32ArrayConstructor | null)
    {
        this.extension = extension;
        this.linearExtension = linearExtension;
        this.glType = glType;
        this.arrayType = arrayType;
    }
}

/**
 *  Load a configuration of GL settings which the browser supports.
 *  For example:
 *  - not all browsers support WebGL
 *  - not all browsers support floating point textures
 *  - not all browsers support linear filtering for floating point textures
 *  - not all browsers support rendering to floating point textures
 *  - some browsers *do* support rendering to half-floating point textures instead.
 */
function loadConfig(gl: WebGLRenderingContext)
{
    // Load extensions
    const textureFloat = gl.getExtension('OES_texture_float');
    const textureHalfFloat = gl.getExtension('OES_texture_half_float');
    const textureFloatLinear = gl.getExtension('OES_texture_float_linear');
    const textureHalfFloatLinear = gl.getExtension('OES_texture_half_float_linear');

    // If no floating point extensions are supported we can bail out early.
    if (!textureFloat)
    {
        return null;
    }

    const configs: WebGlConfig[] = [
        new WebGlConfig(textureFloat, textureFloatLinear, gl.FLOAT, Float32Array)
    ];

    if (textureHalfFloat)
    {
        configs.push(
            // Array type should be Uint16Array, but at least on iOS that breaks. In that case we
            // just initialize the textures with data=null, instead of data=new Uint16Array(...).
            // This makes initialization a tad slower, but it's still negligible.
            new WebGlConfig(textureHalfFloat, textureHalfFloatLinear, textureHalfFloat.HALF_FLOAT_OES, null)
        );
    }

    // Setup the texture and framebuffer
    const texture = gl.createTexture();
    const framebuffer = gl.createFramebuffer();

    gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    // Check for each supported texture type if rendering to it is supported
    let config: WebGlConfig | null = null;

    for (const testConfig of configs)
    {
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 32, 32, 0, gl.RGBA, testConfig.glType, null);

        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
        if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) === gl.FRAMEBUFFER_COMPLETE)
        {
            config = testConfig;
            break;
        }
    }

    return config;
}

interface LocationMap
{
    readonly [name: string]: WebGLUniformLocation;
}

class BaseWebGlProgram
{
    public readonly id: WebGLProgram;
    public readonly locations: LocationMap;

    constructor (id: WebGLProgram, locations: LocationMap)
    {
        this.id = id;
        this.locations = locations;
    }
}

class RenderWebGlProgram extends BaseWebGlProgram
{
    public topLeft: Float32Array = new Float32Array(2);
    public bottomRight: Float32Array = new Float32Array(2);
    public containerRatio: Float32Array = new Float32Array(2);
    public scroll: number = 0;
}

function createProgram<T extends BaseWebGlProgram>(ctor: new (id: WebGLProgram, locations: LocationMap) => T, gl: WebGLRenderingContext, vertexSource: string, fragmentSource: string)
{
    function compileSource(type: number, source: string)
    {
        const shader = gl.createShader(type);
        if (!shader)
        {
            throw new Error('Failed to create shadow');
        }

        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
        {
            throw new Error('compile error: ' + gl.getShaderInfoLog(shader));
        }
        return shader;
    }

    const programId = gl.createProgram();
    if (!programId)
    {
        throw new Error('Failed to create program');
    }

    gl.attachShader(programId, compileSource(gl.VERTEX_SHADER, vertexSource));
    gl.attachShader(programId, compileSource(gl.FRAGMENT_SHADER, fragmentSource));
    gl.linkProgram(programId);
    if (!gl.getProgramParameter(programId, gl.LINK_STATUS))
    {
        throw new Error('link error: ' + gl.getProgramInfoLog(programId));
    }

    // Fetch the uniform and attribute locations
    const locations: Editable<LocationMap> = {};
    gl.useProgram(programId);
    gl.enableVertexAttribArray(0);
    let match, name, regex = /uniform (\w+) (\w+)/g, shaderCode = vertexSource + fragmentSource;
    while ((match = regex.exec(shaderCode)) != null)
    {
        name = match[2];
        const location = gl.getUniformLocation(programId, name);
        if (!location)
        {
            //throw new Error('Failed to get location: ' + name);
            console.warn('Failed to get location: ' + name);
            continue;

        }
        locations[name] = location;
    }

    return new ctor(programId, locations);
}

function createImageData(width: number, height: number)
{
    try
    {
        return new ImageData(width, height);
    }
    catch (e)
    {
        // Fallback for IE
        const canvas = document.createElement('canvas');
        return canvas?.getContext('2d')?.createImageData(width, height);
    }
}

function isPowerOf2(value: number)
{
    return (value & (value - 1)) == 0;
}

export default class Ripples
{
    public interactive: boolean = true;
    public scrollElement: HTMLElement | undefined | null;

    private readonly canvas: HTMLCanvasElement;
    private readonly gl: WebGLRenderingContext;
    private readonly textureDelta: Float32Array;
    private readonly resolution: number;
    private readonly config: WebGlConfig | null;
    private readonly quad: WebGLBuffer;
    private readonly transparentPixels = createImageData(32, 32);

    private readonly textures: WebGLTexture[] = [];
    private readonly framebuffers: WebGLFramebuffer[] = [];

    private dropCircleProgram: BaseWebGlProgram | null = null;
    private dropBoxProgram: BaseWebGlProgram | null = null;
    private updateProgram: BaseWebGlProgram | null = null;
    private renderProgram: RenderWebGlProgram | null = null;
    private backgroundTexture: WebGLTexture | null = null;
    private backgroundSize: number = 1;

    private dropRadius: number = 12;
    private perturbance: number = 0.03;
    private bufferWriteIndex: number = 0;
	private bufferReadIndex: number = 1;

    constructor (canvas: HTMLCanvasElement, resolution: number = 256)
    {
        this.canvas = canvas;
        const gl = canvas.getContext('webgl');
        if (!gl)
        {
            throw new Error('Unable to get webgl context');
        }

        this.gl = gl;
        this.resolution = resolution;
        this.textureDelta = new Float32Array([1 / this.resolution, 1 / this.resolution]);

        this.config = loadConfig(gl);
        if (this.config == null)
        {
            throw new Error('Unable to get webgl config');
        }

        const textureData = this.config.arrayType ? new this.config.arrayType(this.resolution * this.resolution * 4) : null;

        for (let i = 0; i < 2; i++)
        {
            const texture = gl.createTexture();
            const framebuffer = gl.createFramebuffer();

            if (!texture || !framebuffer)
            {
                throw new Error('Failed to create texture/framebuffer');
            }

            gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);

            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, this.config.linearExtension ? gl.LINEAR : gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, this.config.linearExtension ? gl.LINEAR : gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.resolution, this.resolution, 0, gl.RGBA, this.config.glType, textureData);

            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);

            this.textures.push(texture);
            this.framebuffers.push(framebuffer);
        }

        // Init GL stuff
        const testQuad = gl.createBuffer();
        if (!testQuad)
        {
            throw new Error('Failed to create draw quad');
        }

        this.quad = testQuad;
        gl.bindBuffer(gl.ARRAY_BUFFER, this.quad);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            -1, -1,
            +1, -1,
            +1, +1,
            -1, +1
        ]), gl.STATIC_DRAW);

        this.initShaders();
        this.initTexture();
        this.setTransparentTexture();

        this.setupPointerEvents();

        // Set correct clear color and blend mode (regular alpha blending)
        gl.clearColor(0, 0, 0, 0);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

        // Init animation
        const step = () =>
        {
            this.step();

            requestAnimationFrame(step);
        }

        requestAnimationFrame(step);
    }

    public step = () =>
    {
		this.computeTextureBoundaries();

        this.update();
		this.render();
    }

    public loadBackground(url: string)
    {
        const gl = this.gl;

        // Because images have to be downloaded over the internet
        // they might take a moment until they are ready.
        // Until then put a single pixel in the texture so we can
        // use it immediately. When the image has finished downloading
        // we'll update the texture with the contents of the image.
        const level = 0;
        const internalFormat = gl.RGBA;
        const srcFormat = gl.RGBA;
        const srcType = gl.UNSIGNED_BYTE;

        const image = new Image();
        image.onload = () =>
        {
            gl.bindTexture(gl.TEXTURE_2D, this.backgroundTexture);
            gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
                srcFormat, srcType, image);

            this.backgroundSize = image.width;

            // WebGL1 has different requirements for power of 2 images
            // vs non power of 2 images so check if the image is a
            // power of 2 in both dimensions.
            if (!isPowerOf2(image.width) || !isPowerOf2(image.height))
            {
                // No, it's not a power of 2. Turn off mips and set
                // wrapping to clamp to edge
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            }
        };
        image.onerror = (e) =>
        {
            console.error('Failed to load background image', url, e);
            this.setTransparentTexture();
        }
        image.src = url;
    }

    private setupPointerEvents()
    {
        // Start listening to pointer events
        const parent = this.canvas.parentElement;
        if (!parent)
        {
            return;
        }

        parent.addEventListener('mousemove', this.dropAtPointer, { passive: true });
        parent.addEventListener('touchstart', this.dropAtTouch, { passive: true });
        parent.addEventListener('touchmove', this.dropAtTouch, { passive: true });
    }

    public dropAtPointer = (e: MouseEvent) =>
    {
        if (!this.interactive)
        {
            return;
        }

        this.drop(e.clientX, e.clientY, this.dropRadius, 0.005);
    }

    public dropAtTouch = (e: TouchEvent) =>
    {
        if (!this.interactive)
        {
            return;
        }

        const touches = e.changedTouches;
        for (const touch of touches)
        {
            this.drop(touch.clientX, touch.clientY, this.dropRadius, 0.01);
        }
    }

    public dropQuad = (x: number, y: number, width: number, height: number, strength: number) =>
    {
        if (!this.dropBoxProgram)
        {
            return;
        }

        const gl = this.gl;

        const elWidth = this.canvas.width;
        const elHeight = this.canvas.height;
        const longestSide = Math.max(elWidth, elHeight);

        const center = new Float32Array([
            ((2 * (x + width * 0.5) - elWidth) / longestSide) * 0.5 + 0.5,
            ((elHeight - 2 * (y + height * 0.5)) / longestSide) * 0.5 + 0.5
        ]);

        const boxSize = new Float32Array([
            (width / longestSide) * 0.5,
            (height / longestSide) * 0.5
        ]);

        gl.viewport(0, 0, this.resolution, this.resolution);

        gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffers[this.bufferWriteIndex]);
        this.bindTexture(this.textures[this.bufferReadIndex]);

        gl.useProgram(this.dropBoxProgram.id);
        gl.uniform2fv(this.dropBoxProgram.locations.center, center);
        gl.uniform2fv(this.dropBoxProgram.locations.boxSize, boxSize);
        gl.uniform1f(this.dropBoxProgram.locations.strength, strength);

        this.drawQuad();

        this.swapBufferIndices();
    }

    private drop(x: number, y: number, radius: number, strength: number)
    {
        if (!this.dropCircleProgram)
        {
            return;
        }

        const gl = this.gl;

        const elWidth = this.canvas.width;
        const elHeight = this.canvas.height;
        const longestSide = Math.max(elWidth, elHeight);

        radius = radius / longestSide;

        const dropPosition = new Float32Array([
            ((2 * x - elWidth) / longestSide) * 0.5 + 0.5,
            ((elHeight - 2 * y) / longestSide) * 0.5 + 0.5
        ]);

        gl.viewport(0, 0, this.resolution, this.resolution);

        gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffers[this.bufferWriteIndex]);
        this.bindTexture(this.textures[this.bufferReadIndex]);

        gl.useProgram(this.dropCircleProgram.id);
        gl.uniform2fv(this.dropCircleProgram.locations.center, dropPosition);
        gl.uniform1f(this.dropCircleProgram.locations.radius, radius);
        gl.uniform1f(this.dropCircleProgram.locations.strength, strength);

        this.drawQuad();

        this.swapBufferIndices();
    }

    private initShaders()
    {
        const vertexShader =
`attribute vec2 vertex;
varying vec2 coord;
void main() {
    coord = vertex * 0.5 + 0.5;
    gl_Position = vec4(vertex, 0.0, 1.0);
}`;

        this.dropCircleProgram = createProgram(BaseWebGlProgram, this.gl, vertexShader,
`precision highp float;

const float PI = 3.141592653589793;
uniform sampler2D texture;
uniform vec2 center;
uniform float radius;
uniform float strength;

varying vec2 coord;

void main() {
    vec4 info = texture2D(texture, coord);

    float drop = max(0.0, 1.0 - length(center - coord) / radius);
    drop = 0.5 - cos(drop * PI) * 0.5;

    info.r += drop * strength;

    gl_FragColor = info;
}`);

// from http://www.iquilezles.org/www/articles/distfunctions/distfunctions.htm
        this.dropBoxProgram = createProgram(BaseWebGlProgram, this.gl, vertexShader,
`precision highp float;

uniform sampler2D texture;
uniform vec2 center;
uniform vec2 boxSize;
uniform float strength;

varying vec2 coord;

const float boxRounding = 0.01;
const float edgeSoftness  = 0.005;

float roundedBoxSDF(vec2 CenterPosition, vec2 Size, float Radius)
{
    return length(max(abs(CenterPosition)-Size+Radius,0.0))-Radius;
}

void main() {
    vec4 info = texture2D(texture, coord);

    float distance = roundedBoxSDF(coord - center, boxSize, boxRounding);
    float smoothedAlpha = 1.0-smoothstep(0.0, edgeSoftness * 200.0,distance * 100.0);

    info.r += smoothedAlpha * strength;

    gl_FragColor = info;
}`);

        this.updateProgram = createProgram(BaseWebGlProgram, this.gl, vertexShader,
`precision highp float;

uniform sampler2D texture;
uniform vec2 delta;

varying vec2 coord;

void main() {
    vec4 info = texture2D(texture, coord);

    vec2 dx = vec2(delta.x, 0.0);
    vec2 dy = vec2(0.0, delta.y);

    float average = (
        texture2D(texture, coord - dx).r +
        texture2D(texture, coord - dy).r +
        texture2D(texture, coord + dx).r +
        texture2D(texture, coord + dy).r
    ) * 0.25;

    info.g += average - info.r;
    info.g *= 0.998;
    info.r += info.g;

    gl_FragColor = info;
}`);
        this.gl.uniform2fv(this.updateProgram.locations.delta, this.textureDelta);

        this.renderProgram = createProgram(RenderWebGlProgram, this.gl,
// Vertex shader
`precision highp float;

attribute vec2 vertex;

uniform vec2 topLeft;
uniform vec2 bottomRight;
uniform vec2 containerRatio;
uniform float scroll;

varying vec2 ripplesCoord;
varying vec2 backgroundCoord;

void main() {
    backgroundCoord = mix(topLeft, bottomRight, vertex * 0.5 + 0.5);
    backgroundCoord.y += scroll;
    ripplesCoord = vec2(vertex.x, -vertex.y) * containerRatio * 0.5 + 0.5;
    gl_Position = vec4(vertex.x, -vertex.y, 0.0, 1.0);
}`,

// Fragment shader
`precision highp float;

uniform sampler2D samplerBackground;
uniform sampler2D samplerRipples;
uniform vec2 delta;
uniform float perturbance;

varying vec2 ripplesCoord;
varying vec2 backgroundCoord;

void main() {
    float height = texture2D(samplerRipples, ripplesCoord).r;
    float heightX = texture2D(samplerRipples, vec2(ripplesCoord.x + delta.x, ripplesCoord.y)).r;
    float heightY = texture2D(samplerRipples, vec2(ripplesCoord.x, ripplesCoord.y + delta.y)).r;
    vec3 dx = vec3(delta.x, heightX - height, 0.0);
    vec3 dy = vec3(0.0, heightY - height, delta.y);
    vec2 offset = -normalize(cross(dy, dx)).xz;
    float specularPow = pow(max(0.0, dot(offset, normalize(vec2(-0.6, 1.0)))), 2.0);
    float specular = smoothstep(0.1, 0.2, specularPow);

    float specMult = specular * 0.1 + 1.0;
    vec4 backgroundColour = texture2D(samplerBackground, backgroundCoord + offset * perturbance);
    gl_FragColor = backgroundColour * vec4(specMult, specMult, specMult, 1.0);
    if (backgroundColour.r < 0.5)
    {
        vec4 specularColour = vec4(0.03 * specular, 0.04 * specular, 0.06 * specular, 1.0);
        gl_FragColor += specularColour;
    }
}`);
        this.gl.uniform2fv(this.renderProgram.locations.delta, this.textureDelta);
    }

    private initTexture()
    {
        this.backgroundTexture = this.gl.createTexture();
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.backgroundTexture);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
    }

    private setTransparentTexture()
    {
        if (this.transparentPixels)
        {
            this.gl.bindTexture(this.gl.TEXTURE_2D, this.backgroundTexture);
            this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, this.transparentPixels);
        }
    }

    private computeTextureBoundaries()
    {
        if (!this.renderProgram)
        {
            return;
        }

        const maxSide = Math.max(this.canvas.width, this.canvas.height);
        const resolutionScale = maxSide / this.backgroundSize;
        const scroll = this.scrollElement ? this.scrollElement.scrollTop : 0;

        this.renderProgram.topLeft[0] = 0;
        this.renderProgram.topLeft[1] = 0;

        this.renderProgram.bottomRight[0] = this.canvas.width / maxSide * resolutionScale;
        this.renderProgram.bottomRight[1] = this.canvas.height / maxSide * resolutionScale;

        this.renderProgram.containerRatio[0] = this.canvas.width / maxSide;
        this.renderProgram.containerRatio[1] = this.canvas.height / maxSide;

        this.renderProgram.scroll = scroll / maxSide * resolutionScale;
    }

    private update()
    {
        if (!this.updateProgram)
        {
            return;
        }

        this.gl.viewport(0, 0, this.resolution, this.resolution);

        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.framebuffers[this.bufferWriteIndex]);
        this.bindTexture(this.textures[this.bufferReadIndex]);
        this.gl.useProgram(this.updateProgram.id);

        this.drawQuad();

        this.swapBufferIndices();
    }

    private swapBufferIndices()
    {
        this.bufferWriteIndex = 1 - this.bufferWriteIndex;
        this.bufferReadIndex = 1 - this.bufferReadIndex;
    }

    private bindTexture(texture: WebGLTexture, unit?: number)
    {
        this.gl.activeTexture(this.gl.TEXTURE0 + (unit || 0));
        this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
    }

    private drawQuad()
    {
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.quad);
        this.gl.vertexAttribPointer(0, 2, this.gl.FLOAT, false, 0, 0);
        this.gl.drawArrays(this.gl.TRIANGLE_FAN, 0, 4);
    }

    private render()
    {
        if (!this.renderProgram)
        {
            return;
        }

        const gl = this.gl;
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);

        gl.viewport(0, 0, this.canvas.width, this.canvas.height);

        gl.enable(gl.BLEND);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        gl.useProgram(this.renderProgram.id);

        if (this.backgroundTexture)
        {
            this.bindTexture(this.backgroundTexture, 0);
        }
        this.bindTexture(this.textures[0], 1);

        gl.uniform1f(this.renderProgram.locations.perturbance, this.perturbance);
        gl.uniform1f(this.renderProgram.locations.scroll, this.renderProgram.scroll);
        gl.uniform2fv(this.renderProgram.locations.topLeft, this.renderProgram.topLeft);
        gl.uniform2fv(this.renderProgram.locations.bottomRight, this.renderProgram.bottomRight);
        gl.uniform2fv(this.renderProgram.locations.containerRatio, this.renderProgram.containerRatio);
        gl.uniform1i(this.renderProgram.locations.samplerBackground, 0);
        gl.uniform1i(this.renderProgram.locations.samplerRipples, 1);

        this.drawQuad();
        gl.disable(gl.BLEND);
    }
}