import { ClassComponent, vdom } from "simple-tsx-vdom";
import { setDarkTheme, setEnableRipples, store } from "../store";
import CircleButton from "./circle-button";
import Menu from "./menu";

interface Props
{
    readonly darkTheme: boolean;
    readonly ripplesEnabled: boolean;
}

export default class NavbarMenu extends ClassComponent<Props>
{
    public render()
    {
        const { darkTheme, ripplesEnabled } = this.props;

        return <Menu>
            <CircleButton icon='theme' text={`${darkTheme ? 'Light' : 'Dark'} Theme`} onclick={this.toggleDarkTheme} active={darkTheme} />
            <CircleButton icon='ripples' text={ripplesEnabled ? 'Ripples Off' : 'Ripples On'} disableIcon={!ripplesEnabled} onclick={this.toggleRipples} />
        </Menu>
    }

    private toggleDarkTheme = () =>
    {
        store.execute(setDarkTheme(!this.props.darkTheme));
    }

    private toggleRipples = () =>
    {
        store.execute(setEnableRipples(!this.props.ripplesEnabled));
    }
}