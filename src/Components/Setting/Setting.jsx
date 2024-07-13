import React, { useContext, useEffect } from 'react'
import { IoMdClose } from 'react-icons/io'
import Profile from '../Profile/Profile'
import { useState } from 'react'
import SettingItem from './SettingItem'
import SettingContainer from './SettingContainer'
import { UserContext } from '../../Context/UserContext'
const Setting = ({setShowEditProfile,close,profile,setProfile, setShowGeneralSetting}) => {

  
  const { user } = useContext(UserContext)

  return (
    <>
      <SettingContainer title="Setting" onBack={close}>
        <div className="mt-12 flex flex-col gap-5 items-center justify-center border-b-[12px] pb-7 border-base-300 -mx-2">
          <div className=" flex items-center justify-center">
            <Profile
              path={user?.avatar_url}
              userName={user?.username||user.email.split('@')[0]}
              bgProfile={user?.bgProfile}
              isSave={false}
              size="lg"
            />
          </div>
          <div className="space-y-1.5">
            <p className="text-2xl text-gray-900 dark:text-gray-50 font-semibold truncate">
              {user?.username||user.email.split('@')[0]}
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
