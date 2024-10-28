import { vdom, render } from "simple-tsx-vdom";
import { setSelectedPageId, WindowHistory, State, store, setIsMobile, PageId } from "./store";
import { App } from "./components/app";
import { setInitialState } from './client-store';
import WebGLFluidEnhanced from './fluid';

(globalThis as any).__store = store;

const initialState = (globalThis as any).__state as State | undefined;
const lightColourPalette = ['#8946b5', '#526977', '#a89870'];
const darkColourPalette = ['#3c1751', '#172a2f', '#4b261a'];
const lightBackground = '#e0e2e4';
const darkBackground = '#050403';
if (initialState != undefined)
{
    store.execute(setInitialState(initialState));
}

const windowUrl = new URL(document.location.toString());
const startingPage = windowUrl.searchParams.get('page');
if (startingPage != null)
{
    store.execute(setSelectedPageId(startingPage as PageId));
}

function renderApp(state: State)
{
    document.body.classList.toggle('dark-theme', state.darkTheme);
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