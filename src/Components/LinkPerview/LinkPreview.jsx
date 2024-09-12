import React from 'react'
import Microlink from '@microlink/react'

const LinkPreview = ({ text }) => {
  // const splitURl=url.split(' ')
  const urls = text.match(/(https?:\/\/[^\s]+)|(www\.[^\s]+)/g)

  const renderTextWithUrls = () => {
    let newText = text
    if (urls && !text?.includes('<img src=')) {
      urls.forEach((url) => {
        newText = newText.replace(
          url,
          `<a href="${url}" target="_blank" class="underline text-sm" rel='noreferrer noopener'>${url}</a>`
        )
      })
      return newText
    } else {
      return text
    }
  }

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: renderTextWithUrls() }}></div>
      {!text?.includes('<img src=')&&<Microlink url={urls} lazy={{ threshold: 0.5 }} className="min-w-[380px] h-[150px] mt-2 rounded-lg bg-transparent" dir="auto" />}
    </>
  )
}

export default LinkPreview
