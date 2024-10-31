import React, { useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'

const Progress = ({ size, onRemove }) => {
  const [progress, setProgress] = useState(0)

  return (
    <div
      className={`radial-progress absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-base-100/40 border-[6px] border-transparent cursor-pointer z-[3] ${
        size === 100 ? 'hidden' : ''
      }`}
      style={{ '--value': size, '--size': '3rem', '--thickness': '2px' }}
    >
      <p className="cursor-pointer z-10 ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
          />
        </svg>
      </p>
    </div>
  )
}

export default Progress
