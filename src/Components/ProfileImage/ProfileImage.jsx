import React from 'react'

const ProfileImage = ({size}) => {
  return (
    <div className={`rounded-xl overflow-hidden bg-indigo-500 ${size==="m"?'w-14 h-14':'w-11 h-11'}`}>
        <img src="images/profile.jpg" alt="" className='w-full h-full'/>
    </div>
  )
}

export default ProfileImage