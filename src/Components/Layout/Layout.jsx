import React, { useContext, useEffect, useState } from 'react'
import SideMenu from '../SideMenu/SideMenu'
import MessageList from '../MessageList/MessageList'
import Chat from '../../Pages/Chat/Chat'
import ChatInfo from '../ChatInfo/ChatInfo'
import { Route, Routes, useParams } from 'react-router-dom'

import PinAudio from '../PinAudio/PinAudio'
import Home from '../../Pages/Home/Home'
import { ChatContext, ChatProvider } from '../../Context/ChatContext'
import Setting from '../Setting/Setting'
import EditProfileSetting from '../Setting/EditProfileSetting'
import GeneralSetting from '../Setting/GeneralSetting'
import { supabase } from '../../superbase'
import { UserContext } from '../../Context/UserContext'

const Layout = () => {
  const [showSetting, setShowSetting] = useState(false)
  const [showEditProfile, setShowEditProfile] = useState(false)
  const [showGeneralSetting, setShowGeneralSetting] = useState(false)
  const [profile, setProfile] = useState(null)
  const [chatID, setChatID] = useState(null)
  const { user, setChatBg, setFont, setColor } = useContext(UserContext)

  const { friendID, chatId,setFriendID } = useContext(ChatContext)
  const match = useParams()

  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    
    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
 
  useEffect(() => {
    getSetting()
  }, [])

  useEffect(() => {
    setChatID(match?.id)

    return()=>{
      setFriendID(null)
    }
  }, [match?.id])

  const showSettingPanel = () => {
    setShowSetting((prev) => !prev)
    setShowEditProfile(false)
    setShowGeneralSetting(false)
  }
  const getSetting = async () => {
    const getStroage = localStorage.getItem('profile')
      ? JSON.parse(localStorage.getItem('profile'))
      : []
    if (getStroage.chatBg && getStroage.fontSize && getStroage.profileColor) {
      setChatBg(getStroage.chatBg)
      setFont(getStroage.fontSize)
      setColor(getStroage.profileColor)
    } else {
      try {
        let { data, error } = await supabase
          .from('user_setting')
          .select('*')
          .eq('id', user?.userid)
          .single()
        if (error) throw error
        setChatBg(data?.chatBg)
        setFont(data?.fontSize)
        setColor(data?.profileColor)
        getStroage.chatBg = data?.chatBg
        getStroage.fontSize = data?.fontSize
        getStroage.profileColor = data?.profileColor

        localStorage.setItem('profile', JSON.stringify(getStroage))
      } catch (error) {
        console.log(error)
      }
    }
  }
  return (
    <>
      <div
        className={`h-[100dvh]  ${
          friendID
            ? 'grid-cols-1 lg:grid-cols-[95px_340px_1fr]'
            : 'grid-cols-[65px_1fr] md:grid-cols-[80px_300px_1fr] lg:grid-cols-[95px_340px_1fr]'
        }
     h-screen grid  overflow-hidden`}
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
          <Route path="/" element={<Home isSmall={isSmallScreen} />}  />
          <Route path="/chat/:id" element={<Chat />} />
        </Routes>
      </div>
    </>
  )
}

export default Layout
