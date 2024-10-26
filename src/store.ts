import DataStore, { Modifier } from 'simple-data-store';
import { Editable, Opaque } from './common-types';

export type PostAssetType = 'text' | 'intrinsic' | 'component';
export type PageId = Opaque<string, 'PageId'>;
export type Url = Opaque<string, 'Url'>;

export interface PostAssetAttributes
{
    readonly [key: string]: string;
}

export interface PageState
{
    readonly id: PageId;
    readonly title: string;
    readonly defaultPage?: boolean;
}

export interface PageStored extends PageState
{
    readonly type: "page";
}

export interface ImageDimension
{
    readonly width: number;
    readonly height: number;
}

export interface PostPictureState
{
    readonly url: Url;
    readonly fullSizeUrl?: Url;
    readonly caption: string;
    readonly dimension?: ImageDimension;
}

export interface PostLinkState
{
    readonly url: Url;
    readonly icon: string;
    readonly title?: string;
}

export interface PostParagraphState
{
    readonly text?: string[];
    readonly list?: string[];
    readonly pictures?: PostPictureState[];
    readonly picturePosition?: 'left' | 'right' | 'center';
    readonly links?: PostLinkState[];
}

export interface PostState
{
    readonly pageId: PageId;
    readonly contents: PostParagraphState[];
}

export interface PostStored extends PostState
{
    readonly type: "post";
}

export interface BackgroundStored
{
    readonly type: "background";
    readonly backgroundType: "light" | "dark";
    readonly url: string;
}

export interface PostStateMap
{
    readonly [pageId: string]: PostState[];
}

export interface Backgrounds
{
    readonly light: string[];
    readonly dark: string[];
}

export interface State
{
    readonly pages: PageState[];
    readonly backgrounds: Backgrounds;
    readonly posts: PostStateMap;
    readonly selectedPageId: string;
    readonly darkTheme: boolean;
    readonly postsHeight: number;
    readonly isMobile: boolean;
    readonly ripplesEnabled: boolean;
}

export type DataStored = PageStored | PostStored | BackgroundStored;

export interface WindowHistory
{
    readonly pageId: PageId;
}

///////

export function clearLoadedData(): Modifier<State>
{
    return () =>
    {
        return {
            pages: [],
            posts: {},
            selectedPageId: '' as PageId
        }
    }
}

export function setPostsHeight(postsHeight: number): Modifier<State>
{
    return () => { return { postsHeight } }
}

export function setIsMobile(isMobile: boolean): Modifier<State>
{
    return () => { return { isMobile } }
}

export function setSelectedPageId(selectedPageId: PageId): Modifier<State>
{
    return () => { return { selectedPageId } }
}

export function setDarkTheme(darkTheme: boolean): Modifier<State>
{
    return () => { return { darkTheme } }
}

export function setEnableRipples(ripplesEnabled: boolean): Modifier<State>
{
    return () => { return { ripplesEnabled } }
}
///////

export let store: DataStore<State>;

export function setStore(s: DataStore<State>)
{
    store = s;
}