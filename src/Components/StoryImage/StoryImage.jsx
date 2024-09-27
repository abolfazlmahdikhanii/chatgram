import React, { useCallback, useEffect, useState } from 'react'
import { supabase } from '../../superbase'

const StoryImage = ({ src,onLoad }) => {
  const [storyLoading, setStoryLoading] = useState(false)
  const [url,setUrl]=useState("")

  useEffect(()=>{
    if(src) download(src)
  },[])

  const download = useCallback(async (path) => {
    const groupFile = []

    // if (findItem(messageId)) return false
    supabase.storage
      .from('uploads')
      .download(path)
      .then((res) => {
        const fr = new FileReader()
        fr.addEventListener('load', (ev) => {
          setUrl(ev.target.result)
        })
        fr.readAsDataURL(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  return (
    <>
      <img
        src={url}
        onLoad={() => setStoryLoading(true)}
        alt=""
        className={`w-full h-auto object-cover aspect-video`}
       onError={(e)=>e.currentTarget.innerHTML=`<div className="bg-black"></div>`}
      />
      {!storyLoading && (
        <span className="loading loading-spinner loading-md absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></span>
      )}
    </>
  )
}

export default StoryImage
