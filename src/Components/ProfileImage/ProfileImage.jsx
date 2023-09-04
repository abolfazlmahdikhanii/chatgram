import React from 'react'

const ProfileImage = ({size,src}) => {
  return (
    <div className='avatar'>
      <div className={`mask mask-squircle ${size==="m"?'w-14 h-14':'w-11 h-11'}`}>
        <img src={src?src:'../../../src/assets/images/profile.jpg'} alt="profile" className='w-full h-full'/>
    </div>
    </div>
  )
}

export default ProfileImage