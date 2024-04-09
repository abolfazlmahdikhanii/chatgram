import React, { useState } from 'react'
import SettingContainer from './SettingContainer'

const GeneralSetting = ({ close }) => {
  const [fontSize, setFontSize] = useState(16)
  return (
    <SettingContainer title="General" onBack={close}>
      <div className="px-4 py-2">
        <p className="text-[#8774E1] text-[17px] font-semibold">Setting</p>
        <div className="px-1 py-6">
          <div className="flex items-center justify-between">
            <p className="text-white  font-semibold">Message Text Size</p>
            <p>{fontSize}</p>
          </div>
          <input
            type="range"
            step="1"
            min="12"
            max="20"
            value={fontSize}
            className="range range-xs my-5 range-primary"
            onChange={(e) => setFontSize(e.target.value)}
          />
        </div>
        <p className='border-[7px] border-base-200 w-[150%] -mx-[30px]'></p>
        <p className="text-[#8774E1] text-[17px] font-semibold py-5">Chat Wallpaper</p>
        <div className='grid grid-cols-3 gap-x-3 my-2 gap-y-4'>
          <label  className='w-full h-[92px] transition-all duration-200 cursor-pointer'>
          <input type="radio"  name='bg-check' className='peer hidden' />
            <img src="../../../src/assets/images/chat-bg.jpg" className='w-full h-full object-cover rounded-lg peer-checked:border-2 peer-checked:border-indigo-700 ' defaultChecked alt="" />
             
          </label>
          <label  className='w-full h-[92px] transition-all duration-200 cursor-pointer'>
          <input type="radio"  name='bg-check' className='peer hidden' />
            <img src="../../../src/assets/images/chat-bg.jpg" className='w-full h-full object-cover rounded-lg peer-checked:border-2 peer-checked:border-indigo-700 ' defaultChecked alt="" />
             
          </label>
          <label  className='w-full h-[92px] transition-all duration-200 cursor-pointer'>
          <input type="radio"  name='bg-check' className='peer hidden' />
            <img src="../../../src/assets/images/chat-bg.jpg" className='w-full h-full object-cover rounded-lg peer-checked:border-2 peer-checked:border-indigo-700 ' defaultChecked alt="" />
             
          </label>
          <label  className='w-full h-[92px] transition-all duration-200 cursor-pointer'>
          <input type="radio"  name='bg-check' className='peer hidden' />
            <img src="../../../src/assets/images/chat-bg.jpg" className='w-full h-full object-cover rounded-lg peer-checked:border-2 peer-checked:border-indigo-700 ' defaultChecked alt="" />
             
          </label>
          <label  className='w-full h-[92px] transition-all duration-200 cursor-pointer'>
          <input type="radio"  name='bg-check' className='peer hidden' />
            <img src="../../../src/assets/images/chat-bg.jpg" className='w-full h-full object-cover rounded-lg peer-checked:border-2 peer-checked:border-indigo-700 ' defaultChecked alt="" />
             
          </label>
        </div>
      </div>
    </SettingContainer>
  )
}

export default GeneralSetting
