import React, { useContext } from "react";
import { PiChecksBold } from "react-icons/pi";

import { PiCheck } from "react-icons/pi";
import Profile from "../Profile/Profile";
import NotifyNumber from "../UI/NotifyNumber/NotifyNumber";
import { Link } from "react-router-dom";
import MessageItemContent from "../MessageItemContent/MessageItemContent";
import { ChatContext } from "../../Context/ChatContext";

const MessageItem = ({ id, userName, profileImg, messages ,bgProfile,relation,isSave,onContext,messagesArr}) => {
console.log(messagesArr);
const {searchChat}=useContext(ChatContext)
  const formatTime = (date) => {
    return new Intl.DateTimeFormat("tr", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };
  let icon = null;

  if (messages[messages?.length - 1]?.read) {
    icon = <PiChecksBold size={18} color="#818cf8" />;
  } else if (messages[messages?.length - 1]?.send) {
    if (messages[messages.length - 1]?.read) {
      icon = <PiChecksBold size={18} color="#818cf8" />;
    } else if (messages[messages.length - 1]?.send) {
      icon = <PiCheck size={16} color="#9ca3af" />;
    }
  }

  const showSearchMessage=()=>{
    let dis=null
    messagesArr.forEach((item)=>{
     dis=item?.messages[item.messages.findIndex(item=>item.messageDis.includes(searchChat))]
   })
   console.log(dis);
   return dis
  }
  
  return (
    <Link to={`/chat/${id}`} className="message-item " onContextMenu={onContext}>
      <Profile size="m" path={profileImg} userName={userName} bgProfile={bgProfile} relation={relation} isSave={isSave}/>

      <div className="w-full flex-col gap-2 flex">
        {/* top */}
        <div className="flex items-center justify-between w-full">
          <p className="font-semibold  dark:text-white capitalize text-[17px] text-gray-800" >
            {userName}
          </p>
          <p className="text-[11px] dark:text-gray-400 text-gray-600">
            { messages.length>0&&formatTime(messages[messages.length - 1]?.date)}
          </p>
        </div>
        {/* bottom */}
          {
            messages.length>0?
            <div className="flex items-center justify-between w-full" >
              <MessageItemContent message={messagesArr?.length&&showSearchMessage()?showSearchMessage():messages[messages.length - 1]}/>
          <p>{icon}</p>
            {/* <NotifyNumber /> */}
          </div>:
          <p className="-mt-1 text-sm font-normal dark:text-gray-400 text-gray-500">{relation==="me"?"online":"last seen recently"}</p>
          }
      </div>
    </Link>
  );
};

export default MessageItem;
