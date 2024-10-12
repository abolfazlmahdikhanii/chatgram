import React from 'react'

const SkeletonLoaderProfile = () => {
  return (
    <div className=" flex gap-5  items-center w-full px-3 animate-pulse ">
      <div className="dark:bg-gray-600 bg-gray-300   w-11 h-11 mask mask-squircle overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-tr dark:from-gray-600 dark:to-gray-500 from-gray-300 to-gray-200 animate-shimmer"></div>
      </div>
      <div className="flex flex-col gap-2.5">
        <div className="dark:bg-gray-600 h-3 w-28 rounded-xl bg-gray-300 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-tr dark:from-gray-600 dark:to-gray-500 from-gray-300 to-gray-200 animate-shimmer"></div>
        </div>
        <div className="dark:bg-gray-600 h-3 w-12 rounded-xl bg-gray-300 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-tr dark:from-gray-600 dark:to-gray-500 from-gray-300 to-gray-200 animate-shimmer"></div>
        </div>
      </div>
    </div>
  )
}

export default SkeletonLoaderProfile
