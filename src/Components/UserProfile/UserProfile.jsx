import React from 'react'
import Profile from '../Profile/Profile'

const UserProfile = () => {
    return (
        <div className='user-profile hover:bg-gray-700/20'>
            <Profile  size="m" />

            <div className="w-full flex-col gap-0.5 flex">
                {/* top */}
          
                    <p className="  text-white capitalize text-[18px]">
                        Abolfazl
                    </p>
                    <p className="text-[15px] text-gray-400">
                        last seen recently
                    </p>
                
            </div>
        </div>
    )
}

export default UserProfile
