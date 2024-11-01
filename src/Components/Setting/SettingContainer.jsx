import React, { useState } from 'react'
import Box from '../UI/Box/Box'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { supabase } from '../../superbase'
const SettingContainer = ({ title, onBack, children }) => {
  const [showMenu, setShowMenu] = useState(false)

  const logOutHandler=async()=>{
    const { error } = await supabase.auth.signOut()
      if(error) return

      localStorage.removeItem('profile')
      location.reload()
  }
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
          onClick={() => setShowMenu((prev) => !prev)}
        >
          <BiDotsVerticalRounded size={20} color="#9ca3af" />
        </button>
        {/* menu */}
        <div
          className={`menu bg-base-200  rounded-box absolute right-0 top-[50px] z-[11] w-[200px] space-y-1 transition-all duration-200  ${
            !showMenu
              ? 'scale-0 opacity-0 translate-x-12'
              : 'scale-100 opacity-100 translate-x-0'
          }`}
          onMouseLeave={() => setShowMenu(false)}
        >
          <div className=" select-box--item " onClick={logOutHandler}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
              />
            </svg>

            <p className={`font-[700] text-[14px] ml-1`}>Log Out</p>
          </div>
        </div>
      </div>

      {children}
    </Box>
  )
}

export default SettingContainer
