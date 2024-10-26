import { RemoveListener } from "simple-signals";
import { ClassComponent, FinishUnmountHandler, vdom } from "simple-tsx-vdom";
import Ripples from "../ripples/ripples";
import { Backgrounds, store } from "../store";
import { hoverOutElement, hoverOverElement } from "./signals";
import './ripples-comp.scss';

interface Props
{
    readonly darkTheme: boolean;
    readonly backgrounds: Backgrounds;
    readonly scrollElement: HTMLElement | undefined | null;
}

function randomPick<T>(list: T[])
{
    const index = Math.floor(Math.random() * list.length);
    return list[index];
}

let firstBackgroundCheck = true;

export default class RipplesComp extends ClassComponent<Props>
{
    private ripple: Ripples | null = null;
    private canvas: HTMLCanvasElement | null = null;
    private removeOnHoverOver: RemoveListener | null = null;
    private removeOnHoverOut: RemoveListener | null = null;
    private darkTheme?: boolean;

    private hoverCount: number = 0;

    public onMount()
    {
        if (typeof window === 'undefined')
        {
            return;
        }

        this.canvas = this.rootDomNode() as HTMLCanvasElement;

        if (this.canvas)
        {
            this.onResize();
            this.ripple = new Ripples(this.canvas, 512);
            this.checkBackground(store.state().darkTheme);
        }

        window.addEventListener('resize', this.onResize);

        this.removeOnHoverOver = hoverOverElement.add(this.onHoverOver);
        this.removeOnHoverOut = hoverOutElement.add(this.onHoverOut);
    }

    public onUnmount(finished: FinishUnmountHandler)
    {
        window.removeEventListener('resize', this.onResize);

        if (this.removeOnHoverOver) this.removeOnHoverOver();
        if (this.removeOnHoverOut) this.removeOnHoverOut();

        finished();
    }

    public render()
    {
        this.checkBackground(this.props.darkTheme);
        return <canvas class='ripples' />;
    }

    private checkBackground = (nowDarkTheme: boolean) =>
    {
        if (this.ripple)
        {
            this.ripple.scrollElement = this.props.scrollElement;

            if (nowDarkTheme !== this.darkTheme)
            {
                this.darkTheme = nowDarkTheme;
                if (firstBackgroundCheck && typeof (window) !== 'undefined')
                {
                    const backgroundImageStyle = window.getComputedStyle(document.body).backgroundImage;
                    const backgroundUrl = backgroundImageStyle.substring(backgroundImageStyle.indexOf('/', 14), backgroundImageStyle.lastIndexOf('"'));

                    firstBackgroundCheck = false;

                    if (backgroundUrl)
                    {
                        this.ripple.loadBackground(backgroundUrl);
                        return;
                    }
                }

                const backgrounds = this.props.backgrounds;

                const url = randomPick(nowDarkTheme ? backgrounds.dark : backgrounds.light);
                this.ripple.loadBackground(url);
            }
        }
    }

    private onHoverOver = (element: HTMLElement) =>
    {
        if (!this.ripple)
        {
            return;
        }

        this.hoverCount++;
        this.onHoverElement(element, 0.01);
    }

    private onHoverOut = (element: HTMLElement) =>
    {
        if (!this.ripple)
        {
            return;
        }

        this.hoverCount--;
        this.onHoverElement(element, -0.01);
    }

    private onHoverElement = (element: HTMLElement, strength: number) =>
    {
        if (!this.ripple)
        {
            return;
        }

        this.ripple.interactive = this.hoverCount <= 0;
        const bounds = element.getBoundingClientRect();
        this.ripple.dropQuad(bounds.x, bounds.y, bounds.width, bounds.height, strength);
    }

    private onResize = () =>
    {
        if (this.canvas)
        {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        }
    }
}