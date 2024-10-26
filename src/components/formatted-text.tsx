import { vdom } from "simple-tsx-vdom";
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
                    </div>);
                }
                else if (type === 'strong' || type === 'h1' || type === 'h2' || type === 'h3')
                {
                    result.push(vdom(type, {}, value));
                }
            }
            else
            {
                result.push(token);
            }
        }

        return result;
    }
}
