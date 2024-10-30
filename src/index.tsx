import { vdom, render } from "simple-tsx-vdom";
import { setSelectedPageId, WindowHistory, State, store, setIsMobile, PageId, setDocumentReady, setDarkTheme, setEnabledFluid } from "./store";
import { App } from "./components/app";
import { setInitialState } from './client-store';

(globalThis as any).__store = store;

const initialState = (globalThis as any).__state as State | undefined;
if (initialState != undefined)
{
    store.execute(setInitialState(initialState));
}

if (window.localStorage.getItem('darkTheme') === '1')
{
    store.execute(setDarkTheme(true));
}
if (window.localStorage.getItem('fluidEnabled') === '0')
{
    store.execute(setEnabledFluid(false));
}

if (checkIfMobile())
{
    store.execute(setIsMobile(true));
}

const windowUrl = new URL(document.location.toString());
const startingPage = windowUrl.searchParams.get('page');
if (startingPage != null)
{
    store.execute(setSelectedPageId(startingPage as PageId));
}

if (document.readyState !== 'complete')
{
    document.onreadystatechange = () =>
    {
        if (document.readyState === "complete")
        {
            store.execute(setDocumentReady());
        }
    };
}
else
{
    store.execute(setDocumentReady());
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
    window.localStorage.setItem('darkTheme', darkTheme ? '1' : '0');
});
store.subscribe(state => state.fluidEnabled, (state, fluidEnabled) =>
{
    window.localStorage.setItem('fluidEnabled', fluidEnabled ? '1' : '0');
});

window.addEventListener('resize', () =>
{
    const isMobile = checkIfMobile();
    if (store.state().isMobile !== isMobile)
    {
        store.execute(setIsMobile(isMobile));
    }
})

window.addEventListener('popstate', (event) =>
{
    const stateData: WindowHistory = event.state;
    if (stateData.pageId)
    {
        store.execute(setSelectedPageId(stateData.pageId));
    }
});

function checkIfMobile()
{
    return document.body.offsetWidth <= 480;
}