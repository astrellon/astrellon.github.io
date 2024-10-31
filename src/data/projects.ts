import { PageId, PostState, Url } from "../store";

export const Projects: PostState[] = [
    {
        "pageId": "projects" as PageId,
        "contents": [
            {
                "text": [
                    "[h3](Space Strife)",
                    "A chaotic space shooter around defending a planet using tanks!",
                    "Main features:",
                    "* Alien motherships will be hiding behind gravity sources that you'll have to aim around.",
                    "* Supports bullet hell level of projectiles and runs well on lower end hardware.",
                    "* Defeating aliens gives you the money needed to buy more tanks or upgrade existing ones.",
                    "* Multiple characters that have different abilities such as temporary power ups, projectile splitting and slowing time.",
                    "* Works on mobile in landscape and portrait with a slightly different control scheme in each.",
                    "* An alpha build of the game is available on [link](itch.io | https://astrellon.itch.io/space-strife)."
                ],
                "links": [{
                    "url": "https://www.youtube.com/playlist?list=PLTf8ZRLo3EcM2af7AtxFiqQySnzFKEprt" as Url,
                    "icon": "youtube",
                    "title": "Devloga Playlist"
                }, {
                    "url": "https://astrellon.itch.io/space-strife" as Url,
                    "icon": "itchio",
                    "title": "itch.io page for downloading the game."
                }],
                "pictures": [{
                    "url": "/assets/spacestrife-v0.3-easy_small.jpg" as Url,
                    "caption": "An early level.",
                    "fullSizeUrl": "/assets/spacestrife-v0.3-easy.png" as Url
                }, {
                    "url": "/assets/spacestrife-v0.3-levelSelect_small.jpg" as Url,
                    "caption": "The level select screen is a zoomed out 'world view' of each level.",
                    "fullSizeUrl": "/assets/spacestrife-v0.3-levelSelect.png" as Url
                }, {
                    "url": "/assets/spacestrife-v0.3-hard_small.jpg" as Url,
                    "caption": "A later level with more going on.",
                    "fullSizeUrl": "/assets/spacestrife-v0.3-hard.jpg" as Url
                }],
                "picturePosition": "right"
            },
            {
                "text": [
                    "[h3](Godot 3D Pixel Art)",
                    "An experiment at creating 3D pixel art by combining 2D screen space textures with 3D models for shadows and lighting.",
                    "Main features:",
                    "* Built using Godot 4.2",
                    "* Makes use of regular pixel art creation for creating textures.",
                    "* Makes use of regular 3D modelling for creating the objects.",
                    "* Combines these two by effectively using the shape of the 3D objects as a mask onto the textures.",
                    "* Fairly performant, doesn't require any post processing other than a fairly simple shader.",
                    "* It does make loose out on some of the pixel perfect aspects of pixel art, as where the textures are applied is somewhat hard to control.",
                    "* Also getting shadows to look correct with sprites is tricky.",
                    "* Original source code and assets available on GitHub, along with Windows and Linux builds."
                ],
                "links": [{
                    "url": "https://youtu.be/4EIUvw37D88" as Url,
                    "icon": "youtube",
                    "title": "Devlog"
                }, {
                    "url": "https://github.com/astrellon/godot-3d-pixel-art/" as Url,
                    "icon": "github",
                    "title": "Source code for the experiment."
                }],
                "pictures": [{
                    "url": "/assets/godot_pixelart_small.jpg" as Url,
                    "caption": "A screenshot of a 3D scene using pixel art.",
                    "fullSizeUrl": "/assets/godot_pixelart.jpg" as Url
                }, {
                    "url": "/assets/godot_pixelart_blender_small.jpg" as Url,
                    "caption": "The view from 3D using a recreated material to sort of get an idea of the effect whilst modelling.",
                    "fullSizeUrl": "/assets/godot_pixelart_blender.jpg" as Url
                }],
                "picturePosition": "left"
            },
            {
                "text": [
                    "[h3](Lysithea)",
                    "A scripting language designed to live inside other systems to glue them together",
                    "Main features:",
                    "* Lisp style syntax.",
                    "* Builtin support for booleans, doubles, strings, lists and key-value-pair objects.",
                    "* Conditionals as expressions, use an if or switch statement like a function.",
                    "* Virtual machine is very light weight and allows for using many at the same time.",
                    "* Script execution can be controlled by the host environment, limit how many code lines can execute at a time.",
                    "* Simple code, easy to port to new host systems.",
                    "* Ported to C#, C++ and TypeScript. Examples written for Unity.",
                    "* Reasonably good performance, compared to other NLua or MoonSharp for C#."
                ],
                "links": [{
                    "url": "https://www.npmjs.com/package/lysithea-vm" as Url,
                    "icon": "npm",
                    "title": "NPM Page"
                }, {
                    "url": "https://github.com/astrellon/lysithea-vm" as Url,
                    "icon": "github",
                    "title": "Github Repository"
                }, {
                    "url": "https://www.youtube.com/watch?v=xeuKEHhp0jc" as Url,
                    "icon": "youtube",
                    "title": "Devlog"
                }],
                "pictures": [{
                    "url": "/assets/lysitheaCode.png" as Url,
                    "caption": "Example of code in Lysithea",
                    "fullSizeUrl": "/assets/lysitheaCode.png" as Url
                }],
                "picturePosition": "right"
            },
            {
                "text": [
                    "[h3](Tailspin)",
                    "A space game about going on an adventure and exploring space with some smart animal companions.",
                    "Main features:",
                    "* Flying your own spaceship from the cockpit.",
                    "* Walk around the interior of your spaceship and interact with different components.",
                    "* Fly around large spaces, past stars, black holes, into nebulae, land on planets and dock with space stations.",
                    "* Dock a smaller ship in your larger ship for different away missions.",
                    "* Explore space to find old shipwrecks to find salvageable parts.",
                    "* Find asteroids to mine for resources that can be used for crafting new parts.",
                    "* Be self-sufficient in deep space by looking after your ship.",
                    "* Made in Unity 2022",
                    "* Use Lysithea as the scripting language for creating levels.",
                    "Some of these features are still being worked on, however I am keeping a devlog on YouTube.",
                    "It's very ambitious and who knows how far I'll get, but I've already gotten a lot further than I thought I would.",
                    "Currently I'm not planning on releasing the source code as it also contains paid for Unity assets."
                ],
                "links": [{
                    "url": "https://www.youtube.com/playlist?list=PLTf8ZRLo3EcNqP13W1UTFdxuNUngYzYCV" as Url,
                    "icon": "youtube",
                    "title": "Devlog Playlist"
                }],
                "pictures": [{
                    "url": "/assets/tailspin_shuttle_small.jpg" as Url,
                    "caption": "The cockpit of a shuttle showing the main controls with a holographic sensor display.",
                    "fullSizeUrl": "/assets/tailspin_shuttle.jpg" as Url
                }, {
                    "url": "/assets/tailspin_spacestation_small.jpg" as Url,
                    "caption": "An example of a space station interior with a placeholder NPC.",
                    "fullSizeUrl": "/assets/tailspin_spacestation.jpg" as Url
                }, {
                    "url": "/assets/tailspin_warp_small.jpg" as Url,
                    "caption": "A exterior shot of a larger ship at FTL.",
                    "fullSizeUrl": "/assets/tailspin_warp.jpg" as Url
                }],
                "picturePosition": "left"
            },
            {
                "text": [
                    "[h3](Simple Virtual DOM)",
                    "I made my own virtual DOM (simple-tsx-vdom) inspired by [link](React | https://reactjs.org/) and [link](Preact | https://preactjs.com/).",
                    "It was created for learning but I wanted to take it to the point where I could build something non-trivial with it so this portfolio is the biggest example of it right now.",
                    "You can find the source for this portfolio page on [link](GitHub | https://github.com/astrellon/simple-portfolio).",
                    "Main features:",
                    "* Small filesize (about 2.5kb after compression) written with no dependencies.",
                    "* Written in fairly straight forward TypeScript that is all class based and can be extended.",
                    "* TSX support (hence the name, also simple-vdom was taken).",
                    "* Optional server-side rendering and client side hydration with the help of two extra packages.",
                    "* A simple diffing algorithm to reduce DOM manipulations.",
                    "* SVG support",
                    "* Supports both class and functional components.",
                    "* Supports custom handling of removed elements. For example if an element is removed from the vdom you can control how it's removed from the DOM, such as via animation before it's completely removed.",
                    "While I have created this website it in it is definitely [strong](NOT) intended for production use!"
                ],
                "links": [{
                    "url": "https://www.npmjs.com/package/simple-tsx-vdom" as Url,
                    "icon": "npm",
                    "title": "NPM Page"
                }, {
                    "url": "https://github.com/astrellon/simple-tsx-vdom" as Url,
                    "icon": "github",
                    "title": "Github Repository"
                }],
                "pictures": [{
                    "url": "/assets/simpleTsxVdom.jpg" as Url,
                    "caption": "A code snippet from this website."
                }]
            },
            {
                "text": [
                    "[h3](Simple Data Store)",
                    "I like what [link](redux | https://redux.js.org/) and other functional state management libraries have done for UI but I found them too unstructured and too generalised. So I put together my own version that is still general but puts just enough structure to fulfil my needs.",
                    "Unlike simple-tsx-vdom I have used simple-data-store in production to good effect, even without the extra features of browser devtools.",
                    "Main features:",
                    "* Small filesize (about 0.5kb after compression) written with no dependencies.",
                    "* Immutable data structures.",
                    "* Selector support, similar to reselect for redux."
                ],
                "links": [{
                    "url": "https://www.npmjs.com/package/simple-data-store" as Url,
                    "icon": "npm",
                    "title": "NPM Page"
                }, {
                    "url": "https://github.com/astrellon/simple-data-store" as Url,
                    "icon": "github",
                    "title": "Github Repository"
                }],
                "pictures": [{
                    "url": "/assets/simpleDataStore.jpg" as Url,
                    "caption": "An example of a really simple counter store."
                }],
                "picturePosition": "left"
            },
            {
                "text": [
                    "[h3](Space Doggo)",
                    "A space adventure/exploration game that I've been working on for a while now.",
                    "The main goal is to explore space and to find things. The scope is deliberately small so that [strong](hopefully) I'll finish it one day.",
                    "Main features:",
                    "* Features flying ships, floating around inside ships, teleporting to planets and walking around on planets.",
                    "* Uses 'space portals' to view other star systems and seamlessly move between locations without loading screens.",
                    "* A compendium of animals and things to fill up that makes use 'live photos' that takes a copy of each object in view so that they can be animated later on.",
                    "* Written in C++ using [link](SFML | https://www.sfml-dev.org/) for cross platform support.",
                    "* Makes use of [link](Box2D | https://box2d.org/) for physics, and [link](earcut | https://github.com/mapbox/earcut.hpp) for creating polygons for collisions.",
                    "* Tile based planets that use [link](tmxlite | https://github.com/fallahn/tmxlite) for loading [link](Tiled | https://www.mapeditor.org/) maps.",
                    "* Uses [link](yoga | https://yogalayout.com/) for UI layout and [link](Dear ImGui | https://github.com/ocornut/imgui) for debug UI.",
                    "* All data is stored in plain JSON and loaded using [link](nlohmann JSON | https://github.com/nlohmann/json) for parsing.",
                    "I've also been keeping a dev log about my progress and uploading them to YouTube."
                ],
                "links": [{
                    "url": "https://github.com/astrellon/simple-space" as Url,
                    "icon": "github",
                    "title": "Github Repository"
                },
                {
                    "url": "https://www.youtube.com/playlist?list=PLTf8ZRLo3EcP7A2US2CpGMTsEW_Kzezx8" as Url,
                    "icon": "youtube",
                    "title": "Devlog Playlist"
                }],
                "pictures": [{
                    "url": "/assets/spaceDoggoShipInteriorThumbnail.jpg" as Url,
                    "caption": "The inside of a ship that you can pilot along with the dog player.",
                    "fullSizeUrl": "/assets/spaceDoggoShipInterior.png" as Url
                },
                {
                    "url": "/assets/spaceDoggoPortalThumbnail.jpg" as Url,
                    "caption": "A spaceship near a portal showing what is visible on the other side.",
                    "fullSizeUrl": "/assets/spaceDoggoPortal.png" as Url
                },
                {
                    "url": "/assets/spaceDoggoPlanetSurfaceThumbnail.jpg" as Url,
                    "caption": "A planet surface with some local birds eating their food next to a nest.",
                    "fullSizeUrl": "/assets/spaceDoggoPlanetSurface.png" as Url
                }],
                "picturePosition": "right"
            },
            {
                "text": [
                    "[h3](LOSS: Lua Operating SyStem)",
                    "A project to create an operating system that's built around using Lua with the intention of being light weight.",
                    "The main use case was for a game where you may want many simple in-game operating systems that look like a *NIX shell but without actually running a VM.",
                    "Main features:",
                    "* A modified version of the Lua VM that supports running multiple Lua States in the same thread using Boost Coroutines",
                    "* A virtual file system the supports mounting different types of file systems.",
                    "* A [link](tmpfs | https://en.wikipedia.org/wiki/Tmpfs) for virtual files (such as /dev and /proc)",
                    "* A persistent file system for long term storage.",
                    "* A [link](Fuse | https://en.wikipedia.org/wiki/Filesystem_in_Userspace) implementation that allows for mounting the persistent hard drives and modifying them outside of the VM."
                ],
                "links": [{
                    "url": "https://github.com/astrellon/loss" as Url,
                    "icon": "github",
                    "title": "Github Repository"
                }],
                "pictures": [{
                    "url": "/assets/loss.png" as Url,
                    "caption": "An example of starting the VM with an init.d file that just prints some text.",
                    "fullSizeUrl": "/assets/loss.png" as Url
                }],
                "picturePosition": "left"
            },
            {
                "text": [
                    "[h3](LOSS v0)",
                    "An earlier attempt at creating an OS for use in a game, specifically for a space game. This was a relatively naive approach that used NLua which is a C# implementation of Lua for use in Unity.",
                    "Main features:",
                    "* Basic shell for running Lua.",
                    "* A simple [link](VT100 | https://en.wikipedia.org/wiki/VT100) terminal emulator that used built in Unity components for text rendering.",
                    "* A very simple file system, however it did not support mounting."
                ],
                "links": [{
                    "url": "https://github.com/astrellon/ScalingOctoDubstep" as Url,
                    "icon": "github",
                    "title": "Github Repository"
                }],
                "pictures": [{
                    "url": "/assets/scalingOctoDubstep_small.jpg" as Url,
                    "caption": "A screenshot of the UI in Unity.",
                    "fullSizeUrl": "/assets/scalingOctoDubstep.png" as Url
                }],
                "picturePosition": "right"
            },
            {
                "text": [
                    "[h3](Unity Voxel Engine)",
                    "A [strong](small) voxel engine aim at being able to create and edit levels entirely within Unity. It performed well enough for the scale of the levels I wanted to created, however getting the editor tools to behave the way I wanted proved to be the most tricky aspect",
                    "Original intended to be in the style of [link](Might and Magic | https://en.wikipedia.org/wiki/Might_and_Magic) series which is why the original repository is called 'mm'",
                    "Main features:",
                    "* Chunked editing and loading. Maps are stored as individual binary files which is optimised for updating chunks during editing.",
                    "* Multiple different shapes beyond a cube such as ramps and different corners to allow for smoother terrain.",
                    "* Unity editing support for creating levels without needing additional tools."
                ],
                "links": [{
                    "url": "https://github.com/astrellon/mm" as Url,
                    "icon": "github",
                    "title": "Github Repository"
                }],
                "pictures": [{
                    "url": "/assets/mmVoxels_small.png" as Url,
                    "caption": "A screenshot of the Voxel Engine UI in Unity.",
                    "fullSizeUrl": "/assets/mmVoxels.png" as Url
                }],
                "picturePosition": "left"
            },
            {
                "text": [
                    "[h3](RPG Game)",
                    "A topdown 2D RPG game engine written in C++ built using minimal dependencies for the purpose of learning.",
                    "This is a fairly old project now, but it does represent a lot of learning in terms of C++, integrating a scripting language, handling modding, dealing with complex UI and handling an audio system.",
                    "Main features:",
                    "* Tile based 2D graphics with a tile overlapping system for blending between tiles.",
                    "* Sound system that supports streaming OGG and WAV files.",
                    "* Lua Bindings for controlling just about every aspect of the game. From how a new game is created and loaded to how a door should behave when interacted with.",
                    "* Maps are created through Lua and has a mechanism for determining if the map is being played new or loaded from disk, allowing for map scripts to upgrade old save files.",
                    "* A dialogue system based on The Elder Scrolls: Morrowind with topics, keywords and actions bound to those keywords.",
                    "* HTML documentation taken from the C++ comments using a Python script.",
                    "* In game text uses a simplistic CSS and HTML system for rich text.",
                    "* An in game map editor for creating new levels."
                ],
                "links": [{
                    "url": "https://github.com/astrellon/rouge" as Url,
                    "icon": "github",
                    "title": "Github Repository"
                }],
                "pictures": [{
                    "url": "/assets/rouge.png" as Url,
                    "caption": "A screenshot of the RPG game",
                    "fullSizeUrl": "/assets/rouge.png" as Url
                },
                {
                    "url": "/assets/rougeMapEditor.png" as Url,
                    "caption": "A screenshot of the in game map editor",
                    "fullSizeUrl": "/assets/rougeMapEditor.png" as Url
                }],
                "picturePosition": "right"
            }
        ]
    }
]