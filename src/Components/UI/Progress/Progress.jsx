import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

const Progress = ({ size,onRemove }) => {
  const [progress, setProgress] = useState(0);
  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setProgress(progress+ 1);
   
  //   }, 1000);
  //   return () => {
  //     if (progress == 100) {
  //       clearInterval(timer);
    
       
  //     }
  //   };
  // }, []);

 
  return (
    <div
      className={`radial-progress absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-base-100/40 border-[6px] border-transparent cursor-pointer z-10 ${size===100?'hidden':''}`}
      style={{ "--value": size, "--size": "3rem", "--thickness": "2px" }}
      onClick={onRemove}
    >
      <button className="cursor-pointer">
        <AiOutlineClose size={22} color="#fff" />
      </button>
    </div>
  );
};

export default Progress;
