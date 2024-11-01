import React from 'react'
import Profile from '../../Profile/Profile'

const ReactionBox = ({ reaction, setReaction }) => {
  const {username,email,avatar_url,bgProfile}=reaction?.userInfos
  
  return (
    <div
      className=" bg-gray-300/30  px-2 py-1 mx-1.5  rounded-lg flex items-center justify-between my-2.5 w-[65px] ml-auto backdrop-blur-md cursor-pointer border-2 border-gray-500"
      onClick={() => setReaction(false)}
    >
      <div>
        <Profile
          size="xs"
          path={avatar_url}
          userName={
            username ||
            email.split('@')[0]
          }
          bgProfile={bgProfile}
        />
      </div>
      <div className="">
        <img
          src={`https://fonts.gstatic.com/s/e/notoemoji/latest/${reaction?.emojiId}/512.webp`}
          width="20"
          height="20"
        />
      </div>
    </div>
  )
}

export default ReactionBox
