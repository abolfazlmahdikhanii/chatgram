import React from 'react'
import Box from '../UI/Box/Box'
import { IoMdClose } from 'react-icons/io'
const SettingContainer = ({ title,onBack, children }) => {
  return (
    <Box style={'ml-3 overflow-hidden'}>
      {/* header */}
      <div className="sticky -top-4 bg-base-100 z-10  py-4 -mt-2 w-full  transition-all duration-200 flex items-center justify-between ">
        <div className="flex items-center gap-x-2.5">
          <button
            className="btn btn-ghost mask mask-squircle btn-sm"
            onClick={() => onBack()}
          >
            <svg
              width={18}
              height={18}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.57 5.92993L3.5 11.9999L9.57 18.0699"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeMiterlimit={10}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M20.5 12H3.67004"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeMiterlimit={10}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <p className="text-xl dark:text-white font-semibold text-gray-900">
            {title}
          </p>
        </div>
        <button
          className="btn btn-ghost mask mask-squircle btn-sm"
          // onClick={() => setChatInfo(false)}
        >
          <IoMdClose size={20} />
        </button>
      </div>

      {children}
    </Box>
  )
}

export default SettingContainer
