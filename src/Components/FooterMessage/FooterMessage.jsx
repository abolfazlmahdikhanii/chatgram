import React from 'react'
import { BiCheckDouble } from "react-icons/bi";
import { BiCheck } from "react-icons/bi";
import { BsFillPinAngleFill } from "react-icons/bs";
import { Watch } from "react-loader-spinner";
const FooterMessage = ({message,date,status,edited,pin,reaction,messageType,caption}) => {
  let icon = null;
  if (status==='read') {
    icon = <BiCheckDouble size={14} color="" />;
  } else if (status==='send') {
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

  return (
    <>
      {messageType === "file"||messageType === "mp3"|| messageType == 'audio/webm' || messageType === "text"||reaction||caption ? (
        <div className=" flex items-center gap-1 mt-1 px-3 justify-end chat-footer -mr-4">
          <p className="dark:text-gray-500 text-gray-400 text-[12px] mr-1.5">{pin?<BsFillPinAngleFill size={12}/>:''}</p>
          <p className="dark:text-gray-400 text-gray-300 text-[12px] mr-0.5 italic">{edited?'edited':''}</p>
          <p className="dark:text-gray-400 text-gray-300 text-[10px]">{date}</p>
        
          {icon}
        </div>
      ) : (
        <div className={` flex items-center gap-1  px-1.5 absolute ${!reaction?"bottom-2":"bottom-[21%]"} bottom-2 right-4 bg-gray-700/60 rounded-lg py-[1px] mt-2`}>
          <p className="text-gray-200 text-[10px] font-sans">{date}</p>
        
          {icon}
        </div>
      )}
    </>
  )
}

export default FooterMessage