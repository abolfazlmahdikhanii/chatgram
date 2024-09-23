import React from 'react'

const SkeletonLoader = () => {
  return (
    <div className=" flex gap-5  items-center w-full px-3 animate-pulse mb-3 mt-4">
      <div className="dark:bg-gray-600 bg-gray-300   w-[60px] h-[60px] mask mask-squircle overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-tr dark:from-gray-600 dark:to-gray-500 from-gray-300 to-gray-200 animate-shimmer"></div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="dark:bg-gray-600 h-3.5 w-20 rounded-xl bg-gray-300 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-tr dark:from-gray-600 dark:to-gray-500 from-gray-300 to-gray-200 animate-shimmer"></div>
        </div>
        <div className="dark:bg-gray-600 h-3.5 w-28 rounded-xl bg-gray-300 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-tr dark:from-gray-600 dark:to-gray-500 from-gray-300 to-gray-200 animate-shimmer"></div>
        </div>
      </div>
    </div>
  )
}

export default SkeletonLoader
