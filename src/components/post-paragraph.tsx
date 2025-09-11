import { ClassComponent, vdom } from "simple-tsx-vdom";
import { PostParagraphState } from "../store";
import { PostPicture } from "./post-picture";
import PostLink from "./post-link";
import FormattedText from "./formatted-text";
import "./post-paragraph.scss";
import Icon from "./icon";

interface Props
{
    readonly content: PostParagraphState;
}

export class PostParagraph extends ClassComponent<Props>
{
    public render()
    {
        const { text, pictures, list, picturePosition, links, anchorTag } = this.props.content;

        const idTag = {};
        if (anchorTag)
        {
            idTag['id'] = anchorTag;
        }

        return <div {...idTag} class={`post-paragraph is--${picturePosition || 'right'}`}>

            { (text || list || links) && <div class='post-paragraph__text-content'>
                { this.processText() }
                { links && <div class='post-paragraph__links'>
                    { links.map(link => <PostLink link={link} />) }
                </div> }
            </div>}

            { pictures && <div class='post-paragraph__pictures'>
                { pictures.map(picture => <PostPicture picture={picture} />) }
            </div> }

        </div>
    }

    private processText = () =>
    {
        const { text, anchorTag } = this.props.content;
        if (!text)
        {
            return null;
        }

        const result: any[] = [];

        let listChildren: string[] | null = null;
        let firstChild = true;
        for (const line of text)
        {
            if (line.length === 0)
            {
                continue;
            }

            if (line[0] === '*')
            {
                if (listChildren === null)
                {
                    listChildren = [];
                }

                listChildren.push(line.substring(1).trimStart());
            }
            else
            {
                if (listChildren !== null)
                {
                    result.push(this.createList(listChildren));
                    listChildren = null;
                }

                result.push(<div class='post-paragraph__line'>{FormattedText.processText(line)}</div>);
            }

            firstChild = false;
        }

        if (listChildren !== null)
        {
            result.push(this.createList(listChildren));
        }

        return result;
    }

    private createList = (items: string[]) =>
    {
        return (<ul>
            { items.map(c => <li>{FormattedText.processText(c)}</li>)}
        </ul>);
    }
}