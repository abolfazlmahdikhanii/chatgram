import React, { useContext, useEffect, useState } from 'react'
import SideMenu from '../SideMenu/SideMenu'
import MessageList from '../MessageList/MessageList'
import Chat from '../../Pages/Chat/Chat'
import ChatInfo from '../ChatInfo/ChatInfo'
import { Route, Routes, useParams } from 'react-router-dom'
import {
  MusicControlContext,
  MusicControlProvider,
} from '../../Context/MusicContext'
import PinAudio from '../PinAudio/PinAudio'
import Home from '../../Pages/Home/Home'
import { ChatProvider } from '../../Context/ChatContext'
import Setting from '../Setting/Setting'
import EditProfileSetting from '../Setting/EditProfileSetting'
const Layout = () => {
  const [showSetting, setShowSetting] = useState(false)
  const [showEditProfile, setShowEditProfile] = useState(false)

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
        <SideMenu showSetting={setShowSetting} />
        {!showSetting&&!showEditProfile && <MessageList />}
        {showSetting && <Setting setShowEditProfile={setShowEditProfile} close={()=>setShowSetting(false)} />}
        {showEditProfile && <EditProfileSetting close={()=>{
            setShowEditProfile(false)
            setShowSetting(true)
            }} />}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/chat/:id"
            element={
              <MusicControlProvider>
                <Chat />
              </MusicControlProvider>
            }
          />
        </Routes>
      </div>
    </ChatProvider>
  )
}

export default Layout
