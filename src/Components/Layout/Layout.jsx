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
  const [profile, setProfile] = useState(null)
  const match = useParams()
  const showSettingPanel=()=>{
    setShowSetting(prev=>!prev)
    setShowEditProfile(false)
  }
  return (
    <ChatProvider>
      <div
        className={`${
          match.id
            ? 'grid-cols-[95px_360px_1fr_280px]'
            : 'grid-cols-[95px_360px_1fr]'
        } h-screen grid  overflow-hidden`}
      >
        <SideMenu showSetting={showSettingPanel} />
        {!showSetting&&!showEditProfile && <MessageList />}
        {showSetting && <Setting profile={profile} setProfile={setProfile} setShowEditProfile={setShowEditProfile} close={()=>setShowSetting(false)} />}
        {showEditProfile && <EditProfileSetting profile={profile}  close={()=>{
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
