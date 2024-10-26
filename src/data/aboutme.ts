import { PageId, PostState, Url } from "../store";

export const AboutMe: PostState[] = [
    {
        "pageId": "about" as PageId,
        "contents": [
            {
                "text": [
                    "Software developer from Melbourne Australia.",
                    "I've previously worked at [link](migenius | https://www.migenius.com/), [link](Rome2rio | https://rome2rio.com) and [link](Metro Trains Melbourne | https://metrotrains.com.au).",
                    "You can contact me via [link](email | mailto:alan.lawrey@gmail.com) or find me on [link](Twitter | https://twitter.com/Alan_Lawrey), [link](LinkedIn | https://www.linkedin.com/in/alan-lawrey-b7509b21/) or [link](reddit | https://www.reddit.com/user/astrellon3/).",
                    "These are the things I enjoy working on:",
                    "* Making websites, working on both the frontend and backend.",
                    "* Creating tooling for processing data, both the processes and the UI for controlling those processes.",
                    "* Mentoring in software development.",
                    "* Creating small games. [link](I have a small itch.io page. | https://astrellon.itch.io/)",
                    "* Artwork [link](Instagram | https://www.instagram.com/astrellon_art/), [link](Redbubble | https://astrellon.redbubble.com), [link](TeePublic | https://teepublic.com/user/astrellonart) and [link](Society6 | https://society6.com/astrellon_art)."
                ],
                "pictures": [{
                    "url": "/assets/alanlawrey2021.jpg" as Url,
                    "caption": "Me at the beach."
                }]
            },
            {
                "text": [
                    "I also like learning about how things are done.",
                    "As part of that I've re-created several systems for learning purposes.",
                    "This website is an example of that, it is built using my own state management ([link](simple-data-store | https://www.npmjs.com/package/simple-data-store)), virtual dom ([link](simple-tsx-vdom | https://www.npmjs.com/package/simple-tsx-vdom)) with server side rendering and hydration.",
                    "The source for [link](this data driven website | https://github.com/astrellon/astrellon.github.io) along with the [link](data repo | https://github.com/astrellon/simple-portfolio-data).",
                    "The background ripples effect is ported from sirxemic's [link](jQuery Ripples Plugin | https://github.com/sirxemic/jquery.ripples/)."
                ]
            }
        ]
    }
]