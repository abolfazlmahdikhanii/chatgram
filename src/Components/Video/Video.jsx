import React, { useEffect, useRef, useState } from 'react'
import Progress from '../UI/Progress/Progress'

const Video = ({ messageId, idType, onRemove, contextMenu, progress, src ,caption,autoPlay,isChatInfo}) => {
    const [currentTime, setCurrentTime] = useState(0)
    const [second,setSecond]=useState(0)
    const [isLongVideo,setIsLongVideo]=useState(false)
    const videoRef = useRef(null)

    const handleLoadedMetadata = () => {
        const video = videoRef.current
        if (video) {
            setCurrentTime(video.duration)
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
            onContextMenu={(e) => contextMenu(e, messageId, idType,isChatInfo)}
        >
            <div className=" flex items-center gap-1  px-2 absolute top-1 left-1 bg-gray-700/70 rounded-lg py-[1px]">
                <p className="text-gray-100 text-[10px]">
                    {formatTime(currentTime)}
                </p>
            </div>

            <Progress
                size={progress}
                onRemove={() => onRemove(messageId, idType)}
            />
            <video
                ref={videoRef}
                className="w-full h-full object-cover"
                autoPlay={!autoPlay||currentTime>=59?false:true}
                loop
                disablePictureInPicture
                playsInline
                muted
                onLoadedMetadata={handleLoadedMetadata}
            >
                <source src={src} />
            </video>
        </li>

    
    )
}

export default Video
