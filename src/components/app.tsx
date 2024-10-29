import "../normalize.css";
import "../styles.scss";
import "../grid.scss";
import "./app.scss";
import "./ripples-comp.scss";

import { FunctionalComponent, vdom } from "simple-tsx-vdom";
import { PageState, setSelectedPageId, State, store, WindowHistory } from "../store";
import { Navbar } from "./navbar";
import { Posts } from "./posts";
import RipplesComp from "./ripples-comp";
import { AllIcons } from "./icon";
import MobileBottomNavbar from "./mobile-bottom-navbar";
import MobileTopNavbar from "./mobile-top-navbar";
import WebGLFluidComp from "./webgl-fluid-comp";

interface Props
{
    readonly state: State;
}

let postsContainerEl: HTMLElement | null = null;
let htmlEl: HTMLElement | null = null;

const lightColourPalette = ['#8946b5', '#526977', '#a89870'];
const darkColourPalette = ['#3c1751', '#172a2f', '#4b261a'];

export const App: FunctionalComponent<Props> = (props: Props) =>
{
    const { pages, posts, selectedPageId, darkTheme, isMobile, ripplesEnabled, documentReady } = props.state;

    if (postsContainerEl == undefined && typeof(window) !== 'undefined')
    {
        postsContainerEl = document.querySelector('.app__post-container');
        htmlEl = document.body.parentElement;
    }

    // The extra div around posts is for handling the unmounting stage and we don't want the old posts to be suddenly after the footer (which would push it up).

    return <div class='app-wrapper'>
        <AllIcons />
        <main class='app'>
            { !isMobile && <Navbar
                selectedPageId={selectedPageId}
                pages={pages}
                onPageChange={onPageChange}
                darkTheme={darkTheme}
                ripplesEnabled={ripplesEnabled} /> }

            { isMobile && <MobileTopNavbar
                darkTheme={darkTheme}
                ripplesEnabled={ripplesEnabled} /> }

            <div class='container app__post-container'>
                <Posts key={selectedPageId} category={pages.find(c => c.id === selectedPageId)} posts={posts[selectedPageId]} />
            </div>

            { isMobile && <MobileBottomNavbar
                selectedPageId={selectedPageId}
                pages={pages}
                onPageChange={onPageChange} /> }
        </main>

        <WebGLFluidComp
            lightColourPalette={lightColourPalette}
            darkColourPalette={darkColourPalette}
            darkTheme={darkTheme}
            enabled={documentReady && ripplesEnabled} />
    </div>
}

function onPageChange(page: PageState)
{
    const pushedState: WindowHistory =
    {
        pageId: page.id
    }

    window.history.pushState(pushedState, page.title, `/?page=${page.id}`);
    store.execute(setSelectedPageId(page.id));
}