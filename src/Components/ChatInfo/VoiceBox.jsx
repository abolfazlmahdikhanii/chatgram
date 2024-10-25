import React, {
  useState,
  useRef,
  useEffect,
  useContext,
  useCallback,
} from 'react'
import WaveSurfer from 'wavesurfer.js'
import { FaPlay, FaPause } from 'react-icons/fa'
import { MdOutlineDeleteOutline } from 'react-icons/md'
import ProgressFile from '../UI/ProgressFile/ProgressFile'
import { MusicControlContext } from '../../Context/MusicContext'
import { supabase } from '../../superbase'

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
  setClose,
}) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [wave, setWave] = useState(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [showName, setShowName] = useState(true)
  const [url, setUrl] = useState('')
  // const audioRef = useRef()
  const waveSurferRef = useRef(null)
  const waveFormRef = useRef()

  const { isPlay, playMusic, seekMusic, currentSong, currentTimeMusic,setIsPlay } =
    useContext(MusicControlContext)

    useEffect(() => {
        const options = formWaveSurferOptions(waveFormRef.current, isColor)
        waveSurferRef.current = WaveSurfer.create(options)
    
        // Load the audio file
        waveSurferRef.current.load(path)
    
        // Set duration and initial state for audio on WaveSurfer 'ready' event
        waveSurferRef.current.on('ready', () => {
          
          setDuration(waveSurferRef.current.getDuration())
          if (!name) setShowName(false)
          if (currentSong === path) {
            waveSurferRef.current.setTime(currentTimeMusic)
            setShowName(false)
          }
        })
        // Update current time as audio plays
        waveSurferRef.current.on('audioprocess', () => {
          setCurrentTime(waveSurferRef.current.getCurrentTime())
          seekMusic(
            waveSurferRef.current.getCurrentTime(),
            waveSurferRef.current.getDuration()
          )
        })
        // Reset audio to the beginning on finish
        waveSurferRef.current.on('finish', () => {
            waveSurferRef.current.setTime(0)
       
          setCurrentTime(0)
          setAudio(null)
          seekMusic(0, null)
          setIsPlay(false)
        })
    
        return () => waveSurferRef.current.destroy()
      }, [path,setAudio])
    
    
       // Toggle playback on button click
      const controlAudioHandler = () => {
        setAudio(path)
        // waveSurferRef.current.play()
        playMusic(path, waveSurferRef.current)
        setCurrentTime(waveSurferRef.current.getCurrentTime())
        setIsPlaying(!isPlaying)
      }

  const resetAudio = () => {
    waveSurferRef.current.setTime(0)
    setCurrentTime(0)
    setAudio(null)
    seekMusic(0, null)
    setIsPlay(false)
    setShowName(true);
};
  const formatTime = function (time) {
    let min = Math.floor(time / 60)
    let sec = Math.floor(time - min * 60)
    return `${min}:${sec < 10 ? `0${sec}` : sec}`
  }

  return (
    <li
      className={`file-item relative  w-full  h-fit min-w-[300px]  gap-2 transition-all py-2.5 px-3 rounded-xl duration-200 hover:bg-gray-700/30 cursor-pointer`}
      onContextMenu={(e) => {
        contextMenu(e, mid, true)
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
          {url === currentSong && !isPlay ? <FaPlay /> : <FaPause />}
        </button>
      </div>
      <div className="flex flex-col gap-2 max-w-[90%] w-full">
       {showName? <p className={`text-sm text-white font-semibold truncate w-full ml-2`}>
          {name}
        </p>: <p className={`text-sm text-white font-semibold truncate w-full ml-2`}>
          Voice
        </p>}

        <div
          className={`w-full h-[40px] overflow-hidden hidden`}
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
    </li>
  )
}

export default VoiceBox
