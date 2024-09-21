import React, { useContext, useState } from 'react'
import SettingContainer from './SettingContainer'
import { ChatContext } from '../../Context/ChatContext'

const GeneralSetting = ({ close }) => {
  const images = [
    {
      id: crypto.randomUUID(),
      src: '../../../src/assets/images/chat-bg/bg-1.jpg',
    },
    {
      id: crypto.randomUUID(),
      src: '../../../src/assets/images/chat-bg/bg-2.webp',
    },
    {
      id: crypto.randomUUID(),
      src: '../../../src/assets/images/chat-bg/bg-3.webp',
    },
    {
      id: crypto.randomUUID(),
      src: '../../../src/assets/images/chat-bg/bg-4.webp',
    },
    {
      id: crypto.randomUUID(),
      src: '../../../src/assets/images/chat-bg/bg-5.jpg',
    },
    {
      id: crypto.randomUUID(),
      src: '../../../src/assets/images/chat-bg/bg-6.jpg',
    },
    {
      id: crypto.randomUUID(),
      src: '../../../src/assets/images/chat-bg/bg-7.jpg',
    },
    {
      id: crypto.randomUUID(),
      src: '../../../src/assets/images/chat-bg/bg-8.jpg',
    },
    {
      id: crypto.randomUUID(),
      src: '../../../src/assets/images/chat-bg/bg-9.jpg',
    },
    {
      id: crypto.randomUUID(),
      src: '../../../src/assets/images/chat-bg/bg-10.jpg',
    },
    {
      id: crypto.randomUUID(),
      src: '../../../src/assets/images/chat-bg/pattern-1.svg',
    },
    {
      id: crypto.randomUUID(),
      src: '../../../src/assets/images/chat-bg/pattern-10.svg',
    },
    {
      id: crypto.randomUUID(),
      src: '../../../src/assets/images/chat-bg/pattern-12.svg',
    },
    {
      id: crypto.randomUUID(),
      src: '../../../src/assets/images/chat-bg/pattern-15.svg',
    },
    {
      id: crypto.randomUUID(),
      src: '../../../src/assets/images/chat-bg/pattern-27.svg',
    },
    {
      id: crypto.randomUUID(),
      src: '../../../src/assets/images/chat-bg/pattern-28.svg',
    },
    {
      id: crypto.randomUUID(),
      src: '../../../src/assets/images/chat-bg/pattern-29.svg',
    },
    {
      id: crypto.randomUUID(),
      src: '../../../src/assets/images/chat-bg/pattern-32.svg',
    },
    {
      id: crypto.randomUUID(),
      src: '../../../src/assets/images/chat-bg/pattern-9.svg',
    },
  ]
  const { font, setFont, setChatBg, chatBg } = useContext(ChatContext)

  const isSelectdImage=(img)=>{
    const splitImg=img.split('/')
    const splitbg=chatBg.split('/')

    return  splitImg[splitImg.length-1]==splitbg[splitbg.length-1]
  }
  return (
    <SettingContainer title="General" onBack={close}>
      <div className="px-4 py-2">
        <p className="text-[#8774E1] text-[17px] font-semibold">Setting</p>
        <div className="px-1 py-6">
          <div className="flex items-center justify-between">
            <p className="text-white  font-semibold">Message Text Size</p>
            <p>{font}</p>
          </div>
          <input
            type="range"
            step="1"
            min="12"
            max="22"
            value={font}
            className="range range-xs my-5 range-primary"
            onChange={(e) => setFont(e.target.value)}
          />
        </div>
        <p className="border-[7px] border-base-200 w-[150%] -mx-[30px]"></p>
        <p className="text-[#8774E1] text-[17px] font-semibold py-5">
          Chat Wallpaper
        </p>
        <div className="grid grid-cols-3 gap-x-3 my-2 gap-y-4 overflow-y-auto h-[360px] n-scroll scroll-smooth">
          {images.map((item,i) => (
            <label
              key={i+1}
              className={`w-full h-[125px] transition-all duration-200 cursor-pointer  rounded-lg overflow-hidden `}
            >
              <input type="radio" name="bg-check" className="peer hidden" />
              <img
                src={item.src}
                className={`w-full h-full object-cover rounded-lg border-2  peer-checked:border-indigo-700 bg-gray-300 ${
                  isSelectdImage(item.src) ? 'border-indigo-700' : ''
                } `}
                defaultChecked
                alt=""
                onClick={(e) => setChatBg(e.target.src)}
              />
            </label>
          ))}
        </div>
      </div>
    </SettingContainer>
  )
}

export default GeneralSetting
