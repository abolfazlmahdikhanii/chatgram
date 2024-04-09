import React, { useContext, useEffect } from 'react'
import { IoMdClose } from 'react-icons/io'
import { ChatContext } from '../../Context/ChatContext'
import Profile from '../Profile/Profile'
import { useState } from 'react'
import SettingItem from './SettingItem'
import SettingContainer from './SettingContainer'
const Setting = ({setShowEditProfile,close,profile,setProfile, setShowGeneralSetting}) => {

  
  const { chat, message } = useContext(ChatContext)
  useEffect(() => {
    setProfile(chat.find((item) => item.relation === 'me'))
  
  }, [])
  return (
    <>
      <SettingContainer title="Setting" onBack={close}>
        <div className="mt-12 flex flex-col gap-5 items-center justify-center border-b-[12px] pb-7 border-base-300 -mx-2">
          <div className=" flex items-center justify-center">
            <Profile
              path={profile?.profileImg}
              userName={profile?.userName}
              bgProfile={profile?.bgProfile}
              relation={profile?.relation}
              isSave={false}
              size="lg"
            />
          </div>
          <div className="space-y-1.5">
            <p className="text-3xl text-gray-900 dark:text-gray-50 font-semibold truncate">
              {profile?.userName}
            </p>
            <p className="text-center text-sm text-indigo-400">Online</p>
          </div>
          {/* btn */}
        </div>

        <ul className="px-1 py-4 space-y-2.5 ">
          <SettingItem
            title="Edit Profile"
            icon="profile"
            onSetting={() => {
              setShowEditProfile(true)
              close()
            }}
          />
          <SettingItem title="General Setting" icon="general" onSetting={() => {
              setShowGeneralSetting(true)
              close()
            }} />
        </ul>
      </SettingContainer>

     
    </>
  )
}

export default Setting
