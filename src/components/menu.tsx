import { ClassComponent, vdom } from "simple-tsx-vdom";
import CircleButton from "./circle-button";
import "./menu.scss";

interface Props
{
    readonly class?: string;
}

export default class Menu extends ClassComponent<Props>
{
    private showMenu: boolean = false;

    public hasChanged(newProps: Props): boolean
    {
        return true;
    }

    public render()
    {
        const classNames = `menu ${this.props.class || ''} ${this.showMenu ? 'active' : ''}`;
        const rowClassNames = `menu__row ${this.showMenu ? '' : 'disabled'}`;

        return <div class={classNames}>
            <CircleButton onclick={this.toggleMenu} icon='cog' active={this.showMenu} />

            <div class='menu__dropdown'>
                { this.children.map((c, index) =>
                {
                    let showIndex = index + 1;
                    if (!this.showMenu)
                    {
                        showIndex = this.children.length - showIndex;
                    }

                    const style = { 'transition-delay': (showIndex * 0.1) + 's' }

                    return <div class={rowClassNames} style={style}>{c}</div>
                }) }
            </div>
        </div>
    }

    private toggleMenu = () =>
    {
        this.showMenu = !this.showMenu;
        this.forceUpdate();
    }
}