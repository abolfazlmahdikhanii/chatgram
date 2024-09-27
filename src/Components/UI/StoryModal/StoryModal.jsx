import React, { useEffect, useState, useRef, useCallback, useContext } from 'react'
import Backdrop from '../Backdrop/Backdrop'
import chatData from '../../../data'
import { IoCloseSharp } from 'react-icons/io5'
import { FaPlay } from 'react-icons/fa6'
import { FaPause } from 'react-icons/fa6'
import { IoIosArrowBack } from 'react-icons/io'
import { IoIosArrowForward } from 'react-icons/io'
import StoryImage from '../../StoryImage/StoryImage'
import { Rnd } from 'react-rnd'
import { supabase } from '../../../superbase'
import { UserContext } from '../../../Context/UserContext'

const StoryModal = ({ show, currentUserStory, close }) => {
  const [StoryData, setStoryData] = useState([])
  const [time, setTime] = useState(0)
  const [loading, setLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState(currentUserStory)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const videoRef = useRef(null)
  const {user}=useContext(UserContext)
  const [storyLoading, setStoryLoading] = useState(false)

  useEffect(()=>{
    getStory()
  },[])

  useEffect(() => {


    let timerId

    if (isPlaying) {
      timerId = setInterval(() => {
        setTime((prev) => prev + 1)

        if (time >= 100) {
          setTime(0)
          // clearInterval(timerId)
          setCurrentSlide((prevSlide) => (prevSlide + 1) % StoryData?.length)

          if (currentSlide >= StoryData?.length - 1) {
            setCurrentUser((prev) => prev + 1)
            setTime(0)
          }

          if (
            currentUser >= StoryData?.length - 1 &&
            currentSlide >= StoryData?.length - 1
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
  useEffect(()=>{
    updateUserView()
  },[currentSlide])
  const getStory = async () => {
    try {
      let { data: stories, error } = await supabase
        .from('stories')
        .select('*')
        .eq('userid', currentUser)
      if (error) throw Error
      setStoryData(stories)
    } catch (error) {
      console.log(error)
    }
  }

  const handlePlay = () => {
    setIsPlaying((prev) => !prev)
  }
  const forwardSliderHandler = () => {
    // setTime(0)
    if (currentSlide < StoryData?.length - 1) {
      setCurrentSlide((prev) => prev + 1)
      setTime(0)
    }
    if (currentSlide >= StoryData?.length - 1) {
      setTime(0)
      setCurrentUser((prev) => prev + 1)
      setCurrentSlide(0)
    }
    if (
      currentUser >= StoryData.length - 1 &&
      currentSlide >= StoryData?.length - 1
    ) {
      setTime(0)
      close(false)
      setCurrentSlide(0)
    }
  }
  const backwardSliderHandler = () => {
    // setTime(0)
    if (StoryData?.length > 0 && currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1)
      setTime(0)
    }
    if (currentSlide === 0) {
      setTime(0)
      setCurrentUser((prev) => prev - 1)
      setCurrentSlide(0)
    }
    if (currentUser === 0 || currentUser === 1) {
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
    const fileExtension = src?.split('.').pop().toLowerCase()
    const imageExtensions = ['jpeg', 'jpg', 'png', 'gif']
    const videoExtensions = ['mp4', 'avi', 'mov']

    if (
      fileExtension?.includes('jpeg') ||
      fileExtension?.includes('jpg') ||
      fileExtension?.includes('png') ||
      fileExtension?.includes('gif')
    ) {
      return 'img'
    }
    if (
      fileExtension?.includes('mp4') ||
      fileExtension?.includes('avi') ||
      fileExtension?.includes('mov')
    ) {
      return 'video'
    }
  }
  const updateUserView=async()=>{
    console.log();
try {
  const { data, error } = await supabase
      .from('storyviews')
      .upsert({ storyid: StoryData[currentSlide]?.storyid,userid:user?.userid },{onConflict:['userid','storyid']})
      .select()
      if(error) throw Error;
} catch (error) {
  console.log(error)
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
                <div className="flex items-center gap-x-2 absolute top-9 left-0 right-0 w-full px-4 z-10">
                  {StoryData &&
                    StoryData?.map((_, i) => (
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

                <div className="flex items-center w-full h-full justify-center">
                  {StoryData &&
                    StoryData?.map((item, i) => (
                      <div
                        key={item.id}
                         
                        className={`relative ${
                          item.quote ? 'h-full w-full' : ''
                        } ${i === currentSlide ? 'block' : 'hidden'}`}
                      >
                        {item?.type?.startsWith('image') && (
                          <>
                            <StoryImage src={item?.src} />
                            {item?.content?.description && (
                              <div className="absolute    w-full flex items-center justify-center">
                                <p
                                  style={{
                                    fontSize: item?.content?.fontSize,
                                    color: item?.content?.color,
                                    top: item?.content?.y,
                                    left: item?.content?.x,
                                  }}
                                  className=" w-fit min-w-[110px] dark:bg-slate-700/40 max-h-[150px] text-center px-5 py-2.5 bg-slate-500/20 rounded-xl text-white backdrop-blur"
                                >
                                  {item?.content?.description}
                                </p>
                              </div>
                            )}
                            {item?.link && (
                              <div className="absolute -bottom-24 left-0 right-0  w-full flex items-center justify-center">
                                <a
                                  href={item.link}
                                  rel="noreferrer"
                                  target="_blank"
                                  className=" w-10/12 mx-auto  bg-slate-500/20 max-h-[150px] text-center px-5 py-2.5  rounded-xl text-[#1677FF] backdrop-blur flex items-center gap-x-2 justify-center"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-4 h-4"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
                                    />
                                  </svg>

                                  {item?.linkTitle ? item.linkTitle : item.link}
                                </a>
                              </div>
                            )}
                          </>
                        )}
                        {item?.type === 'text' && (
                          <div
                            data-color="orange"
                            className="w-full h-full p-4"
                          >
                            <div className=" border-2 relative rounded-xl w-full h-[82%] mb-8 mt-20">
                              <p className="absolute -top-6 right-6 grid place-items-center py-2 px-3  bg-[#FA8A21] rounded">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="32"
                                  height="32"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    stroke="#fff"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.5"
                                    d="M22 11.65h-5.8c-1.53 0-2.58-1.16-2.58-2.58V5.85c0-1.42 1.05-2.58 2.58-2.58h3.22c1.42 0 2.58 1.16 2.58 2.58v5.8zM22 11.65c0 6.05-1.13 7.05-4.53 9.07M10.37 11.65h-5.8c-1.53 0-2.58-1.16-2.58-2.58V5.85c0-1.42 1.05-2.58 2.58-2.58H7.8c1.42 0 2.58 1.16 2.58 2.58v5.8M10.37 11.65c0 6.05-1.13 7.05-4.53 9.07"
                                  ></path>
                                </svg>
                              </p>
                              <p className="text-white font-bold text-xl flex items-center justify-center h-full">
                                {item.quote}
                              </p>
                              <p className="absolute -bottom-4 left-6 bg-[#FDD241] py-2 px-3">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="32"
                                  height="32"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    stroke="#fff"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.5"
                                    d="M2 12.35h5.8c1.53 0 2.58 1.16 2.58 2.58v3.22c0 1.42-1.05 2.58-2.58 2.58H4.58C3.16 20.73 2 19.57 2 18.15v-5.8M2 12.35C2 6.3 3.13 5.3 6.53 3.28M13.63 12.35h5.8c1.53 0 2.58 1.16 2.58 2.58v3.22c0 1.42-1.05 2.58-2.58 2.58h-3.22c-1.42 0-2.58-1.16-2.58-2.58v-5.8M13.63 12.35c0-6.05 1.13-7.05 4.53-9.07"
                                  ></path>
                                </svg>
                              </p>
                            </div>
                          </div>
                        )}

                        {item?.type?.startsWith('video') && (
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
                                e.target.currentTime = 0
                              }}
                              onLoadStart={() => setStoryLoading(true)}
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
                            {!storyLoading && (
                              <span className="loading loading-spinner loading-md absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></span>
                            )}
                            {item?.content?.description && (
                              <div className="absolute   w-full flex items-center justify-center">
                                <p
                                  style={{
                                    fontSize: item?.content?.fontSize,
                                    color: item?.content?.color,
                                    top: item?.content?.y,
                                    left: item?.content?.x,
                                  }}
                                  className=" w-fit min-w-[110px] dark:bg-slate-700/40 max-h-[150px] text-center px-5 py-2.5 bg-slate-500/20 rounded-xl text-white backdrop-blur"
                                >
                                  {item?.content?.description}
                                </p>
                              </div>
                            )}
                            {item?.link && (
                              <div className="absolute bottom-4 left-0 right-0  w-full flex items-center justify-center">
                                <p
                                  style={{
                                    fontSize: item?.fontSize,
                                    color: item?.color,
                                  }}
                                  className=" w-fit min-w-[110px] bg-slate-700/40 max-h-[150px] text-center px-5 py-2.5 bg-slate-500/20 rounded-xl text-white backdrop-blur"
                                >
                                  {item?.linkTitle ? item.linkTitle : item.link}
                                </p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>

          {/* Buttons Slider */}
          <div className="w-1/3 absolute top-1/2 -translate-x-1/2 -translate-y-1/2 left-1/2 flex items-center justify-between">
            <button
              className="btn btn-primary mask mask-squircle"
              onClick={backwardSliderHandler}
              disabled={currentSlide === 0}
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
