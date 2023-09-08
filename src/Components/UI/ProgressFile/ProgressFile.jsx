import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

const ProgressFile = ({ size,onRemove }) => {
  const [progress, setProgress] = useState(0);


 
  return (
    <div
      className={`radial-progress  rounded-lg self-end  bg-base-100/40 border-[4px] border-transparent cursor-pointer  ${size===100?'hidden':''}`}
      style={{ "--value": 70, "--size": "1rem", "--thickness": "2px" }}
      onClick={onRemove}
    >
      <button className="cursor-pointer">
        <AiOutlineClose size={10} color="#fff" />
      </button>
    </div>
  );
};

export default ProgressFile;
