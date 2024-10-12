import React from 'react'

const SkeletonLoaderMessage = ({size}) => {
  return (
    <div className="chat chat-start mt-5 ">
      <div className={`chat-bubble chat-bubble-primary ${size==='md'?'w-[200px]':'w-[250px]'} h-[100px] px-3 dark:bg-gray-700 bg-gray-50 dark:shadow-none dark:border-transparent  shadow-lg shadow-gray-300/30 border border-gray-100`}>
        <div className=" w-full px-3 animate-pulse ">
          <div className="flex flex-col gap-3.5 mt-3">
            <div className="dark:bg-gray-600 h-3 w-full rounded-xl bg-gray-300 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-tr dark:from-gray-600 dark:to-gray-500 from-gray-300 to-gray-200 animate-shimmer"></div>
            </div>
            <div className="dark:bg-gray-600 h-3 w-1/2 rounded-xl bg-gray-300 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-tr dark:from-gray-600 dark:to-gray-500 from-gray-300 to-gray-200 animate-shimmer"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SkeletonLoaderMessage
