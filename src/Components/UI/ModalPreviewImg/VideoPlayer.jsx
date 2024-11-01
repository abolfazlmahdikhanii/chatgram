import React, { useEffect, useRef, useState } from 'react'
import { FaPlay, FaPause } from 'react-icons/fa'
import { TbPictureInPictureTop } from 'react-icons/tb'
import { BsFullscreenExit } from 'react-icons/bs'

const VideoPlayer = ({ src, setIsPiPActive, isPiPActive }) => {
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [isPlay, setIsPlay] = useState(false)
    const [volume, setVolume] = useState(1)

    const [isFullScreen, setIsFullScreen] = useState(false)
    const videoRef = useRef(null)
    const mainRef = useRef(null)
    
    useEffect(() => {
        if (duration === currentTime) {
            setIsPlay(false)
            setCurrentTime(0)
        }
        

       

    }, [currentTime])
    useEffect(() => {
        const handleFullScreenChange = () => {
            setIsFullScreen(document.fullscreenElement === mainRef.current)
        }
       

        document.addEventListener('fullscreenchange', handleFullScreenChange)
        videoRef.current.addEventListener("leavepictureinpicture", ()=>setIsPiPActive({show:true,type:"video",src}));
        return () => {
            document.removeEventListener(
                'fullscreenchange',
                handleFullScreenChange
            )
            // videoRef.current.removeEventListener("leavepictureinpicture", ()=>setIsPiPActive({show:false,type:"video",src}));
        }
    }, [])

  

    const playHandler = () => {
        if (videoRef.current.paused && !isPlay) {
            setIsPlay(true)
            videoRef.current.play()
        } else {
            setIsPlay(false)
            videoRef.current.pause()
        }
    }
    const seekHandler = (event) => {
        videoRef.current.currentTime = event.target.value
        setCurrentTime(videoRef.current.currentTime)
    }
    const formatTime = function (time) {
        let min = Math.floor(time / 60)
        let sec = Math.floor(time - min * 60)
        //   setSecond(sec)
        return `${min} : ${sec < 10 ? ` 0 ${sec}` : sec}`
    }

    const volumeChangeHandler = (e) => {
        setVolume(parseFloat(e.target.value))
        videoRef.current.volume = volume
    }
    const handleTogglePiP = () => {
        if (videoRef.current.pictureInPictureElement) {
            console.log(videoRef)
            videoRef.current
                    .exitPictureInPicture()
                    .then(() => {
                        console.log("a")
                        setIsPiPActive({show:true,type:"video",src})
                    })
                    .catch((error) => {
                        console.log(
                            'Failed to exit Picture-in-Picture mode:',
                            error
                        )
                    })
           
        } else {
            videoRef.current
            .requestPictureInPicture()
            .then(() => {
                setIsPiPActive({show:false,type:"video",src})
            })
            .catch((err) => {
                console.log(
                    'Failed to enable Picture-in-Picture mode:',
                    err
                )
            })
        }
    }
    const fullScreenHandler = () => {
        if (isFullScreen && mainRef.current.requestFullscreen()) {
            exitFullScreen()
        } else {
            enterFullScreen()
        }
    }

    const enterFullScreen = () => {
        if (mainRef.current.requestFullscreen)
            mainRef.current.requestFullscreen()
        else if (mainRef.current.mozRequestFullScreen)
            mainRef.current.mozRequestFullScreen()
        else if (mainRef.current.webkitRequestFullscreen)
            mainRef.current.webkitRequestFullscreen()
        else if (mainRef.current.msRequestFullscreen)
            mainRef.current.msRequestFullscreen()
        setIsFullScreen(true)
    }

    const exitFullScreen = () => {
        if (document.exitFullscreen) document.exitFullscreen()
        else if (document.mozCancelFullScreen) document.mozCancelFullScreen()
        else if (document.webkitExitFullscreen) document.webkitExitFullscreen()
        else if (document.msExitFullscreen) document.msExitFullscreen()
        setIsFullScreen(false)
    }
    return (
        <section className="my-1 h-[85%] relative "    ref={mainRef}>
            <div
                className="w-9/12 mx-auto flex items-center justify-center h-[80%]  rounded-xl relative z-[7]"
             
                onKeyDown={(e) =>
                    isFullScreen && e.key === 'Escape'
                        ? setIsFullScreen(false)
                        : null
                }
            >
                <video
                    src={src}
                    alt=""
                    className="w-auto h-full  rounded-xl  object-cover  aspect-auto min-w-[50%]"
                    type="video/mp4"
                    ref={videoRef}
                    onTimeUpdate={() =>
                        setCurrentTime(videoRef.current.currentTime)
                    }
                    onPlaying={() =>
                        setCurrentTime(videoRef.current.currentTime)
                    }
                    onLoadedMetadata={(e) => setDuration(e.target.duration)}
                >
                    <source src={src} type="video/mp4" size="576" />
                </video>
            </div>
            {/* controls */}
            <div className="absolute bottom-9 md:bottom-12 bg-base-200/80 left-1/2 z-10  gap-5 backdrop-blur-xl px-6 py-5  rounded-xl w-[97%] md:w-[50%] mx-auto -translate-x-1/2 space-y-5">
                {/* row */}
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-3">
                        <p className="dark:text-white text-gray-700">
                            {volume > 0 ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="21"
                                    height="21"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        d="M2 10v4c0 2 1 3 3 3h1.43c.37 0 .74.11 1.06.3l2.92 1.83c2.52 1.58 4.59.43 4.59-2.54V7.41c0-2.98-2.07-4.12-4.59-2.54L7.49 6.7c-.32.19-.69.3-1.06.3H5c-2 0-3 1-3 3z"
                                    ></path>
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1.5"
                                        d="M18 8a6.66 6.66 0 010 8M19.83 5.5a10.83 10.83 0 010 13"
                                    ></path>
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="21"
                                    height="21"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        d="M2 10.16v4c0 2 1 3 3 3h1.43c.37 0 .74.11 1.06.3l2.92 1.83c2.52 1.58 4.59.43 4.59-2.54V7.57c0-2.98-2.07-4.12-4.59-2.54L7.49 6.86c-.32.19-.69.3-1.06.3H5c-2 0-3 1-3 3z"
                                    ></path>
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeMiterlimit="10"
                                        strokeWidth="1.5"
                                        d="M22 14.12l-3.96-3.96M21.96 10.2L18 14.16"
                                    ></path>
                                </svg>
                            )}
                        </p>
                        <input
                            type="range"
                            min={0}
                            max={1}
                            step={0.01}
                            value={volume}
                            onChange={volumeChangeHandler}
                            className="range range-xs range-error md:w-full w-[90px]"
                        />
                    </div>

                    <div className="">
                        <button className="dark:text-white text-gray-600" onClick={playHandler}>
                            {!isPlay ? (
                                <FaPlay size={24} color="currentColor" />
                            ) : (
                                <FaPause size={24} color="currentColor" />
                            )}
                        </button>
                    </div>
                    <div className="flex items-center gap-x-1">
                        <button
                            onClick={fullScreenHandler}
                            className="btn  btn-ghost mask mask-squircle "
                        >
                            {!isFullScreen ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="21"
                                    height="21"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1.5"
                                        d="M2 9V6.5C2 4.01 4.01 2 6.5 2H9M15 2h2.5C19.99 2 22 4.01 22 6.5V9M22 16v1.5c0 2.49-2.01 4.5-4.5 4.5H16M9 22H6.5C4.01 22 2 19.99 2 17.5V15"
                                    ></path>
                                </svg>
                            ) : (
                                <BsFullscreenExit size={20} />
                            )}
                        </button>
                        <button
                            onClick={handleTogglePiP}
                            className="btn btn-square btn-ghost mask mask-squircle"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="23"
                                height="23"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.5"
                                    d="M9 22h6c5 0 7-2 7-7V9c0-5-2-7-7-7H9C4 2 2 4 2 9v6c0 5 2 7 7 7z"
                                ></path>
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.5"
                                    d="M12.6 18.5h3.8c1.5 0 2.1-.6 2.1-2.1v-1.8c0-1.5-.6-2.1-2.1-2.1h-3.8c-1.5 0-2.1.6-2.1 2.1v1.8c0 1.5.6 2.1 2.1 2.1z"
                                ></path>
                            </svg>
                        </button>
                    </div>
                </div>
                {/* row-2 */}
                <div className="flex items-center gap-3 justify-between">
                    <p className="text-xs">{formatTime(duration)}</p>
                    <input
                        type="range"
                        min={0}
                        max={duration}
                        value={currentTime}
                        className="range range-primary range-md md:w-[83%] w-[65%]"
                        onChange={(e) => seekHandler(e)}
                    />
                    <p className="text-xs flex items-end justify-end">
                        {formatTime(currentTime)}
                    </p>
                </div>
            </div>
        </section>
    )
}

export default VideoPlayer
