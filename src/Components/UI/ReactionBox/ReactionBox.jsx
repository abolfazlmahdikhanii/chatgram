import React from 'react'
import Profile from '../../Profile/Profile'

const ReactionBox = ({reaction,setReaction}) => {
    return (
        <div className='bg-gray-300/30  px-2 py-1  rounded-[10px] flex items-center justify-between my-2.5 w-[70px] ml-auto backdrop-blur-md cursor-pointer' onClick={()=>setReaction(false)}>
            <div>
            <Profile path={reaction?.profile.profileImg}  userName={reaction?.profile.userName} bgProfile={reaction?.profile.bgProfile} relation={reaction?.profile.relation} size="xs"/>
            </div>
            <div className=''>
                <img
                    src={`https://fonts.gstatic.com/s/e/notoemoji/latest/${reaction.reaction}/512.webp`}
                    width="20"
                    height="20"
                />
            </div>
        </div>
    )
}

export default ReactionBox
