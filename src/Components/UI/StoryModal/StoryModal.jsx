import React, { useEffect, useState, useRef } from 'react'
import Backdrop from '../Backdrop/Backdrop'
import chatData from '../../../data'
import { IoCloseSharp } from 'react-icons/io5'
import { FaPlay } from 'react-icons/fa6'
import { FaPause } from 'react-icons/fa6'
import { IoIosArrowBack } from 'react-icons/io'
import { IoIosArrowForward } from 'react-icons/io'

const StoryModal = ({ show, currentUserStory, close }) => {
  const StoryData = chatData
  const [time, setTime] = useState(0)
  const [loading, setLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState(currentUserStory)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const videoRef = useRef(null)

  useEffect(() => {
    let timerId

    if (isPlaying) {
      timerId = setInterval(() => {
        setTime((prev) => prev + 1)

        if (time >= 100) {
          setTime(0)
          // clearInterval(timerId)
          setCurrentSlide(
            (prevSlide) =>
              (prevSlide + 1) % StoryData[currentUser]?.stories.length
          )

          if (currentSlide >= StoryData[currentUser]?.stories.length - 1) {
            setCurrentUser((prev) => prev + 1)
            setTime(0)
          }

          if (
            currentUser >= StoryData.length - 1 &&
            currentSlide >= StoryData[currentUser]?.stories.length - 1
          ) {
            setTime(0)
            clearInterval(timerId)
            setIsPlaying(false)
            close(false)
          }
        }
      }, 100)
    }

    return () => {
      clearInterval(timerId)
    }
  }, [time, isPlaying, currentUserStory])

  const handlePlay = () => {
    setIsPlaying((prev) => !prev)
  }
  const forwardSliderHandler = () => {
    // setTime(0)
    if (currentSlide < StoryData[currentUser]?.stories.length - 1) {
      setCurrentSlide((prev) => prev + 1)
      setTime(0)
    }
    if (currentSlide >= StoryData[currentUser]?.stories.length - 1) {
      setTime(0)
      setCurrentUser((prev) => prev + 1)
      setCurrentSlide(0)
    }
    if (
      currentUser >= StoryData.length - 1 &&
      currentSlide >= StoryData[currentUser]?.stories.length - 1
    ) {
      setTime(0)
      close(false)
      setCurrentSlide(0)
    }
  }
  const backwardSliderHandler = () => {
    // setTime(0)
    if (StoryData[currentUser]?.stories.length > 0 && currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1)
      setTime(0)
    }
    if (currentSlide === 0) {
      setTime(0)
      setCurrentUser((prev) => prev - 1)
      setCurrentSlide(0)
    }
    if (currentUser === 0) {
      if (currentSlide === 0) {
        setCurrentUser(0)
      }
    }
    console.log(currentSlide)
  }
  const handleOnLoad = () => {
    setLoading(false)
    setIsPlaying(true)
    setTime(0)
  }
  const getFileType = (src) => {
    const fileExtension = src.split('.').pop().toLowerCase()
    const imageExtensions = ['jpeg', 'jpg', 'png', 'gif']
    const videoExtensions = ['mp4', 'avi', 'mov']

    if (
      fileExtension.includes('jpeg') ||
      fileExtension.includes('jpg') ||
      fileExtension.includes('png') ||
      fileExtension.includes('gif')
    ) {
      return 'img'
    }
    if (
      fileExtension.includes('mp4') ||
      fileExtension.includes('avi') ||
      fileExtension.includes('mov')
    ) {
      return 'video'
    }
  }
  return (
    <>
      <Backdrop show={show} preview={true} close={() => close(false)} />
      <div
        className={`fixed top-0 left-0 w-full h-full z-30 ${
          show
            ? 'scale-100 opacity-100 translate-x-8'
            : 'scale-0 opacity-0 translate-x-0'
        } `}
      >
        {/* header */}
        <section className="flex items-center justify-end  w-11/12 mx-auto py-5 my-3">
          {/* right */}
          <div className="flex items-center gap-x-4 relative ">
            <div className="flex items-center gap-7 px-6 py-2.5 border dark:border-gray-500/40 rounded-xl z-10 border-gray-300">
              <button onClick={handlePlay}>
                {!isPlaying ? <FaPlay size={19} /> : <FaPause size={19} />}
              </button>

              <button>
                <svg
                  width={21}
                  height={21}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 22h6c5 0 7-2 7-7V9c0-5-2-7-7-7H9C4 2 2 4 2 9v6c0 5 2 7 7 7z"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15.996 12h.01M11.995 12h.01M7.995 12h.008"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <button
              className="btn btn-ghost btn-md mask mask-squircle min-h-[42px] h-4 "
              onClick={() => close(false)}
            >
              <IoCloseSharp size={22} color="#fff" />
            </button>
          </div>
        </section>

        {/* Start Story Content */}
        <section className="flex items-center justify-center -mt-4 relative">
          <div className="mockup-phone">
            <div className="camera h-3"></div>
            <div className="display">
              <div className="artboard artboard-demo phone-1 relative">
                <div className="flex items-center gap-x-2 absolute top-9 left-0 right-0 w-full px-4">
                  {StoryData[currentUser]?.stories &&
                    StoryData[currentUser]?.stories?.map((_, i) => (
                      <div
                        key={i + 1}
                        className="h-1 rounded-full bg-gray-700/60 backdrop-blur-xl w-full overflow-hidden"
                        onClick={() => {
                          setCurrentSlide(i)
                          setTime(0)
                        }}
                      >
                        <div
                          className={`bg-gray-100  origin-left absolute inset-0 ${
                            i > currentSlide ? 'hidden' : 'block'
                          }`}
                          style={{
                            width: i === currentSlide && `${time}%`,
                          }}
                        ></div>
                      </div>
                    ))}
                </div>

                <div className="flex items-center">
                  {StoryData[currentUser]?.stories &&
                    StoryData[currentUser]?.stories?.map((item, i) =>
                      getFileType(item.src) === 'img' ||
                      (item.type && item.type === 'img') ? (
                        <div
                          key={item.id}
                          className={`relative ${
                            i === currentSlide ? 'block' : 'hidden'
                          }`}
                        >
                          <img
                            src={item.src}
                            // onLoad={handleOnLoad}
                            alt=""
                            className={`w-full h-auto object-cover `}
                          />
                          {item?.description && (
                            <div className="absolute bottom-4 left-0 right-0  w-full flex items-center justify-center">
                              <p
                                style={{
                                  fontSize: item?.fontSize,
                                  color: item?.color,
                                }}
                                className=" w-fit min-w-[110px] bg-slate-700/40 max-h-[150px] text-center px-5 py-2.5 bg-slate-500/20 rounded-xl text-white backdrop-blur"
                              >
                                {item?.description}
                              </p>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div
                          key={item.id}
                          className={`relative ${
                            i === currentSlide ? 'block' : 'hidden'
                          }`}
                        >
                          <video
                            autoPlay={i === currentSlide ? true : false}
                            playsInline
                            className="h-auto w-full  aspect-video"
                            ref={videoRef}
                            onLoadedMetadata={(e) => {
                              setDuration(e.target.duration)
                              e.target.currentTime=0
                            }}
                            // onTimeUpdate={(e) => {
                            //   setTime(
                            //     Math.floor(
                            //       e.target.currentTime / e.target.duration
                            //     ) * 100
                            //   )
                            //   time > 100 ? e.target.pause() : e.target.play()
                            // }}
                            onPlaying={(e) =>
                              !isPlaying ? e.target.pause() : e.target.play()
                            }
                            // onLoadedData={handleOnLoad}
                            onEnded={(e) => {
                              e.target.pause()
                            }}
                            // onPlay={()=>}
                          >
                            <source src={item.src} />
                          </video>
                          {item?.description && (
                            <div className="absolute bottom-4 left-0 right-0  w-full flex items-center justify-center">
                              <p
                                style={{
                                  fontSize: item?.fontSize,
                                  color: item?.color,
                                }}
                                className=" w-fit min-w-[110px] bg-slate-700/40 max-h-[150px] text-center px-5 py-2.5 bg-slate-500/20 rounded-xl text-white backdrop-blur"
                              >
                                {item?.description}
                              </p>
                            </div>
                          )}
                        </div>
                      )
                    )}
                </div>
              </div>
            </div>
          </div>

          {/* Buttons Slider */}
          <div className="w-1/3 absolute top-1/2 -translate-x-1/2 -translate-y-1/2 left-1/2 flex items-center justify-between">
            <button
              className="btn btn-primary mask mask-squircle"
              onClick={backwardSliderHandler}
            >
              <IoIosArrowBack size={22} />
            </button>
            <button
              className="btn btn-primary mask mask-squircle"
              onClick={forwardSliderHandler}
            >
              <IoIosArrowForward size={22} />
            </button>
          </div>
        </section>
        {/* Finish Story Content */}
      </div>
    </>
  )
}

export default StoryModal
