import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import userNameSpliter from '../../Utility/userNameSpliter'
import Profile from '../Profile/Profile'
import { UserContext } from '../../Context/UserContext'
import { ChatContext } from '../../Context/ChatContext'
const ColumnProfile = ({ id, chatID, chats, activeStatus, saveChat,setActiveSearch }) => {
  const {user}=useContext(UserContext)
  const {setFriendID}=useContext(ChatContext)
  let profile = null
  if (chats) profile = chats
  if (saveChat) profile = saveChat

  
  return (
    <Link
      className="flex flex-col gap-2 justify-center items-center transition-all duration-300 hover:bg-gray-600/20 px-12 py-3 w-full rounded-2xl"
      to={`/chat/${chatID}`}
      onClick={() => {
        setFriendID(profile?.userid)
        setActiveSearch(false)
      }}
    >
    
        <Profile
        size="m"
        path={profile?.avatar_url}
        userName={profile?.username || profile?.email?.split('@')[0]}
        bgProfile={profile?.bgProfile}
        isSave={saveChat}
      />
      <p className="dark:text-gray-300 font-normal truncate text-gray-700 text-sm w-[70px]">
      {profile?.username || profile?.email?.split('@')[0]}
      </p>
    </Link>
  )
}

export default ColumnProfile
