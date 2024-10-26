import { ClassComponent, vdom } from "simple-tsx-vdom";
import Icon, { IconType } from "./icon";
import "./circle-button.scss";

interface Props
{
    readonly icon: IconType;
    readonly text: string;
    readonly onclick: () => void;
    readonly active?: boolean;
    readonly disabled?: boolean;
    readonly disableIcon?: boolean;
}

export default class CircleButton extends ClassComponent<Props>
{
    public render()
    {
        const { icon, text, active, disableIcon, disabled } = this.props;

        const classNames = `circle-button ${disabled ? 'disabled' : ''}`;

        return <div class={classNames} onclick={this.onClick}>
            <span class='circle-button__text'>{ text }</span>
            <Icon class='circle-button__icon' icon={icon} size={32} active={active} disabled={disableIcon} />
        </div>
    }

    private onClick = () =>
    {
        if (this.props.disabled)
        {
            return;
        }

        if (typeof(this.props.onclick) === 'function')
        {
            this.props.onclick();
        }
    }
}