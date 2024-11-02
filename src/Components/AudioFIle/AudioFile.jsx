import React, { useState, useRef, useEffect, useContext } from 'react'
import WaveSurfer from 'wavesurfer.js'
import { FaPlay, FaPause } from 'react-icons/fa'
import { MdOutlineDeleteOutline } from 'react-icons/md'
import ProgressFile from '../UI/ProgressFile/ProgressFile'
import { MusicControlContext } from '../../Context/MusicContext'

// Configuration options for WaveSurfer instance
const formWaveSurferOptions = (ref, isColor) => ({
  container: ref,
  waveColor: isColor ? '#A683E9' : '#4A426E',
  progressColor: isColor ? '#e5e7eb' : '#8774e1',
  barGap: 4,
  barMinHeight: 1,
  barWidth: 3,
  barRadius: 3,
  responsive: true,
  height: 40,
  backend: 'WebAudio',
  cursorColor: 'transparent',
  audioRate: 1,
  normalize: true,
  partialRender: true,
})

const AudioFile = ({ path, size, name, onRemove, isColor, setAudio,progress,url,onDownload,isCompletedUploaded }) => {
  const [isPlaying, setIsPlaying] = useState(true)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [showName, setShowName] = useState(true)

  // Refs for WaveSurfer and audio controls
  const waveFormRef = useRef()
  const wavesurfRef = useRef(null)
  const audioRef = useRef(null)

  const {
    isPlay,
    playMusic,
    seekMusic,
    currentSong,
    currentTimeMusic,
    setIsPlay,
  } = useContext(MusicControlContext)

  useEffect(() => {
    const options = formWaveSurferOptions(waveFormRef.current, isColor)
    wavesurfRef.current = WaveSurfer.create(options)

    // Load the audio file
    wavesurfRef.current.load(path)

    // Set duration and initial state for audio on WaveSurfer 'ready' event
    wavesurfRef.current.on('ready', () => {
      setDuration(wavesurfRef.current.getDuration())
      if (!name) setShowName(false)
      if (currentSong === path) {
        wavesurfRef.current.setTime(currentTimeMusic)
        setShowName(false)
      }
    })
    // Update current time as audio plays
    wavesurfRef.current.on('audioprocess', () => {
      setCurrentTime(wavesurfRef.current.getCurrentTime())
      seekMusic(
        wavesurfRef.current.getCurrentTime(),
        wavesurfRef.current.getDuration()
      )
      
    })
    // Reset audio to the beginning on finish
    wavesurfRef.current.on('finish', () => resetAudio());

   

    return () => {
      wavesurfRef.current.destroy()
      wavesurfRef.current = null;
    }
  }, [path, setAudio])

  const resetAudio = () => {
    if (wavesurfRef.current) {
      wavesurfRef.current.stop(); // Stop playback
      wavesurfRef.current.setTime(0); // Reset to the beginning
    }
    setCurrentTime(0); // Reset current time
    setIsPlaying(false); // Set playing state to false
    setAudio(null); // Reset the current audio
    seekMusic(0, 0); // Reset music context state
    setIsPlay(false);
// Update context state
  };

   // Toggle playback on button click
  const controlAudioHandler = () => {
    setAudio(path)
    playMusic(path, wavesurfRef.current)
    setCurrentTime(wavesurfRef.current.getCurrentTime())
    setIsPlaying(!isPlaying)
  }

  const formatSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`
  }

  const formatTime = (time) => {
    const min = Math.floor(time / 60)
    const sec = Math.floor(time % 60)
    return `${min}:${sec < 10 ? `0${sec}` : sec}`
  }

  return (
    <li className="file-item-1 relative min-w-[220px] w-full h-fit md:min-w-[300px] px-2 py-3 gap-2 ">
      <button
        className={`btn btn-square text-indigo-600 ${
          isColor ? 'bg-gray-200 text-primary ' : ''
        }`}
        onClick={controlAudioHandler}
      >
        {path === currentSong && isPlay ? <FaPause /> : <FaPlay />}
      </button>
      <div className="flex flex-col gap-2 max-w-[90%] w-full">
        {name && showName && (
          <p className="max-w-[240px] truncate ml-2">{name}</p>
        )}
        <div
          ref={waveFormRef}
          className={`w-full h-[40px] ${!showName ? 'block' : 'hidden'} `}
        ></div>
        <p
          className={`text-xs ml-2 ${
            isColor ? 'text-gray-200' : 'text-gray-400'
          }`}
        >
          {`${formatTime(currentTime)} / ${formatTime(duration)}`}
        </p>
        {/* <audio src={path} ref={audioRef} className="track"></audio> */}
        <div className="flex items-center self-end gap-2">
          <p className="text-[11px]">{formatSize(size)}</p>
          <ProgressFile progress={progress}  onDownload={onDownload} isCompletedUploaded={isCompletedUploaded} />
        
        </div>
      </div>
    </li>
  )
}

export default AudioFile
