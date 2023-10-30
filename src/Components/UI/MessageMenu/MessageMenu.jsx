import React, { useState } from "react";
import { BsPin } from "react-icons/bs";
import { FiEdit3 } from "react-icons/fi";

import { MdDeleteOutline } from "react-icons/md";
import { TbSquareRoundedCheck } from "react-icons/tb";
import ReactionEmoji from "../ReactionEmoji/ReactionEmoji";

const MessageMenu = ({ show, setClose, pageX, pageY,onRemove,messageID,onSelect,onEdit,onPin,onReply }) => {
  const [emoji, setEmoji] = useState([
    {
      id: crypto.randomUUID(),
      emojiName: "1f602",
      alt: "😂",
    },
    {
      id: crypto.randomUUID(),
      emojiName: "1f62d",
      alt: "😭",
    },
    {
      id: crypto.randomUUID(),
      emojiName: "1f614",
      alt: "😌",
    },
    {
      id: crypto.randomUUID(),
      emojiName: "1f621",
      alt: "😡",
    },
    {
      id: crypto.randomUUID(),
      emojiName: "1f525",
      alt: "🔥",
    },
    {
      id: crypto.randomUUID(),
      emojiName: "2764_fe0f",
      alt: "❤",
    },
  ]);
  const selectItems = [
    {
      id: crypto.randomUUID(),
      icon: 
      <svg
      xmlns="http://www.w3.org/2000/svg"
      width={19}
      height={19}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="currentColor"
        d="M3.34 8.898L9.874 3.09a.38.38 0 01.625.284v3.312H11.5c5.088 0 9.5 2.917 9.5 7.186a8.551 8.551 0 01-4.703 7.084.367.367 0 01-.173.044h-.009a.388.388 0 01-.379-.379.373.373 0 01.158-.306 5.508 5.508 0 001.357-3.07c0-2.817-3.241-4.5-6.376-4.5-.09 0-.178 0-.265-.006h-.11v2.633a.38.38 0 01-.625.284l-6.751-6a.379.379 0 01-.092-.434c.022-.048.269-.288.308-.324z"
        strokeWidth={1.5}
      />
    </svg>
      ,
      title: "Reply",
      event:()=>onReply(messageID)
    },
    {
      id: crypto.randomUUID(),
      icon: 
      <svg
      width={19}
      height={19}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.26 3.6l-8.21 8.69c-.31.33-.61.98-.67 1.43l-.37 3.24c-.13 1.17.71 1.97 1.87 1.77l3.22-.55c.45-.08 1.08-.41 1.39-.75l8.21-8.69c1.42-1.5 2.06-3.21-.15-5.3-2.2-2.07-3.87-1.34-5.29.16zM11.89 5.05a6.126 6.126 0 005.45 5.15M3 22h18"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
      ,
      title: "Edit",
      event:()=>onEdit(messageID)
    },
    {
      id: crypto.randomUUID(),
      icon: <BsPin size={17} className="self-start mr-1.5" />,
      title: "Pin",
      event:()=>onPin(messageID)
    },
    {
      id: crypto.randomUUID(),
      icon: 
      <svg
      width={19}
      height={19}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 22h6c5 0 7-2 7-7V9c0-5-2-7-7-7H9C4 2 2 4 2 9v6c0 5 2 7 7 7z"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.74 15.53L14.26 12l-3.52-3.53"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
      ,
      title: "Forward",
      styleTitle:'ml-1'
    },

    {
      id: crypto.randomUUID(),
      icon: (
        <TbSquareRoundedCheck
          size={21}
          strokeWidth={1.5}
          className="self-start mr-1"
        />
      ),
      title: "Select",
      event:()=>onSelect(messageID)
    },
    {
      id: crypto.randomUUID(),
      style:'text-red-500 hover:bg-red-400/20',
      icon: 
      <svg
            width={18}
            height={18}
            viewBox="0 0 19 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.459 7.012c.199 0 .38.087.523.234.133.157.2.352.18.558 0 .068-.532 6.808-.837 9.645-.19 1.741-1.313 2.798-2.996 2.827-1.295.029-2.56.039-3.806.039-1.322 0-2.616-.01-3.871-.04-1.627-.038-2.75-1.114-2.932-2.826-.313-2.847-.836-9.577-.846-9.645a.79.79 0 01.19-.558.706.706 0 01.524-.234h13.87zM11.584.315c.884 0 1.674.617 1.903 1.497l.163.73a1.28 1.28 0 001.24 1.016h2.917c.389 0 .713.323.713.734v.38a.73.73 0 01-.713.734H1.233a.73.73 0 01-.713-.734v-.38c0-.411.323-.734.713-.734H4.15c.592 0 1.108-.421 1.241-1.015l.153-.682C5.78.93 6.56.315 7.455.315h4.13z"
              stroke="currentColor"
              strokeWidth={1.5}
            />
          </svg>
      ,
      title: "Delete",
      styleTitle:'ml-1',
      event:()=>onRemove(messageID)
    },
  ];
  return (
    <div
      className={`transition-all duration-200 z-20 ${
        show
          ? "[scale-z:1] scale-100 opacity-100 "
          : "[scale-z:0] scale-0 opacity-0"
      } fixed `}
      style={{ left: `${pageX}px`, top: `${pageY}px` }}
      onMouseLeave={() => setClose(false)}
    >
      <div
        className={`menu bg-[rgba(33,33,33,.75)] backdrop-blur-[50px] rounded-xl gap-1.5 w-[190px]`}
      >
      {
        selectItems.map((item)=>(
          <label key={item.id} className={`select-box--item ${item.style?item.style:''}`} onClick={item?.event}>
          {/* icon */}
          {item.icon}
          <p className={`font-[700] text-[14px] ${item.styleTitle?item.styleTitle:''}` }>{item.title}</p>
        </label>
        ))
      }
      
      </div>

      {/* emoji */}
      <div
        className=" bg-[rgba(33,33,33,.75)]  backdrop-blur-[40px]   rounded-xl 
      gap-2.5  w-[190px]   flex items-center mt-1 p-3"
      >
        {emoji.map((item) => (
         <ReactionEmoji key={item.id} {...item}/>
        ))}
      </div>
    </div>
  );
};

export default MessageMenu;
