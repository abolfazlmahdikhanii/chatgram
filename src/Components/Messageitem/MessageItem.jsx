import React from "react";
import { PiChecksBold } from "react-icons/pi";
import Profile from "../Profile/Profile";

const MessageItem = () => {
  return (
    <li className="flex  p-2.5 w-full gap-5 transition-all duration-300 hover:bg-indigo-200/20 rounded-lg cursor-pointer ">
      <Profile size="m" />

      <div className="w-full flex-col gap-1 flex">
        {/* top */}
        <div className="flex items-center justify-between w-full">
          <p className="font-semibold  text-white capitalize text-[17px]">
            User
          </p>
          <p className="text-[11px] text-gray-400">12:23</p>
        </div>
        {/* bottom */}
        <div className="flex items-center justify-between w-full">
          <p className="text-gray-400 text-[13px] truncate max-w-[180px]">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi ex
            nihil deserunt consequuntur maxime quia ipsam praesentium labore
            amet. Sit consequuntur magni minima est culpa. Quia aperiam facilis
            repellat distinctio?
          </p>
          {/* <p>
          <PiChecksBold size={19} color="#818cf8"/>
        </p> */}
          <p className="px-2 min-h-[20px] min-w-[20px] rounded-full bg-indigo-600 text-indigo-200  text-xs flex items-center justify-center z-10">
            91
          </p>
        </div>
      </div>
    </li>
  );
};

export default MessageItem;
