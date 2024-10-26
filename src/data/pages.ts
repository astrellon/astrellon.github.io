import { PageId, PageState } from "../store"

export const Pages: PageState[] = [
    {
        "id": "about" as PageId,
        "title": "About",
        "defaultPage": true
    },
    {
        "id": "work" as PageId,
        "title": "Work"
    },
    {
        "id": "projects" as PageId,
        "title": "Projects"
    }
]