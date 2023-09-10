import React from "react";
import { FcDocument } from "react-icons/fc";
const MessageItemContent = ({ message }) => {
  const isArrMessage = typeof message?.messageDis instanceof Array;
  const content = isArrMessage
    ? message?.messageDis[messageDis.length - 1]
    : message?.messageDis;
  const newMessage = content ? content[content?.length - 1] : content;
  let messageContent = null;
  if (newMessage?.type === "img") {
    messageContent = <ImgContent img={newMessage} />;
  } else if (newMessage?.type === "video") {
    messageContent = <VideoContent video={newMessage} />;
  } else {
    messageContent = <FileContent file={newMessage} />;
  }

  return (
    <>
      {typeof message?.messageDis === "string" || !message?.messageDis ? (
        <TextContent txt={message?.messageDis} />
      ) : (
        <div className="flex items-center gap-2">{messageContent}</div>
      )}
    </>
  );
};
const TextContent = ({ txt }) => {
  return (
    <p
      className="text-gray-400 text-[13px] truncate max-w-[140px]"
      dangerouslySetInnerHTML={{
        __html: txt,
      }}
    ></p>
  );
};

const ImgContent = ({ img }) => {
  return (
    <>
      <img className="w-4 h-4 rounded object-cover" src={img?.src} alt="" />
      <p className="text-sm">Album</p>
    </>
  );
};
const VideoContent = ({ video }) => {
  return (
    <>
      <video className="w-4 h-4 object-cover rounded">
        <source src={video?.src} />
      </video>
      <p className="text-sm">Album</p>
    </>
  );
};
const FileContent = ({ file }) => {
  return (
    <>
      <p>
        <FcDocument />
      </p>
      <p className="text-xs w-[100px] truncate">{file?.name}</p>
    </>
  );
};

export default MessageItemContent;