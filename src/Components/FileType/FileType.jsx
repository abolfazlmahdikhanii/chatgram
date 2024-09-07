import React, { useCallback, useContext, useEffect, useState } from 'react'
import FileItem from '../FIleItem/FileItem'
import Progress from '../UI/Progress/Progress'
import AudioFile from '../AudioFIle/AudioFile'
import Video from '../Video/Video'
import FileIcon from '../UI/FIleIcon/FileIcon'
import { ChatContext } from '../../Context/ChatContext'
import { supabase } from '../../superbase'

const FileType = ({
  mType,
  src,
  name,
  size,
  progress,
  id,
  from,
  path,
  idType,
  messageId,
  isColor,
  caption,
  autoPlay = true,
  imgSize,
  isFile = true,
  isChatInfo = false,
  contextMenu,
  senderID,
  source
}) => {
  const {
    removeMessages,
    setShowPreview,
    setAudio,
    setFileUrl,
    fileProgress,
    chatId,
    setFile,
    setVoice,
    setType,
    type,
    file,
    voice,
  } = useContext(ChatContext)

  let mFile = null
  const [url, setUrl] = useState('')

  useEffect(() => {
    if (src) download(src)
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
  // const findItem = (id) => {
  //   return url.find((item) => item.messageID === id)
  // }

  if (mType == 'video') {
    mFile = (
      <Video
        contextMenu={contextMenu}
        progress={progress}
        messageId={messageId}
        idType={idType}
        src={url}
        onRemove={removeMessages}
        autoPlay={autoPlay}
        isChatInfo={isChatInfo}
        setShowPreview={setShowPreview}
        from={from}
        caption={caption}
      />
    )
    const findedLink = type.find((item) => item.messageid === messageId)
    if (!findedLink)
      setType((prev) => [
        ...prev,
        { content: url, messageid: messageId, messageType: mType },
      ])
  } else if (
    mType == 'mp3' ||
    mType == 'audio/webm' ||
    mType?.includes('audio')
  ) {
   
    mFile = (
      <AudioFile
        path={url}
        size={size}
        name={name}
        onRemove={() => removeMessages(messageId, idType)}
        isColor={isColor}
        setAudio={setAudio}
      />
    )

    const findedLink = voice.find((item) => item.messageid === messageId)
    if (!findedLink&&url)
    setVoice((prev) => [
      ...prev,
      {
        content: url,
        messageid: messageId,
        messageType: mType,
        name,
        senderid: senderID,
      },
    ])
  } else if (mType == 'img') {

    mFile = (
      <li
        className={` ${
          imgSize ? 'h-[100px]' : 'h-[210px]'
        } overflow-hidden inline-block rounded-xl basis-[40%]  dark:bg-gray-200/20 flex-grow flex-1 relative bg-gray-400/20`}
        onContextMenu={(e) => contextMenu(e, messageId, idType, isChatInfo)}
      >
        <Progress
          size={fileProgress}
          onRemove={() => removeMessages(messageId, idType)}
        />
        <img
          src={path ? path : url}
          alt=""
          className="object-cover w-full h-full rounded-xl min-w-[170px]"
          onClick={() =>
            setShowPreview({
              show: true,
              type: 'img',
              from,
              src: url,
              messageId,
              caption,
            })
          }
        />
      </li>
    )
    const findedLink = type.find((item) => item.messageid === messageId)
    if (!findedLink&&url)
    setType((prev) => [
      ...prev,
      { content:url, messageid: messageId, messageType: mType },
    ])
  } else if (mType == 'file' && !isFile) {
    mFile = (
      <div>
        <FileIcon
          type={mType}
          path={src ? src : ''}
          message={true}
          from={from}
          isColor={isColor}
          isFile={false}
          onContext={(e) => contextMenu(e, messageId, idType, isChatInfo)}
        />
      </div>
    )
    const findedLink = file.find((item) => item.messageid === messageId)
    if (!findedLink)
    setFile((prev) => [
      ...prev,
      { content: src, messageid: messageId, messageType: mType },
    ])
  } else {
    mFile = (
      <FileItem
        name={name}
        type={mType}
        src={src}
        size={size}
        message={true}
        from={from}
        onRemove={() => removeMessages(messageId, idType)}
        onContext={(e) => contextMenu(e, messageId, idType, isChatInfo)}
        isColor={isColor}
      />
    )
    const findedLink = file.find((item) => item.messageid === messageId)
    if (!findedLink)
    setFile((prev) => [
      ...prev,
      { content: src, messageid: messageId, messageType: mType },
    ])
  }
  return (
    <>
      {mFile}
      {caption && (
        <p className="mt-2.5  px-2.5 text-gray-200" dir="auto">
          {caption}
        </p>
      )}
    </>
  )
}

export default FileType
