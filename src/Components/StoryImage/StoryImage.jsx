import React, { useCallback, useEffect, useState } from 'react'
import { supabase } from '../../superbase'

const StoryImage = (props) => {
  const [storyLoading, setStoryLoading] = useState(false)
  const [url, setUrl] = useState('')

  useEffect(() => {
    if (props.src) download(props.src)
  }, [])

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
      {!storyLoading && (
        <div className="skeleton-loader dark:bg-gray-600 bg-gray-300 w-full inset-0 absolute">
          <div className="shimmer-effect bg-gradient-to-tr dark:from-gray-600 dark:to-gray-500 from-gray-300 to-gray-200"></div>
        </div>
      )}
      <img
        src={url}
        onLoad={() => setStoryLoading(true)}
        alt=""
        className={`w-full h-auto object-contain max-h-[300px]`}
      />

      {storyLoading && props?.content?.description && (
        <div className="absolute z-30    w-full flex items-center justify-center">
          <p
            style={{
              fontSize: props?.content?.fontSize,
              color: props?.content?.color,
              top: props?.content?.y,
              left: props?.content?.x,
            }}
            className=" w-fit min-w-[110px] dark:bg-slate-700/40 max-h-[150px] text-center px-5 py-2.5 bg-slate-500/20 rounded-xl text-white backdrop-blur "
          >
            {props?.content?.description}
          </p>
        </div>
      )}
      {storyLoading && props?.link && (
        <div className="absolute -bottom-24 left-0 right-0  w-full flex items-center justify-center">
          <a
            href={props.link}
            rel="noreferrer"
            target="_blank"
            className=" w-10/12 mx-auto  bg-slate-500/20 max-h-[150px] text-center px-5 py-2.5  rounded-xl text-[#1677FF] backdrop-blur flex items-center gap-x-2 justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
              />
            </svg>

            {props?.linkTitle ? props.linkTitle : props.link}
          </a>
        </div>
      )}
    </>
  )
}

export default StoryImage
