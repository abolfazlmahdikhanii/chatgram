import React from 'react'
import Profile from '../../Profile/Profile'

const ReactionBox = ({ reaction, setReaction }) => {
  return (
    <div
      className=" bg-gray-300/30  px-2 py-1 mx-1.5  rounded-lg flex items-center justify-between my-2.5 w-[65px] ml-auto backdrop-blur-md cursor-pointer border-2 border-gray-500"
      onClick={() => setReaction(false)}
    >
      <div>
        <Profile
          size="xs"
          path={reaction?.userInfos?.avatar_url}
          userName={
            reaction?.userInfos?.username ||
            reaction?.userInfos?.email?.split('@')[0]
          }
          bgProfile={reaction?.userInfos?.bgProfile}
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
