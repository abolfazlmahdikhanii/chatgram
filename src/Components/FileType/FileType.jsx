import React, { useContext, useEffect, useState } from 'react'
import FileItem from '../FIleItem/FileItem'
import Progress from '../UI/Progress/Progress'
import AudioFile from '../AudioFIle/AudioFile'
import Video from '../Video/Video'
import FileIcon from '../UI/FIleIcon/FileIcon'
import { ChatContext } from '../../Context/ChatContext'
import { supabase } from '../../superbase'

const FileType = ({
  type,
  src,
  name,
  size,
  progress,
  id,
  from,
  idType,
  messageId,
  isColor,
  caption,
  autoPlay = true,
  imgSize,
  isFile = true,
  isChatInfo = false,
  contextMenu,
}) => {
  const { removeMessages, setShowPreview, setAudio ,setFileUrl} = useContext(ChatContext)

  let file = null
  const [url,setUrl]=useState('')

  useEffect(() => {
    if (src) download(src)
  }, [src])

  const download = async (path) => {
    try {
      const { data, error } =await supabase.storage
        .from('uploads')
        .createSignedUrl(path,120)
      if (error) throw error

      
      setUrl(data.signedUrl)
      
    } catch (error) {
      console.log(error.message)
    }
  }

  if (type == 'video') {
    file = (
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
  } else if (type == 'mp3'||type=='audio/webm') {
    file = (
      <AudioFile
        path={url}
        size={size}
        name={name}
        onRemove={() => removeMessages(messageId, idType)}
        isColor={isColor}
        setAudio={setAudio}
      />
    )
  } else if (type == 'img') {
    file = (
      <li
        className={` ${
          imgSize ? 'h-[100px]' : 'h-[210px]'
        } overflow-hidden inline-block rounded-xl basis-[40%]  dark:bg-gray-200/20 flex-grow flex-1 relative bg-gray-400/20`}
        onContextMenu={(e) => contextMenu(e, messageId, idType, isChatInfo)}
      >
        <Progress
          size={progress}
          onRemove={() => removeMessages(messageId, idType)}
        />
        <img
          src={url}
          alt=""
          className="object-cover w-full h-full rounded-xl min-w-[170px]"
          onClick={() =>
            setShowPreview({
              show: true,
              type: 'img',
              from,
              url,
              messageId,
              caption,
            })
          }
        />
      </li>
    )
  } else if (type == 'file' && !isFile) {
    file = (
      <div>
        <FileIcon
          type={name?.split('.').pop()}
          path={src ? src : ''}
          message={true}
          from={from}
          isColor={isColor}
          isFile={false}
          onContext={(e) => contextMenu(e, messageId, idType, isChatInfo)}
        />
      </div>
    )
  } else {
    file = (
      <FileItem
        name={name}
        type={name?.split('.').pop()}
        src={src}
        size={size}
        message={true}
        from={from}
        onRemove={() => removeMessages(messageId, idType)}
        onContext={(e) => contextMenu(e, messageId, idType, isChatInfo)}
        isColor={isColor}
      />
    )
  }
  return <>{file}</>
}

export default FileType
