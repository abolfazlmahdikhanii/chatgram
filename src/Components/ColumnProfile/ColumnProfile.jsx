import React from 'react'
import { Link } from 'react-router-dom'
import userNameSpliter from '../../Utility/userNameSpliter'
const ColumnProfile = ({ id, userName, profileImg, bgProfile, relation }) => {
  
  return (
    <Link
      className="flex flex-col gap-2 justify-center items-center transition-all duration-300 hover:bg-gray-600/20 px-12 py-3 w-full rounded-2xl"
      to={`/chat/${id}`}
    >
      <div className="w-[65px] h-[65px] mask mask-squircle z-[5] relative">
        {profileImg ? (
          <img src={profileImg} alt="story img" />
        ) : (
          <div
            data-color={bgProfile}
            className={`grid place-items-center text-white h-full font-bold w-full  `}
          >
            {!profileImg && (
              <span>{userName && userNameSpliter(userName)}</span>
            )}
          </div>
        )}
      </div>
      <p className="dark:text-gray-300 font-normal truncate text-gray-700 text-sm">
        {userName}
      </p>
    </Link>
  )
}

export default ColumnProfile
