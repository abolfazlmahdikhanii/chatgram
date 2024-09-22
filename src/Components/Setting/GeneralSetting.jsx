import React, { useContext, useState } from 'react'
import SettingContainer from './SettingContainer'
import { supabase } from '../../superbase'
import { UserContext } from '../../Context/UserContext'

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

  const {user,font, setFont, setChatBg, chatBg}=useContext(UserContext)
  const [isLoading, setIsLoading] = useState(false)
  const [isChange, setIsChange] = useState(false)
  const saveToStorage=(bg,font)=>{
    const getStroage=localStorage.getItem('profile')?JSON.parse(localStorage.getItem('profile')):[]

    getStroage.chatBg=bg
    getStroage.font=font
    // Object.assign(getStroage,{chatBg:bg,fontSize:font})

    localStorage.setItem('profile',JSON.stringify(getStroage))
    // {getStroage,chatBg:bg,font:font}
  }
  const isSelectdImage = (img) => {
    const splitImg = img.split('/')
    const splitbg = chatBg

    return splitImg[splitImg.length - 1] == splitbg
  }

  const updateSettingHandler = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const splitbg = chatBg?.split('/')
      const { data, error } = await supabase
        .from('user_setting')
        .upsert({id:user?.userid,chatBg:splitbg[splitbg?.length - 1],fontSize:font},{onConflict:'id'})
        .select()
      if (error) throw error
      // setUser(data[0])
      console.log(data)
      saveToStorage(data[0].chatBg,data[0].font)
      setChatBg(data[0].chatBg)
      setFont(data[0].fontSize)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
    // close edit profile
  }
  return (
    <SettingContainer title="General" onBack={close}>
      <div className="px-4 py-2 relative">
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
            onChange={(e) => {
              setFont(e.target.value)
              setIsChange(true)
            }}
          />
        </div>
        <p className="border-[7px] border-base-200 w-[150%] -mx-[30px]"></p>
        <p className="text-[#8774E1] text-[17px] font-semibold py-5">
          Chat Wallpaper
        </p>
        <div className="grid grid-cols-3 gap-x-3 my-2 gap-y-4 overflow-y-auto h-[360px] n-scroll scroll-smooth">
          {images.map((item, i) => (
            <label
              key={i + 1}
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
                onClick={(e) => {
                  const splited=e.target.src?.split('/')
                  setChatBg(splited[splited?.length-1])
                  setIsChange(true)
                }}
              />
            </label>
          ))}
        </div>
        {isChange ? (
          <button
            className="btn btn-success mask mask-squircle fixed bottom-7 ml-[245px] text-white "
            onClick={updateSettingHandler}
            disabled={isLoading}
          >
            {!isLoading ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m4.5 12.75 6 6 9-13.5"
                />
              </svg>
            ) : (
              <span className="loading loading-spinner w-[2rem] absolute right-4"></span>
            )}
          </button>
        ):null}
      </div>
    </SettingContainer>
  )
}

export default GeneralSetting
