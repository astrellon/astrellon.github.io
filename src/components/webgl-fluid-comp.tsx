import { ClassComponent, FinishUnmountHandler, vdom } from "simple-tsx-vdom";
import WebGLFluidEnhanced from "../fluid";
import { RemoveListener } from "simple-signals";
import { hoverOutElement, hoverOverElement } from "./signals";
import "./webgl-fluid-comp.scss";

interface Props
{
    readonly lightColourPalette: string[];
    readonly darkColourPalette: string[];
    readonly darkTheme: boolean;
    readonly enabled: boolean;
}

export default class WebGLFluidComp extends ClassComponent<Props>
{
    private fluid: WebGLFluidEnhanced | null = null;
    private rootNode: HTMLElement | null = null;
    private removeOnHoverOver: RemoveListener | null = null;
    private removeOnHoverOut: RemoveListener | null = null;
    private prevDarkTheme: boolean | null = null;
    private hoverCount: number = 0;

    public onMount()
    {
        if (typeof window === 'undefined')
        {
            return;
        }

        this.rootNode = this.rootDomNode() as HTMLElement;

        if (this.rootNode)
        {
            this.fluid = new WebGLFluidEnhanced(this.rootNode);

            const colorPalette = this.getPalette();
            this.fluid.setConfig({
                colorPalette,
                hover: true,
                shading: true,
                splatRadius: 0.2,
                velocityDissipation: 1.2,
                densityDissipation: 1.2,
                pressureIterations: 10,
                bloom: true,
                curl: 10,
                simResolution: 64,
                dyeResolution: 512,
                splatForce: 1000,
                transparent: true,
            });

            if (this.props.enabled)
            {
                this.fluid.start();
            }
        }

        this.removeOnHoverOver = hoverOverElement.add(this.onHoverOver);
        this.removeOnHoverOut = hoverOutElement.add(this.onHoverOut);
    }

    public onUnmount(finished: FinishUnmountHandler)
    {
        if (this.removeOnHoverOver) this.removeOnHoverOver();
        if (this.removeOnHoverOut) this.removeOnHoverOut();

        finished();
    }

    public render()
    {
        if (this.fluid)
        {
            if (!this.props.enabled)
            {
                this.fluid.stop();
            }
            else
            {
                this.fluid.start();
                if (this.props.darkTheme !== this.prevDarkTheme)
                {
                    this.prevDarkTheme = this.props.darkTheme;
                    const colorPalette = this.getPalette();
                    this.fluid.setConfig({ colorPalette });
                }
            }
        }

        return <div id="renderSurface" class='webgl-fluid'></div>
    }

    private getPalette = () =>
    {
        return this.props.darkTheme ? this.props.darkColourPalette : this.props.lightColourPalette;
    }

    private onHoverOver = (element: HTMLElement) =>
    {
        if (!this.fluid)
        {
            return;
        }

        this.hoverCount++;
        this.updateSplatRadius();
    }

    private onHoverOut = (element: HTMLElement) =>
    {
        if (!this.fluid)
        {
            return;
        }

        this.hoverCount--;
        this.updateSplatRadius();
    }

    private updateSplatRadius = () =>
    {
        const splatRadius = this.hoverCount > 0 ? 0.4 : 0.2;
        const splatForce = this.hoverCount > 0 ? 2000 : 1000;
        this.fluid?.setConfig({ splatRadius, splatForce });
    }
}