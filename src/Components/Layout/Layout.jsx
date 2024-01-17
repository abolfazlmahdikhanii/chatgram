import React, { useContext, useEffect, useState } from 'react'
import SideMenu from '../SideMenu/SideMenu'
import MessageList from '../MessageList/MessageList'
import Chat from '../../Pages/Chat/Chat'
import ChatInfo from '../ChatInfo/ChatInfo'
import { Route, Routes, useParams } from 'react-router-dom'
import {MusicControlContext, MusicControlProvider} from '../../Context/MusicContext'
import PinAudio from '../PinAudio/PinAudio'
import Home from '../../Pages/Home/Home'
import { ChatProvider } from '../../Context/ChatContext'
const Layout = () => {




   
   


    const match = useParams()
    
        
    return (
        <ChatProvider>
        <div
            className={`${
                match.id
                    ? 'grid-cols-[95px_340px_1fr_280px]'
                    : 'grid-cols-[95px_340px_1fr]'
            } h-screen grid  overflow-hidden`}
        >
            <SideMenu />
            <MessageList />
        
            <Routes>
                
                <Route
                    path="/"
                    element={<Home />}
                />
                <Route
                    path="/chat/:id"
                    element={<MusicControlProvider><Chat /></MusicControlProvider>}
                />
            </Routes>

         
        </div>
        </ChatProvider>
    )
}

export default Layout
