import React from 'react'
import { IoCopyOutline } from "react-icons/io5";
const CoustomToast = ({message}) => {
  return (
    <div className='flex items-center gap-3 -3xl  '>
    <p>
       <IoCopyOutline size={22}/>
    </p>
    <p>{message} copied to clipboard.</p>
   </div>
  )
}

export default CoustomToast