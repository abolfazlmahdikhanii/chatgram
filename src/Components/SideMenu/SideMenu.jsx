import React, { useContext, useEffect, useState } from 'react'
import Box from '../UI/Box/Box'
import SideMenuItem from './SideMenuItem'
import ThemSwitch from '../UI/ThemSwitch/ThemSwitch'
import ProfileImage from '../ProfileImage/ProfileImage'
import { ChatContext } from '../../Context/ChatContext'
import { UserContext } from '../../Context/UserContext'
import { useParams } from 'react-router-dom'


const SideMenu = ({ showSetting }) => {
  const { chat,friendID } = useContext(ChatContext)
  const { user } = useContext(UserContext)
  const match=useParams()

 

  return (
    <Box style={`${friendID?'hidden lg:block':'block'}`}>
      <section className="side-menu ">
        {/* top */}
        <div>
          {/* logo */}
          <div  className="w-[80px] h-[80px]  ">
            <img
              src="./logo.png"
              alt="logo"
              className="w-full h-full object-cover"
            />
          </div>
          {/* menu */}
          <nav className="flex flex-col items-center justify-center mt-1.5">
            <ul className="side-menu--list ">
              <SideMenuItem name="chat" />
              <SideMenuItem name="save" />
            </ul>
            <p className="side-menu--border"></p>
            <ul className="side-menu--list">
              <SideMenuItem name="chanel" />
              <SideMenuItem name="profile" />
            </ul>
            <p className="side-menu--border"></p>
            <ul className="side-menu--list">
              <SideMenuItem name="setting" showSetting={showSetting} />
            </ul>
          </nav>
        </div>
        {/* footer */}
        <div className="flex flex-col gap-y-4 items-center mt-3 mb-9">
          <ThemSwitch />
          <ProfileImage {...user} src={user?.avatar_url} userName={user?.username||user?.email?.split('@')[0]} />
        </div>
      </section>
    </Box>
  )
}

export default SideMenu
