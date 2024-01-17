import getRandomValue from "./Utility/randomColor"

const chatData=[
    {
        id: 1,
        userName: 'AbMk',
        
        relation: 'me',
        profileImg: '../../../src/assets/images/profile.jpg',
        bgProfile: 'violet',
        messages: [],
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
    },
]

export default chatData