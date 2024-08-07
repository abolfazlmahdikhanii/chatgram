import React, { useContext, useEffect, useState } from 'react'
import SideMenu from '../SideMenu/SideMenu'
import MessageList from '../MessageList/MessageList'
import Chat from '../../Pages/Chat/Chat'
import ChatInfo from '../ChatInfo/ChatInfo'
import { Route, Routes, useParams } from 'react-router-dom'

import PinAudio from '../PinAudio/PinAudio'
import Home from '../../Pages/Home/Home'
import { ChatProvider } from '../../Context/ChatContext'
import Setting from '../Setting/Setting'
import EditProfileSetting from '../Setting/EditProfileSetting'
import GeneralSetting from '../Setting/GeneralSetting'


const Layout = () => {
  const [showSetting, setShowSetting] = useState(false)
  const [showEditProfile, setShowEditProfile] = useState(false)
  const [showGeneralSetting, setShowGeneralSetting] = useState(false)
  const [profile, setProfile] = useState(null)

  const match = useParams()
  const showSettingPanel = () => {
    setShowSetting((prev) => !prev)
    setShowEditProfile(false)
  }
  return (
    <>
      <ChatProvider>
        <div
          className={`${
            match.id
              ? 'grid-cols-[95px_340px_1fr_280px]'
              : 'grid-cols-[95px_340px_1fr]'
          } h-screen grid  overflow-hidden`}
        >
          <SideMenu showSetting={showSettingPanel} />
          {!showSetting && !showEditProfile && !showGeneralSetting && (
            <MessageList />
          )}
          {showSetting && (
            <Setting
              setShowEditProfile={setShowEditProfile}
              close={() => setShowSetting(false)}
              setShowGeneralSetting={setShowGeneralSetting}
            />
          )}
          {showEditProfile && (
            <EditProfileSetting
      
              close={() => {
                setShowEditProfile(false)
                setShowSetting(true)
              }}
            />
          )}

          {showGeneralSetting && (
            <GeneralSetting
              close={() => {
                setShowGeneralSetting(false)
                setShowSetting(true)
              }}
            />
          )}

          <Routes>
            <Route path="/" element={<Home />} replace />
            <Route path="/chat/:id" element={<Chat />} />
          </Routes>
        </div>
      </ChatProvider>
    </>
  )
}

export default Layout
