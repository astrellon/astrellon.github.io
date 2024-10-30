import { ClassComponent, vdom } from "simple-tsx-vdom";
import { setDarkTheme, setEnabledFluid, store } from "../store";
import CircleButton from "./circle-button";
import Menu from "./menu";

interface Props
{
    readonly darkTheme: boolean;
    readonly fluidEnabled: boolean;
}

export default class NavbarMenu extends ClassComponent<Props>
{
    public render()
    {
        const { darkTheme, fluidEnabled } = this.props;

        return <Menu>
            <CircleButton icon='theme' text={`${darkTheme ? 'Light' : 'Dark'} Theme`} onclick={this.toggleDarkTheme} active={darkTheme} />
            <CircleButton icon='fluid' text={fluidEnabled ? 'Fluid Off' : 'Fluid On'} disableIcon={!fluidEnabled} onclick={this.toggleFluid} />
        </Menu>
    }

    private toggleDarkTheme = () =>
    {
        store.execute(setDarkTheme(!this.props.darkTheme));
    }

    private toggleFluid = () =>
    {
        store.execute(setEnabledFluid(!this.props.fluidEnabled));
    }
}