import React, { useEffect, useState } from 'react'
import { BsFillBookmarkFill } from 'react-icons/bs'
import userNameSpliter from '../../Utility/userNameSpliter'
const ProfileImage = ({
  size,
  src,
  userName,
  email,
  bgProfile,
  relation,
  isSave = false,
}) => {
  let sizes = 16
  if (size === 'm') sizes = 22
  if (size === 'lg') sizes = 48

  return (
    <div className="avatar">
      <div
        className={`mask mask-squircle grid place-items-center ${
          size !== 'm' && size !== 'xs' && size !== 'lg' ? 'w-11 h-11' : ''
        } ${size === 'm' ? 'w-14 h-14 text-lg':''} ${
          size === 'xs' ? 'w-5 h-5 text-[9px]':''
        } ${size === 'lg' ? 'w-32 h-32 text-4xl':''}`}
      >
        {src && !isSave ? (
          <img
            src={src}
            alt="profile"
            className="w-full h-full aspect-square object-cover"
            onError={e=>e.currentTarget.src="./avatar.png"}
          
          />
        ) : (
          <div
            data-color={!isSave ? bgProfile : 'purple'}
            className={`grid place-items-center text-white h-full font-bold w-full  `}
          >
            {!src && !isSave && (
              <span>{userName && userNameSpliter(userName)}</span>
            )}
            {isSave && (
              <span>
                <BsFillBookmarkFill size={sizes} color="#fff" />
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProfileImage
