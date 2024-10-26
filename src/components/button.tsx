import { ClassComponent, vdom } from "simple-tsx-vdom";
import "./button.scss";

interface Props<T>
{
    readonly active?: boolean;
    readonly class?: string;
    readonly onClick: (clickData?: T) => void;
    readonly clickData?: T;
}

export default class Button<T = void> extends ClassComponent<Props<T>>
{
    public render()
    {
        const { active, class: className } = this.props;
        const combinedClass = `button ${className || ''}${active ? ' is--active' : ''}`;

        return <button class={combinedClass} onclick={this.onClick}>
            {this.children}
        </button>
    }

    private onClick = () =>
    {
        this.props.onClick(this.props.clickData);
    }
}