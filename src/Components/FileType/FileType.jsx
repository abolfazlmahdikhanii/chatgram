import React, { useState } from "react";
import FileItem from "../FIleItem/FileItem";
import Progress from "../UI/Progress/Progress";
import AudioFile from "../AudioFIle/AudioFile";

const FileType = ({ type, src, name, size,progress,onRemove,id,from,contextMenu,idType,messageId,isColor }) => {

 

 
  let file = null;

  if (type == "video") {
    file = (
      <li className="w-full h-full overflow-hidden  rounded-xl flex-auto relative" onContextMenu={(e)=>contextMenu(e,messageId,idType)}>
            <Progress size={progress} onRemove={()=>onRemove(messageId,idType)}/>
        <video className="w-full h-full object-cover" autoPlay loop disablePictureInPicture playsInline muted>
          <source src={src} />
        </video>
      </li>
    );
  } 
  else if (type == "mp3") {
    file = (
      <AudioFile path={src} size={size} name={name} onRemove={()=>onRemove(messageId,idType)} isColor={isColor}/>
    );
  } 
  else if (type == "img") {
    file = (
      <li className=" h-[210px] overflow-hidden inline-block rounded-xl basis-[40%]  bg-gray-200/20 flex-grow flex-1 relative" onContextMenu={(e)=>contextMenu(e,messageId,idType)}>
        <Progress size={progress} onRemove={()=>onRemove(messageId,idType)}/>
        <img
          src={src}
          alt=""
          className="object-cover w-full h-full rounded-xl "
        />
      </li>
    );
  } 
  
  
  
  else {
    file = (
      <FileItem
        name={name}
        type={name?.split(".").pop()}
        src={src}
        size={size}
        message={true}
        from={from}
        onRemove={()=>onRemove(messageId,idType)}
        onContext={(e)=>contextMenu(e,messageId,idType)}
        isColor={isColor}
      />
    );
  }
  return <>{file}</>;
};

export default FileType;
