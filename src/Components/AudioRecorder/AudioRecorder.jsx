import React, { useState, useEffect, useRef } from 'react'

import { AudioVisualizer, LiveAudioVisualizer } from 'react-audio-visualize'
import { FaPlay, FaPause } from 'react-icons/fa'
import { MdDeleteOutline } from 'react-icons/md'
import AlertBox from '../UI/AlertBox/AlertBox'

const AudioRecorders = ({
  record = false,
  setRecord,
  setMessage,
  setShowAlert,
}) => {
  const [recording, setRecording] = useState(false)
  const [paused, setPaused] = useState(false)
  const [audioChunks, setAudioChunks] = useState([])
  const [mediaRecorder, setMediaRecorder] = useState(null)
  const [audioStream, setAudioStream] = useState(null)
  const [timer, setTimer] = useState(0)
  const [audioUrl, setAudioUrl] = useState('')

  const audios = []
  const [isMobileView, setIsMobileView] = useState(false); // New state for responsiveness

  // Function to check the screen size and set isMobileView accordingly
  const handleResize = () => {
    setIsMobileView(window.matchMedia('(max-width: 768px)').matches);
  };

  // Add event listener to handle screen size change
  useEffect(() => {
    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  useEffect(() => {
    const requestAudioPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        })
        const recorder = new MediaRecorder(stream)

        recorder.ondataavailable = (e) => handleDataAvailable(e.data)
        recorder.onstop = handleStop

        setAudioStream(stream)
        setMediaRecorder(recorder)
      } catch (error) {
        setShowAlert(true)
        setRecord(false)
      }
    }

    requestAudioPermission()
    return () => audioStream?.getTracks().forEach((track) => track.stop())
  }, [])

  // Start recording when record is set to true
  useEffect(() => {
    if (record && mediaRecorder) {
      startRecording()
    }
  }, [record, mediaRecorder])

  // Update timer while recording and not paused
  useEffect(() => {
    let interval
    if (recording && !paused) {
      interval = setInterval(() => setTimer((prev) => prev + 1), 1000)
    }
    return () => clearInterval(interval)
  }, [recording, paused])

  // Handlers
  const startRecording = () => {
    if (!recording && mediaRecorder) {
      mediaRecorder.start()
      setRecording(true)
      setPaused(false)
      setTimer(0)
    }
  }

  const togglePauseResume = () => {
    if (mediaRecorder) {
      if (paused) {
        mediaRecorder.resume()
        setPaused(false)
      } else {
        mediaRecorder.pause()
        setPaused(true)
      }
    }
  }

  const stopRecording = () => {
    if (mediaRecorder && recording) {
      mediaRecorder.stop()
      setRecording(false)
      setPaused(false)
      setTimer(0)
      audioStream?.getTracks().forEach((track) => track.stop())
    }
  }

  const handleDataAvailable = (data) => {
    const audioBlob = new Blob([data], { type: 'audio/webm' })
    if (audioBlob.size) {
      sendAudioHandler(audioBlob)
    }
  }

  const handleStop = () => {
    // Called when mediaRecorder stops
  }

  const sendAudioHandler = (blob) => {
    setMessage(blob, null, URL.createObjectURL(blob))
    setRecord(false)
  }

  // Helper: Format timer
  const formatTimer = (time) => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, '0')
    const seconds = (time % 60).toString().padStart(2, '0')
    return `${minutes}:${seconds}`
  }

  return (
    <div className="flex items-center gap-1 md:gap-4 w-full">
      <div
        className={`py-2 px-3 dark:bg-base-200 w-full  rounded-xl recorder-box  items-center bg-base-300/80 overflow-hidden  backdrop-blur-xl ${
          record ? 'flex' : 'hidden'
        } `}
      >
        <div className="w-full flex items-center md:gap-5 gap-2">
          <button
            className="bg-indigo-600 py-2.5 px-[18px] text-white h-12 rounded-xl mask-squircle mask"
            onClick={togglePauseResume}
          >
            {!paused ? <FaPause /> : <FaPlay />}
          </button>
          <div className="md:w-[340px] w-[100%]">
            {mediaRecorder && (
              <LiveAudioVisualizer
                mediaRecorder={mediaRecorder}
                width={isMobileView?'100%':340}
                height={40}
                gap={4}
                barColor={'#4f46e5'}
                className="md:w-[350px]"
              />
            )}
          </div>
        </div>
        <div className="md:ml-7 flex items-center md:gap-7 md:pr-3 ">
          <p className="flex gap-2.5 items-center ">
            <span className="relative md:flex h-4 w-4 hidden">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-300 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
            </span>
            <span className="dark:text-white whitespace-nowrap text-sm text-gray-800">
              {formatTimer(timer)}
            </span>
          </p>
        </div>
        {audioUrl && (
          <audio src={URL.createObjectURL(audioUrl)} controls></audio>
        )}
      </div>

      {/* action */}
      <div className="flex items- gap-1 md:gap-2.5 md:ml-1">
        <button
          className="bg-neutral py-1 btn  text-white  rounded-xl mask-squircle mask h-full px-[14px]"
          onClick={() => {
            setRecord(false)
            setRecording(false)
          }}
        >
          <MdDeleteOutline size={26} color="#dc2626" />
        </button>
        <button
          className="h-full px-[16px] btn btn-primary rounded-xl max-w-[60px] mask-squircle mask"
          onClick={stopRecording}
        >
          <svg
            width={19}
            height={19}
            className={`pointer-events-none inline-flex `}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.51 4.23l8.56 4.28c3.84 1.92 3.84 5.06 0 6.98l-8.56 4.28c-5.76 2.88-8.11.52-5.23-5.23l.87-1.73c.22-.44.22-1.17 0-1.61l-.87-1.74C1.4 3.71 3.76 1.35 9.51 4.23zM5.44 12h5.4"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default AudioRecorders
