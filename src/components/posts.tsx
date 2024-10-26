import { ClassComponent, FinishUnmountHandler, vdom } from "simple-tsx-vdom";
import { PageState, PostState, setPostsHeight, store } from "../store";
import { Footer } from "./footer";
import { Post } from "./post";
import './posts.scss';

interface Props
{
    readonly category?: PageState;
    readonly posts: PostState[];
}

export class Posts extends ClassComponent<Props>
{
    public onMount()
    {
        const domElement = this.rootDomNode() as HTMLElement;
        if (!domElement)
        {
            return;
        }

        if (typeof window === 'undefined')
        {
            domElement.classList.add('mounted');
        }
        else
        {
            setTimeout(() => {
                domElement.classList.add('mounted');
                const bounds = domElement.getBoundingClientRect();
                store.execute(setPostsHeight(bounds.height));
            }, 50);
        }
    }

    public onUnmount(finishedHandler: FinishUnmountHandler)
    {
        const domElement = this.rootDomNode() as HTMLElement;
        if (!domElement)
        {
            finishedHandler();
            return;
        }

        domElement.classList.remove('mounted');
        domElement.classList.add('unmounted');

        setTimeout(() =>
            finishedHandler(), 300);
    }

    public render()
    {
        const { posts, category } = this.props;

        return <div class='posts'>
            <div class='posts__content'>
                { category && <h2>{category.title}</h2> }
                {posts && posts.map(post => <Post key={post.pageId} post={post} />)}
                <Footer />
            </div>
        </div>
    }
}