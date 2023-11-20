import React, { useState,useRef } from 'react'
import { FaBackward } from 'react-icons/fa6'
import { FaPlay } from 'react-icons/fa6'
import { FaForward } from 'react-icons/fa6'
import { FaPause } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'

const PinAudio = ({path}) => {
  console.log(path)
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
    const [check, setCheck] = useState(false)
    const togglePlay = () => {
        if (isPlaying) {
          audioRef.current.pause();
        } else {
          audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
      };
    
      const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current.currentTime);
      };
      const handleProgressBarClick = (e) => {
        const clickPosition=e.pageX-e.target.offsetLeft;
        const progressBarWidth = e.target.offsetWidth;
        const duration = audioRef.current.duration;
        const newPosition=(clickPosition/progressBarWidth)*duration;
        audioRef.current.currentTime = newPosition;
    setCurrentTime(newPosition);
      }


    return (
        <div className="py-2 px-4 bg-base-200  flex items-center  justify-between sticky top-0 relative">
            <div className="flex items-center gap-2  justify-between w-full">
                <div className="flex items-center gap-x-0.5">
                    <button className="btn text-indigo-600 ">
                        <FaBackward size={19} />
                    </button>
                    <button className="btn text-indigo-600 " onClick={togglePlay}>
                        <FaPlay size={18} />
                    </button>
                    <button className="btn text-indigo-600 ">
                        <FaForward size={19} />
                    </button>
                </div>
                <div className="flex items-center gap-0.5">
                    <label htmlFor="chk" className=" btn text-lg relative ">
                        <input
                            type="checkbox"
                            className="absolute top-0 opacity-0"
                            id="chk"
                            onChange={() => setCheck((prev) => !prev)}
                        />
                        <span className={`font-sans ${check ? 'text-indigo-500' : ''}`}>
                            2X
                        </span>
                    </label>
                    <button className="btn">
                        <IoClose size={21} />
                    </button>
                </div>
            </div>
            <div className='absolute -bottom-2 left-0 '
            style={{width:`${(currentTime / audioRef?.current?.duration) * 100}%`}}
            >
                <progress
                        onClick={handleProgressBarClick}

                    className="h-1 border-[2px] progress progress-primary  w-full"
                    value={`${(currentTime / audioRef?.current?.duration) * 100}`}
                    max="100"
 
                ></progress>
            </div>

            <audio 
            ref={audioRef}
            src={path}
            onTimeUpdate={handleTimeUpdate}
            ></audio>
        </div>
    )
}

export default PinAudio
