import React from "react";
<<<<<<< HEAD
=======

>>>>>>> 08ac426 (add emoji)
import { BiCheckDouble } from "react-icons/bi";
import { BiCheck } from "react-icons/bi";
import { Watch } from "react-loader-spinner";
import ProfileImage from "../ProfileImage/ProfileImage";
const Message = ({ from, messageDis, date,read,send, userInfo }) => {
<<<<<<< HEAD
=======



>>>>>>> 08ac426 (add emoji)
  const formatTime = (date) => {
    return new Intl.DateTimeFormat("tr", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  let icon = null;
  if (read) {
    icon = <BiCheckDouble size={14} color="" />;
  } else if (send) {
    icon = <BiCheck size={14} color="" />;
  } else {
    icon = (
      <Watch
        height="10"
        width="10"
        radius="48"
        color="#ffff"
        ariaLabel="watch-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    );
  }

<<<<<<< HEAD
=======
  

>>>>>>> 08ac426 (add emoji)
  return (
    <div
      className={`message ${
        from === "user" ? "message--user" : "message--client"
      }`}
    >
<<<<<<< HEAD
      <div className="pt-2 pb-1 px-1.5">{messageDis}</div>
=======
      <div className="pt-2 pb-1 px-1.5" dangerouslySetInnerHTML={{__html:messageDis}}></div>
>>>>>>> 08ac426 (add emoji)
      <div className=" flex items-center gap-1.5 mb-0.5 px-1">
        <p className="text-gray-400 text-[10px]">{formatTime(date)}</p>

    
        {icon}
      </div>
    </div>
  );
};

export default Message;
