import React, { useEffect, useState } from "react";
import { FcDocument } from "react-icons/fc";
import decodeMessage from "../../Utility/decodeMessage";
import { supabase } from "../../superbase";
const MessageItemContent = ({ message }) => {
  console.log(message);
  const isArrMessage = typeof message?.content instanceof Array;
  const content = isArrMessage
    ? message?.content[content.length - 1]
    : message?.content;
  const newMessage = content ? content[content?.length - 1] : content;
  let messageContent = null;
  if (message?.messageType === "img") {
    messageContent = <ImgContent img={decodeMessage(message.content)} />;
  } else if (message?.messageType === "video") {
    messageContent = <VideoContent video={decodeMessage(newMessage)} />;
  } else if(message?.messageType === "file") {
    messageContent = <FileContent file={decodeMessage(newMessage)}  />;
  }
  else if(message?.messageType === "mp3") {
      if(newMessage?.name!=="")messageContent = <FileContent file={newMessage}  />;
      else messageContent = <FileContent file={newMessage} title={"Audio"} />;
  }

  return (
    <>
      {message?.messageType === "text" || !decodeMessage(message?.content) ? (
        <TextContent txt={decodeMessage(message?.content)} />
      ) : (
        <div className="flex items-center gap-2" dir="auto">{messageContent}</div>
      )}
    </>
  );
};
const TextContent = ({ txt }) => {
  return (
    <p
      className="dark:text-gray-400 text-[13px] truncate max-w-[190px] w-full text-gray-500" dir="auto"
      dangerouslySetInnerHTML={{
        __html: txt,
      }}
    ></p>
  );
};

const ImgContent = ({ img }) => {
  const [url,setUrl]=useState('')

  useEffect(() => {
    if (img) downloadImage(img)
  }, [img])

  const downloadImage = async (path) => {
    try {
      const { data, error } =await supabase.storage
        .from('uploads')
        .createSignedUrl(path,120)
      if (error) throw error
console.log(data);
      
      setUrl(data.signedUrl)
      
    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <>
      <img className="w-4 h-4 rounded object-cover" src={url} alt="" />
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
const FileContent = ({ file,title }) => {
  return (
    <>
      <p>
        <FcDocument />
      </p>
      <p className="text-xs w-[100px] truncate">{file?.name?file?.name:title}</p>
    </>
  );
};

export default MessageItemContent;
