import { ClassComponent, vdom } from "simple-tsx-vdom";
import { PostLinkState } from "../store";
import Icon from "./icon";
import "./post-link.scss";

interface Props
{
    readonly link: PostLinkState;
}

export default class PostLink extends ClassComponent<Props>
{
    public render()
    {
        const { url, icon, title } = this.props.link;
        const extraProps: { [key: string]: any } = {};
        if (title)
        {
            extraProps.title = title;
        }

        return <div class='post-link'>
            <a href={url} target='_blank' {...extraProps}>
                <Icon icon={icon} />
            </a>
        </div>
    }
}