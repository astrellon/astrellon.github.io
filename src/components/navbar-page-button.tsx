import { ClassComponent, vdom } from "simple-tsx-vdom";
import { PageState } from "../store";
import "./navbar-page-button.scss";

interface Props
{
    readonly active: boolean;
    readonly page: PageState;
    readonly onClick: (page: PageState) => void;
}

export default class NavbarPageButton extends ClassComponent<Props>
{
    public render()
    {
        const { page, active } = this.props;

        return <a class={`navbar-page-button ${active ? 'is--active' : ''}`} href={`/${page.id}`} onclick={this.onClick}>{page.title}</a>
    }

    private onClick = (e: MouseEvent) =>
    {
        if (e.button === 0)
        {
            e.preventDefault();
            e.stopPropagation();
        }

        this.props.onClick(this.props.page);
    }
}