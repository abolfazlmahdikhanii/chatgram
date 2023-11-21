import React, { useState, useRef, useEffect, useContext } from 'react'
import { FaBackward } from 'react-icons/fa6'
import { FaPlay } from 'react-icons/fa6'
import { FaForward } from 'react-icons/fa6'
import { FaPause } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'
import { MusicControlContext } from '../../Context/MusicContext'

const PinAudio = ({ path }) => {
    const [check,setCheck]=useState(false)
    const { isPlay, currentSong, currentTimeMusic, playMusic, pauseMusic, seekMusic,durationMusic,containerBox,playbackRateMusic } = useContext(MusicControlContext);


    const togglePlay = () => {   
            playMusic(currentSong,containerBox,durationMusic)
    }

   

    const handlePlayBackRate = (e) => {
        e.target.checked
            ? (playbackRateMusic(2,true))
            : (playbackRateMusic(1,false))
    }

    return (
        <div className="py-2 px-4 bg-base-200  flex items-center  justify-between sticky top-0 relative">
            <div className="flex items-center gap-2  justify-between w-full">
                <div className="flex items-center gap-x-0.5">
                    <button className="btn text-indigo-600 ">
                        <FaBackward size={19} />
                    </button>
                    <button
                        className="btn text-indigo-600 "
                        onClick={togglePlay}
                    >
                        {!isPlay ? (
                            <FaPlay size={18} />
                        ) : (
                            <FaPause size={18} />
                        )}
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
                            onChange={(e) => {
                                setCheck((prev) => !prev)
                                handlePlayBackRate(e)
                            }}
                        />
                        <span
                            className={`font-sans ${
                                check ? 'text-indigo-500' : ''
                            }`}
                        >
                            2X
                        </span>
                    </label>
                    <button className="btn">
                        <IoClose size={21} />
                    </button>
                </div>
            </div>
            <div
                className="absolute -bottom-2 left-0 "
                style={{
                    width: `${
                        (currentTimeMusic / durationMusic) * 100
                    }%`,
                }}
            >
                <progress
                    // onClick={handleProgressBarClick}
                    className="h-1 border-[1px] progress-primary  progress  w-full hover:border-[3px] transition-all duration-300"
                    value={`${
                        (currentTimeMusic /durationMusic) * 100
                    }`}
                    max="100"
                ></progress>
            </div>

           
        </div>
    )
}

export default PinAudio
