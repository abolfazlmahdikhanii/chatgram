import React, { useState,useRef, useContext } from "react";
import { UserContext } from "../../../Context/UserContext";

const FileIcon = ({ type,path=null,message=false,from,isColor,isFile,onContext }) => {
const {user}=useContext(UserContext)

  let color = null;
  let fileColor=null;






  const imgFormarts = ["svg", "jpg", "png", "jpeg", "webp", "gif"];
  switch (type) {
    case "pdf":
      color = "bg-red-500";
      break;
    case "zip":
      color = "bg-amber-500";
      break;
    case "xlsx":
      color = "bg-green-500";
      break;
    case "doc":
    case "docx":
      color = "bg-blue-500";
      break;

    default:
      color = "bg-indigo-500";
      break;
  }
  if(from===user.userid||isColor){
  fileColor="file-icon--2"
  }
  else if(from!==user.userid){
    fileColor="file-icon--3"
  }
  else{
    fileColor=""
  }




  return (
    <>
      {!imgFormarts.includes(type)? (
        <div className={`file-icon ${fileColor} ${color} `} onContextMenu={!isFile?onContext:false}>
          <p className="text-white font-bold text-lg truncate">{type}</p>
        </div>
      ) : (
        <div className={`file-icon  ${fileColor} p-0 overflow-hidden   `} onContextMenu={!isFile?onContext:false}>
          <img src={path} alt="" className="w-full h-full object-cover rounded-lg dark:bg-white bg-gray-300" />
        </div>
      )}
    </>
  );
};

export default FileIcon;
