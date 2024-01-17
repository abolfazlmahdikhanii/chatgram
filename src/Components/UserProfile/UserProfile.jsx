import React from 'react'
import Profile from '../Profile/Profile'

const UserProfile = ({userName,relation,bgProfile,profileImg,activeStatus,onForward,id}) => {

    return (
        <li className='user-profile dark:hover:bg-gray-700/20' onClick={()=>onForward(id)}>
           <Profile size="m" path={profileImg} userName={userName} bgProfile={bgProfile} relation={relation} isSave={relation==="me"?true:false}/>     

            <div className="w-full flex-col gap-0.5 flex">
                {/* top */}
          
                    <p className="  dark:text-white capitalize text-[18px] text-gray-700 font-semibold dark:font-medium">
                        {userName}
                    </p>
                    <p className="text-[15px] dark:text-gray-400 text-gray-600">
                        {relation!=="me"?activeStatus:"forward here to save"}
                    </p>
                
            </div>
        </li>
    )
}

export default UserProfile
