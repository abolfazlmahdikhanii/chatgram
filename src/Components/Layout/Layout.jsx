import React from 'react'
import SideMenu from '../SideMenu/SideMenu'
import MessageList from '../MessageList/MessageList'

const Layout = () => {
  return (
    <div className='grid-cols-[95px_300px,1fr_250px] h-screen grid gap-x-4'>
        <SideMenu/>
        <MessageList/>
    </div>
  )
}

export default Layout