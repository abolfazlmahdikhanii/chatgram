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

const VoiceBox = ({
    path,
    size,
    name,
    onRemove,
    isColor,
    caption,
    setAudio,
    remove,
    mid,
    id,
    contextMenu,
    setClose
}) => {
    const [isPlaying, setIsPlaying] = useState(true)
    const [wave, setWave] = useState(null)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [showName, setShowName] = useState(true)
    // const audioRef = useRef()
    const wavesurfRef = useRef(null)
    const waveFormRef = useRef()

    const { isPlay, playMusic, seekMusic, currentSong, currentTimeMusic } =
        useContext(MusicControlContext)
    const audioRef = useRef(null)

    useEffect(() => {
        if (waveFormRef.current) {
            const option = formWaveSurferOptions(waveFormRef.current, isColor)
            wavesurfRef.current = WaveSurfer.create(option)
            wavesurfRef.current.load(audioRef.current.src)

            wavesurfRef.current.on('ready', function () {
                setDuration(wavesurfRef.current.getDuration())
                setCurrentTime(wavesurfRef.current.getCurrentTime())
                if (!name) {
                    setShowName(false)
                }
                if (currentSong === path) {
                    wavesurfRef.current.setTime(currentTimeMusic)
                    setShowName(false)
                }
            })
            wavesurfRef.current.on('audioprocess', function () {
                setCurrentTime(wavesurfRef.current.getCurrentTime())
                seekMusic(
                    wavesurfRef.current.getCurrentTime(),
                    wavesurfRef.current.getDuration()
                )
            })
            wavesurfRef.current.on('finish', () => {
                wavesurfRef.current.setTime(0)

                setCurrentTime(0)
                setAudio(null)
                seekMusic(0, wavesurfRef.current.getDuration())
                setShowName(true)
            })
        }

        return () => wavesurfRef.current.destroy()
    }, [])

    const handleLoadedMetadata = (e) => {
        console.log(audioRef.current?.metadata?.artist)
    }
    const controlAudioHandler = () => {
        setAudio(path)
        playMusic(path, wavesurfRef.current)
        setCurrentTime(wavesurfRef.current.getCurrentTime())
        setIsPlaying((prev) => !prev)
    }

    const formatTime = function (time) {
        let min = Math.floor(time / 60)
        let sec = Math.floor(time - min * 60)
        return `${min} : ${sec < 10 ? ` 0 ${sec}` : sec}`
    }

    return (
        <li
            className={`file-item relative  w-full  h-fit min-w-[300px]  gap-2 transition-all py-2.5 px-3 rounded-xl duration-200 hover:bg-gray-700/30 cursor-pointer`}
            onContextMenu={(e)=>{
                contextMenu(e,mid,true)
                
            }}
        >
            <div className="">
                <button
                    className={`btn btn-square btn-primary mask mask-squircle ${
                        isColor
                            ? 'bg-gray-200 text-primary border-none hover:bg-gray-200'
                            : ''
                    }`}
                    onClick={controlAudioHandler}
                >
                    {path === currentSong && isPlay ? <FaPlay /> : <FaPause />}
                </button>
            </div>
            <div className="flex flex-col gap-2 max-w-[90%] w-full">
                <p
                    className={`text-sm text-white font-semibold truncate w-full ml-2`}
                >
                    {name}
                </p>
                

                    <div
                        className={`w-full h-[40px] overflow-hidden hidden
                        }`}
                        ref={waveFormRef}
                    ></div>

                    <p
                        className={`text-xs  whitespace-nowrap ml-2 ${
                            isColor ? 'text-gray-200' : 'text-gray-400'
                        }`}
                    >
                        {currentTime && `${formatTime(currentTime)}  / `}
                        {formatTime(duration)}
                    </p>
                </div>
                <audio
                    src={path}
                    ref={audioRef}
                    onLoadedMetadata={handleLoadedMetadata}
                    className="track"
                ></audio>

        
        </li>
    )
}

export default VoiceBox
