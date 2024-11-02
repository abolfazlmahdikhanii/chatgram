import React, { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
const StoryEditor = ({ addContent, onHide }) => {
  const colors = [
    '#f9fafb',
    '#1f2937',
    '#0ea5e9',
    '#22c55e',
    '#facc15',
    '#f59e0b',
    '#ef4444',
    '#ec4899',
    '#a855f7',
    '#f8fafc',
    '#f1f5f9',
    '#e2e8f0',
    '#cbd5e1',
    '#94a3b8',
    '#64748b',
    '#475569',
    '#334155',
    '#1e293b',
  ]

  const [selectedColor, setSelectedColor] = useState(colors[0])
  const [fontSize, setFontSize] = useState(14)
  const [dis, setDis] = useState('')
  const whiteColor = ['#f9fafb', '#f8fafc', '#f1f5f9', '#e2e8f0']

  const saveStoryHandler = () => {
    const newDis = {
      description: dis,
      fontSize: `${fontSize}px`,
      color: selectedColor,
    }
    addContent(newDis)
    onHide()
  }

  return (
    <div className="absolute -top-0 bg-[#26344F]/70  w-full h-full bottom-[60px]">
      <div className="absolute top-5 left-4 mt-3">
        <button
          className="btn btn-outline btn-warning text-white px-6 z-40 relative"
          onClick={saveStoryHandler}
        >
          save
        </button>
      </div>
      <div className="flex items-center w-full h-full relative">
        <div className="w-[23%] grid justify-center">
          <input
            type="range"
            min="16"
            max="50"
            value={fontSize}
            className="range  w-[180px] -rotate-90 justify-self-start "
            onChange={(e) => setFontSize(e.target.value)}
          />
        </div>
        <div className="w-[77%] h-[300px] flex items-center justify-center max-h-[500px]">
          <textarea
            id=""
            className="bg-transparent resize-none focus-visible:outline-none h-full text-gray-700 dark:text-white w-11/12 text-center "
            style={{ fontSize: `${fontSize}px`, color: selectedColor }}
            autoFocus
            dir="auto"
            value={dis}
            onChange={(e) => setDis(e.target.value)}
          ></textarea>
        </div>
      </div>

      <div className="-mt-20 px-2">
        <Swiper
          slidesPerView={9}
          spaceBetween={12}
          className="w-full px-2 pt-1 pb-5"
        >
          {colors.map((color, i) => (
            <SwiperSlide key={i + 1}>
              <div
                className="w-7 h-7 rounded-full  border text-gray-700 dark:text-white grid place-items-center transition-all duration-200 cursor-pointer"
                style={{
                  background: color,
                  borderWidth: color === selectedColor ? '2px' : '1px',
                }}
                onClick={() => setSelectedColor(color)}
              >
                {color == selectedColor ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-4 h-4"
                    style={
                      whiteColor.includes(selectedColor)
                        ? { color: '#16a34a' }
                        : { color: '#fff' }
                    }
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m4.5 12.75 6 6 9-13.5"
                    />
                  </svg>
                ) : null}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default StoryEditor
