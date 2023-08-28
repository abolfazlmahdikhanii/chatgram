import React from "react";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import Box from "../UI/Box/Box";
import Profile from "../Profile/Profile";

const ChatHeader = ({info}) => {
  return (
    <Box >
      <section className="px-5 flex items-center justify-between">
        <div className="flex gap-4">
          <Profile path={info?.profileImg}/>
          <div className="w-full flex-col   flex">
            <p className="font-semibold  text-white capitalize text-[17px]">
              {info?.userName}
            </p>
            <p className="text-gray-400 text-[11px] capitalize">Online</p>
          </div>
        </div>

        {/* right-side */}

        <div className="flex items-center gap-x-5">
          <p>
            <BiDotsHorizontalRounded size={20} color="#9ca3af" />
          </p>
          <p>
            <svg
              width={20}
              height={20}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 2H9C4 2 2 4 2 9v6c0 5 2 7 7 7h6c5 0 7-2 7-7V9c0-5-2-7-7-7zM15 22V2"
                stroke="#9ca3af"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </p>
        </div>
      </section>
    </Box>
  );
};

export default ChatHeader;
