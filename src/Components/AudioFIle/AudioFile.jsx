import React, { useState, useRef, useEffect, useContext } from 'react'
import WaveSurfer from 'wavesurfer.js'
import { FaPlay, FaPause } from 'react-icons/fa'
import { MdOutlineDeleteOutline } from 'react-icons/md'
import ProgressFile from '../UI/ProgressFile/ProgressFile'
import { MusicControlContext } from '../../Context/MusicContext'

const formWaveSurferOptions = (ref, isColor) => ({
    container: ref,
    waveColor: !isColor ? '#4A426E' : '#A683E9',
    progressColor: !isColor ? '#8774e1' : '#e5e7eb',
    barGap: 4,
    barMinHeight: 1,
    barWidth: 3,
    barRadius: 3,
    responsive: true,
    height: 40,
    backend: 'WebAudio',
    cursorColor: 'transparent',
    audioRate: 1,
    // If true, normalize by the maximum peak instead of 1.0.
    normalize: true,
    // Use the PeakCache to improve rendering speed of large waveforms.
    partialRender: true,
})

const AudioFile = ({
    path,
    size,
    name,
    onRemove,
    isColor,
    caption,
    setAudio,
}) => {
    const [isPlaying, setIsPlaying] = useState(false)
    const [wave, setWave] = useState(null)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const audioRef = useRef()
    const wavesurfRef = useRef(null)
    const waveFormRef = useRef()

    const {
      isPlay,
        playMusic,
        seekMusic

    } = useContext(MusicControlContext)

    useEffect(() => {
        if (waveFormRef.current) {
         
            const option = formWaveSurferOptions(waveFormRef.current, isColor)
            wavesurfRef.current = WaveSurfer.create(option)

            wavesurfRef.current.load(audioRef.current.src)
    
            wavesurfRef.current.on('ready', function () {
                setDuration(wavesurfRef.current.getDuration())
             
            })
            wavesurfRef.current.on('audioprocess', function () {
                setCurrentTime(wavesurfRef.current.getCurrentTime())
                seekMusic(wavesurfRef.current.getCurrentTime());
               
            })
            wavesurfRef.current.on('finish', () => {
              wavesurfRef.current.destroy()
              setCurrentTime(0)
              setAudio(null)
            })
          
        }

        return () => wavesurfRef.current.destroy()
    }, [path])
  
    const handleLoadedMetadata = () => {
        setAudio(audioRef)
    }
    const controlAudioHandler = () => {
      setAudio(path)
        playMusic(path,wavesurfRef.current,duration)
        setIsPlaying((prev) => !prev)
       
    //  wavesurfRef.current.playPause()
    }

    const formatSize = (bytes) => {
        if (bytes == 0) return '0 Bytes'
        var k = 1024,
            sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
            i = Math.floor(Math.log(bytes) / Math.log(k))
        return parseFloat((bytes / Math.pow(k, i)).toFixed()) + ' ' + sizes[i]
    }
    const formatTime = function (time) {
        let min = Math.floor(time / 60)
        let sec = Math.floor(time - min * 60)
        return `${min} : ${sec < 10 ? ` 0 ${sec}` : sec}`
    }

    return (
        <li
            className={`file-item relative  w-full hover:bg-transparent h-fit min-w-[300px] px-2 py-3 gap-2`}
        >
            <div className="">
                <button
                    className={`btn btn-square ${
                        isColor
                            ? 'bg-gray-200 text-primary border-none hover:bg-gray-200'
                            : ''
                    }`}
                    onClick={controlAudioHandler}
                >
                    {!isPlay ? <FaPlay /> : <FaPause />}
                </button>
            </div>
            <div className="flex flex-col gap-2 max-w-[90%] w-full">
                {/* <p className={`text-sm text-white font-semibold truncate w-full `}>
          {name}
        </p> */}
                <div className="flex flex-col w-full gap-3">
                    <div
                        className="w-full h-[40px] overflow-hidden"
                        ref={waveFormRef}
                    ></div>
                    <p
                        className={`text-xs  whitespace-nowrap ml-2 ${
                            isColor ? 'text-gray-200' : 'text-gray-400'
                        }`}
                    >
                        {currentTime && `${formatTime(currentTime)}  / `}{' '}
                        {formatTime(duration)}
                    </p>
                </div>
                <audio src={path} ref={audioRef} className="track"></audio>

                <div className="flex items-center self-end gap-2">
                    <p className="text-[11px]">{formatSize(size)}</p>

                    <ProgressFile onRemove={onRemove} />
                </div>
            </div>
        </li>
    )
}

export default AudioFile
