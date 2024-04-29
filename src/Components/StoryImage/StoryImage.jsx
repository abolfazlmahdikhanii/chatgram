import React, { useState } from 'react'

const StoryImage = ({ src }) => {
  const [storyLoading, setStoryLoading] = useState(false)
  return (
    <>
      <img
        src={src}
        onLoad={() => setStoryLoading(true)}
        alt=""
        className={`w-full h-auto object-cover aspect-video`}
      />
      {!storyLoading && (
        <span className="loading loading-spinner loading-md"></span>
      )}
    </>
  )
}

export default StoryImage
