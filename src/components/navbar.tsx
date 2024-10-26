import { ClassComponent, vdom } from "simple-tsx-vdom";
import { PageId, PageState } from "../store";
import NavbarMenu from "./navbar-menu";
import NavbarPageButton from "./navbar-page-button";
import './navbar.scss';

interface Props
{
    readonly selectedPageId: PageId;
    readonly pages: PageState[];
    readonly darkTheme: boolean;
    readonly ripplesEnabled: boolean;
    readonly onPageChange: (page: PageState) => void;
}

export class Navbar extends ClassComponent<Props>
{
    public render()
    {
        const { pages, selectedPageId, darkTheme, ripplesEnabled } = this.props;

        return <nav class='navbar'>
            <h1>Alan Lawrey</h1>
            <div class='navbar__page-buttons'>
                { pages.map(page => <NavbarPageButton active={page.id === selectedPageId} page={page} onClick={this.onClickPage} />) }
            </div>

            <NavbarMenu darkTheme={darkTheme} ripplesEnabled={ripplesEnabled} />
        </nav>
    }

    private onClickPage = (page: PageState) =>
    {
        this.props.onPageChange(page);
    }
}