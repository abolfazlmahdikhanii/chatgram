import React from "react";
import FileItem from "../FIleItem/FileItem";

const FileType = ({type, src, name, size}) => {
  let file = null;
  console.log(src)
  if (type == "video") {
    file = (
        <li className="w-full h-full overflow-hidden">
      <video className="w-full h-full object-cover">
        <source src={src} />
      </video>
      </li>
    );
  } else if (type == "img") {
    file = (
        <li className="w-full h-full overflow-hidden rounded-lg max-h-[190px] p-0.5 bg-gray-200/20">
            <img src={src} alt="" className="object-cover w-full h-full rounded-lg" />
        </li>
    );
  } else {
    file=(<FileItem
      name={name}
      type={name?.split(".").pop()}
      src={src}
      size={size}
      message={true}
    />)
  }
  return <>{file}</>;
};

export default FileType;
