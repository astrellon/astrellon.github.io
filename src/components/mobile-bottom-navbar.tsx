import { ClassComponent, vdom } from "simple-tsx-vdom";
import { PageId, PageState } from "../store";
import NavbarPageButton from "./navbar-page-button";
import './mobile-bottom-navbar.scss';

interface Props
{
    readonly selectedPageId: PageId;
    readonly pages: PageState[];
    readonly onPageChange: (page: PageState) => void;
}

export default class MobileBottomNavbar extends ClassComponent<Props>
{
    public render()
    {
        const { pages, selectedPageId } = this.props;

        return <nav class='mobile-bottom-navbar'>
            <div class='mobile-bottom-navbar__page-buttons'>
                { pages.map(page => <NavbarPageButton active={page.id === selectedPageId} page={page} onClick={this.onClickPage} />) }
            </div>
        </nav>
    }

    private onClickPage = (page: PageState) =>
    {
        this.props.onPageChange(page);
    }
}