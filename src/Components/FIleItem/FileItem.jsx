import React from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import FileIcon from "../UI/FIleIcon/FileIcon";
import ProgressFile from "../UI/ProgressFile/ProgressFile";

const FileItem = ({
  type,
  src = null,
  name,
  size,
  onRemove,
  message = false,
  from,
}) => {
  const formatSize = (bytes) => {
    if (bytes == 0) return "0 Bytes";
    var k = 1024,
      sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
      i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed()) + " " + sizes[i];
  };
  return (
    <>
     {
      !message?(
        <DefaultFile
         type={type}
         src={src}
         message={message}
         from={from}
         size={size}
         name={name}
         onRemove={onRemove}
         formatSize={formatSize}
        />
      ):
      (
        <MessageFile
         type={type}
         src={src}
         message={message}
         from={from}
         size={size}
         name={name}
         formatSize={formatSize}
        />
      )
     }
    </>
  );
};
const DefaultFile=({type,src,message,from,size,name,onRemove,formatSize})=>{
  return(
    <li
    className={`file-item relative  w-full px-3`}
  >
    <div>
      <FileIcon
        type={type}
        path={src ? src : ""}
        message={message}
        from={from}
      />
    </div>
    <div className="flex flex-col gap-2 max-w-[200px]">
      <p
        className={`text-lg text-white font-semibold truncate w-full `}
      >
        {name}
      </p>
      <p >{formatSize(size)}</p>
     
    </div>
  
      <div className="self-center  w-full flex justify-end">
        <button className="btn btn-square btn-sm " onClick={onRemove}>
          <MdOutlineDeleteOutline size={21} />
        </button>
      </div>
    
  </li>
  )
}
const MessageFile=({type,src,message,from,size,name,formatSize})=>{
  return(
  <li
  className={`file-item relative  w-full hover:bg-transparent`}
>
  <div>
    <FileIcon
      type={type}
      path={src ? src : ""}
      message={message}
      from={from}
    />
  </div>
  <div className="flex flex-col gap-2 max-w-[200px]">
    <p
      className={`text-sm text-white font-semibold truncate w-full `}
    >
      {name}
    </p>
    <p className={`text-xs`}>{formatSize(size)}</p>
    <ProgressFile />
  </div>
 
</li>
  )
}
export default FileItem;
