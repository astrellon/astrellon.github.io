import { ClassComponent, FinishUnmountHandler, vdom } from "simple-tsx-vdom";
import "./icon.scss";

export type IconType = 'github' | 'npm' | 'youtube' | 'cog' | 'ripples' | 'theme';

interface Props
{
    readonly icon: IconType;
    readonly size?: number;
    readonly class?: string;
    readonly active?: boolean;
    readonly disabled?: boolean;
}

interface ThemeProps
{
    readonly class?: string;
}

const classesToAdd: { readonly [iconType: string]: string } = {
    'npm': 'has-fill',
    'github': 'fill-on-hover has-stroke',
    'cog': 'fill-on-hover has-stroke',
    'youtube': 'fill-on-hover has-stroke',
    'ripples': 'has-fill',
    'theme': 'theme-icon has-stroke',
    'itchio': 'fill-on-hover has-stroke',
}

const svgXmlNs = "http://www.w3.org/2000/svg";
const viewbox = "0 0 512 512";

export default class Icon extends ClassComponent<Props>
{
    public render()
    {
        const { icon, size, active, disabled } = this.props;

        const style: any = {}
        if (typeof(size) === 'number' && isFinite(size))
        {
            style['width'] = style['height'] = `${size}px`;
        }

        const classNames = `icon ${this.props.class || ''} ${classesToAdd[icon] || ''} ${active ? 'active' : ''}`;

        if (icon === 'theme')
        {
            return <ThemeIcon class={classNames} />
        }
        return <svg xmlns={svgXmlNs} style={style} viewBox={viewbox} class={classNames}>
            <use href={`#${icon}`}></use>
            { disabled && <DisableIcon /> }
        </svg>
    }
}

class ThemeIcon extends ClassComponent<ThemeProps>
{
    public render()
    {
        const classNames = this.props.class;
        if (classNames?.includes('active'))
        {
            setTimeout(() => this.gotoMoon());
        }
        else
        {
            setTimeout(() => this.gotoSun());
        }

        return <svg class={classNames || ''} xmlns={svgXmlNs} viewBox={viewbox}>
            <g>
                <animateTransform class='begin-animation' attributeName="transform" type="rotate" dur="0.5" repeatCount="1" fill="freeze" calcMode="spline" begin="indefinite" keySplines="0.7 0 0.3 1" values="0 256 512 ; 180 256 512"/>
                <animateTransform class='end-animation' attributeName="transform" type="rotate" dur="0.5" repeatCount="1" fill="freeze" calcMode="spline" begin="indefinite" keySplines="0.7 0 0.3 1" values="180 256 512 ; 360 256 512"/>

                <path d="m319 897.73c68-40 92-128 53-197-40-69-128-92-197-53-23 13-42 33-55 57 57-31 138-12 171 44 32 56 23 132-48 168 26.6.1 52-5 76-19z" stroke-linecap="round" stroke-linejoin="round"/>

                <circle cx="256" cy="256" r="88" />
                <g stroke-linecap="round">
                    <path d="m395 116.85-46 46"/>
                    <path d="m452 256h-65"/>
                    <path d="m395 395-46-46"/>
                    <path d="m256 452v-65"/>
                    <path d="m116 116 46 46"/>
                    <path d="m59 256h65"/>
                    <path d="m116 395 46-46"/>
                    <path d="m256 59v65"/>
                </g>
            </g>
        </svg>
    }

    private gotoMoon = () =>
    {
        const beginAni = (this.rootDomNode()?.parentElement as HTMLElement)?.querySelector('.begin-animation') as SVGAnimateTransformElement;
        if (beginAni)
        {
            (beginAni as any).beginElement();
        }
    }

    private gotoSun = () =>
    {
        const endAni = (this.rootDomNode()?.parentElement as HTMLElement)?.querySelector('.end-animation') as SVGAnimateTransformElement;
        if (endAni)
        {
            (endAni as any).beginElement();
        }
    }
}

class DisableIcon extends ClassComponent
{
    private path: SVGPathElement | null = null;

    public onMount()
    {
        const domElement = this.rootDomNode() as HTMLElement;
        if (!domElement)
        {
            return;
        }

        this.path = domElement.querySelector('path');

        if (typeof window === 'undefined')
        {
            this.path?.classList.add('mounted');
        }
        else
        {
            setTimeout(() =>
                this.path?.classList.add('mounted') , 50);
        }
    }

    public onUnmount(finishedHandler: FinishUnmountHandler)
    {
        if (!this.path)
        {
            finishedHandler();
            return;
        }

        this.path?.classList.remove('mounted');
        this.path?.classList.add('unmounted');

        setTimeout(finishedHandler, 300);
    }

    public render()
    {
        return <svg xmlns={svgXmlNs} viewBox={viewbox}>
            <path class="disabled-icon" d="M60,60 L452,452" stroke="#a50505" stroke-width="36" />
        </svg>
    }
}

// This keeps all the icons in one SVG atlas which can then be used by id ref by individual Icon components.
export class AllIcons extends ClassComponent
{
    public render()
    {
        return <svg xmlns={svgXmlNs} style={{'display': 'none'}}>
            <defs>
                <g id="github">
                    <path d="m256.04 40.719a12.101 12.101 0 01-.0586.002c-122.18 0-221.01 98.821-221.01 221.04 0 97.422 62.943 179.91 150.26 209.4.38186.0493.69175.0942.87891.10156-.003-3.4698-.11415-15.222-.20508-25.107-27.464 2.7336-47.158-5.0022-59.33-15.113-14.232-11.822-18.799-26.721-18.799-26.721l.32618.9375c-4.7106-11.964-10.209-19.009-14.23-23.041-4.0218-4.0316-5.541-4.543-5.541-4.543a12.101 12.101 0 01-1.6855-.96289c-6.1107-4.173-10.297-7.152-13.012-13.621-1.3576-3.2345-1.7567-8.1312-.04883-12.045 1.7079-3.9138 4.5608-6.0923 6.7617-7.3457 4.4017-2.5068 7.6019-2.7105 10.174-2.9941 2.572-.28365 4.7051-.25391 4.7051-.25391a12.101 12.101 0 01.69727.0293c30.762 2.1653 45.461 30.27 45.461 30.27l-.1543-.26953c8.7038 14.91 17.877 18.479 27.371 19.326 6.9177.61754 14.097-.96515 19.641-2.8203 1.117-4.7619 2.5325-9.1837 4.332-13.15-20.939-4.0467-41.963-11.405-59.438-26.117-22.933-19.308-37.99-51.035-37.99-98.162 0-25.618 8.5952-47.73 22.586-65.25-3.4062-12.042-6.7793-34.8 4.5508-63.455a12.101 12.101 0 017.5586-7.0742s3.2924-.90645 6.8887-1.0723 8.4788.0901 14.646 1.3887c11.453 2.4114 27.524 8.7025 48.361 22.156 18.177-4.5474 37.226-6.9097 56.203-7.0059a12.101 12.101 0 01.13476 0c18.951.11661 37.987 2.4616 56.186 7.0059 20.822-13.453 36.88-19.742 48.324-22.154 6.1631-1.2988 11.042-1.5566 14.637-1.3906 3.5946.16595 6.8867 1.0742 6.8867 1.0742a12.101 12.101 0 017.5508 7.0625c11.354 28.646 7.9789 51.431 4.5938 63.453 14.015 17.535 22.549 39.66 22.549 65.262 0 47.236-15.086 78.97-38.08 98.221-17.459 14.616-38.446 21.904-59.361 25.895 4.2183 9.2458 6.8164 20.618 6.8164 34.104 0 31.009-.2792 55.947-.2832 63.49.20492-.0115.50996-.0576.93555-.11914 87.287-29.535 150.2-111.97 150.2-209.39 0-122.2-98.794-221-220.99-221.04z"/>
                </g>

                <g id="npm">
                    <path d="M227.6 213.1H256v57.1h-28.4z"/><path d="M0 156v171.4h142.2V356H256v-28.6h256V156zm142.2 142.9h-28.4v-85.7H85.3v85.7H28.4V184.6h113.8zm142.2 0h-56.9v28.6h-56.9V184.6h113.8zm199.2 0h-28.4v-85.7h-28.4v85.7h-28.4v-85.7H370v85.7h-56.9V184.6h170.7v114.3z"/>
                </g>

                <g id="youtube">
                    <path d="m254.76 102.98s-35.734-.00038-75.871 1.1914-86.398 4.2719-100.17 7.9629a12.791 12.791 0 01-.0098.004c-15.311 4.091-27.437 16.217-31.529 31.529a12.791 12.791 0 01-.002.008c-4.2204 15.748-6.7922 43.226-7.9727 66.02-1.1805 22.793-1.1816 41.16-1.1816 41.16s-.000768 18.366 1.1797 41.158c1.1805 22.793 3.7538 50.27 7.9746 66.021a12.791 12.791 0 01.0039.008c4.0921 15.312 16.216 27.437 31.529 31.529a12.791 12.791 0 01.0078.004c13.772 3.6901 60.032 6.7707 100.17 7.9629 40.137 1.1922 75.869 1.1914 75.869 1.1914s35.732.00073 75.869-1.1914c40.137-1.1921 86.398-4.2726 100.17-7.9629a12.791 12.791 0 01.008-.004c15.313-4.092 27.434-16.214 31.527-31.529a12.791 12.791 0 010-.006c4.219-15.75 6.7936-43.228 7.9746-66.021 1.181-22.794 1.1816-41.16 1.1816-41.16s-.00086-18.365-1.1816-41.158c-1.1808-22.793-3.7547-50.27-7.9746-66.021a12.791 12.791 0 010-.008c-4.0936-15.313-16.214-27.439-31.525-31.529a12.791 12.791 0 01-.01-.004c-13.77-3.691-60.031-6.7711-100.17-7.9629-40.137-1.1918-75.871-1.1914-75.871-1.1914zm-45.533 66.229a12.791 12.791 0 016.0176 1.707l119.26 68.859a12.791 12.791 0 010 22.152l-119.26 68.857a12.791 12.791 0 01-19.186-11.076v-137.72a12.791 12.791 0 0113.168-12.783z"/>
                </g>

                <g id="cog">
                    <path d="m210.06 28.039-11.908 75.131c-16.509 6.2627-31.895 15.159-45.559 26.342l-71.063-27.27-45.938 79.566 59.236 47.979c-1.474 8.6613-2.2473 17.427-2.3125 26.213.02275 8.8217.75954 17.627 2.2031 26.33l-59.127 47.889 45.938 79.566 71.084-27.279c13.66 11.122 29.029 19.962 45.51 26.18l11.934 75.303h91.875l11.912-75.16c16.5-6.2589 31.877-15.146 45.535-26.32l71.08 27.277 45.939-79.564-59.24-47.982c1.4765-8.6688 2.2511-17.443 2.3164-26.236-.0227-8.814-.75818-17.612-2.1992-26.307l59.123-47.885-45.939-79.566-71.061 27.27c-13.667-11.131-29.045-19.978-45.537-26.199l-11.93-75.275zm45.938 171.23c31.331.00055 56.729 25.398 56.73 56.729-.00055 31.331-25.399 56.729-56.73 56.73-31.331-.00055-56.729-25.399-56.73-56.73.00056-31.331 25.399-56.728 56.73-56.729z"/>
                </g>

                <g id="ripples">
                    <path d="m102 257c0 86 70 156 156 156 28.0.3 83-10 34-10-81.1 0-146-65-146-146.1 0-81 65-146 146-146 65 3-19-22-66-9-41 5-124 69-124 155zm94-64.1c-10 15-22 56-6 24 30-41 96-60 143-38 50 29 67 93 38 143-23 31 10-1 19-17 30-53 12-121-40-152-16-9-41.123-16-65-15-35 0-75 20-89 55zm123 17c30 30 30 79 0 110-30 30-79 30-110 0-17-22 1 8 9 16 32 32 84 32 117 0 32-32 33.085-81 1-114-10.143-14-34-29-17-12z"/>
                </g>

                <g id="itchio">
                    <path d="m 288.7065,167.07092 c -8.74939,15.40025 -26.1218,27.33651 -47.22431,27.31617 -0.51643,0 -1.03333,-0.0245 -1.54976,-0.0385 h -0.0135 c -4.65502,0.13827 -33.37081,-0.1542 -48.77984,-27.27572 l -0.006,0.006 c -2.8123,4.90244 -17.30534,27.3123 -47.22622,27.3123 -16.31841,0.014 -35.77405,-7.60553 -46.889311,-27.08513 l -0.01202,0.008 c -11.226185,19.724 -39.440301,30.65762 -52.78802,26.0725 -6.271238,82.85929 -16.313374,178.32476 16.723909,253.69056 74.393232,17.34624 283.527752,17.35476 357.957482,0 33.14731,-59.66078 20.0887,-218.63224 16.72197,-253.6944 -13.50153,4.63793 -41.52495,-6.28692 -52.78994,-26.0725 l -0.012,-0.008 c -11.19214,19.59927 -30.71776,27.09889 -46.88739,27.08324 -29.92908,0 -44.42611,-22.43302 -47.22622,-27.31424 z m -129.88512,58.48266 0.004,10e-4 h -0.004 l -0.004,0.0154 h 0.027 c 14.31414,0.0309 27.02925,-10e-4 42.78488,17.19367 12.39983,-1.30032 25.35822,-1.94843 38.32619,-1.92903 h 0.009 c 12.96796,-0.0167 25.9265,0.62863 38.32812,1.92903 15.7556,-17.19711 28.47071,-17.1654 42.78487,-17.19367 h 0.0251 l -10e-4,-0.0173 c 6.76273,0 33.81451,-7.3e-4 52.66481,52.94204 l 20.24889,72.6307 c 15.00399,54.03137 -4.80487,55.35282 -29.51279,55.40047 -36.64194,-1.36386 -56.93097,-27.974 -56.93097,-54.58035 -20.28295,3.324 -43.94436,4.98632 -67.60602,4.98809 h -0.009 c -23.66342,0 -47.32679,-1.66409 -67.60794,-4.98809 0,26.60635 -20.28886,53.21649 -56.92906,54.58035 -24.707918,-0.0476 -44.514862,-1.36735 -29.510848,-55.40047 l 20.252728,-72.62879 c 18.84764,-52.93534 45.8935,-52.94204 52.66096,-52.94204 z m 82.1888,46.43974 c -0.0188,0.0148 -33.08021,30.37666 -39.02401,41.17598 l 21.64991,-0.86707 v 18.8803 c 0,0.88391 8.68702,0.52317 17.38401,0.12054 h 0.0112 c 8.69396,0.4026 17.38236,0.76335 17.38236,-0.12054 v -18.8803 l 21.65157,0.86707 c -5.94532,-10.79932 -39.05374,-41.17598 -39.05374,-41.17598 z" />
                    <path d="m 71.686584,12.932078 c -0.963531,0.572098 -59.367317,35.466355 -59.367317,88.056252 0,24.73796 23.123371,46.4806 44.118132,46.4806 25.209299,0 46.213351,-20.89269 46.215201,-45.69002 0,24.79733 20.28398,45.69002 45.49514,45.69002 25.21302,0 44.84562,-20.89269 44.84562,-45.69002 0,24.79733 21.56821,45.69002 46.77934,45.69002 h 0.45655 c 25.21302,0 46.78121,-20.89269 46.78121,-45.69002 0,24.79733 19.63444,45.69002 44.84376,45.69002 25.21115,0 45.49515,-20.89269 45.49515,-45.69002 0,24.79733 21.00774,45.69002 46.2152,45.69002 20.99475,0 44.11812,-21.73893 44.11812,-46.4806 0,-52.604403 -58.42679,-87.50008 -59.36359,-88.056252 -151.02027,-5.3024611 -323.58087,-1.137475 -336.636235,0 z" />
                </g>
            </defs>
        </svg>
    }
}