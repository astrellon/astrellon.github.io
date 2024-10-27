import { vdom, render } from "simple-tsx-vdom";
import { setSelectedPageId, WindowHistory, State, store, setIsMobile } from "./store";
import { App } from "./components/app";
import { setInitialState } from './client-store';
import { DarkBackgroundUrl, LightBackgroundUrl } from './backgrounds';
import WebGLFluidEnhanced from './fluid';
import { hoverOverElement } from './components/signals';
import { RGBColor } from "./fluid/types";

(globalThis as any).__store = store;

const initialState = (globalThis as any).__state as State | undefined;
const lightColourPalette = ['#8946b5', '#526977', '#a89870'];
const darkColourPalette = ['#5c2771', '#374a4f', '#7b664a'];
const lightBackground = '#e0e0e0';
const darkBackground = '#101010';
if (initialState != undefined)
{
    store.execute(setInitialState(initialState));
}

function renderApp(state: State)
{
    document.body.classList.toggle('dark-theme', state.darkTheme);
    document.body.style.backgroundImage = state.darkTheme ? DarkBackgroundUrl : LightBackgroundUrl;
    render(<App state={state} />, document.body);
}
// Render the app on start
renderApp(store.state());

// Re-render the app when the store changes
store.subscribeAny((state) =>
{
    renderApp(state);
});

store.subscribe(state => state.darkTheme, (state, darkTheme) =>
{
    document.cookie = `darkTheme=${darkTheme}`;

    const colorPalette = darkTheme ? darkColourPalette : lightColourPalette;
    const backgroundColor = darkTheme ? darkBackground : lightBackground;
    fluid.setConfig({ colorPalette, backgroundColor });
});
store.subscribe(state => state.ripplesEnabled, (state, ripplesEnabled) =>
{
    document.cookie = `ripplesEnabled=${ripplesEnabled}`;
});

window.addEventListener('resize', () =>
{
    const isMobile = document.body.offsetWidth <= 480;
    if (store.state().isMobile !== isMobile)
    {
        store.execute(setIsMobile(isMobile));
    }
})

window.addEventListener('popstate', (event) =>
{
    console.log(event);
    const stateData: WindowHistory = event.state;
    if (stateData.pageId)
    {
        store.execute(setSelectedPageId(stateData.pageId));
    }
});

const fluid = new WebGLFluidEnhanced(document.getElementById('renderSurface') as HTMLElement);
fluid.setConfig({
    colorPalette: lightColourPalette,
    hover: true,
    shading: true,
    splatRadius: 0.2,
    velocityDissipation: 1.2,
    densityDissipation: 1.2,
    pressureIterations: 10,
    bloom: true,
    curl: 10,
    backgroundColor: lightBackground,
    simResolution: 64,
    dyeResolution: 512,
    splatForce: 1000
});
fluid.start();

const lightHoverSplat: RGBColor = {r: 0.4, g: 0.5, b: 0.6};
const darkHoverSplat: RGBColor = {r: 0.2, g: 0.3, b: 0.4};

hoverOverElement.add((el: HTMLElement) =>
{
    const colour = store.state().darkTheme ? darkHoverSplat : lightHoverSplat;
    fluid.splatElement(el, colour);
});