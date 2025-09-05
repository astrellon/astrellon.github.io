import { PageId, PostState, Url } from "../store";

export const AboutMe: PostState[] = [
    {
        "pageId": "about" as PageId,
        "contents": [
            {
                "text": [
                    "Software developer from Melbourne Australia.",
                    "I'm currently working at [link](Fluent Cargo | https://www.fluentcargo.com/) as a principal software engineer. Primary on data processing and software architecture.",
                    "I've previously worked at [link](migenius | https://www.migenius.com/), [link](Rome2rio | https://rome2rio.com) and [link](Metro Trains Melbourne | https://metrotrains.com.au).",
                    "You can contact me via [link](email | mailto:alan.lawrey@gmail.com) or find me on [link](Bluesky | https://bsky.app/profile/astrellon.bsky.social), [link](LinkedIn | https://www.linkedin.com/in/alan-lawrey-451431379/) or [link](reddit | https://www.reddit.com/user/astrellon3/).",
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
                    "This website is an example of that, it is built using my own state management ([link](simple-data-store | https://www.npmjs.com/package/simple-data-store)), virtual dom ([link](simple-tsx-vdom | https://www.npmjs.com/package/simple-tsx-vdom)), and signals ([link](simple-signals | https://www.npmjs.com/package/simple-signals)).",
                    "The source for this website is on [link](GitHub | https://github.com/astrellon/astrellon.github.io).",
                    "The background fluid effect is from Michael Brusegard's [link](WebGL Fluid Enhanced | https://github.com/michaelbrusegard/WebGL-Fluid-Enhanced)."
                ]
            }
        ]
    }
]
