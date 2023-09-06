import React from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import FileIcon from "../UI/FIleIcon/FileIcon";

const FileItem = ({ type, src = null, name, size }) => {
  const formatSize=(bytes)=>{
if(bytes == 0) return '0 Bytes';
   var k = 1024,
       
       sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
       i = Math.floor(Math.log(bytes) / Math.log(k));
   return parseFloat((bytes / Math.pow(k, i)).toFixed()) + ' ' + sizes[i];
  }
  return (
    <li className="file-item w-full">
      <div>
        <FileIcon type={type} path={src ? src : ""} />
      </div>
      <div className="flex flex-col gap-1 max-w-[300px]">
        <p className="text-lg text-white font-semibold truncate w-full ">
          {name}
        </p>
        <p className="">{formatSize(size)}</p>
      </div>
      <div className="self-center  w-full flex justify-end">
        <button className="btn btn-square btn-sm ">
          <MdOutlineDeleteOutline size={21} />
        </button>
      </div>
    </li>
  );
};

export default FileItem;
