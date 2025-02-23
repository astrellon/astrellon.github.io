import { ClassComponent, vdom } from "simple-tsx-vdom";
import NavbarMenu from "./navbar-menu";
import "./mobile-top-navbar.scss";

interface Props
{
    readonly darkTheme: boolean;
    readonly fluidEnabled: boolean;
}

export default class MobileTopNavbar extends ClassComponent<Props>
{
    public render()
    {
        const { darkTheme, fluidEnabled } = this.props;

        return <div class='mobile-top-navbar'>
            <h1>Alan Lawrey</h1>

            <NavbarMenu darkTheme={darkTheme} ripplesEnabled={fluidEnabled} />
        </div>
    }
}