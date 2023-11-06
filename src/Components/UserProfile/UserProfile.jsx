import React from 'react'
import Profile from '../Profile/Profile'

const UserProfile = ({userName,relation,bgProfile,profileImg,activeStatus,onForward,id}) => {

    return (
        <li className='user-profile hover:bg-gray-700/20' onClick={()=>onForward(id)}>
           <Profile size="m" path={profileImg} userName={userName} bgProfile={bgProfile} relation={relation}/>     

            <div className="w-full flex-col gap-0.5 flex">
                {/* top */}
          
                    <p className="  text-white capitalize text-[18px]">
                        {userName}
                    </p>
                    <p className="text-[15px] text-gray-400">
                        {relation!=="me"?activeStatus:"forward here to save"}
                    </p>
                
            </div>
        </li>
    )
}

export default UserProfile
