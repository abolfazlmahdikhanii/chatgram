import { createContext,useMemo,useState,useRef, useEffect, useCallback } from "react";

export const MusicControlContext=createContext({
    isPlay:false,
    currentSong:null,
    currentTimeMusic:0,
    durationMusic:0,

    playBackRate:{speed:1,isSpeed:true},
    containerBox:null,
    playMusic: () => {},
    playbackRateMusic: () => {},
    seekMusic: () => {},
})

export const MusicControlProvider = ({ children }) => {
    const [isPlay, setIsPlay] = useState(false);
    const [currentSong, setCurrentSong] = useState(null);
    const [containerBox, setContainerBox] = useState(null);
    const [currentTimeMusic, setCurrentTimeMusic] = useState(0);
    const [durationMusic,setDurationMusic]=useState(0)
    const [playBackRate,setPlayBackRate]=useState(1)


  
    const playMusic = useCallback((song,container=containerBox) => {

      if(currentSong!==song){
        setCurrentTimeMusic(0)
      }
      setCurrentSong(song);
      
      container.playPause()
      container.setTime(currentTimeMusic)
      setIsPlay(prev=>!prev);
      setContainerBox(container)
   
      
   

     
    },[currentTimeMusic]);
  
   const playbackRateMusic=(speed,isSpeed)=>{
    // containerBox.setPlaybackRate(speed)
    containerBox.setPlaybackRate(speed,isSpeed)
    setPlayBackRate({speed,isSpeed})
    containerBox.play()
   }
  
    const seekMusic = (time,duration) => {
      setCurrentTimeMusic(time);
      setDurationMusic(duration)
     
    };
  
    return (
      <MusicControlContext.Provider
        value={{
          isPlay,
          currentSong,
          currentTimeMusic,
          playMusic,
          seekMusic,
          durationMusic,
          playBackRate,
          playbackRateMusic,
          setIsPlay
        }}
      >
        {children}
    
      </MusicControlContext.Provider>
    );
  }
  
 