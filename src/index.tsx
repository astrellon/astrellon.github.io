import { vdom, render } from "simple-tsx-vdom";
import { setSelectedPageId, WindowHistory, State, store, setIsMobile } from "./store";
import { App } from "./components/app";
import { setInitialState } from './client-store';

(globalThis as any).__store = store;

const initialState = (globalThis as any).__state as State | undefined;
if (initialState != undefined)
{
    store.execute(setInitialState(initialState));
    // hydrate(<App state={store.state()} />, document.body);
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