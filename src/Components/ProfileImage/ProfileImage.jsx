import React from 'react'
import splitFirstWord from '../../Utility/splitFirstWord'

const ProfileImage = ({size,src,userName}) => {

  
  return (
    <div className='avatar'>
      <div className={`mask mask-squircle ${size==="m"?'w-14 h-14':'w-11 h-11'}`}>
        {
          src?<img src={src} alt="profile" className='w-full h-full'/>:
          <span>{splitFirstWord(userName)}</span>
        }
    </div>
    </div>
  )
}

export default ProfileImage