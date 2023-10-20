import React, { useState } from "react";
import FileItem from "../FIleItem/FileItem";
import Progress from "../UI/Progress/Progress";
import AudioFile from "../AudioFIle/AudioFile";

const FileType = ({ type, src, name, size,progress,onRemove,id,from }) => {

 

console.log(id)
  let file = null;

  if (type == "video") {
    file = (
      <li className="w-full h-full overflow-hidden  rounded-xl flex-auto relative">
            <Progress size={progress} onRemove={()=>onRemove(id)}/>
        <video className="w-full h-full object-cover" autoPlay loop disablePictureInPicture playsInline>
          <source src={src} />
        </video>
      </li>
    );
  } 
  else if (type == "mp3") {
    file = (
      <AudioFile path={src} size={size} name={name} onRemove={()=>onRemove(id)} />
    );
  } 
  else if (type == "img") {
    file = (
      <li className=" h-[210px] overflow-hidden inline-block rounded-xl basis-[40%]  bg-gray-200/20 flex-grow flex-1 relative">
        <Progress size={progress} onRemove={()=>onRemove(id)}/>
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
        onRemove={()=>onRemove(id)}
      />
    );
  }
  return <>{file}</>;
};

export default FileType;
