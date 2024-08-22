import React, { useRef, useEffect, useState, memo, useCallback } from 'react'

import Picker from '@emoji-mart/react'
import data from '@emoji-mart/data/sets/14/apple.json'
import { MdOutlineEdit } from 'react-icons/md'
import { IoMdClose } from 'react-icons/io'
import { TiArrowForwardOutline } from 'react-icons/ti'
import { Upload, DefaultHttpStack, defaultOptions } from 'tus-js-client'

import BtnAction from '../UI/BtnAction/BtnAction'
import BtnUploader from '../BtnUploader/BtnUploader'
import ContentWrapper from '../ContentWrapper/ContentWrapper'
import SelectBox from '../UI/SelectBox/SelectBox'
import AudioRecorders from '../AudioRecorder/AudioRecorder'
import TypeMessage from '../TypeMessage/TypeMessage'
import messageType from '../../Utility/messageTypeChecker'
import { useContext } from 'react'
import { ChatContext } from '../../Context/ChatContext'
import { supabase, supabaseAnonKey, supabaseUrl } from '../../superbase'
import { UserContext } from '../../Context/UserContext'
import { useParams } from 'react-router-dom'
import { strToByte } from '../../Utility/helper'
import decodeMessage from '../../Utility/decodeMessage'

const ChatForm = ({ setMessage }) => {
  const [text, setText] = useState('')
  const [emoji, setEmoji] = useState([])
  const [selectedFile, setSelectedFile] = useState(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadError, setUploadError] = useState(null)
  const [showEmoji, setShowEmoji] = useState(false)
  const [showUploader, setShowUploader] = useState(false)
  const [record, setRecord] = useState(false)
  const [isEnterPressed, setIsEnterPressed] = useState(false)
  const [imagesUpload, setImagesUpload] = useState([])
  const [filesUpload, setFilesUpload] = useState([])
  const [uploadUrl, setUploadUrl] = useState([])
  const [content, setContent] = useState('')
  const { user } = useContext(UserContext)
  const param = useParams()

  const inputRef = useRef(null)
  const {
    editContent,
    editHandler,
    showReply,
    showSelfForward,
    forwardSelfClickHandler,
    forwardSelfMessage,
    replyMessage,
    setShowSelfForward,
    setEditContent,
    setForwardSelfMessage,
    setShowReply,
    setReplyMessage,
    chatId,
    friendID,
    profileInfo,
    setFileProgress,
    messageID,
  } = useContext(ChatContext)

  useEffect(() => {
    if (inputRef.current) {
      setText(inputRef.current)
    }

    if (record) {
      setText('')

      setEmoji([])
    }

    return () => {
      if (inputRef.current && !emoji) inputRef.current.innerHTML = ''
      // setReply(null)
      // setForwardSelfMessage(null)
    }
  }, [inputRef, text, emoji, record])
  useEffect(() => {
    inputRef.current.innerHTML = ''
    updateTypingStatus(false)
  }, [param.id])

  const handleUpload = async (files) => {
    setFileProgress(0)
    const uploadFile = []
    for (const file of files) {
      const { data: signedUrlData, error: urlError } = await supabase.storage
        .from('uploads')
        .upload(`chats/${param.id}/${Date.now()}_${file.name}`, file, {
          onUploadProgress: (event) => {
            const percent = Math.round((event.loaded * 100) / event.total)
            setUploadProgress(percent)
          },
        })

      if (urlError) {
        return false
      }

      uploadFile.push(signedUrlData.path)
    }
    setFileProgress(100)
    return uploadFile
  }
  // const handleUpload = async (files) => {
  //   console.log(defaultOptions)
  //   setFileProgress(0)
  //   const uploadFile = []
  //   const {
  //     data: { session },
  //     error,
  //   } = await supabase.auth.getSession()
  //   console.log(session)
  //   for (const file of files) {
  //     // supabase.storage
  //     //   .from('uploads')
  //     //   .createSignedUploadUrl(
  //     //     `chats/${param.id}/${Date.now()}_${file.name}`,
  //     //     60
  //     //   )
  //     //   .then((data) => {
  //       const uploadEndpoint = `${supabase.storage.from('uploads').getPublicUrl('').publicURL}`;

  //         const upload = new Upload(file, {
  //           endpoint: uploadEndpoint,
  //           retryDelays: [0, 1000, 3000, 5000],
  //           headers: {
  //             authorization: `Bearer ${session?.access_token}`,
  //           },
  //           metadata: {
  //             filename: file.name,
  //             filetype: file.type,
  //             cacheControl: 3600,
  //           },
  //           overridePatchMethod: true,
  //           onProgress: (bytesUploaded, bytesTotal) => {
  //             setFileProgress(Math.round((bytesUploaded / bytesTotal) * 100))
  //             console.log(Math.round((bytesUploaded / bytesTotal) * 100))
  //           },
  //           onSuccess: () => {
  //             // setFileProgress(100)

  //             // uploadFile.push(signedUrlData.path)
  //           },
  //           onError: (err) => {
  //             console.log(err)
  //           },
  //         })
  //         upload.start()
  //       }

  //   // return uploadFile
  // }

  const handleUploadFile = async (files) => {
    // Replace with your actual file data
    const uploadFile = []

    for (const file of files) {
      const { data: signedUrlData, error: urlError } = await supabase.storage
        .from('uploads')
        .upload(
          `chats/${param.id}/${crypto.randomUUID()}.${file?.name
            .split('.')
            .pop()}`,
          file
        )

      if (urlError) {
        return false
      } else {
        uploadFile.push(signedUrlData.path)
      }
    }

    return uploadFile
  }
  const handleAudioUpload = async (file) => {
    const { data: signedUrlData, error: urlError } = await supabase.storage
      .from('uploads')
      .upload(
        `audio/${param.id}/${Date.now()}_${crypto.randomUUID()}.wav`,
        file
      )

    if (urlError) {
      return false
    }
    return signedUrlData.path
  }
  const handleInputChange = (e) => {
    setContent(inputRef.current.innerHTML)
    console.log(e.target)
    if (e.target.innerText !== '') {
      updateTypingStatus(true)
    } else {
      updateTypingStatus(false)
    }
  }

  const updateTypingStatus = async (isTyping) => {
    await supabase
      .from('typing_status')
      .upsert(
        {
          chat_id: param.id,
          user_id: user.userid,
          is_typing: isTyping,
          updated_at: new Date(),
        },
        { onConflict: 'user_id' }
      )
      .eq('chat_id', param.id)
      .eq('user_id', user.userid)
  }
  // find chat with id and store  in the object in the place
  const submitFormHandler = (e) => {
    e.preventDefault()

    // if(e.key==="Enter") setIsEnterPressed(true)

    if (inputRef.current) {
      if (inputRef.current.innerHTML !== '') {
        if (replyMessage) {
          sendMessageHandler(text.innerHTML, replyMessage?.messageid)
          setShowReply(false)
          setReplyMessage(null)
          // if(isEnterPressed)set(null)
        }
        if (forwardSelfMessage) {
          forwardSelfClickHandler(forwardSelfMessage.id)
          sendMessageHandler(text.innerHTML)
          setShowSelfForward(false)
          setForwardSelfMessage(null)
          // if(isEnterPressed)set("")
        }
        if (!replyMessage && !forwardSelfMessage) {
          sendMessageHandler(text.innerHTML)
        }

        inputRef.current.innerHTML = ''
        setText('')
        updateTypingStatus(false)
      } else {
        if (forwardSelfMessage) {
          forwardSelfClickHandler(forwardSelfMessage.id)
          setShowSelfForward(false)
          setForwardSelfMessage(null)
        }
      }
    }
  }
  const sendMessageHandler = async (content, replay = null) => {
    let fileUrl = ''

    if (!content || content === '&nbsp;') return
    setMessage(
      [
        {
          senderid: user.userid,
          content: strToByte(content),
          messageType: 'text',
          sentat: new Date(),
        },
      ],
      true
    )

    if (typeof content !== 'string') {
      fileUrl = await handleAudioUpload(content[0])
      setMessage(content[0], true)
    }
    if (typeof content !== 'string' && !fileUrl) return
    const { data, error } = await supabase.from('messages').insert([
      {
        senderid: user.userid,
        recipientid: friendID,
        content: typeof content !== 'string' ? fileUrl : content,
        messageType: typeof content !== 'string' ? content[0].type : 'text',
        status: 'send',
        chatID: param.id,
        replayId: replay,
      },
    ])
    if (error) console.log(error)
    updateTypingStatus(false)
  }
  const editContentHandler = (e) => {
    e.preventDefault()
    if (inputRef.current.innerHTML !== '') {
      editHandler(inputRef.current.innerHTML, editContent?.messageid, param.id)
      inputRef.current ? (inputRef.current.innerHTML = '') : null
      setText('')
      setEditContent(null)
    }
  }
  const uploadFileHandler = async (txt) => {
    console.log(filesUpload)
    let fileUrl = ''
    if (filesUpload) {
      fileUrl = await handleUploadFile(selectedFile)
      if (fileUrl) {
        for (let i = 0; i < fileUrl.length; i++) {
          const { data, error } = await supabase.from('messages').insert([
            {
              senderid: user.userid,
              recipientid: friendID,
              content: fileUrl[i],
              messageType: filesUpload[i]?.name.split('.').pop(),
              status: 'send',
              chatID: param.id,
              name: filesUpload[i]?.name,
            },
          ])
          if (error) console.log(error)
        }
      }

      // const newFileUpload = filesUpload.map((item) => {
      //   return { ...item, caption: txt }
      // })
      // sendMessageHandler(newFileUpload)
    }
  }

  const uploadImageHandler = async (txt) => {
    let fileUrl = ''
    if (imagesUpload) {
      const newImageUpload = imagesUpload.map((item) => {
        return { ...item, caption: txt }
      })
      setMessage(newImageUpload, true)
      fileUrl = await handleUpload(selectedFile)
      if (fileUrl) {
        for (let i = 0; i < fileUrl.length; i++) {
          const { data, error } = await supabase.from('messages').insert([
            {
              senderid: user.userid,
              recipientid: friendID,
              content: fileUrl[i],
              messageType: imagesUpload[i]?.type,
              status: 'send',
              chatID: param.id,
              caption: txt,
            },
          ])
          if (error) console.log(error)
        }
      }
    }
  }
  const closeEmojiPicker = () => {
    setTimeout(() => {
      setShowEmoji(false)
    }, 100)
  }
  const closeUploader = () => {
    setTimeout(() => {
      setShowUploader(false)
    }, 200)
  }

  return (
    <form
      action="#"
      className=" w-11/12 mx-auto  mb-28 flex gap-3 h-[48px] max-w-2xl items-center relative self-end"
      onSubmit={submitFormHandler}
    >
      {!record ? (
        <>
          <div className="flex flex-col w-full relative">
            <EditBox
              edit={editContent}
              setEdit={setEditContent}
              input={inputRef}
            />
            <ReplyBox
              reply={showReply}
              setShowReply={setShowReply}
              replyMessage={replyMessage}
              input={inputRef}
              user={user}
              info={profileInfo}
            />
            <ForwardBox
              forwardSelf={showSelfForward}
              setShowForwardSelf={setForwardSelfMessage}
              forwardMessage={forwardSelfMessage}
              input={inputRef}
              forwardHandler={forwardSelfClickHandler}
            />
            <div className="form-box ">
              <div className="flex items-center gap-0.5 w-full relative">
                <button
                  className="dark:text-yellow-500 grid place-items-center text-yellow-600"
                  onClick={(e) => {
                    e.preventDefault()
                    setShowEmoji((prev) => !prev)
                  }}
                >
                  <svg
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 22h6c5 0 7-2 7-7V9c0-5-2-7-7-7H9C4 2 2 4 2 9v6c0 5 2 7 7 7z"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M15.5 9.75a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM8.5 9.75a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM8.4 13.3h7.2c.5 0 .9.4.9.9 0 2.49-2.01 4.5-4.5 4.5s-4.5-2.01-4.5-4.5c0-.5.4-.9.9-.9z"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      strokeMiterlimit={10}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                <div
                  className="chat__input overflow-hidden  z-10"
                  dir="auto"
                  ref={inputRef}
                  onInput={(e) => handleInputChange(e)}
                  autoFocus
                  contentEditable
                  placeholder="message"
                  suppressContentEditableWarning={true}
                  onKeyDown={(e) => {
                    e.key === 'Enter' && !editContent
                      ? submitFormHandler(e)
                      : null
                    // e.key === "Backspace"&&edit ? setEdit(e.target.innerText) : edit;
                    setContent(inputRef.current.innerHTML)
                  }}
                >
                  {emoji &&
                    emoji?.map((item, i) => (
                      <img
                        key={i}
                        src={`https://cdn.jsdelivr.net/npm/emoji-datasource-apple@14.0.0/img/apple/64/${item.unified}.png`}
                        className="w-[20px] h-[20px] inline-flex"
                      />
                    ))}
                </div>
              </div>

              {/* action */}
              <BtnUploader click={setShowUploader} />
            </div>
          </div>
          <div className="h-[53px] mask mask-squircle ">
            <BtnAction
              isText={text}
              setRecord={setRecord}
              setText={setEmoji}
              emoji={emoji}
              isEdit={editContent}
              setEdit={setEditContent}
              onEdit={editContentHandler}
              forwardMessage={forwardSelfMessage}
            />
          </div>
        </>
      ) : (
        <AudioRecorders
          record={record}
          setRecord={setRecord}
          setMessage={sendMessageHandler}
          isText={text}
        />
      )}

      {/* emoji */}
      <div className="absolute bottom-16 left-10" onMouseOut={closeEmojiPicker}>
        {showEmoji && (
          <Picker
            onEmojiSelect={(e) =>
              setEmoji((prev) => {
                return [
                  ...prev,
                  {
                    id: e.id,
                    shortcodes: e.shortcodes,
                    unified: e.unified,
                  },
                ]
              })
            }
            emojiSize={25}
            previewPosition="none"
            value={text}
            set={'apple'}
            data={data}
          />
        )}
      </div>
      <SelectBox
        show={showUploader}
        close={closeUploader}
        setImages={setImagesUpload}
        images={imagesUpload}
        filesUpload={filesUpload}
        setFilesUpload={setFilesUpload}
        onUploadImage={uploadImageHandler}
        onUploadFile={uploadFileHandler}
        setSelectedFile={setSelectedFile}
      />
    </form>
  )
}

export default ChatForm

const EditBox = ({ edit, setEdit, input }) => {
  console.log(edit)
  return (
    <div
      className={`form-box rounded-b-none  transition-all duration-300 absolute top-0 ${
        !edit
          ? '-translate-y-7 opacity-0  -z-[1] overflow-hidden'
          : '-translate-y-14 opacity-100 -mb-2'
      }`}
    >
      {/* info */}
      <div className="flex items-center py-1">
        <p className="px-1">
          <MdOutlineEdit size={26} color="rgb(129 140 248)" />
        </p>
        <div className="flex flex-col gap-0.5 border-l-2 border-l-indigo-700 px-4 ml-5 w-[470px]">
          <p className="text-[15px] text-indigo-400 font-medium">Editing</p>
          <p className="text-[14px] truncate w-[80%]" dir="auto">
            <TypeMessage
              dis={edit?.content}
              type={edit?.messageType}
              name={edit?.name}
            />
          </p>
        </div>
      </div>
      <button
        className="btn btn-square btn-sm"
        onClick={(e) => {
          e.preventDefault()
          setEdit('')
          input.current.innerHTML = ''
        }}
      >
        <IoMdClose size={20} />
      </button>
    </div>
  )
}

const ReplyBox = ({ reply, setShowReply, replyMessage, input, user, info }) => {
  return (
    <div
      className={`form-box rounded-b-none  transition-all duration-300 absolute top-0 ${
        !reply
          ? '-translate-y-7 opacity-0  -z-[1] overflow-hidden'
          : '-translate-y-14 opacity-100 -mb-2'
      }`}
    >
      {/* info */}
      <div className="flex items-center py-1">
        <p className="px-1 text-[rgb(129,140,248)]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={22}
            height={22}
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              d="M3.34 8.898L9.874 3.09a.38.38 0 01.625.284v3.312H11.5c5.088 0 9.5 2.917 9.5 7.186a8.551 8.551 0 01-4.703 7.084.367.367 0 01-.173.044h-.009a.388.388 0 01-.379-.379.373.373 0 01.158-.306 5.508 5.508 0 001.357-3.07c0-2.817-3.241-4.5-6.376-4.5-.09 0-.178 0-.265-.006h-.11v2.633a.38.38 0 01-.625.284l-6.751-6a.379.379 0 01-.092-.434c.022-.048.269-.288.308-.324z"
              strokeWidth={1.5}
            />
          </svg>
        </p>
        <div className="flex gap-0.5 ml-5 ">
          <p className="w-[2px] bg-indigo-700 mr-1"></p>

          {/* {(replyMessage?.messageDis &&
            replyMessage?.messageDis[0]?.type === 'img') ||
          replyMessage?.messageDis[0]?.type === 'video' ||
          replyMessage?.messageDis[0]?.type === 'mp3' ? (
            <TypeMessage
              dis={replyMessage?.messageDis}
              w={'w-9 ml-2 aspect-square'}
            />
          ) : null} */}

          <div className="flex flex-col  gap-0.5  px-4 w-[100%]">
            <p className="text-[15px] text-indigo-400 font-medium" dir="auto">
              Replay to {''}
              <span>
                {replyMessage?.senderid === user?.userid
                  ? user?.username || user?.email?.split('@')[0]
                  : info?.username || info?.email?.split('@')[0]}
              </span>
            </p>
            <p className="text-[14px] truncate text-gray-200" dir="auto">
              <TypeMessage
                dis={replyMessage?.content}
                type={replyMessage?.messageType}
                name={replyMessage?.name}
              />
            </p>
          </div>
        </div>
      </div>
      <button
        className="btn btn-square btn-sm"
        onClick={(e) => {
          e.preventDefault()
          setShowReply(false)
          input.current.innerHTML = ''
        }}
      >
        <IoMdClose size={20} />
      </button>
    </div>
  )
}
const ForwardBox = ({
  forwardSelf,
  setShowForwardSelf,
  forwardMessage,
  input,
}) => {
  return (
    <div
      className={`form-box rounded-b-none  transition-all duration-300 absolute top-0 ${
        !forwardMessage
          ? '-translate-y-7 opacity-0  -z-[1] overflow-hidden'
          : '-translate-y-14 opacity-100 -mb-2'
      } `}
    >
      {/* info */}
      <div className="flex items-center py-1 w-full">
        <p className="px-1 text-[rgb(129,140,248)]">
          <TiArrowForwardOutline size={26} />
        </p>
        <div className="flex gap-0.5 ml-5 w-full">
          {/* <p className="w-[2px] bg-indigo-700 mr-1"></p> */}

          {(forwardMessage?.messageDis &&
            forwardMessage?.messageDis[0]?.type === 'img') ||
          forwardMessage?.messageDis[0]?.type === 'video' ? (
            <TypeMessage
              dis={forwardMessage?.messageDis}
              w={'w-9 ml-2 aspect-square'}
            />
          ) : null}

          <div
            data-bg-color={forwardMessage?.bgProfile}
            className="flex flex-col  gap-0.5  px-4 w-[95%] rounded-lg relative"
          >
            <p className="text-[15px] text-indigo-400 font-medium" dir="auto">
              {forwardMessage?.userName}
            </p>
            <p className="text-[14px] truncate " dir="auto">
              {forwardMessage?.messageDis &&
              forwardMessage?.messageDis[0]?.type !== 'img' &&
              forwardMessage?.messageDis[0]?.type !== 'video' ? (
                <TypeMessage dis={forwardMessage?.messageDis} />
              ) : (
                messageType(
                  forwardMessage?.messageDis[0]?.type,
                  forwardMessage?.messageDis[0]?.name
                )
              )}
            </p>
          </div>
        </div>
      </div>
      <button
        className="btn btn-square btn-sm"
        onClick={(e) => {
          e.preventDefault()
          setShowForwardSelf()
          input.current.innerHTML = ''
        }}
      >
        <IoMdClose size={20} />
      </button>
    </div>
  )
}
