import React, { useState, useRef, useEffect } from "react";
import WaveSurfer from "wavesurfer.js";
import { FaPlay, FaPause } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import ProgressFile from "../UI/ProgressFile/ProgressFile";

const formWaveSurferOptions = (ref) => ({
  container: ref,
  waveColor: "#4A426E",
  progressColor: "#8774e1",
  barGap: 4,
  barMinHeight: 1,
  barWidth: 3,
  barRadius: 3,
  responsive: true,
  height: 40,
  backend: "WebAudio",
  cursorColor: "transparent",
  
  // If true, normalize by the maximum peak instead of 1.0.
  normalize: true,
  // Use the PeakCache to improve rendering speed of large waveforms.
  partialRender: true,
});

const AudioFile = ({ path, size, name }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [wave, setWave] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef();
  const wavesurfRef = useRef(null);
  const waveFormRef = useRef();

  useEffect(() => {
    if (waveFormRef.current) {
      const option = formWaveSurferOptions(waveFormRef.current);
      wavesurfRef.current = WaveSurfer.create(option);

      wavesurfRef.current.load(audioRef.current.src);
      wavesurfRef.current.on("audioprocess", function() {
        setCurrentTime(wavesurfRef.current.getCurrentTime());
      });
    }


    return () => wavesurfRef.current.destroy();

   
  }, [path]);

  useEffect(() => {
    const audio = audioRef.current;
    audio.addEventListener("loadedmetadata", () => {
      setDuration(audio.duration);
    });
  }, [path, audioRef]);
 
  const controlAudioHandler = () => {
    setIsPlaying((prev) => !prev);
    wavesurfRef.current.playPause();
  };

  const formatSize = (bytes) => {
    if (bytes == 0) return "0 Bytes";
    var k = 1024,
      sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
      i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed()) + " " + sizes[i];
  };
  const formatTime = function(time) {
    let min = Math.floor(time / 60);
    let sec = Math.floor(time - min * 60);
    return `${min} : ${sec < 10 ? `0${sec}` : sec}`;
  };
  return (
    <li
      className={`file-item relative  w-full hover:bg-transparent h-fit min-w-[300px] px-2 py-3 gap-2`}
    >
      <div className="">
        <button className="btn btn-square" onClick={controlAudioHandler}>
          {!isPlaying ? <FaPlay /> : <FaPause />}
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
          <p className="text-xs text-gray-400 whitespace-nowrap ml-2">
            {currentTime && `${formatTime(currentTime)}  / `}{" "}
            {formatTime(duration)}
          </p>
        </div>
        <audio src={path} ref={audioRef} id="track"></audio>

        <div className="flex items-center self-end gap-2">
          <p className="text-[11px]">{formatSize(size)}</p>

          <ProgressFile />
        </div>
      </div>
    </li>
  );
};

export default AudioFile;
