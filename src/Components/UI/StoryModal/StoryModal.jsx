import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useContext,
} from 'react'
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
import userNameSpliter from '../../../Utility/userNameSpliter'
import { relativeTimeFormat } from '../../../Utility/helper'
import { toast } from 'react-toastify'

const StoryModal = ({ show, currentUserStory, close, friends }) => {
  const [StoryData, setStoryData] = useState([])
  const [time, setTime] = useState(0)
  const [loading, setLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState(currentUserStory)
  const [currentUserIndex, setCurrentUserIndex] = useState(0)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isDeleted, setIsDeleted] = useState(false)
  const [duration, setDuration] = useState(0)
  const [storyView, setStoryView] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const videoRef = useRef(null)
  const { user } = useContext(UserContext)
  const [storyLoading, setStoryLoading] = useState(false)
  const [friendsStory, setFriendsStory] = useState([])
  const toastOptions = {
    position: toast.POSITION.BOTTOM_CENTER,
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: 'dark',
    closeButton: false,
    className:
      'px-5 py-2.5 bg-slate-500/20 rounded-xl text-white backdrop-blur',
  }
  useEffect(() => {
    getStory()
    checkFriendHasStory()
    findCurrentUser(currentUser)
  }, [currentUser, currentUserIndex])

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
            changeCurrentUserHandler(currentUserIndex)
            setTime(0)
          }

          if (
            currentUser === friendsStory[friendsStory?.length - 1] &&
            currentSlide >= StoryData?.length - 1
          ) {
            setTime(0)
            clearInterval(timerId)
            setIsPlaying(false)
            close()
          }
        }
      }, 100)
    }

    return () => {
      clearInterval(timerId)
    }
  }, [time, isPlaying, currentUserStory, currentUserIndex])
  useEffect(() => {
    updateUserView()
    displayUserView(StoryData[currentSlide]?.storyid)
  }, [StoryData,currentSlide])

  const getStory = async () => {
    try {
      setStoryLoading(false)
      let { data: stories, error } = await supabase
        .from('active_stories')
        .select('*,userid(*)')
        .eq('userid', currentUser)

      if (error) throw Error
      setStoryData(stories)
      setStoryLoading(true)
    } catch (error) {
      console.log(error)
      setStoryLoading(false)
    }
  }

  const checkFriendHasStory = async () => {
    try {
      setStoryLoading(false)
      let { data: users, error } = await supabase
        .from('active_stories')
        .select('userid')
        .in('userid', friends)

      if (error) throw Error

      const uniqeFriend = [
        users
          .filter((item) => item.userid === user?.userid)
          .map((item) => item.userid)[0],
        ...new Set(
          users
            .filter((item, i, arr) => item.userid !== user?.userid)
            .map((item) => item.userid)
        ),
      ]

      if (uniqeFriend[0] !== false) {
        setFriendsStory(uniqeFriend)
        console.log('u', uniqeFriend)
      } else {
        const newUniqueFriend = [
          ...new Set(
            users
              .filter((item, i, arr) => item.userid !== user?.userid)
              .map((item) => item.userid)
          ),
        ]
        setFriendsStory(newUniqueFriend)
        console.log('n', newUniqueFriend)
      }
      setStoryLoading(true)
    } catch (error) {
      console.log(error)
    }
  }
  const findCurrentUser = (currUser) => {
    const findIndexUser = friendsStory?.findIndex((item) => item === currUser)
    if (findIndexUser !== -1) setCurrentUserIndex(findIndexUser)
    else setCurrentUserIndex(0)
  }
  const changeCurrentUserHandler = (currUser) => {
    if (currUser === friendsStory?.length - 1) {
      setCurrentUser(friendsStory[currUser - 1])
    }
    if (currUser >= 0) {
      setCurrentUser(friendsStory[currUser + 1])
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
      changeCurrentUserHandler(currentUserIndex)
      setCurrentSlide(0)
    }
    if (
      currentUser === friends[friends?.length - 1] &&
      currentSlide >= StoryData?.length - 1
    ) {
      setTime(0)
      close()
      setCurrentSlide(0)
    }
  }
  const backwardSliderHandler = () => {
    // setTime(0)

    if (currentSlide > StoryData?.length - 1) {
      setCurrentSlide((prev) => prev - 1)
      setTime(0)
    }
    if (currentSlide <= 0) {
      setCurrentSlide((prev) => StoryData.length - 1)
      setTime(0)
      changeCurrentUserHandler(currentUserIndex)
    }
    if (
      currentUser === friends[friends?.length - 1] &&
      currentSlide <= StoryData?.length - 1
    ) {
      setCurrentSlide((prev) => prev - 1)
      setTime(0)
    }
    // if (StoryData?.length-1 >= 0 && currentSlide >= 0) {
    //   changeCurrentUserHandler(currentUserIndex)
    //   setTime(0)
    // }
    // if (currentSlide === 0) {
    //   setTime(0)
    //   changeCurrentUserHandler(currentUserIndex)
    //   setCurrentSlide(prev=>prev-1)
    // }
    if (currentUserIndex === 0 || currentUserIndex === 1) {
      if (currentSlide === 0) {
        setCurrentUser(friendsStory[0])
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
  const updateUserView = async () => {
    try {
      const { data: view, error: err } = await supabase
        .from('storyviews')
        .select('*')
        .eq('storyid', StoryData[currentSlide]?.storyid)
        .eq('userid', user?.userid)
      if (err) throw Error
      if (!view.length) {
        const { data, error } = await supabase
          .from('storyviews')
          .insert([
            { storyid: StoryData[currentSlide]?.storyid, userid: user?.userid },
          ])
        if (error) throw Error
      }
    } catch (error) {
      console.log(error)
    }
  }
  const displayUserView = useCallback(
    async (sid) => {
      try {
        console.log(StoryData)
        const { data: view, error: err } = await supabase
          .from('storyviews')
          .select('*')
          .eq('storyid', sid)

        if (err) throw Error

        setStoryView(view.length)
      } catch (error) {
        console.log(error)
      }
    },
    [storyView]
  )
  const deleteStroy = async (e, id) => {
    e.preventDefault()
    try {
      const { error } = await supabase
        .from('stories')
        .delete()
        .eq('storyid', id)
        .eq('userid', user?.userid)
        
      if (error) throw Error
      close()
      toast("Story is deleted!", toastOptions)

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

              {currentUser !== user?.userid ? (
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
              ) : (
                <button
                  onClick={() => {
                    setIsPlaying(false)
                    setIsDeleted(true)
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-[22px] h-[22px]"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
              )}
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
            <div className="display relative">
              <div className="absolute top-9 left-0 right-0 w-full px-4 z-10">
                <div
                  className={` items-center gap-x-2 w-full ${
                    isDeleted ? 'hidden' : 'flex'
                  }`}
                >
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
                            width:
                              i === currentSlide &&
                              `${
                                !StoryData[i]?.type?.includes('video')
                                  ? time
                                  : time / 2
                              }%`,
                          }}
                        ></div>
                      </div>
                    ))}
                </div>
              </div>
              <div
                data-color={
                  StoryData[currentSlide]?.type === 'text' ? 'orange' : ''
                }
                className={`artboard artboard-demo phone-1 relative h-full ${
                  isDeleted ? 'blur-md ' : ''
                }`}
              >
                <div className="flex items-center gap-x-3 w-full mt-16 ml-8">
                  <div
                    data-color={
                      StoryData[currentSlide]?.userid?.userid !== user?.userid
                        ? StoryData[currentSlide]?.userid?.bgProfile
                        : 'purple'
                    }
                    className="w-[45px] h-[45px] mask mask-squircle z-[5] relative grid place-items-center "
                  >
                    {StoryData[currentSlide]?.userid?.avatar_url ? (
                      <img
                        src={StoryData[currentSlide]?.userid?.avatar_url}
                        alt="story img"
                      />
                    ) : (
                      <span className="text-base text-white font-bold">
                        {userNameSpliter(
                          StoryData[currentSlide]?.userid?.username ||
                            StoryData[currentSlide]?.userid?.email?.split(
                              '@'
                            )[0]
                        )}
                      </span>
                    )}
                  </div>
                  <div className="space-y-1">
                    <p className="text-white font-semibold">
                      {StoryData[currentSlide]?.userid?.username ||
                        StoryData[currentSlide]?.userid?.email?.split('@')[0]}
                    </p>
                    <p className="text-[12px] text-gray-200">
                      {relativeTimeFormat(StoryData[currentSlide]?.createdat)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center w-full h-full justify-center relative">
                  {StoryData &&
                    StoryData?.map((item, i) => (
                      <div
                        key={item.id}
                        className={`relative mt-6 ${
                          item.quote ? 'h-full w-full' : ''
                        } ${
                          i === currentSlide ? 'block h-full w-full' : 'hidden'
                        }`}
                      >
                        {item?.type?.startsWith('image') && (
                          <>
                            {!storyLoading && (
                              <div className="skeleton-loader dark:bg-transparent bg-gray-300 w-full absolute inset-0">
                                <div className="shimmer-effect blur-2xl"></div>
                              </div>
                            )}
                            {storyLoading && (
                              <StoryImage src={item?.src} {...item} />
                            )}
                          </>
                        )}
                        {item?.type === 'text' && (
                          <div className="w-full h-full p-4">
                            <div className=" border-2 relative rounded-xl w-full h-[82%] mb-8 mt-2">
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

                <div className="absolute bottom-6 left-4 flex items-center justify-between right-4">
                  <div className="flex items-center gap-x-2.5 bg-gray-500/20 backdrop-blur-lg min-w-[100px] px-3 py-2.5 rounded-xl self-end">
                    <p className="w-7 h-7 bg-orange-600 mask mask-squircle text-white grid place-items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </p>
                    <p className="text-sm text-white">{storyView}</p>
                  </div>
                  <div className="flex flex-col  gap-y-3 ">
                    <button className=" text-white grid place-items-center bg-gray-500/20 backdrop-blur-lg  px-3 py-2.5  mask mask-squircle">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M12.62 20.81c-.34.12-.9.12-1.24 0C8.48 19.82 2 15.69 2 8.69 2 5.6 4.49 3.1 7.56 3.1c1.82 0 3.43.88 4.44 2.24a5.53 5.53 0 014.44-2.24C19.51 3.1 22 5.6 22 8.69c0 7-6.48 11.13-9.38 12.12z"
                        ></path>
                      </svg>
                    </button>
                    {/* <button className=" text-white grid place-items-center bg-gray-500/20 backdrop-blur-lg  px-3 py-2.5  mask mask-squircle">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M12.62 20.81c-.34.12-.9.12-1.24 0C8.48 19.82 2 15.69 2 8.69 2 5.6 4.49 3.1 7.56 3.1c1.82 0 3.43.88 4.44 2.24a5.53 5.53 0 014.44-2.24C19.51 3.1 22 5.6 22 8.69c0 7-6.48 11.13-9.38 12.12z"
                        ></path>
                      </svg>
                    </button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Buttons Slider */}
          <div className="w-1/3 absolute top-1/2 -translate-x-1/2 -translate-y-1/2 left-1/2 flex items-center justify-between">
            <button
              className="btn btn-primary mask mask-squircle"
              onClick={
                currentSlide === 0 && currentUser === friendsStory[0]
                  ? backwardSliderHandler
                  : null
              }
              disabled={currentSlide === 0 && currentUser === friendsStory[0]}
            >
              <IoIosArrowBack size={22} />
            </button>
            <button
              className="btn btn-primary mask mask-squircle"
              onClick={
                currentSlide === StoryData.length - 1 &&
                currentUser === friendsStory[friendsStory.length - 1]
                  ? forwardSliderHandler
                  : null
              }
              disabled={
                currentSlide === StoryData.length - 1 &&
                currentUser === friendsStory[friendsStory.length - 1]
              }
            >
              <IoIosArrowForward size={22} />
            </button>
          </div>
        </section>
        {/* Finish Story Content */}
      </div>
      {isDeleted && (
        <dialog
          className={`modal fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  ${
            isDeleted ? 'modal-open' : ''
          }`}
        >
          <div className="modal-box  w-[25%] ">
            <h3 className="font-bold text-lg dark:text-white text-zinc-700 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-12 h-12 stroke-red-500 mx-auto mb-2 mt-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                />
              </svg>
              Delete Story
            </h3>
            <p className="pb-4 pt-3 text-center">
              Are you sure you want your delete story?
            </p>
            <form method="dialog" className="mt-5 w-full">
              <div className="grid grid-cols-2 gap-x-4 w-full">
                <button className="btn btn-error text-white" onClick={(e)=>deleteStroy(e,StoryData[currentSlide]?.storyid)}>Delete</button>
                <button className="btn" onClick={()=>setIsDeleted(false)}>close</button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </>
  )
}

export default StoryModal
