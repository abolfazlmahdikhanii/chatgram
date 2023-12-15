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
    from
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
        return `${min} : ${sec < 10 ? ` 0 ${sec}` : sec}`
    }

  
    return (
        <li
            className="w-full h-full overflow-hidden  rounded-xl flex-auto relative"
            onContextMenu={(e) => contextMenu(e, messageId, idType, isChatInfo)}
        >
            <div className=" flex items-center gap-1  px-2 absolute top-1 left-1 bg-gray-700/70 rounded-lg py-[1px]">
                <p className="text-gray-100 text-[10px]">
                    {formatTime(duration-currentTime)}
                </p>
            </div>

            <Progress
                size={progress}
                onRemove={() => onRemove(messageId, idType)}
            />
            <video
                ref={videoRef}
                className="w-full h-full object-cover max-w-full max-h-[370px]"
                // autoPlay={!autoPlay || currentTime >= 50 ? false : true}
                playsInline
                muted
                onLoadedMetadata={handleLoadedMetadata}
                onTimeUpdate={() =>
                    setCurrentTime(videoRef.current.currentTime)
                }
                onClick={(e) => {
                    setShowPreview({ show: true, type: 'video',from, src,messageId,caption })
                    console.log(caption)
                }}
            >
                <source src={src} />
            </video>
        </li>
    )
}

export default Video
