import React, { useState } from "react";

const FileIcon = ({ type,path=null }) => {
  let color = null;
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
  return (
    <>
      {!imgFormarts.includes(type) ? (
        <div className={`file-icon ${color} `}>
          <p className="text-white font-bold text-lg">{type}</p>
        </div>
      ) : (
        <div className={`file-icon p-0 overflow-hidden   `}>
          <img src={path} alt="" className="w-full h-full object-cover rounded-lg" />
        </div>
      )}
    </>
  );
};

export default FileIcon;
