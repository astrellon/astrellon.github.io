import { PageId, PostState, Url } from "../store";

export const Work: PostState[] = [
    {
        "pageId": "work" as PageId,
        "contents": [
            {
                "text": [
                    "[post-header](Three Divers | JAN 2020 - PRESENT)",
                    "Working on a freight multi-modal routing application for finding how to get cargo from A to B.",
                    "Currently not released to the public so can't go into details too much.",
                    "My work included:",
                    "* A content server for processing data from multiple data sources into a unified structure that can then be manipulated further manually.",
                    "* A main server for using the processed data for routing and cataloging relationships between the data.",
                    "* A frontend for manipulating the data on in the content server.",
                    "* Hosted on AWS using EC2, load balancers, RDS and S3."
                ],
                "pictures": [{
                    "url": "/assets/threeDiversMockThumbnail.jpg" as Url,
                    "caption": "A basic graphic of routing across different modes.",
                    "fullSizeUrl": "/assets/threeDiversMock.jpg" as Url
                }],
                "picturePosition": "left"
            }
        ]
    },
    {
        "pageId": "work" as PageId,
        "contents": [
            {
                "text": [
                    "[post-header](Metro Trains Melbourne | SEP 2018 - NOV 2020)",
                    "Metro Trains Melbourne needed a tool for monitoring real time voltages and currents for testing their new trains.",
                    "This work combined hardware installed in the field (created by my co-worker) and a server with a front end (created by me)",
                    "The hardware was made up of an industrial PC with a USB oscilloscope and 4G modem",
                    "My work included:",
                    "* Creating a backend in .Net Core that received the data.",
                    "* Creating the frontend for use on a PC or mobile, built using Typescript and React.",
                    "* Handling displaying live data of up to 120k samples on a mobile device.",
                    "* Storing, retrieving and processes all the data, which ranged between 40k samples per second to 120k samples per second.",
                    "* Utilising various Amazon Web Services such as EC2 to host the server, RDS to host the database for users and config, S3 for long term storage of raw data and SQS as a backup connection should the server go down."
                ],
                "pictures": [{
                    "url": "/assets/mtmGraphs_small.jpg" as Url,
                    "caption": "An example of live data from field units being displayed on a web UI."
                },
                {
                    "url": "/assets/mtmDataLookup_small.jpg" as Url,
                    "caption": "An example of the data lookup UI for retrieving old data."
                },
                {
                    "url": "/assets/mtmDataLookup2_small.jpg" as Url,
                    "caption": "An example of old data that has been looked up."
                }]
            }
        ]
    },
    {
        "pageId": "work" as PageId,
        "contents": [
            {
                "text": [
                    "[post-header](Rome2rio | OCT 2014 - JUL 2018)",
                    "Rome2rio is a travel search website used for finding and comparing different routes from anywhere in the world. It specialised in ground transport.",
                    "I focused on adding timetables, buying tickets and working on internal tools for updating and creating routes live.",
                    "My work included:",
                    "* Adding schedule information and the ability to buy tickets directly through Rome2rio for UK trains.",
                    "* Internal tools for modifying their data through a web UI (not pictured).",
                    "* Expanding upon and improved the infrastructure of their tooling.",
                    "* For two years I mentored someone which resulted in them being able to shift from a non-dev role into a junior software dev."
                ],
                "pictures": [{
                    "url": "/assets/rome2rioTickets_small.png" as Url,
                    "caption": "An example of buying a train ticket in the UK directly with Rome2rio."
                },
                {
                    "url": "/assets/rome2rioSchedules.png" as Url,
                    "caption": "An example of a train timetable in Melbourne."
                }],
                "picturePosition": "left"
            }
        ]
    },
    {
        "pageId": "work" as PageId,
        "contents": [
            {
                "text": [
                    "[post-header](miGenius and mental images | JAN 2008 - OCT - 2014)",
                    "mental images are a company that specialises in photographic rendering using ray and path tracing software.",
                    "After 3 years the Melbourne office split off to form the company migenius which continued to do the same work and allowed for working on stand alone products.",
                    "Bloom Unit was their first product and combined the ease of using SketchUp's 3d editing with real time photographic images.",
                    "My work included:",
                    "* The interface between SketchUp (ruby) and Bloom Unit (C++) for keeping the 3d scene in sync.",
                    "* The UI (Internet Explorer 6) for adjusting the render settings and configuring the materials.",
                    "We also worked on other projects for various clients:",
                    "* Integrating Bloom Unit into Autodesk Revit for Oldcastle.",
                    "* Web visualisation projects for Obayashi Corporation and Shimizu Corporation.",
                    "* A product visualiser for Takemoto products. [link](Bottle 3d Visualiser | http://www3d1.takemotokk.co.jp/takemoto/?lang=en)",
                    "* A product visualiser for Christ Jewellery. [link](Ring Configurator | https://www.christ.de/)"
                ],
                "pictures": [{
                    "url": "/assets/bloomunit_small.jpg" as Url,
                    "caption": "A screenshot of SketchUp with Bloom Unit running."},
                {
                    "url": "/assets/takemoto_small.jpg" as Url,
                    "caption": "A screenshot of Takemoto's 3d Visualizer being used."
                },
                {
                    "url": "/assets/christRingConfigurator_small.jpg" as Url,
                    "caption": "A screenshot of Christ Ring Configurator being used."
                }]
            }
        ]
    }
]