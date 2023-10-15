import React, { useState, useEffect, useRef } from "react";

import { AudioVisualizer, LiveAudioVisualizer } from "react-audio-visualize";
import { FaPlay, FaPause } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

const AudioRecorders = ({ record = false, setRecord, setMessage }) => {
  const [recording, setRecording] = useState(false);
  const [paused, setPaused] = useState(false);
  const [audioChunks, setAudioChunks] = useState([]);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioStream, setAudioStream] = useState(null);
  const [timer, setTimer] = useState(0);
  const [audioUrl, setAudioUrl] = useState("");
  const audios = [];

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true,video:false })
      .then((stream) => {
        const chunks = [];
        setAudioStream(stream);
        const recorder = new MediaRecorder(stream);

        recorder.ondataavailable = (e) => {
       
          chunks.push(e.data);
        };


        recorder.onstop = () => {

         
          const audioBlob = new Blob(chunks,{type:"audio/webm"});

          
      
 
        
            if(audioBlob.size===0) return
            sendAudioHandler(audioBlob);
        
        
      
        };

        setMediaRecorder(recorder);
      })
      .catch((err) => console.log(err));

    return () => {
      if (audioStream) {
        audioStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);
  useEffect(() => {
    startRecordingHandler();
  }, [record, mediaRecorder]);
  useEffect(() => {
    let intervalId;

    if (recording && !paused) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [recording, paused]);

  const startRecordingHandler = () => {
    if (!recording && mediaRecorder) {
      mediaRecorder.start();
      setRecording(true);
      setPaused(false);
      setTimer(0);
    }
  };

  const togglePauseResume = () => {
    if (recording && mediaRecorder) {
      if (!paused) {
        mediaRecorder.pause();
        setPaused(true);
      }
      if (paused) {
        mediaRecorder.resume();
        setPaused(false);
      }
    }
  };
  const formatTimer = (time) => {
    const second = time % 60;
    const min = Math.floor(time / 60);

    return `${min < 10 ? `0${min}` : `${min}`} : ${
      second < 10 ? `0${second}` : `${second}`
    }`;
  };
  const stopRecording = () => {
    if (recording && mediaRecorder) {
      mediaRecorder.stop();
      setRecording(false);
      setPaused(false);
      setAudioChunks([]);
      setTimer(0);

      if (audioStream) {
        audioStream.getTracks().forEach((track) => track.stop());
      }
    }
  };
  const sendAudioHandler = (url) => {
    // stop and reset recorder
  
    const audioMessage = {
      id: crypto.randomUUID(),
      src: URL.createObjectURL(url),
      size: url?.size,
      name: "",
      type: "mp3",
    };
    audios.push(audioMessage);
    console.log(audioMessage);
    setRecord(false)
    // send
    setMessage(audios);
  };

  return (
    <div className="flex items-stretch gap-4">
      <div
        className={`py-2 px-3 bg-base-200   rounded-xl recorder-box  items-center ${
          record ? "flex" : "hidden"
        } `}
      >
        <div className="w-full flex items-center gap-5">
          <button
            className="bg-indigo-600 py-2.5 px-[18px] text-white h-12 rounded-xl mask-squircle mask"
            onClick={togglePauseResume}
          >
            {!paused ? <FaPause /> : <FaPlay />}
          </button>
          <div className="w-full">
            {mediaRecorder && (
              <LiveAudioVisualizer
                mediaRecorder={mediaRecorder}
                width={380}
                height={40}
                gap={4}
                barColor={"#4f46e5"}
              />
            )}
          </div>
        </div>
        <div className="ml-7 flex items-center gap-7 pr-3">
          <p className="flex gap-2.5 items-center ">
            <span className="relative flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-300 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
            </span>
            <span className="text-white whitespace-nowrap text-sm">
              {formatTimer(timer)}
            </span>
          </p>
        </div>
        {audioUrl && <audio src={URL.createObjectURL(audioUrl)} controls></audio>}
      </div>

      {/* action */}
      <div className="flex items-center gap-2.5 ml-1">
        <button
          className="bg-neutral py-1  text-white  rounded-xl mask-squircle mask h-full px-[14px]"
          onClick={() => setRecord(false)}
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
  );
};

export default AudioRecorders;
