import React from 'react'
import { BiCheckDouble } from "react-icons/bi";
import { BiCheck } from "react-icons/bi";
import { BsFillPinAngleFill } from "react-icons/bs";
import { Watch } from "react-loader-spinner";
const FooterMessage = ({message,date,read,send,edited,pin,reaction}) => {
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

  return (
    <>
      {message?.type === "file"||message?.type === "mp3" || typeof message === "string"||reaction||message?.caption ? (
        <div className=" flex items-center gap-1 mt-1 px-3 justify-end chat-footer -mr-4">
          <p className="text-gray-500 text-[12px] mr-1.5">{pin?<BsFillPinAngleFill size={12}/>:''}</p>
          <p className="text-gray-400 text-[12px] mr-0.5 italic">{edited?'edited':''}</p>
          <p className="text-gray-400 text-[10px]">{date}</p>
        
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