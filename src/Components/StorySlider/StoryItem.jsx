import React from 'react'

const StoryItem = () => {
    return (
        <div className="flex flex-col gap-2 justify-center items-center ">
            <div className='p-1 relative '>
                <div className="w-[70px] h-[70px] mask mask-squircle z-[5] relative">
                    <img src="../../../src/assets/images/profile.jpg" alt="" />
                </div>
              
                {/* border */}
                
                <div className='w-full h-full absolute top-0 left-0  mask mask-squircle bg-base-100 z-[3]'>
                       
                </div>
                <div data-color="purple" className='w-[85px] h-[86px]  absolute -top-1 -left-1  mask mask-squircle  z-[2] '>
                       
                </div>
            </div>
            <p className="dark:text-gray-200 font-medium truncate text-gray-800">abolfazl</p>
        </div>
    )
}

export default StoryItem
