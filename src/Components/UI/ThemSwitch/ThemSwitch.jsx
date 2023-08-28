import React, { useState } from "react";
import {FiSun} from "react-icons/fi"
import {GoMoon} from "react-icons/go"

const ThemSwitch = () => {
  const [dark,setDark]=useState(true)
  return (
    <label className={`switch ${dark?'bg-gray-900 text-white':'bg-slate-100 text-gray-600'} `}>
      <input type="checkbox" className="hidden " onChange={()=>setDark((prev)=>!prev)}/>
  
      <span className={`switch__item ${!dark?'bg-slate-300':''}`}>
       <FiSun size={17} color="currentColor"/>
      </span>
      <span className={`switch__item ${dark?'bg-gray-800':''}`}>
       <GoMoon size={18} color="currentColor"/>
      </span>
    </label>
  );
};

export default ThemSwitch;
