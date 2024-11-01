import React, { useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'

const ProgressFile = ({ size, progress, onRemove,onDownload, isCompletedUploaded }) => {
  return (
    <>
      {!isCompletedUploaded ? (
        <div
          className={`radial-progress  rounded-lg self-end  bg-base-100/40 border-[4px] dark:text-white text-gray-700 border-transparent cursor-pointer -mr-2 md:-mr-2 mt-1  ${
            progress >= 100 ? 'hidden' : ''
          }`}
          style={{
            '--value': progress,
            '--size': '1.1rem',
            '--thickness': '2px',
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-2 h-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
            />
          </svg>
        </div>
      ) : (
        <div
          className={` mask mask-squircle w-7 h-7 grid place-items-center dark:text-white  rounded-lg self-end  dark:bg-base-100/40 border-[4px] border-transparent cursor-pointer  transition-all duration-300 bg-base-300/60 text-gray-600 dark:hover:bg-base-100  -mr-2 md:-mr-2 mt-1 hover:bg-base-300`}
          onClick={onDownload}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-3 h-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
            />
          </svg>
        </div>
      )}
    </>
  )
}

export default ProgressFile
