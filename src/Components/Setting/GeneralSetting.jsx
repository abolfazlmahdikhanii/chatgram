import React, { useContext, useState } from 'react'
import SettingContainer from './SettingContainer'
import { supabase } from '../../superbase'
import { UserContext } from '../../Context/UserContext'

const GeneralSetting = ({ close }) => {
  const images = [
    {
      id: crypto.randomUUID(),
      src: '/images/chat-bg/bg-1.jpg',
    },
    {
      id: crypto.randomUUID(),
      src: '/images/chat-bg/bg-2.jpg',
    },
    {
      id: crypto.randomUUID(),
      src: '/images/chat-bg/bg-3.jpg',
    },
    {
      id: crypto.randomUUID(),
      src: '/images/chat-bg/bg-4.jpg',
    },
    {
      id: crypto.randomUUID(),
      src: '/images/chat-bg/bg-5.jpg',
    },
    {
      id: crypto.randomUUID(),
      src: '/images/chat-bg/bg-6.jpg',
    },
    {
      id: crypto.randomUUID(),
      src: '/images/chat-bg/bg-7.jpg',
    },
    {
      id: crypto.randomUUID(),
      src: '/images/chat-bg/bg-8.jpg',
    },
    {
      id: crypto.randomUUID(),
      src: '/images/chat-bg/bg-9.jpg',
    },
   
    {
      id: crypto.randomUUID(),
      src: '/images/chat-bg/pattern-1.svg',
    },
    {
      id: crypto.randomUUID(),
      src: '/images/chat-bg/pattern-10.svg',
    },
    {
      id: crypto.randomUUID(),
      src: '/images/chat-bg/pattern-12.svg',
    },
    {
      id: crypto.randomUUID(),
      src: '/images/chat-bg/pattern-27.svg',
    },
    {
      id: crypto.randomUUID(),
      src: '/images/chat-bg/pattern-28.svg',
    },
    {
      id: crypto.randomUUID(),
      src: '/images/chat-bg/pattern-29.svg',
    },
    {
      id: crypto.randomUUID(),
      src: '/images/chat-bg/pattern-32.svg',
    },
    {
      id: crypto.randomUUID(),
      src: '/images/chat-bg/pattern-9.svg',
    },
  ]

  const { user, font, setFont, setChatBg, chatBg,color, setColor } = useContext(UserContext)
  const [isLoading, setIsLoading] = useState(false)


  const [isChange, setIsChange] = useState(false)

  const saveToStorage = (bg, font,color) => {
    const getStroage = localStorage.getItem('profile')
      ? JSON.parse(localStorage.getItem('profile'))
      : []

    getStroage.chatBg = bg
    getStroage.fontSize = font
    getStroage.profileColor = color
    // Object.assign(getStroage,{chatBg:bg,fontSize:font})

    localStorage.setItem('profile', JSON.stringify(getStroage))
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
        .upsert(
          {
            id: user?.userid,
            chatBg: splitbg[splitbg?.length - 1],
            fontSize: font,
            profileColor:color
          },
          { onConflict: 'id' }
        )
        .select()
      if (error) throw error
      // setUser(data[0])
      console.log(data)
      saveToStorage(data[0].chatBg, data[0].fontSize,data[0].profileColor)
      setChatBg(data[0].chatBg)
      setFont(data[0].fontSize)
      setColor(data[0].profileColor)
      setIsChange(false)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
    // close edit profile
  }
  return (
    <SettingContainer
      title="General"
      onBack={() => {
        close()
        setChatBg(
          localStorage.getItem('profile')
            ? JSON.parse(localStorage.getItem('profile'))?.chatBg
            : chatBg
        )
        setFont(
          localStorage.getItem('profile')
            ? JSON.parse(localStorage.getItem('profile'))?.fontSize
            : font
        )
        setColor(
          localStorage.getItem('profile')
            ? JSON.parse(localStorage.getItem('profile'))?.profileColor
            : color
        )
      }}
    >
      <div className="px-4 py-2 relative overflow-scroll n-scroll">
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
        <p className="border-[7px] border-base-200 w-[150%] -mx-[30px]" ></p>
        <p className="text-[#8774E1] text-[17px] font-semibold py-5 ">
          Name Colors
        </p>
        <div className=" gap-x-3 my-1 gap-y-4 ">
          <div >
            <div className="chat chat-start" >
              <div className="chat-bubble w-[260px] md:w-[300px] px-3 dark:bg-gray-700 bg-gray-50 dark:shadow-none dark:border-transparent  shadow-lg shadow-gray-300/30 border border-gray-100">
                <div
                  data-rp-color={color}
                  className={`  mx-0 py-2 px-2 mb-2 w-full rounded-lg flex gap-2.5 cursor-pointer transition-all duration-200 overflow-hidden  `}
                >
                  <p
                  data-rp-border-color={color}
                    className="w-[2.5px]  rounded-full "
                  ></p>

                  <div className="flex flex-col  ">
                    <p data-name-color={color} className={`font-semibold  text-[14px]`} dir="auto">
                      Abolfazl
                    </p>
                    <p className="text-[13px] truncate dark:text-gray-300 text-gray-600">
                      Replay to your message
                    </p>
                  </div>
                </div>
                <p className="dark:text-gray-100 text-sm  leading-5 text-gray-700">
                  Your name and replies to your message will be shown in the
                  selected color
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-6 my-5 place-items-center gap-3">
            <div
              className={` border-2  w-10 h-10 grid place-items-center rounded-full transition-all duration-200 ${
                color === 'blue' ? 'border-[#5dadde]' : 'border-transparent'
              }`}
            >
              <span
                className="w-8 h-8 rounded-full bg-[#5dadde] inline-block cursor-pointer"
                onClick={() => {setColor('blue')
                  setIsChange(true)
                }}
              ></span>
            </div>
            <div
              className={` border-2  w-10 h-10 grid place-items-center rounded-full transition-all duration-200 ${
                color === 'green' ? 'border-[#79ca7b]' : 'border-transparent'
              }`}
            >
              <span
                className="w-8 h-8 rounded-full bg-[#79ca7b] inline-block cursor-pointer"
                onClick={() => {setColor('green')
                  setIsChange(true)
                }}
              ></span>
            </div>
            <div
              className={` border-2  w-10 h-10 grid place-items-center rounded-full transition-all duration-200 ${
                color === 'orange' ? 'border-[#e39652]' : 'border-transparent'
              }`}
            >
              <span
                className="w-8 h-8 rounded-full bg-[#e39652] inline-block cursor-pointer"
                onClick={() => {setColor('orange')
                  setIsChange(true)
                }}
              ></span>
            </div>
            <div
              className={` border-2  w-10 h-10 grid place-items-center rounded-full transition-all duration-200 ${
                color === 'red' ? 'border-[#e35a62]' : 'border-transparent'
              }`}
            >
              <span
                className="w-8 h-8 rounded-full bg-[#e35a62] inline-block cursor-pointer"
                onClick={() => {setColor('red')
                  setIsChange(true)
                }}
              ></span>
            </div>
            <div
              className={` border-2  w-10 h-10 grid place-items-center rounded-full transition-all duration-200 ${
                color === 'purple' ? 'border-[#a380dc]' : 'border-transparent'
              }`}
            >
              <span
                className="w-8 h-8 rounded-full bg-[#a380dc] inline-block cursor-pointer"
                onClick={() => {setColor('purple')
                  setIsChange(true)
                }}
              ></span>
            </div>

            <div
              className={` border-2  w-10 h-10 grid place-items-center rounded-full transition-all duration-200 ${
                color === 'rose' ? 'border-[#e85089]' : 'border-transparent'
              }`}
            >
              <span
                className="w-8 h-8 rounded-full bg-[#e85089] inline-block cursor-pointer"
                onClick={() => {setColor('rose')
                  setIsChange(true)
                }}
              ></span>
            </div>
          </div>
        </div>
        <p className="border-[7px] border-base-200 w-[150%] -mx-[30px]"></p>
        <p className="text-[#8774E1] text-[17px] font-semibold py-5 sticky -top-2 bg-base-100 z-10">
          Chat Wallpaper
        </p>
        <div className="grid grid-cols-3 gap-x-3 my-2 gap-y-4 ">
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
                  const splited = e.target.src?.split('/')
                  setChatBg(splited[splited?.length - 1])
                  setIsChange(true)
                }}
              />
            </label>
          ))}
        </div>
        {isChange ? (
          <button
            className="btn btn-success mask mask-squircle fixed bottom-7 ml-[210px] md:ml-[245px] text-white grid place-items-center"
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
              <span className="loading loading-spinner w-[20px]    inline-block"></span>
            )}
          </button>
        ) : null}
      </div>
    </SettingContainer>
  )
}

export default GeneralSetting
