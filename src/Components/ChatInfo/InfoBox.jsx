import React from 'react'
import { MdAlternateEmail } from 'react-icons/md'
function InfoBox({ title, des,onCopy,style="" }) {
    let icon = null
    switch (title) {
        case 'Email':
            icon = (
           <p className="text-amber-500">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
            >
                <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                    strokeWidth="1.5"
                    d="M17 20.5H7c-3 0-5-1.5-5-5v-7c0-3.5 2-5 5-5h10c3 0 5 1.5 5 5v7c0 3.5-2 5-5 5z"
                ></path>
                <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                    strokeWidth="1.5"
                    d="M17 9l-3.13 2.5c-1.03.82-2.72.82-3.75 0L7 9"
                ></path>
            </svg>
            </p>
            )
            break
        case 'Bio':
            icon = (
            <p className="text-indigo-600">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
            >
                <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M16.334 2C19.723 2 22 4.378 22 7.916v8.168C22 19.622 19.723 22 16.332 22H7.664C4.276 22 2 19.622 2 16.084V7.916C2 4.378 4.276 2 7.664 2h8.67zm0 1.5h-8.67C5.135 3.5 3.5 5.233 3.5 7.916v8.168c0 2.683 1.635 4.416 4.164 4.416h8.668c2.532 0 4.168-1.733 4.168-4.416V7.916c0-2.683-1.636-4.416-4.166-4.416zm-4.34 7.75a.75.75 0 01.75.75v4a.75.75 0 01-1.5 0v-4a.75.75 0 01.75-.75zm.005-4.046a1 1 0 110 2 1.003 1.003 0 01-1.005-1c0-.553.443-1 .995-1h.01z"
                    clipRule="evenodd"
                ></path>
            </svg>
        </p>
            )
            break
        case 'Username':
            icon = (
             <p className="text-green-500">
              <MdAlternateEmail size={23} />
            </p>)
            break

        default:
            break
    }
    return (
        <div className="info-box" onClick={()=>onCopy(des)}>
            {/* head */}
            <div className="flex  gap-x-3">
            {icon}
                <div className="flex flex-col gap-1">
               
                    <p className=" dark:text-gray-500 text-sm font-medium text-gray-700">
                        {title}
                    </p>
                    <p className={ ` text-gray-200 px-1.5 font-normal ${style&&style} text-gray-500 `}>{des}</p>
                </div>
            </div>
        </div>
    )
}

export default InfoBox
