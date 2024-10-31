import React, { useContext } from 'react'
import Profile from '../Profile/Profile'
import { UserContext } from '../../Context/UserContext'

const UserProfile = ({
  id,
  chatID,
  chats,
  activeStatus,
  onForward,
  saveChat,
  fromChatID,
  forwardContact,
}) => {
  const { user } = useContext(UserContext)

  
  let profile = null
  if (chats) profile = chats
  if (saveChat) profile = saveChat
  return (
    <li
      className="user-profile dark:hover:bg-gray-700/20"
      onClick={() => {
        onForward(
          chatID,
          user?.userid,
          profile.userid,
          !forwardContact ? 'normal' : 'contact',
          fromChatID
        )
      }}
    >
      <Profile
        size="m"
        path={profile?.avatar_url}
        userName={profile?.username || profile?.email?.split('@')[0]}
        bgProfile={profile?.bgProfile}
        isSave={user?.userid == profile?.userid}
      />

      <div className="w-full flex-col gap-0.5 flex">
        {/* top */}

        <p className="  dark:text-white capitalize text-[18px] text-gray-700 font-semibold dark:font-medium">
          {profile?.username || profile?.email?.split('@')[0]}
        </p>
        <p className="text-[15px] dark:text-gray-400 text-gray-600">
          {user?.userid!== profile?.userid
            ? activeStatus
            : 'forward here to save'}
        </p>
      </div>
    </li>
  )
}

export default UserProfile
