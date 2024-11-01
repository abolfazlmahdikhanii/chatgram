import React from 'react'
import { BiCheckDouble, BiCheck } from 'react-icons/bi'
import { BsFillPinAngleFill } from 'react-icons/bs'
import { Watch } from 'react-loader-spinner'

const FooterMessage = ({
  message,
  date,
  status,
  edited,
  pin,
  reaction,
  messageType,
  caption,
}) => {
  const getStatusIcon = () => {
    switch (status) {
      case 'read':
        return <BiCheckDouble size={14} />
      case 'send':
        return <BiCheck size={14} />
      default:
        return (
          <Watch
            height="10"
            width="10"
            radius="48"
            color="#ffff"
            ariaLabel="watch-loading"
            visible={true}
          />
        )
    }
  }

  const icon = getStatusIcon()

  const isFileOrText =
    messageType === 'file' ||
    messageType?.includes('audio') ||
    messageType === 'mp3' ||
    messageType === 'text' ||
    reaction ||
    caption

  const containerClasses = isFileOrText
    ? `flex items-center gap-1 mt-1 px-3 justify-end chat-footer -mr-4 ${
        messageType?.includes('img') || messageType?.includes('video')
          ? 'w-full'
          : ''
      }`
    : `flex items-center gap-1 px-1.5 absolute ${
        !reaction ? 'bottom-2' : 'bottom-[21%]'
      } right-4 bg-gray-700/60 rounded-lg py-[1px] mt-2`

  return (
    <div className={containerClasses}>
      {isFileOrText && (
        <>
          {edited && (
            <p className="dark:text-gray-400 text-gray-300 text-[12px] mr-0.5 italic">
              edited
            </p>
          )}
        </>
      )}
      {pin && (
        <p className="dark:text-gray-500 text-gray-400 text-[12px] mr-1.5">
          <BsFillPinAngleFill size={12} />
        </p>
      )}
      <p
        className={`${
          isFileOrText
            ? 'dark:text-gray-400 text-gray-300 text-[10px]'
            : 'text-gray-200 text-[10px]'
        }`}
      >
        {date}
      </p>
      {icon}
    </div>
  )
}

export default FooterMessage
