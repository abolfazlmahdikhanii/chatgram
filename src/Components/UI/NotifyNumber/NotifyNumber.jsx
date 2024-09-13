import React from "react";

const NotifyNumber = ({unread}) => {
  return (
    <p className="px-2 h-[20px]  rounded-full bg-indigo-600 text-indigo-200  text-xs flex items-center justify-center z-10">
      {unread}
    </p>
  );
};

export default NotifyNumber;
