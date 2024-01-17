import React from 'react'

const HeaderModal = ({title,clickClose}) => {
  return (
    <div className="flex items-center gap-7 px-6 py-4 ">
        <button className="btn btn-square btn-sm" onClick={clickClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <p className="text-2xl font-semibold dark:text-white capitalize text-gray-800">{title}</p>
      </div>
  )
}

export default HeaderModal