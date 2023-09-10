import React from "react";
import ProfileImage from "../ProfileImage/ProfileImage";
import FileType from "../FileType/FileType";
import FooterMessage from "../FooterMessage/FooterMessage";

const Message = ({ from, messageDis, date, read, send, userInfo,remove,onContext }) => {
  const formatTime = (date) => {
    return new Intl.DateTimeFormat("tr", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  



  return (
    <div
      className={`chat relative w-full ${ from === "user" ? "chat-end" : "chat-start"} `}
      onContextMenu={onContext}
    >
      <div className={`chat-bubble  ${ from === "user" ? "chat-bubble-primary" : "chat-bubble"}  ${messageDis[0]?.type === "file"||typeof messageDis==="string"?'max-w-[345px]':'max-w-[420px] px-1.5 py-1.5'} `}>
      {typeof messageDis === "string" ? (
        
          <div
            className=" "
            dangerouslySetInnerHTML={{ __html: messageDis }}
          ></div>
       
      ) : (
        <ul
          className={`${
            messageDis[0]?.type === "file" ? "grid-2" : "grid-1"
          }  `}
        >
          {messageDis?.map((content) => (
            <FileType key={content.id} {...content} onRemove={remove} from={from}/>
          ))}
        </ul>
      )}

      <FooterMessage message={messageDis[0]} date={formatTime(date)} read={read} send={send} />
      </div>

     
    </div>
  );
};

export default Message;

