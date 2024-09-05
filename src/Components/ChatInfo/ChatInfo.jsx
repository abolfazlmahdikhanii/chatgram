import React, { useContext, useEffect, useState } from 'react'
import Box from '../UI/Box/Box'
import Profile from '../Profile/Profile'
import { IoCallSharp } from 'react-icons/io5'
import { IoMdClose } from 'react-icons/io'
import { ToastContainer, toast } from 'react-toastify'

import { NavLink, useNavigate, useParams } from 'react-router-dom'
import InfoBox from './InfoBox'
import FileType from '../FileType/FileType'
import LinkContent from './LinkContent'
import AudioFile from '../AudioFIle/AudioFile'
import VoiceBox from './VoiceBox'
import CoustomToast from '../UI/CoustomToast/CoustomToast'
import MessageMenu from '../UI/MessageMenu/MessageMenu'
import { ChatContext } from '../../Context/ChatContext'
import { UserContext } from '../../Context/UserContext'
import { supabase } from '../../superbase'
import decodeMessage from '../../Utility/decodeMessage'

const ChatInfo = ({ setChatInfo, setClose, show }) => {
  const {
    profileInfo,
    messageID,
    chat,
    setAudio,
    pageX,
    pageY,
    ForwardHandler,
    setShowAlert,
    clickRemoveHandler,
    contextmenuInfoHandler,
    isChatInfo,
    setShowContextMenu,
    showContextMenu,
    file,
    link,
    type,
    voice,
    setVoice,
    setFile,
    setLink,
    setType,
  } = useContext(ChatContext)
  const { user } = useContext(UserContext)
  const [tab, setTab] = useState('Media')
  const [isCall, setIsCall] = useState(false)
  const [showInfoMenu, setShowInfoMenu] = useState(false)
  const [message, setMessage] = useState([])
  const navigate = useNavigate()
  const match = useParams()
  const toastOptions = {
    position: toast.POSITION.BOTTOM_CENTER,
    autoClose: 1200,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: 'dark',
    closeButton: false,
    className:
      'px-5 py-2.5 bg-slate-500/20 rounded-xl text-white backdrop-blur',
  }

  useEffect(() => {

    setType([])
    setVoice([])
    setLink([])
    setTab('Media')
    return () => {
      setChatInfo(false)
    }
  }, [match.id, setChatInfo])

  

  const copyEmailHandler = async (email) => {
    try {
      await navigator.clipboard.writeText(email)
      toast(<CoustomToast message="Email" />, toastOptions)
    } catch (error) {
      console.log(error)
    }
  }
  const copyUsernameHandler = async (username) => {
    try {
      await navigator.clipboard.writeText(username)
      toast(<CoustomToast message="Username" />, toastOptions)
    } catch (error) {
      console.log(error)
    }
  }
  const copyBioHandler = async (bio) => {
    try {
      await navigator.clipboard.writeText(bio)
      toast(<CoustomToast message="Bio" />, toastOptions)
    } catch (error) {
      console.log(error)
    }
  }

  const gotoMeet = () => {
    setIsCall(true)
  }
  const navigateMessage = (id) => {
    navigate(`#${id}`)

    const section = document.querySelector(`[data-id=${id}]`)

    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest',
      })
    }
  }

  return (
    <>
      <Box
        style={`w-full transition-all duration-200 overflow-y-scroll h-full n-scroll max-h-[100vh] relative `}
        context={(e) => {
          e.preventDefault()
          setShowContextMenu(true)
      }}
      >
        {/* header */}
        <div className="sticky -top-4 bg-base-100 z-10  py-4 -mt-3 w-full px-2 transition-all duration-200 flex items-center justify-between ">
          <p className="text-xl dark:text-white font-semibold text-gray-900">
            Profile
          </p>
          <button
            className="btn btn-ghost mask mask-squircle"
            onClick={() => setChatInfo(false)}
          >
            <IoMdClose size={20} />
          </button>
        </div>
        <div className="mt-14  flex flex-col gap-5 items-center justify-center ">
          <div className=" flex items-center justify-center">
            <Profile
              path={profileInfo?.avatar_url}
              userName={
                profileInfo?.username || profileInfo?.email.split('@')[0]
              }
              bgProfile={profileInfo?.bgProfile}
              relation={profileInfo?.relation}
              isSave={profileInfo?.userid === user.userid}
              size="lg"
            />
          </div>
          <div className="space-y-1.5">
            <p className="text-2xl text-gray-900 dark:text-gray-50 font-semibold truncate">
              {profileInfo?.username || profileInfo?.email.split('@')[0]}
            </p>
            <p className="text-center text-sm text-indigo-400">Online</p>
          </div>
          {/* btn */}
          <div className="px-3 flex items-center gap-4 w-full justify-center mt-3.5">
            <button
              className=" bg-green-500 text-white btn  rounded-[15px] hover:bg-green-600   pr-8 min-h-[3.2rem]"
              onClick={() => gotoMeet()}
            >
              <IoCallSharp size={22} />
              <p className="text-base capitalize font-semibold">Call</p>
            </button>
            <button className=" bg-blue-700 text-white btn  rounded-[15px] hover:bg-blue-600   pr-8 gap-2.5 min-h-[3.2rem]">
              <svg
                width={22}
                height={22}
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.53 20.42H6.21c-3.16 0-4.21-2.1-4.21-4.21V7.79c0-3.16 1.05-4.21 4.21-4.21h6.32c3.16 0 4.21 1.05 4.21 4.21v8.42c0 3.16-1.06 4.21-4.21 4.21z"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M19.52 17.1l-2.78-1.95V8.84l2.78-1.95c1.36-.95 2.48-.37 2.48 1.3v7.62c0 1.67-1.12 2.25-2.48 1.29zM11.5 11a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="text-base capitalize font-semibold">Video Chat</p>
            </button>
          </div>
        </div>

        {/* info */}
        <div className="mt-7 px-2.5 space-y-3">
          {/* item-1 */}
          <InfoBox
            title="Email"
            des={profileInfo?.email}
            onCopy={copyEmailHandler}
            style="truncate max-w-[220px]"
          />
          {/* item-2 */}
          <InfoBox
            title="Username"
            des={profileInfo?.username || 'no content'}
            onCopy={copyUsernameHandler}
          />
          {/* item-3 */}
          <InfoBox
            title="Bio"
            des={profileInfo?.bio || 'no content'}
            style="line-clamp-2"
            onCopy={copyBioHandler}
          />
        </div>

        {/* shared */}
        <div className="mt-9 px-2.5 relative">
          <p className="text-lg dark:text-gray-100 font-semibold mb-5 px-1 text-gray-700 ">
            Shared Media
          </p>
          <div
            role="tablist"
            className="tabs tabs-boxed p-2 transition-all duration-200 gap-x-0.5 "
          >
            <button
              role="tab"
              className={`tab h-[2.2rem]  transition-all duration-200 ${
                tab === 'Media' ? 'tab-active text-white' : ''
              }`}
              onClick={(e) => {
                setTab(e.target.textContent)
                // filterSharedMedia()
              }}
            >
              Media
            </button>
            <button
              role="tab"
              className={`tab  h-[2.2rem] transition-all duration-200  ${
                tab === 'Files' ? 'tab-active' : ''
              }`}
              onClick={(e) => {
                setTab(e.target.textContent)
                // filterSharedFile()
              }}
            >
              Files
            </button>
            <button
              role="tab"
              className={`tab h-[2.2rem] transition-all duration-200  ${
                tab === 'Links' ? 'tab-active' : ''
              }`}
              onClick={(e) => {
                setTab(e.target.textContent)
                // filterSharedLink()
              }}
            >
              Links
            </button>
            <button
              role="tab"
              className={`tab h-[2.2rem] transition-all duration-200  ${
                tab === 'Voice' ? 'tab-active' : ''
              }`}
              onClick={(e) => {
                setTab(e.target.textContent)
                // filterSharedVoice()
              }}
            >
              Voice
            </button>
          </div>
          {/* shared-body */}
          <section className="relative min-h-[250px]" onContextMenu={()=>setShowInfoMenu()}>
            {/* media */}
            <div
              className={` ${
                type && type?.length > 0 ? 'grid-cols-3' : ''
              } gap-1.5   mt-6  overflow-hidden ${
                tab === 'Media'? 'grid' : 'hidden'
              }`}
              
            >
              {type && type?.length > 0 ? (
                type.map((content) => (
                  <FileType
                    key={crypto.randomUUID()}
                    idType={content?.messageid}
                    path={content?.content}
                    mType={content?.messageType}
                    // {...content}
                    messageId={content?.messageid}
                    autoPlay={false}
                    imgSize={true}
                    isFile={false}
                    contextMenu={contextmenuInfoHandler}
                    isChatInfo={true}
                  />
                ))
              ) : (
                <div className="flex flex-col items-center justify-center my-5 w-full gap-2">
                  <p className="dark:text-gray-200 text-sm text-gray-800">
                    No media found
                  </p>
                </div>
              )}
            </div>
            <div
              className={` ${
                file && file?.length > 0 ? 'grid-cols-3' : ''
              } gap-1.5   mt-6  overflow-hidden ${
                tab === 'Files'? 'grid' : 'hidden'
              }`}
            >
              {file && file?.length > 0 ? (
                file.map((content) => (
                  <FileType
                    key={crypto.randomUUID()}
                    idType={content?.messageid}
                    src={content?.content}
                    mType={content?.messageType}
                    // {...content}
                    messageId={content?.messageid}
                    autoPlay={false}
                    imgSize={true}
                    isFile={false}
                    contextMenu={contextmenuInfoHandler}
                    isChatInfo={true}
                  />
                ))
              ) : (
                <div className="flex flex-col items-center justify-center my-5 w-full gap-2">
                  <p className="dark:text-gray-200 text-sm text-gray-800">
                    No media found
                  </p>
                </div>
              )}
            </div>
            {/* Links */}
            <div
              className={` grid-cols-1 gap-1.5  ${
                link?.length > 0 ? ' mt-4' : 'mt-6'
              }  overflow-hidden ${tab === 'Links' ? 'grid' : 'hidden'}`}
            >
              {link && link?.length > 0 ? (
                link.map((content) => (
                  <LinkContent
                    key={crypto.randomUUID()}
                    link={decodeMessage(content?.content)}
                    id={content?.messageid}
                    remove={clickRemoveHandler}
                    contextMenu={contextmenuInfoHandler}
                    setClose={setClose}
                  />
                ))
              ) : (
                <div className="flex flex-col items-center justify-center my-5 w-full gap-2">
                  <p className="text-gray-200 text-sm">No links found</p>
                </div>
              )}
            </div>
            {/* media */}
            <div
              className={` grid-cols-1 gap-1.5   mt-6  overflow-hidden ${
                tab === 'Voice' ? 'grid' : 'hidden'
              }`}
            >
              {voice && voice?.length > 0 ? (
                voice.map((content) => (
                  <VoiceBox
                    key={crypto.randomUUID()}
                    mid={content.messageid}
              
                    path={content?.content}
                    isFile={false}
                    setAudio={setAudio}
                    name={
                      content?.senderid?.username ||
                      content?.senderid?.email?.split('@')[0]
                    }
                    remove={clickRemoveHandler}
                    contextMenu={contextmenuInfoHandler}
                    setClose={setClose}
                  />
                ))
              ) : (
                <div className="flex flex-col items-center justify-center my-5 w-full gap-2">
                  <p className="text-gray-200 text-sm">No voice found</p>
                </div>
              )}
            </div>

            {/* menu */}

         
          </section>
        </div>
        <MessageMenu
              show={isChatInfo}
              close={()=>setShowInfoMenu(false)}
              isChatInfo={true}
              onShowMessage={navigateMessage}
            />
      </Box>
    </>
  )
}

export default ChatInfo
