import React from 'react'
import { FaPlus } from 'react-icons/fa6'

const StoryItem = ({
  userName,
  profileImg,
  onStoryClick,
  addStory,
  onCreateStory,
  relation,
}) => {
  return (
    <div
      className="flex flex-col gap-2 justify-center items-center "
      onClick={onStoryClick}
    >
      <div className="p-1 relative ">
        <div className="w-[70px] h-[70px] mask mask-squircle z-[5] relative">
          <img src={profileImg} alt="story img" />
        </div>

        {/* border */}

        <div className="w-full h-full absolute top-0 left-0  mask mask-squircle bg-base-100 z-[3]"></div>
        {!addStory ? (
          <>
            <div
              data-color="purple"
              className="w-[85px] h-[86px]  absolute -top-1 -left-1  mask mask-squircle  z-[2] "
            ></div>
            {relation == 'me' ? (
              <div className="absolute -bottom-1 right-0 z-40">
                <button
                  data-color="violet"
                  className="  mask mask-squircle w-7 h-7 text-white grid place-items-center"
                  onClick={onCreateStory}
                >
                  +
                </button>
              </div>
            ) : null}
          </>
        ) : (
          <div className="absolute -bottom-1 right-0 z-20">
            <button
              data-color="violet"
              className="  mask mask-squircle w-7 h-7 text-white grid place-items-center"
              onClick={onCreateStory}
            >
              +
            </button>
          </div>
        )}
      </div>
      <p className="dark:text-gray-200 font-medium truncate text-gray-800">
        {userName}
      </p>
    </div>
  )
}

export default StoryItem
