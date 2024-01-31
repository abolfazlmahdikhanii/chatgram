import getRandomValue from "./Utility/randomColor"

const chatData=[
    {
        id: 1,
        userName: 'AbMk',
        
        relation: 'me',
        profileImg: '../../../src/assets/images/profile.jpg',
        bgProfile: 'violet',
        messages: [],
        stories:[
            {
                id: 1,
                src: '../../../../src/assets/images/profile.jpg',
            },
            {
                id: 2,
                src: 'https://newspaperw-cdn.varzesh3.com/newspapers/2024/01/28/A/bmbokbmg.jpg?w=870',
            },
            {
                id: 3,
                src: 'https://newspaperw-cdn.varzesh3.com/newspapers/2024/01/28/A/cqm5akgy.jpg?w=870',
            }
        ]
    },
    {
        id: 2,
        userName: 'Abolfazl',
        activeStatus: 'last seen recently',
        relation: 'friend',
        bgProfile: getRandomValue(),
        profileImg:
            'https://imgv3.fotor.com/images/gallery/Realistic-Male-Profile-Picture.jpg',
        messages: [],
        stories:[
            {
                id: 1,
                src: 'https://static.football360.ir/nesta/media/posts_media/photo_2024-01-30_16-56-05.jpg?x-img=v1/optimize,q_50,lossless_false,/w_328,h_240,',
            },
            {
                id: 2,
                src: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4',
            },
            {
                id: 3,
                src: 'https://newspaperw-cdn.varzesh3.com/newspapers/2024/01/28/A/cqm5akgy.jpg?w=870',
            }
        ]
    },
    {
        id: 3,
        userName: 'Elizabeth',
        activeStatus: 'last seen recently',
        relation: 'friend',
        bgProfile: getRandomValue(),
        profileImg:
            'https://images.nightcafe.studio/jobs/X0DIQhUI5yfPMmykyDSi/X0DIQhUI5yfPMmykyDSi--4--a0vw0.jpg?tr=w-1600,c-at_max',
        messages: [],
        stories:[
            {
                id: 1,
                src: 'https://static.football360.ir/nesta/media/posts_media/photo_2024-01-30_11-59-53.jpg?x-img=v1/optimize,q_50,lossless_false,/w_328,h_240,',
            },
            {
                id: 2,
                src: 'https://newspaperw-cdn.varzesh3.com/newspapers/2024/01/28/A/bmbokbmg.jpg?w=870',
            },
            {
                id: 3,
                src: 'https://newspaperw-cdn.varzesh3.com/newspapers/2024/01/28/A/cqm5akgy.jpg?w=870',
            }
        ]
    },
]

export default chatData