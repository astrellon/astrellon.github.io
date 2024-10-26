import { FunctionalComponent, vdom, VirtualElement } from "simple-tsx-vdom";
import './button-group.scss';

interface Props
{
    readonly class?: string;
}

export const ButtonGroup: FunctionalComponent<Props> = (props: Props, children: VirtualElement[]) =>
    <div class={`button-group ${props.class || ''}`}>
        { children }
    </div>