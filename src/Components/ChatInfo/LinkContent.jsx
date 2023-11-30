import React from 'react'
import { FiLink } from "react-icons/fi";

const LinkContent = ({link}) => {
  return (
    <li  className='flex gap-2.5 items-center transition-all py-2.5 px-3 rounded-xl duration-200 hover:bg-gray-700/30 cursor-pointer'>
        <div data-color='violet' className=' h-[70px] mask mask-squircle bg-primary w-[70px] grid place-items-center '>
          <FiLink size={25} color='#fff'/>
        </div>
        <div className='max-w-[70%] space-y-1.5'>
            <p className='text-sm truncate text-gray-50'>www.aparat.com</p>
            <a href={link} target='_blank' rel='noreferrer noopener' className='truncate text-sm text-indigo-400 max-w-[90%] line-clamp-1 block'>{link}</a>
        </div>
    </li>
  )
}

export default LinkContent 