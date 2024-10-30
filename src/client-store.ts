import DataStore, { Modifier } from "simple-data-store";
import { PostState, PostStateMap, setStore, State } from "./store";
import { AboutMe } from './data/aboutme';
import { Projects } from './data/projects';
import { Work } from './data/work';
import { Pages } from './data/pages';
import { Editable } from "./common-types";

function combinePosts(input: PostState[])
{
    const posts: Editable<PostStateMap> = {};
    for (const post of input)
    {
        const list = posts[post.pageId] || (posts[post.pageId] = [])
        list.push(post);
    }
    return posts;
}

const posts = [... AboutMe, ...Projects, ...Work];
let initialPageId = '';
for (const page of Pages)
{
    if (page.defaultPage)
    {
        initialPageId = page.id;
        break;
    }
}

setStore(new DataStore<State>({
    pages: Pages,
    posts: combinePosts(posts),
    selectedPageId: initialPageId,
    darkTheme: false,
    postsHeight: 0,
    isMobile: false,
    fluidEnabled: true,
    documentReady: false
}));

export function setInitialState(state: State): Modifier<State>
{
    return () => { return state; }
}