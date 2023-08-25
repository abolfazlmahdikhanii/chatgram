import React from 'react'
import SideMenu from '../SideMenu/SideMenu'
import MessageList from '../MessageList/MessageList'
import Chat from '../../Pages/Chat/Chat'
import ChatInfo from '../ChatInfo/ChatInfo'

const Layout = () => {
  return (
    <div className='grid-cols-[95px_350px,1fr_250px] h-screen grid  overflow-hidden'>
        <SideMenu/>
        <MessageList/>
        <Chat/>
        <ChatInfo/>
    </div>
  )
}

export default Layout