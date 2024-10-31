import React, { useContext, useEffect, useState } from 'react'
import { BsDownload } from 'react-icons/bs'
import { TbZoomInArea } from 'react-icons/tb'
import { IoCloseSharp } from 'react-icons/io5'
import { AiOutlineZoomOut } from 'react-icons/ai'
import { AiOutlineZoomIn } from 'react-icons/ai'

import Profile from '../../Profile/Profile'
import Backdrop from '../Backdrop/Backdrop'
import VideoPlayer from './VideoPlayer'
import ImagePreview from './ImagePreview'
import { ChatContext } from '../../../Context/ChatContext'
import { supabase } from '../../../superbase'

const ModalPreviewImg = () => {
  const {
    clickRemoveHandler,
    ForwardHandler,
    setMessageID,
    setShowPreview,
    showPreview,
    messageID,
    setSenderID,
    setMessageType,
    setMessageContent,
    setMessageName
  } = useContext(ChatContext)

  const [isZoom, setIsZoom] = useState(false)
  const [rotate, setRotate] = useState(0)
  const [isPiPActive, setIsPiPActive] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [profileInfo, setProfileInfo] = useState(null)
  const { show, type, src, messageId, caption, from, date, fileName ,url} =
    showPreview
  useEffect(() => {
    getSenderinfo(from)
  }, [from])

  const getSenderinfo = async (id) => {
    let { data: users, error } = await supabase
      .from('users')
      .select('*')
      .eq('userid', id)
      .single()
    if (!error) setProfileInfo(users)
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
  const formatMonth = (date) => {
    const mDate = new Date(date).toLocaleString('en', {
      month: 'short',
      day: '2-digit',
    })

    return mDate
  }
  const formatTime = (date) => {
    const mDate = new Date(date).toLocaleString('en', {
      hour: '2-digit',
      minute: '2-digit',
    })

    return mDate
  }
  return (
    <>
      <Backdrop
        show={show}
        preview={true}
        close={() =>
          setShowPreview({
            show: false,
            type: null,
            from: null,
            path: null,
            date: null,
            fileName: null,
          })
        }
      />
      <div
        className={`fixed top-0 left-0 w-full h-full z-30 ${
          show
            ? 'scale-100 opacity-100 translate-x-8'
            : 'scale-0 opacity-0 translate-x-0'
        } `}
      >
        {/* header */}
        <section className="flex items-center justify-between  w-11/12 mx-auto py-5 my-3">
          {/* left */}
          <div className="flex gap-4 items-center">
            <Profile
              path={profileInfo?.avatar_url}
              userName={
                profileInfo?.username || profileInfo?.email?.split('@')[0]
              }
              bgProfile={profileInfo?.bgProfile}
              size="m"
            />

            <div>
              <p className="dark:text-white font-semibold text-lg text-gray-800">
                {from?.userName}
              </p>
              <p className="dark:text-gray-400 flex items-center gap-1.5 text-gray-500">
                <span dir="auto">{formatMonth(date && date)}</span>
                <span>at</span>
                <span dir="auto">{formatTime(date)}</span>
              </p>
            </div>
          </div>
          {/* right */}
          <div className="flex items-center gap-x-4 relative">
            <div className="flex items-center gap-5 px-6 py-2 border dark:border-gray-500/40 rounded-xl z-10 border-gray-300">
              <button onClick={() => handleDownload(src, fileName)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="19"
                  height="19"
                  fill="none"
                  viewBox="0 0 20 19"
                >
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M5.367 4.732a.75.75 0 010 1.5h-.941A2.927 2.927 0 001.5 9.156v4.885a2.938 2.938 0 002.935 2.936h11.14a2.93 2.93 0 002.925-2.925V9.168a2.938 2.938 0 00-2.934-2.935h-.932a.75.75 0 010-1.5h.932A4.44 4.44 0 0120 9.168v4.884a4.43 4.43 0 01-4.425 4.425H4.435A4.44 4.44 0 010 14.04V9.156a4.43 4.43 0 014.426-4.424h.941zM10.001 0a.75.75 0 01.75.75l-.001 10.226 1.636-1.642a.749.749 0 111.062 1.059l-2.91 2.92a.756.756 0 01-.091.081l.085-.074a.736.736 0 01-.398.21l-.019.002a.732.732 0 01-.114.009l-.04-.003-.062-.004a.582.582 0 01-.013-.002l.115.009a.75.75 0 01-.53-.22l-.001-.001-2.916-2.927a.751.751 0 011.062-1.059l1.634 1.642V.75A.75.75 0 0110 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
              {type === 'img' ? (
                <>
                  <button
                    onClick={() =>
                      setRotate((prev) => (prev <= 360 ? prev + 90 : null))
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      fill="none"
                      viewBox="0 0 29 26"
                    >
                      <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M2.297 18.9a6.246 6.246 0 006.088 4.828.75.75 0 010 1.5 7.745 7.745 0 01-7.75-7.75.75.75 0 011.136-.643l1.75 1.05a.75.75 0 11-.772 1.286l-.452-.271zM8.688 6.688C9.742 5.635 11.301 5.25 13.25 5.25h4.5c1.949 0 3.508.385 4.562 1.438 1.053 1.054 1.438 2.613 1.438 4.562v4.5c0 1.949-.385 3.508-1.438 4.562-1.054 1.053-2.613 1.438-4.562 1.438h-4.5c-1.949 0-3.508-.385-4.562-1.438-1.053-1.054-1.438-2.613-1.438-4.562v-4.5c0-1.949.385-3.508 1.438-4.562zM9.75 7.75c-.634.634-.999 1.7-.999 3.501v4.5c0 1.801.365 2.867 1 3.5.633.635 1.699 1 3.5 1h4.5c1.801 0 2.867-.365 3.5-1 .635-.633 1-1.699 1-3.5v-4.5c0-1.801-.365-2.867-1-3.5-.633-.635-1.699-1-3.5-1h-4.5c-1.801 0-2.867.365-3.5 1zM20.347.63A.75.75 0 0121 .25 7.745 7.745 0 0128.75 8a.75.75 0 01-1.5 0 6.246 6.246 0 00-4.828-6.088l.271.452a.75.75 0 11-1.286.772l-1.05-1.75a.75.75 0 01-.01-.756z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                  <button onClick={() => setIsZoom((prev) => !prev)}>
                    <TbZoomInArea size={23} />
                  </button>
                </>
              ) : null}
              <button onClick={() => setShowMenu((prev) => !prev)}>
                <svg
                  width={21}
                  height={21}
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
                    d="M15.996 12h.01M11.995 12h.01M7.995 12h.008"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <button
              className="btn btn-ghost btn-md mask mask-squircle min-h-[42px] h-4 "
              onClick={() =>
                setShowPreview({
                  show: false,
                  type: null,
                  path: null,
                  fileName: null,
                  date: null,
                })
              }
            >
              <IoCloseSharp size={22} color="#fff" />
            </button>

            {/* menu */}
            <div
              className={`menu bg-base-100  rounded-box absolute right-20 top-[47px] z-[11] w-[200px] space-y-1 transition-all duration-200   ${
                !showMenu
                  ? 'scale-0 opacity-0 translate-x-12'
                  : 'scale-100 opacity-100 translate-x-0'
              }`}
              onMouseLeave={() => setShowMenu(false)}
            >
              <div
                className=" select-box--item "
                onClick={() => {
                  setMessageID(messageId)
                  setSenderID(from)
                  setMessageContent(url)
                  setMessageName(fileName)
                  setMessageType(type)
                  ForwardHandler()
                  setShowPreview(false)
                }}
              >
                <svg
                  width={19}
                  height={19}
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
                    d="M10.74 15.53L14.26 12l-3.52-3.53"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <p className={`font-[700] text-[14px] ml-1`}>Forward </p>
              </div>

              <div
                className=" select-box--item text-red-500 hover:bg-red-400/20"
                onClick={() => {
                  setMessageID(messageId)
                  clickRemoveHandler()
                  setShowPreview(false)
                }}
              >
                <svg
                  width={18}
                  height={18}
                  viewBox="0 0 19 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.459 7.012c.199 0 .38.087.523.234.133.157.2.352.18.558 0 .068-.532 6.808-.837 9.645-.19 1.741-1.313 2.798-2.996 2.827-1.295.029-2.56.039-3.806.039-1.322 0-2.616-.01-3.871-.04-1.627-.038-2.75-1.114-2.932-2.826-.313-2.847-.836-9.577-.846-9.645a.79.79 0 01.19-.558.706.706 0 01.524-.234h13.87zM11.584.315c.884 0 1.674.617 1.903 1.497l.163.73a1.28 1.28 0 001.24 1.016h2.917c.389 0 .713.323.713.734v.38a.73.73 0 01-.713.734H1.233a.73.73 0 01-.713-.734v-.38c0-.411.323-.734.713-.734H4.15c.592 0 1.108-.421 1.241-1.015l.153-.682C5.78.93 6.56.315 7.455.315h4.13z"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  />
                </svg>

                <p className={`font-[700] text-[14px] ml-1`}>Delete</p>
              </div>
            </div>
          </div>
        </section>

        {type === 'video' ? (
          <VideoPlayer
            src={src}
            setIsPiPActive={setShowPreview}
            isPiPActive={isPiPActive}
          />
        ) : (
          <ImagePreview isZoom={isZoom} rotate={rotate} src={src} />
        )}

        {caption ? (
          <section
            className={`absolute ${
              type === 'video' ? 'bottom-48' : 'bottom-5'
            } bg-gray-900/50 left-1/2 z-[10] flex items-center gap-5 backdrop-blur-xl px-6 py-3 rounded-xl max-w-[75%] w-fit  -translate-x-1/2 mx-auto text-gray-200 bg-opacity-50 `}
          >
            <p className="text-sm  leading-[1.8]   max-h-[110px] overflow-y-scroll n-scroll  line-clamp-3">
              {caption}
            </p>
          </section>
        ) : null}
      </div>
    </>
  )
}

export default ModalPreviewImg
