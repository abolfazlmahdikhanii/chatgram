import React from "react";
import { PiChecksBold } from "react-icons/pi";
import { PiCheck } from "react-icons/pi";
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
  let icon = null;

  if (messages[messages.length - 1]?.read) {
    icon = <PiChecksBold size={18} color="#818cf8" />;
  } else if (messages[messages.length - 1]?.send) {
    if (messages[messages.length - 1]?.read) {
      icon = <PiChecksBold size={18} color="#818cf8" />;
    } else if (messages[messages.length - 1]?.send) {
      icon = <PiCheck size={16} color="#9ca3af" />;
    }
  }
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
            {formatTime(messages[messages.length - 1]?.date)}
          </p>
        </div>
        {/* bottom */}
        <div className="flex items-center justify-between w-full">
          <p
            className="text-gray-400 text-[13px] truncate max-w-[140px]"
            dangerouslySetInnerHTML={{
              __html: messages[messages.length - 1]?.messageDis,
            }}
          ></p>
          <p>{icon}</p>
          {/* <NotifyNumber /> */}
        </div>
      </div>
    </Link>
  );
};

export default MessageItem;
