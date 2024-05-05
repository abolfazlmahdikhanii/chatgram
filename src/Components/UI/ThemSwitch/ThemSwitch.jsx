import React, { useState } from "react";
import {FiSun} from "react-icons/fi"
import {GoMoon} from "react-icons/go"
import useChangeThem from "../../../CustomHooks/useChangeThem";

const ThemSwitch = () => {
  const [dark,setDark]=useState(true)
  const [them,setThem]=useChangeThem('')
  return (
    <label className={`switch dark:bg-gray-900 dark:text-white bg-slate-100 text-gray-600 `}>
      <input type="checkbox" className="hidden " onChange={()=>setThem((prev)=>prev==='dark'?'light':'dark')}/>
  
      <span className={`switch__item bg-slate-300 dark:bg-gray-900`}>
       <FiSun size={17} color="currentColor"/>
      </span>
      <span className={`switch__item dark:bg-gray-800 bg-slate-100`}>
       <GoMoon size={18} color="currentColor"/>
      </span>
    </label>
  );
};

export default ThemSwitch;
