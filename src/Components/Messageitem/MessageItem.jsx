import React from "react";
import { PiChecksBold } from "react-icons/pi";
import Profile from "../Profile/Profile";
import NotifyNumber from "../UI/NotifyNumber/NotifyNumber";
import { Link } from "react-router-dom";

const MessageItem = ({ id, userName, profileImg, messages }) => {
  const formatTime = (date) => {
    return new Intl.DateTimeFormat("tr", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };
  return (
    <Link to={`/chat/${id}`} className="message-item ">
      <Profile size="m" path={profileImg} />

      <div className="w-full flex-col gap-1 flex">
        {/* top */}
        <div className="flex items-center justify-between w-full">
          <p className="font-semibold  text-white capitalize text-[17px]">
            {userName}
          </p>
          <p className="text-[11px] text-gray-400">
            {formatTime(messages[messages.length - 1].date)}
          </p>
        </div>
        {/* bottom */}
        <div className="flex items-center justify-between w-full">
          <p className="text-gray-400 text-[13px] truncate max-w-[140px]">
            {messages[messages.length - 1].messageDis}
          </p>
          <p>
          <PiChecksBold size={19} color="#818cf8"/>
        </p>
          {/* <NotifyNumber /> */}
        </div>
      </div>
    </Link>
  );
};

export default MessageItem;
