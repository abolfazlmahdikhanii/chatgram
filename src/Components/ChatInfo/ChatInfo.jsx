import React, { useEffect, useState } from 'react'
import Box from '../UI/Box/Box'
import Profile from '../Profile/Profile'
import { IoCallSharp } from 'react-icons/io5'
import { IoMdClose } from 'react-icons/io'
import { ToastContainer, toast } from 'react-toastify'

import { NavLink, useNavigate} from 'react-router-dom'
import InfoBox from './InfoBox'
import FileType from '../FileType/FileType'
import LinkContent from './LinkContent'
import AudioFile from '../AudioFIle/AudioFile'
import VoiceBox from './VoiceBox'
import CoustomToast from '../UI/CoustomToast/CoustomToast'
import MessageMenu from '../UI/MessageMenu/MessageMenu'


const ChatInfo = ({
    info,
    chat,
    setChatInfo,
    setAudio,
    pageX,
    pageY,
    messageID,
    onForward,
    setAlert,
    remove,
    setClose,
    show,
    onContext,
    setChat,
}) => {
    const [tab, setTab] = useState('Media')
    const [type, setType] = useState()
    const [link, setLink] = useState()
    const [voice, setVoice] = useState()
    const [isCall, setIsCall] = useState(false)

    const navigate = useNavigate()


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
        if (info) {
            filterSharedMedia('img', 'video')
        }
    }, [info, chat,link,setChatInfo])

    const filterSharedMedia = (type, type1 = null) => {
        const newMessages = [...info?.messages]
        const newData = []
        for (const item of newMessages) {
            for (const val of item.messageDis) {
                if (val.type === type || (type1 && val.type === type1))
                    newData.push({ ...val, messageId: item.messageId })
            }
        }
        setType(newData)
        console.log(type)
    }
    const filterSharedVoice = () => {
        const newMessages = [...info?.messages]
        const newData = []
        for (const item of newMessages) {
            for (const val of item.messageDis) {
                if (val.type === 'mp3' && val.name === '')
                    newData.push({ ...val, messageId: item.messageId })
            }
        }
        setVoice(newData)
    }
    const filterSharedLink = (dis) => {

        const newMessages = [...info?.messages]
        const newData = []
        for (const item of newMessages) {
            newData.push({
                messageId: item.messageId,
                url:item?.messageDis?.match(/(https?:\/\/[^\s]+)|(www\.[^\s]+)/g),
            })
        }
        setLink(newData)
    }

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
            section.scrollIntoView({ behavior: 'smooth', block: 'end', inline: "nearest"  })
        }
    }

    return (
        <>
            <Box
                style={`w-full transition-all duration-200 overflow-y-scroll h-full n-scroll max-h-[100vh] relative `}
                context={(e) => e.preventDefault()}
            >
                {/* header */}
                <div className="sticky -top-4 bg-base-100 z-10  py-4 -mt-3 w-full px-2 transition-all duration-200 flex items-center justify-between ">
                    <p className="text-xl text-white font-semibold">Profile</p>
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
                            path={info?.profileImg}
                            userName={info?.userName}
                            bgProfile={info?.bgProfile}
                            relation={info?.relation}
                            isSave={info?.relation === 'me' ? true : false}
                            size="lg"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <p className="text-3xl text-gray-50 font-semibold truncate">
                            {info?.userName}
                        </p>
                        <p className="text-center text-sm text-indigo-400">
                            Online
                        </p>
                    </div>
                    {/* btn */}
                    <div className="px-3 flex items-center gap-4 w-full justify-center mt-3.5">
                        <button
                            className=" bg-green-500 text-white btn  rounded-[15px] hover:bg-green-600   pr-8 min-h-[3.2rem]"
                            onClick={() => gotoMeet()}
                        >
                            <IoCallSharp size={22} />
                            <p className="text-base capitalize font-semibold">
                                Call
                            </p>
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
                            <p className="text-base capitalize font-semibold">
                                Video Chat
                            </p>
                        </button>
                    </div>
                </div>

                {/* info */}
                <div className="mt-7 px-2.5 space-y-3">
                    {/* item-1 */}
                    <InfoBox
                        title="Email"
                        des="ab@example.com"
                        onCopy={copyEmailHandler}
                    />
                    {/* item-2 */}
                    <InfoBox
                        title="Username"
                        des={info?.userName}
                        onCopy={copyUsernameHandler}
                    />
                    {/* item-3 */}
                    <InfoBox
                        title="Bio"
                        des="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                        style="line-clamp-2"
                        onCopy={copyBioHandler}
                    />
                </div>

                {/* shared */}
                <div className="mt-9 px-2.5 relative">
                    <p className="text-lg text-gray-100 font-semibold mb-5 px-1 ">
                        Shared Media
                    </p>
                    <div
                        role="tablist"
                        className="tabs tabs-boxed p-2 transition-all duration-200 gap-x-0.5 "
                    >
                        <button
                            role="tab"
                            className={`tab h-[2.2rem]  transition-all duration-200 ${
                                tab === 'Media' ? 'tab-active' : ''
                            }`}
                            onClick={(e) => {
                                setTab(e.target.textContent)
                                filterSharedMedia('img', 'video')
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
                                filterSharedMedia('file')
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
                                filterSharedLink('links')
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
                                filterSharedVoice()
                            }}
                        >
                            Voice
                        </button>
                    </div>
                    {/* shared-body */}
                    <section className="relative min-h-[250px]">
                        {/* media */}
                        <div
                            className={` ${
                                type && type?.length > 0 ? 'grid-cols-3' : ''
                            } gap-1.5   mt-6  overflow-hidden ${
                                tab === 'Media' || tab === 'Files'
                                    ? 'grid'
                                    : 'hidden'
                            }`}
                        >
                            {type && type?.length > 0 ? (
                                type.map((content) => (
                                    <FileType
                                        key={content.id}
                                        idType={content?.id}
                                        {...content}
                                        messageId={content?.messageId}
                                        autoPlay={false}
                                        imgSize={true}
                                        isFile={false}
                                        contextMenu={onContext}
                                        isChatInfo={true}
                                    />
                                ))
                            ) : (
                                <div className="flex flex-col items-center justify-center my-5 w-full gap-2">
                                    <p className="text-gray-200 text-sm">
                                        No media found
                                    </p>
                                </div>
                            )}
                        </div>
                        {/* Links */}
                        <div
                            className={` grid-cols-1 gap-1.5  ${
                                link?.length > 0 ? ' mt-4' : 'mt-6'
                            }  overflow-hidden ${
                                tab === 'Links' ? 'grid' : 'hidden'
                            }`}
                        >
                            {link && link?.length > 0 ? (
                                link.map((content) => (
                                    <LinkContent
                                        key={crypto.randomUUID()}
                                        link={content?.url}
                                        id={content?.messageId}
                                        remove={remove}
                                        contextMenu={onContext}
                                        setClose={setClose}
                                    />
                                ))
                            ) : (
                                <div className="flex flex-col items-center justify-center my-5 w-full gap-2">
                                    <p className="text-gray-200 text-sm">
                                        No links found
                                    </p>
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
                                        key={content.id}
                                        mid={content.messageId}
                                        {...content}
                                        path={content.src}
                                        isFile={false}
                                        setAudio={setAudio}
                                        name={info?.userName}
                                        remove={remove}
                                        contextMenu={onContext}
                                        setClose={setClose}
                                    />
                                ))
                            ) : (
                                <div className="flex flex-col items-center justify-center my-5 w-full gap-2">
                                    <p className="text-gray-200 text-sm">
                                        No voice found
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* menu */}

                        <MessageMenu
                            pageX={pageX}
                            pageY={pageY}
                            show={show}
                            setClose={setClose}
                            messageID={messageID}
                            onForward={onForward}
                            setAlert={setAlert}
                            remove={remove}
                            isChatInfo={true}
                            onShowMessage={navigateMessage}
                        />
                    </section>
                </div>
            </Box>
        </>
    )
}

export default ChatInfo
