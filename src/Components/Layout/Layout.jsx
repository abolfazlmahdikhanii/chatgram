import React, { useContext, useEffect, useState } from 'react'
import SideMenu from '../SideMenu/SideMenu'
import MessageList from '../MessageList/MessageList'
import Chat from '../../Pages/Chat/Chat'
import ChatInfo from '../ChatInfo/ChatInfo'
import { Route, Routes, useParams } from 'react-router-dom'
import {MusicControlContext, MusicControlProvider} from '../../Context/MusicContext'
import PinAudio from '../PinAudio/PinAudio'
import Home from '../../Pages/Home/Home'
const Layout = () => {


const getRandomValue = () => {
    const colors = [
        'red',
        'blue',
        'green',
        'yellow',
        'indigo',
        'purple',
        'rose',
        'violet'
    ]
    const randomIndex = Math.floor(Math.random() * colors.length)
    return colors[randomIndex]
}


    const [chats, setChats] = useState([
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
    ])
   


    const match = useParams()
    
        
    return (
        <MusicControlProvider>
        <div
            className={`${
                match.id
                    ? 'grid-cols-[95px_340px_1fr_280px]'
                    : 'grid-cols-[95px_340px_1fr]'
            } h-screen grid  overflow-hidden`}
        >
            <SideMenu chat={chats}/>
            <MessageList chats={chats} />
        
            <Routes>
                
                <Route
                    path="/"
                    element={<Home />}
                />
                <Route
                    path="/chat/:id"
                    element={<Chat chat={chats} setChat={setChats} />}
                />
            </Routes>

         
        </div>
        </MusicControlProvider>
    )
}

export default Layout
