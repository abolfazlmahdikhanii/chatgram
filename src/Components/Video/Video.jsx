import React, { useEffect, useRef, useState } from 'react'
import Progress from '../UI/Progress/Progress'

const Video = ({
  messageId,
  idType,
  onRemove,
  contextMenu,
  progress,
  src,
  caption,
  autoPlay,
  isChatInfo,
  setShowPreview,
  from,
  onErrorVideo,
  isCompletedUploaded,
  onDownload,
  date,
  fileName,
  name
}) => {
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [second, setSecond] = useState(0)
  const [isLongVideo, setIsLongVideo] = useState(false)
  const [isAutoPlay, setIsAutoPlay] = useState(true)
  const videoRef = useRef(null)

  const handleLoadedMetadata = () => {
    const video = videoRef.current
    if (video) {
      setDuration(video.duration)
      videoRef.current.currentTime = currentTime
    }
  }
  const formatTime = function (time) {
    let min = Math.floor(time / 60)
    let sec = Math.floor(time - min * 60)
    //   setSecond(sec)
    return `${min}:${sec < 10 ? `0${sec}` : sec}`
  }

  return (
    <li
      className="w-full h-full overflow-hidden  rounded-xl flex-auto relative"
      onContextMenu={(e) => contextMenu(e, messageId, idType, isChatInfo)}
    >
      <div className=" flex items-center gap-1  px-2 absolute top-1 left-1 bg-gray-700/70 rounded-lg py-[1px]">
        <p className="text-gray-100 text-[10px]">
          {formatTime(duration - currentTime)}
        </p>
      </div>
      {!isCompletedUploaded ? (
        <Progress
          size={progress}
          onRemove={() => onRemove(messageId, idType)}
        />
      ) : (
        <button
          className={` mask mask-squircle w-7 h-7 grid place-items-center dark:text-white  rounded-lg self-end  dark:bg-base-100/40 border-[4px] border-transparent cursor-pointer  transition-all duration-300 bg-base-300/60 text-gray-600 dark:hover:bg-base-100 hover:bg-base-300 absolute top-1 right-1`}
          onClick={onDownload}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-3.5 h-3.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
            />
          </svg>
        </button>
      )}
      <video
        ref={videoRef}
        className="w-full h-full object-cover max-w-full max-h-[370px]"
        // autoPlay={!autoPlay || currentTime >= 50 ? false : true}

        muted
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={() => setCurrentTime(videoRef.current.currentTime)}
        onClick={(e) => {
          setShowPreview({
            show: true,
            type: 'video',
            from,
            src,
            messageId,
            caption,
            fileName,
            date,
            name
          })
        }}
        src={src}
        onError={onErrorVideo}
      >
        {/* <source src={src} /> */}
      </video>
    </li>
  )
}

export default Video
