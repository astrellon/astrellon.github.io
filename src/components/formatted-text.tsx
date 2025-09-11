import { vdom } from "simple-tsx-vdom";
import Icon from "./icon";
import "./formatted-text.scss";

const formattingRegex = /(\[([^\]]+)\]\(([^\)]+)\))/;
const globalFormattingRegex = new RegExp(formattingRegex, 'g');

export default class FormattedText
{
    public static processText(text: string)
    {
        if (text.indexOf('[') < 0)
        {
            return [text];
        }

        const result: any[] = [];
        const split = text.split(globalFormattingRegex);

        for (let i = 0; i < split.length; i++)
        {
            const token = split[i];

            if (!token)
            {
                continue;
            }

            if (token[0] === '[' && formattingRegex.test(token))
            {
                // Handle token
                const type = split[i + 1];
                const value = split[i + 2];
                i += 2;

                if (type === 'link')
                {
                    const linkSplit = value.split('|');
                    const text = linkSplit[0].trim();
                    const url = linkSplit[1].trim();

                    result.push(<a href={url}>{text}</a>);
                }
                else if (type === 'post-header')
                {
                    const headerSplit = value.split('|');

                    const header = headerSplit[0].trim();
                    const period = headerSplit[1].trim();
                    result.push(<div class='post-header'>
                        <h3>{header}</h3> <small>{period}</small>
                        { headerSplit.length >= 3 && this.createTextLink(headerSplit[2].trim())}
                    </div>);
                }
                else if (type === 'strong' || type === 'h1' || type === 'h2' || type === 'h3')
                {
                    if (value.includes(' | '))
                    {
                        const linkSplit = value.split(' | ');
                        result.push(vdom(type, {}, linkSplit[0],
                            this.createTextLink(linkSplit[1])
                        ));
                    }
                    else
                    {
                        result.push(vdom(type, {}, value));
                    }
                }
            }
            else
            {
                result.push(token);
            }
        }

        return result;
    }

    private static createTextLink(anchorTag: string)
    {
        return <a href={`#${anchorTag}`} class='text-link'>
            <Icon icon='link' size={24} />
        </a>;
    }
}

