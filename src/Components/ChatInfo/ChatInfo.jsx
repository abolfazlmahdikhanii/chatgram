import React from 'react'
import Box from '../UI/Box/Box'
import Profile from '../Profile/Profile'
import { IoCallSharp } from 'react-icons/io5'
import { MdAlternateEmail } from "react-icons/md";

const ChatInfo = ({ info }) => {
    return (
        <Box style="w-full transition-all duration-200 overflow-y-scroll h-[89%] n-scroll">
            <div className="mt-14  flex flex-col gap-5 items-center justify-center ">
                <div className=" flex items-center justify-center">
                    <Profile
                        path={info?.profileImg}
                        userName={info?.userName}
                        bgProfile={info?.bgProfile}
                        relation={info?.relation}
                        isSave={info?.relation === 'me' ? true : false}
                        size="lg"
                    />
                </div>
                <div className="space-y-1.5">
                    <p className="text-3xl text-gray-50 font-semibold truncate">
                        {info?.userName}
                    </p>
                    <p className="text-center text-sm text-indigo-400">
                        Online{' '}
                    </p>
                </div>
                {/* btn */}
                <div className="px-3 flex items-center gap-4 w-full justify-center">
                    <button className=" bg-green-500 text-white btn  rounded-[15px] hover:bg-green-600   pr-8 min-h-[3.3rem]">
                        <IoCallSharp size={24} />
                        <p className="text-base capitalize font-semibold">
                            Call
                        </p>
                    </button>
                    <button className=" bg-indigo-600 text-white btn  rounded-[15px] hover:bg-indigo-700   pr-8 gap-2.5 min-h-[3.3rem]">
                        <svg
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M12.53 20.42H6.21c-3.16 0-4.21-2.1-4.21-4.21V7.79c0-3.16 1.05-4.21 4.21-4.21h6.32c3.16 0 4.21 1.05 4.21 4.21v8.42c0 3.16-1.06 4.21-4.21 4.21z"
                                stroke="currentColor"
                                strokeWidth={1.5}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M19.52 17.1l-2.78-1.95V8.84l2.78-1.95c1.36-.95 2.48-.37 2.48 1.3v7.62c0 1.67-1.12 2.25-2.48 1.29zM11.5 11a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
                                stroke="currentColor"
                                strokeWidth={1.5}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <p className="text-base capitalize font-semibold">
                            Video Chat
                        </p>
                    </button>
                </div>
            </div>

{/* info */}
            <div className="mt-7 px-2.5 space-y-3">
                {/* item-1 */}
                <div className="info-box">
                    {/* head */}
                    <div className="flex  gap-x-3">
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
                        <div className="flex flex-col gap-1">
                            <p className=" text-gray-500 text-sm font-medium">Email</p>
                            <p className="  text-gray-50 px-1.5 font-normal">ab@example.com</p>
                        </div>
                    </div>
                </div>
                {/* item-2 */}
                <div className="info-box">
                    {/* head */}
                    <div className="flex  gap-x-3">
                        <p className="text-green-500">
                            <MdAlternateEmail size={23}/>
                        </p>
                        <div className="flex flex-col gap-1">
                            <p className=" text-gray-500 text-sm font-medium">Username</p>
                            <p className="line-clamp-3  text-gray-50 px-1.5 font-normal">abmk</p>
                        </div>
                    </div>
                </div>
                {/* item-3 */}
                <div className="info-box">
                    {/* head */}
                    <div className="flex  gap-x-3">
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
                        <div className="flex flex-col gap-1">
                            <p className=" text-gray-500 text-sm font-medium">Bio</p>
                            <p className="line-clamp-3  text-gray-50 px-1.5 font-normal">
                                Lorem, ipsum dolor sit amet consectetur
                                adipisicing elit. Aliquam suscipit similique eos
                                sit voluptates atque eum harum ad minus commodi
                                recusandae rerum soluta reprehenderit
                                dignissimos repellat, placeat in nemo rem?
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* media */}
            <div>
              
            </div>
        </Box>
    )
}

export default ChatInfo
