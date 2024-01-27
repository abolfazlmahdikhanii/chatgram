import React from 'react'

const SearchBar = () => {
    return (
        <div className="flex items-center justify-between bg-base-300/70 pr-3.5 rounded-xl mb-5 mt-1 mx-1">
            <input
                type="text"
                className=" py-2.5 pl-4 w-full bg-transparent focus-visible:outline-none dark:text-white dark:placeholder:text-gray-500 placeholder:text-sm text-gray-800 placeholder:text-gray-600"
                placeholder="Search..."
            />
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
                viewBox="0 0 24 24"
                className="text-gray-400"
            >
                <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M11.5 21a9.5 9.5 0 100-19 9.5 9.5 0 000 19zM22 22l-2-2"
                ></path>
            </svg>
        </div>
    )
}

export default SearchBar
