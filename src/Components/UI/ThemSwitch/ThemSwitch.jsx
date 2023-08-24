import React, { useState } from "react";
import {FiSun} from "react-icons/fi"
import {GoMoon} from "react-icons/go"

const ThemSwitch = () => {
  const [dark,setDark]=useState(true)
  return (
    <label className={`inline-flex flex-col  p-[5px] h-[90px]  ${dark?'bg-gray-900 text-white':'bg-slate-100 text-gray-600'} rounded-2xl justify-between items-center transition-all duration-300 `}>
      <input type="checkbox" className="hidden " onChange={()=>setDark((prev)=>!prev)}/>
  
      <span className={`rounded-xl  p-2.5 ${!dark?'bg-slate-300':''}`}>
       <FiSun size={17} color="currentColor"/>
      </span>
      <span className={`rounded-xl  p-2.5 ${dark?'bg-gray-800':''}`}>
       <GoMoon size={18} color="currentColor"/>
      </span>
    </label>
  );
};

export default ThemSwitch;
