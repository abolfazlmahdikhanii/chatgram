import React from 'react'

const ReactionBox = ({reaction,setReaction}) => {
    return (
        <div className='bg-gray-300/30  px-2 py-1  rounded-[10px] flex items-center justify-between my-1 w-[70px] ml-auto backdrop-blur-md cursor-pointer' onClick={()=>setReaction(false)}>
            <div></div>
            <div className=''>
                <img
                    src={`https://fonts.gstatic.com/s/e/notoemoji/latest/${reaction}/512.webp`}
                    width="20"
                    height="20"
                />
            </div>
        </div>
    )
}

export default ReactionBox
