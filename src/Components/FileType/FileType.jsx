import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import FileItem from '../FIleItem/FileItem'
import Progress from '../UI/Progress/Progress'
import AudioFile from '../AudioFIle/AudioFile'
import Video from '../Video/Video'
import FileIcon from '../UI/FIleIcon/FileIcon'
import { ChatContext } from '../../Context/ChatContext'
import { supabase } from '../../superbase'
import ProgressFile from '../UI/ProgressFile/ProgressFile'

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
  source,
  chatInfoUrl,
  date,
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
  const [url, setUrl] = useState(chatInfoUrl ? chatInfoUrl : "")
  const [fileSize, setFileSize] = useState(0)
  useEffect(() => {
    if (src) download(src)
  }, [src,url])

  useEffect(() => {
    const fetchFileSize = async () => {
      try {
        const response = await fetch(url)
        const blob = await response.blob()
        setFileSize(blob.size) // Size in bytes
      } catch (error) {
        console.error('Error fetching file size:', error)
      }
    }

    fetchFileSize()
  }, [url])
   const download = useCallback(async (path) => {
    const groupFile = []
  
  //   // if (findItem(messageId)) return false
    supabase.storage
      .from('uploads')
      .download(path)
      .then((res) => {
        const fr = new FileReader()
        fr.addEventListener('load', (ev) => {
          setUrl(ev.target.result)
        })
        if (res.data) {
          fr.readAsDataURL(res.data)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])





  // const download = async (path) => {
  //   try {
  //     const { data, error } = await supabase.storage.from('uploads').createSignedUrl(path, 3600,{
  //       transform:{
  //         quality:60
  //       }
  //     });
  //     if (error) throw error;
  //     setUrl(data.signedUrl);
  //   } catch (error) {
  //     console.error('Image fetch error:', error.message);
  //   }
  // }

  const findItem = (id) => {
    return url.find((item) => item.messageID === id)
  }
  const handleDownload = async (url, src) => {
    const fileName = src.split('/').pop()
    const link = document.createElement('a')
    link.href = url
    link.download = fileName || 'ChatGram_File' // Suggest "Chat Files" folder in filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link) // Request permission to save the file
  }
  if (mType == 'video') {
    mFile = (
      <Video
        contextMenu={contextMenu}
        progress={fileProgress}
        messageId={messageId}
        idType={idType}
        src={url?url:src}
        onRemove={removeMessages}
        autoPlay={autoPlay}
        isChatInfo={isChatInfo}
        setShowPreview={setShowPreview}
        from={from}
        date={date}
        fileName={src?.split('/').pop()}
        caption={caption}
        onErrorVideo={(e) => (e.currentTarget.src = path)}
        isCompletedUploaded={url}
        onDownload={() => handleDownload(url, src)}
        name={name}
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
        path={url ? url : src}
        url={url}
        size={fileSize}
        progress={fileProgress}
        name={name}
        onRemove={() => removeMessages(messageId, idType)}
        isColor={isColor}
        setAudio={setAudio}
        isCompletedUploaded={url}
        onDownload={() => handleDownload(url, src)}
      />
    )

    const findedLink = voice.find((item) => item.messageid === messageId)
    if (!findedLink && url)
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
        {!url && <Progress size={fileProgress} />}
        {url && (
          <button
            className={` mask mask-squircle w-7 h-7 grid place-items-center dark:text-white  rounded-lg self-end  dark:bg-base-100/40 border-[4px] border-transparent cursor-pointer  transition-all duration-300 bg-base-300/60 text-gray-600 dark:hover:bg-base-100 hover:bg-base-300 absolute top-1 right-1`}
            onClick={() => handleDownload(url, src)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-3.5 h-3.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
              />
            </svg>
          </button>
        )}
        <img
          src={url ? url : src}
          alt=""
          className="object-cover w-full h-full rounded-xl min-w-[170px]"
          onClick={() =>
            setShowPreview({
              show: true,
              type: 'img',
              from,
              src: url,
              url: src,
              messageId,
              caption,
              fileName: src?.split('/').pop(),
              date,
              name,
            })
          }
          // onError={(e) => (e.target.src = new URL.createObjectURL(src))}
        />
      </li>
    )
    const findedLink = type.find((item) => item.messageid === messageId)
    if (!findedLink && url)
      setType((prev) => [
        ...prev,
        { content: url, messageid: messageId, messageType: mType },
      ])
  } else if (mType == 'file' && !isFile) {
    mFile = (
      <div>
        <FileIcon
          type={
            name
              ? name.split('.')[name.split('.').length - 1]
              : src?.split('.')[src.split('.').length - 1]
          }
          path={url ? url : src}
          message={true}
          from={from}
          isColor={isColor}
          isFile={false}
          isChatInfo={isChatInfo}
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
        type={
          name
            ? name.split('.')[name.split('.').length - 1]
            : src?.split('.')[src.split('.').length - 1]
        }
        src={url ? url : src}
        size={fileSize}
        message={true}
        from={from}
        name={name}
        onRemove={() => removeMessages(messageId, idType)}
        onContext={(e) => contextMenu(e, messageId, idType, isChatInfo)}
        isColor={isColor}
        progress={fileProgress}
        isCompletedUploaded={url}
        onDownload={() => handleDownload(url, src)}
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
