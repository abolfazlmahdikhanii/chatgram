import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useContext,
} from 'react'
import Backdrop from '../Backdrop/Backdrop'

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
import { toastOptions } from '../../../Utility/toastOption'
import Profile from '../../Profile/Profile'

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
  const [isReaction, setIsReaction] = useState([])
  const [friendsStory, setFriendsStory] = useState([])
  const [userViewStory, setUserViewStory] = useState([])
  const [userLikeStory, setUserLikeStory] = useState([])
  const [storyInfoTab, setStoryInfoTab] = useState('views')
  const [isShowStoryInfo, setIsShowStoryInfo] = useState(false)

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
    getStoryLike(StoryData[currentSlide]?.storyid)
    subscribeToLikes(StoryData[currentSlide]?.storyid)
  }, [StoryData, currentSlide])

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
   
      setStoryLoading(false)
    }
  }

  const checkFriendHasStory = async () => {
 
      setStoryLoading(false)
      let { data: users, error } = await supabase
        .from('active_stories')
        .select('userid')
        .in('userid', friends)

      if (error) return

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
      
      } else {
        const newUniqueFriend = [
          ...new Set(
            users
              .filter((item, i, arr) => item.userid !== user?.userid)
              .map((item) => item.userid)
          ),
        ]
        setFriendsStory(newUniqueFriend)
     
      }
      setStoryLoading(true)
   
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
    setIsShowStoryInfo(false)
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
   
    if (currentUserIndex === 0 || currentUserIndex === 1) {
      if (currentSlide === 0) {
        setCurrentUser(friendsStory[0])
      }
    }
  
  }

  const storyViewInfo = async (sid) => {
    
 
      let { data: storyviews, error } = await supabase
        .from('storyviews')
        .select('*,userid(*)')
        .eq('storyid', sid)
      if (!error) 
      setUserViewStory(storyviews)
    
  }
  const storyLikeInfo = async (sid) => {
    
      let { data: storyReaction, error } = await supabase
        .from('storyReaction')
        .select('*,userid(*)')
        .eq('storyid', sid)
      if (!error) setUserLikeStory(storyReaction)
    
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
    
      const { data: view, error: err } = await supabase
        .from('storyviews')
        .select('*')
        .eq('storyid', StoryData[currentSlide]?.storyid)
        .eq('userid', user?.userid)
      if (!err) {
      if (!view.length) {
        const { data, error } = await supabase
          .from('storyviews')
          .insert([
            { storyid: StoryData[currentSlide]?.storyid, userid: user?.userid },
          ])
        if (error) return
      }
    }
    
  }
  const displayUserView = useCallback(
    async (sid) => {
  
    
        const { data: view, error: err } = await supabase
          .from('storyviews')
          .select('*')
          .eq('storyid', sid)

        if (!err) setStoryView(view.length)
    
    },
    [storyView]
  )
  const deleteStroy = async (e, id) => {
    e.preventDefault()
    
      const { error } = await supabase
        .from('stories')
        .delete()
        .eq('storyid', id)
        .eq('userid', user?.userid)

      if (!error){
      close()
      toast('Story is deleted!', toastOptions)
      }
  }
  const getStoryLike = async (sid) => {
    let { data: storyReaction, error } = await supabase
      .from('storyReaction')
      .select('*')
      .eq('storyid', sid)
      .eq('userid', user?.userid)
      .single()
    if (!error) {
      if (storyReaction) setIsReaction([sid])
      else {
        const filterReaction = isReaction.filter((item) => item !== sid)

        setIsReaction(filterReaction)
      }
    }
  }
  const subscribeToLikes = (storyId) => {
    const likeChannel = supabase
      .channel('public:storyReaction')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'storyReaction' },
        (payload) => {
          if (payload.new.storyid === storyId) {
            getStoryLike(storyId) // Refresh the like count when a like is added or removed
          }
        }
      )
      .subscribe()
  }
  const storyLikeHandler = async (sid) => {
    const reactionArr = []
    if (!isReaction.includes(sid)) {
      const { data, error } = await supabase
        .from('storyReaction')
        .insert([{ storyid: sid, userid: user?.userid }])
        .select()
      if (!error) setIsReaction((prev) => [...prev, sid])
    } else {
      const { data, error } = await supabase
        .from('storyReaction')
        .delete()
        .eq('storyid', sid)
        .eq('userid', user?.userid)
        .select()
      if (!error) {
        const filterReaction = isReaction.filter((item) => item !== sid)

        setIsReaction(filterReaction)
      }
    }
  }
  return (
    <>
      <Backdrop show={show} preview={true} close={() => close(false)} />
      <div
        className={`fixed top-0 left-0 w-full h-full z-30  ${
          show
            ? 'scale-100 opacity-100 md:translate-x-8 '
            : 'scale-0 opacity-0 translate-x-0'
        } `}
      >
        {/* header */}
        <section className="flex items-center justify-end w-[95%]  md:w-11/12 py-5 my-3">
          {/* right */}
          <div className="flex items-center gap-x-4 relative ">
            <div className="flex items-center gap-7 px-6 py-2.5 border dark:border-gray-500/40 rounded-xl z-10 border-gray-400">
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
                    setIsShowStoryInfo(false)
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
              className="btn btn-ghost btn-md mask mask-squircle min-h-[42px] h-4 dark:text-white text-gray-700"
              onClick={() => close(false)}
            >
              <IoCloseSharp size={22} color="currentColor" />
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
                        className="h-1 rounded-full dark:bg-gray-700/60 bg-gray-400 backdrop-blur-xl w-full overflow-hidden"
                        onClick={() => {
                          setCurrentSlide(i)
                          setTime(0)
                        }}
                      >
                        <div
                          className={`dark:bg-gray-100 bg-primary origin-left absolute inset-0 ${
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
                <div className="flex items-center justify-between w-[94%] mt-16 ml-8 mr-8">
                  <div className="flex items-center gap-x-3 w-full ">
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
                        <span className="text-base dark:text-white font-bold text-gray-700">
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
                      <p className="dark:text-white text-gray-700 font-semibold  truncate ">
                        {StoryData[currentSlide]?.userid?.username ||
                          StoryData[currentSlide]?.userid?.email?.split('@')[0]}
                      </p>
                      <p className="text-[12px] dark:text-gray-200 text-gray-500">
                        {relativeTimeFormat(StoryData[currentSlide]?.createdat)}
                      </p>
                    </div>
                  </div>

                  {currentUser === user?.userid ? (
                    <button
                      className=" text-blue-500 "
                      title="Story Info"
                      onClick={() => {
                        setIsPlaying(false)
                        storyViewInfo(StoryData[currentSlide]?.storyid)
                        setStoryInfoTab('views')
                        setIsShowStoryInfo(true)
                      }}
                    >
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
                          d="M12 22c5.5 0 10-4.5 10-10S17.5 2 12 2 2 6.5 2 12s4.5 10 10 10M12 8v5"
                        ></path>
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M11.995 16h.009"
                        ></path>
                      </svg>
                    </button>
                  ) : null}
                </div>
                <div
                  className={`flex items-center w-full h-full justify-center relative overflow-hidden ${
                    isShowStoryInfo ? 'blur-md ' : ''
                  }`}
                >
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
                              <div className="skeleton-loader dark:bg-transparent dark:bg-gray-300 bg-gray-600 w-full absolute inset-0">
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

                <div className="absolute bottom-6 left-4 flex items-center justify-between right-4 z-40">
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
                    <button
                      className="  grid place-items-center bg-gray-500/20 backdrop-blur-lg  px-3 py-2.5  mask mask-squircle"
                      onClick={() =>
                        storyLikeHandler(StoryData[currentSlide]?.storyid)
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        className={`${
                          isReaction.includes(StoryData[currentSlide]?.storyid)
                            ? 'fill-red-500 text-red-500'
                            : 'fill-transparent'
                        }`}
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

                {/* view Detail */}
                {isShowStoryInfo && (
                  <dialog className="modal  modal-bottom modal-open absolute bottom-0 left-0 right-0 h-full overflow-hidden z-[50]">
                    <div className="modal-box h-[350px] ">
                      <button
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                        onClick={() => {
                          setIsShowStoryInfo(false)
                          setIsPlaying(true)
                        }}
                      >
                        ✕
                      </button>
                      <div
                        role="tablist"
                        className="tabs tabs-boxed mt-4 w-full"
                      >
                        <button
                          role="tab"
                          className={`tab transition-all duration-200 w-1/2 ${
                            storyInfoTab === 'views' ? 'tab-active' : ''
                          }`}
                          onClick={() => {
                            storyViewInfo(StoryData[currentSlide]?.storyid)
                            setStoryInfoTab('views')
                          }}
                        >
                          Views
                        </button>
                        <button
                          role="tab"
                          className={`tab transition-all duration-200  w-1/2 ${
                            storyInfoTab === 'likes' ? 'tab-active' : ''
                          }`}
                          onClick={() => {
                            storyLikeInfo(StoryData[currentSlide]?.storyid)
                            setStoryInfoTab('likes')
                          }}
                        >
                          Likes
                        </button>
                      </div>

                      {storyInfoTab === 'views' && (
                        <>
                          <p className="pt-5 dark:text-gray-400 text-gray-700">
                            Viewers
                          </p>
                          <ul className="mt-4 space-y-0.5 px-1 ">
                            {userViewStory?.length ? (
                              userViewStory.map((info, i) => (
                                <li
                                  key={info.id}
                                  className={`w-full flex items-center gap-x-4 border-b-gray-400  pb-3 dark:border-b-gray-700 ${
                                    i === userViewStory.length - 1
                                      ? 'border-none'
                                      : 'border-b'
                                  }`}
                                >
                                  <Profile
                                    path={info?.userid?.avatar_url}
                                    userName={
                                      info?.userid?.username ||
                                      info?.userid?.email.split('@')[0]
                                    }
                                    bgProfile={
                                      info?.userid?.userid === user.userid
                                        ? 'purple'
                                        : info?.userid?.bgProfile
                                    }
                                    size="sm"
                                  />
                                  <div className="flex items-center justify-between w-full">
                                    <div className="flex flex-col gap-y-1">
                                      <span className="dark:text-gray-100 text-gray-800 max-w-[132px] truncate inline-block">
                                        {info?.userid?.username ||
                                          info?.userid?.email.split('@')[0]}
                                      </span>
                                      <span className="dark:text-gray-400 text-gray-500 text-xs">
                                        {relativeTimeFormat(info?.viewedat)}
                                      </span>
                                    </div>
                                    <span>
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
                                          d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                                        />
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                        />
                                      </svg>
                                    </span>
                                  </div>
                                </li>
                              ))
                            ) : (
                              <li className="flex flex-col justify-center items-center h-1/2 ">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="w-9 h-9"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                                  />
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                  />
                                </svg>
                                <p className="text-lg mt-2">No viewers</p>
                              </li>
                            )}
                          </ul>
                        </>
                      )}

                      {storyInfoTab === 'likes' && (
                        <>
                          <p className="pt-5 dark:text-gray-400 text-gray-700">
                            Likes
                          </p>
                          <ul className="mt-4 space-y-0.5 px-1 h-full w-full">
                            {userLikeStory?.length ? (
                              userLikeStory.map((info, i) => (
                                <li
                                  key={info.id}
                                  className={`w-full flex items-center gap-x-4 border-b-gray-400  pb-3 dark:border-b-gray-700 ${
                                    i === userLikeStory.length - 1
                                      ? 'border-none'
                                      : 'border-b'
                                  }`}
                                >
                                  <Profile
                                    path={info?.userid?.avatar_url}
                                    userName={
                                      info?.userid?.username ||
                                      info?.userid?.email.split('@')[0]
                                    }
                                    bgProfile={
                                      info?.userid?.userid === user.userid
                                        ? 'purple'
                                        : info?.userid?.bgProfile
                                    }
                                    size="sm"
                                  />
                                  <div className="flex items-center justify-between w-full">
                                    <div className="flex flex-col gap-y-1">
                                      <span className="dark:text-gray-100 text-gray-700 max-w-[132px] truncate inline-block">
                                        {info?.userid?.username ||
                                          info?.userid?.email.split('@')[0]}
                                      </span>
                                      <span className="dark:text-gray-400 text-gray-500 text-xs">
                                        {relativeTimeFormat(info?.viewedat)}
                                      </span>
                                    </div>
                                    <span className="inline-block ">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        className="w-4 h-4 fill-red-500"
                                      >
                                        <path d="m9.653 16.915-.005-.003-.019-.01a20.759 20.759 0 0 1-1.162-.682 22.045 22.045 0 0 1-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 0 1 8-2.828A4.5 4.5 0 0 1 18 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 0 1-3.744 2.582l-.019.01-.005.003h-.002a.739.739 0 0 1-.69.001l-.002-.001Z" />
                                      </svg>
                                    </span>
                                  </div>
                                </li>
                              ))
                            ) : (
                              <li className="flex flex-col justify-center items-center h-1/2 ">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="w-9 h-9"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                                  />
                                </svg>

                                <p className="text-lg mt-2">No reactions</p>
                              </li>
                            )}
                          </ul>
                        </>
                      )}
                    </div>
                  </dialog>
                )}
              </div>
            </div>
          </div>

          {/* Buttons Slider */}
          <div className="md:w-1/3 w-[83%] absolute top-1/2  -translate-x-1/2 -translate-y-1/2 left-1/2 flex items-center justify-between z-[40]">
            <button
              className="btn btn-primary mask mask-squircle"
              onClick={backwardSliderHandler}
              disabled={currentSlide === 0 && currentUser === friendsStory[0]}
            >
              <IoIosArrowBack size={22} />
            </button>
            <button
              className="btn btn-primary mask mask-squircle"
              onClick={forwardSliderHandler}
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
          <div className="modal-box w-11/12  md:w-[25%] ">
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
                <button
                  className="btn btn-error text-white"
                  onClick={(e) =>
                    deleteStroy(e, StoryData[currentSlide]?.storyid)
                  }
                >
                  Delete
                </button>
                <button className="btn" onClick={() => setIsDeleted(false)}>
                  close
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </>
  )
}

export default StoryModal
