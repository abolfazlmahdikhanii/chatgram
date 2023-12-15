import React, { useContext, useEffect, useId, useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ChatHeader from '../../Components/ChatHeader/ChatHeader'
import Message from '../../Components/Message/Message'
import ChatForm from '../../Components/ChatForm/ChatForm'
import { useParams, useNavigate } from 'react-router-dom'
import Uploader from '../../Components/Uploader/Uploader'
import MessageMenu from '../../Components/UI/MessageMenu/MessageMenu'
import CheckMessageBox from '../../Components/CheckMessageBox/CheckMessageBox'
import PinBox from '../../Components/PinBox/PinBox'
import UnpinBtn from '../../Components/UnpinBtn/UnpinBtn'
import Modal from '../../Components/UI/Modal/Modal'
import Dialog from '../../Components/UI/Dialog/Dialog'
import PinAudio from '../../Components/PinAudio/PinAudio'
import { MusicControlContext } from '../../Context/MusicContext'
import ChatInfo from '../../Components/ChatInfo/ChatInfo'
import ModalPreviewImg from '../../Components/UI/ModalPreviewImg/ModalPreviewImg'
import { data } from 'autoprefixer'

const Chat = ({ chat, setChat }) => {
    const [message, setMessage] = useState()
    const [pageX, setPageX] = useState(null)
    const [pageY, setPageY] = useState(null)
    const [showContextMenu, setShowContextMenu] = useState(false)
    const [messageID, setMessageID] = useState(null)
    const [messageIDFile, setMessageIDFile] = useState(null)
    const [checkMessage, setCheckMessage] = useState([])
    const [showCheckBox, setShowCheckBox] = useState(false)
    const [editContent, setEditContent] = useState('')
    const [pinMessage, setPinMessage] = useState([])
    const [showPin, setShowPin] = useState(false)
    const [showReply, setShowReply] = useState(false)
    const [showSelfForward, setShowSelfForward] = useState(false)
    const [replyMessage, setReplyMessage] = useState(null)
    const [forwardSelfMessage, setForwardSelfMessage] = useState(null)
    const [showFrowardModal, setShowForwardModal] = useState(false)
    const [userMessage, setUserMessage] = useState()
    const [reactEmoji, setReactEmoji] = useState()
    const [showAlert, setShowAlert] = useState(false)
    const [isRemove, setIsRemove] = useState(false)
    const [isPin, setIsPin] = useState(false)
    const [userForwardMessage, setUserForwardMessage] = useState(null)
    const [checkForward, setCheckForward] = useState(false)
    const [showChatInfo, setShowChatInfo] = useState(false)
    const [isChatInfo, setISChatInfo] = useState(false)
    const [forwardContact, setForwardContact] = useState(false)
    const [showPreview, setShowPreview] = useState({
        show: false,
        type: null,
        src: null,
    })
    const [audio, setAudio] = useState()
    const match = useParams()
    const navigate = useNavigate()

    const chatRef = useRef()
    const forwards = []

    useEffect(() => {
        filterChat(match.id)
        displayCheckBoxHandler(checkMessage)
    }, [
        match,
        chat,
        message,
        checkMessage,
        editContent,
        chatRef,
        pinMessage,
        setShowContextMenu,
    ])

    useEffect(() => {
        const findUserMessage = chat?.find((user) => user.id == match.id)
        setUserMessage(findUserMessage)
    }, [match, chat, message, showFrowardModal, setShowAlert, userMessage])

    const filterChat = (id) => {
        let findChat = chat.find((item) => item.id == id)

        setMessage(findChat)
    }

    const sendMessageHandler = (txt, replyMessage = null) => {
        const message = {
            messageId: crypto.randomUUID(),
            messageDis: txt,
            reaction: null,
            to: userMessage?.userName,
            date: new Date(),
            from: { ...chat[0], date: new Date() },
            read: false,
            send: true,
            check: false,
            edited: false,
            pin: false,
            replyData: replyMessage,
        }
        const newChat = [...chat]

        const findedChat = newChat.find((item) => item.id == match?.id)
        findedChat.messages.push(message)

        setChat(newChat)
    }
    const removeMessages = (id, idFile) => {
        setMessageID(null)

        const newChat = [...chat]

        const findedChat = newChat.find((item) => item.id == match?.id)
        const newMessge = findedChat?.messages
        newMessge[0].pin = false

        const filterPin = pinMessage.map((item) => item.pin)

        setPinMessage(filterPin)

        const findMessage = newMessge?.find(
            (item) => item?.messageId === messageID
        )

        if (typeof findMessage?.messageDis === 'string') {
            removeMessageText(id, newChat, findedChat, newMessge)
        } else {
            console.log('a')
            removeMessageFile(id, idFile)
        }
    }
    // remove message type===file
    const removeMessageFile = (id, idType) => {
        const newChat = [...chat]

        const findedChat = newChat.find((item) => item.id == match?.id)
        const newMessge = findedChat?.messages

        const findMessage = newMessge?.find((item) => item?.messageId === id)

        const filterMessage = findMessage?.messageDis?.findIndex(
            (item) => item?.id === idType
        )
        const filterAudioMessage = findMessage?.messageDis?.find(
            (item) => item?.src === audio
        )
        if (filterAudioMessage) setAudio(null)

        findMessage?.messageDis?.splice(filterMessage, 1)

        findedChat.messages = newMessge.filter(
            (item) => item?.messageDis.length !== 0
        )

        setChat(newChat)
    }
    const removeMessageText = (id, chat, findChat, newMessage) => {
        const findMessage = newMessage?.find((item) => item?.messageDis)
        findMessage.messageDis = ''

        findChat.messages = newMessage.filter(
            (item) => item.messageDis !== '' || item.messageDis.length < 0
        )

        findChat.messages.messageDis = findMessage
        setChat(chat)
    }

    const contextmenuHandler = (e, id, idFile = null) => {
        e.preventDefault()
        e.stopPropagation()

        setShowContextMenu((prev) => !prev)
        setPageX(e.pageX)
        setPageY(e.pageY)

        setMessageID(id)
        setMessageIDFile(idFile)
    }
    const contextmenuInfoHandler = (
        e,
        id,
        isChatInfo = false,
        idFile = null
    ) => {
        e.preventDefault()
        e.stopPropagation()

        setISChatInfo(isChatInfo)

        setPageX(e.pageX)
        setPageY(e.pageY)

        setMessageID(id)
        setMessageIDFile(idFile)
    }
    // select message and unselect
    const checkMessageHandler = (id, check) => {
        const newMessage = [...message?.messages]
        const findCheck = newMessage.find((item) => item.messageId === id)

        if (!findCheck.check) {
            findCheck.check = true
            setCheckMessage((prev) => [...prev, findCheck])
        } else {
            findCheck.check = false
            const filterCheck = checkMessage.filter((item) => item.check)

            setCheckMessage(filterCheck)
        }
    }
    // dispaly all checkbox when select one message
    const displayCheckBoxHandler = (arr) => {
        const isCheck = arr.some((item) => item.check)
        setShowCheckBox(isCheck)
    }

    // edit message type===text
    const selectEditTextMessageHandler = (id) => {
        const newMessageDis = [...message?.messages]

        const findMessage = newMessageDis.find(
            (message) =>
                message.messageId === id &&
                typeof message.messageDis === 'string'
        )

        setEditContent(findMessage?.messageDis)
    }
    const clickRemoveHandler = () => {
        setShowAlert(true)
        setIsRemove(true)
        setShowContextMenu(false)
    }
    // edit handler
    const editHandler = (txt, input) => {
        const newMessageDis = [...message?.messages]

        const findMessage = newMessageDis.find(
            (message) => message.messageId === messageID
        )
        console.log(findMessage)

        findMessage.messageDis = txt
        findMessage.edited = true
        findMessage.date = new Date()
        setMessage(newMessageDis)
        setEditContent('')

        // edit from everyWhere
        const newChat = [...chat]

        const findedChat = newChat.find((item) => item.id == match?.id)
        findedChat.messages = newMessageDis
        setChat(newChat)
    }
    // pin message
    const pinMessageHandler = (id, isPin) => {
        const newMessage = [...message?.messages]
        const findPin = newMessage.find((item) => item.messageId === id)

        if (!findPin.pin && pinMessage.length <= 4) {
            setIsPin(true)
            findPin.pin = true
            setPinMessage((prev) => [...prev, findPin])
        } else {
            setIsPin(false)
            findPin.pin = false
            const filterPin = pinMessage.filter((item) => item.pin)

            setPinMessage(filterPin)
        }
    }
    const unpinHandler = () => {
        const newPinMessage = [...pinMessage]
        newPinMessage.forEach((item) => (item.pin = false))

        setPinMessage([])
        setShowPin(false)
    }

    const replyMessageHandler = (id) => {
        const newMessage = [...message?.messages]

        const findReplyMessage = newMessage.find(
            (item) => item.messageId === id
        )
        const user = 'Abolfazl'
        setReplyMessage({ ...findReplyMessage, user })

        setShowReply(true)
    }
    const forwardSelfMessageHandler = (id) => {
        const newMessage = [...message?.messages]

        const findForwardMessage = newMessage.find(
            (item) => item.messageId === id
        )

        setForwardSelfMessage({ ...findForwardMessage, ...message })

        setShowSelfForward(true)
    }

    const ForwardHandler = (isCheck = false) => {
        setShowContextMenu(false)
        setShowForwardModal(true)
        isCheck ? setCheckForward(true) : setCheckForward(false)
    }
    const ForwardContactHandler = () => {
        setForwardContact(true)
        setShowForwardModal(true)
    }
    // forward
    const forwardClickHandler = (userId) => {
        let findChat = null
        const newChat = [...chat]

        setCheckMessage([])
        // find user for forward message
        const findUserForward = newChat?.find((user) => user.id === userId)
        const newMessages = [...userMessage.messages]
        const {
            activeStatus,
            date,
            id,
            bgProfile,
            profileImg,
            relation,
            userName,
        } = userMessage

        if (!checkForward) {
            findChat = newMessages.find((item) => item?.messageId === messageID)
            console.log(findChat)

            if (userId == match.id)
                forwardSelfMessageHandler(findChat.messageId)
            else {
                findChat.check = false
                const { replyData, check = false, ...chatData } = findChat

                findUserForward.messages.push({
                    ...chatData,
                    check,

                    forward: {
                        activeStatus,
                        date,
                        id,
                        bgProfile,
                        profileImg,
                        relation,
                        userName,
                    },
                })
            }
        } else {
            findChat = newMessages.filter((item) => item?.check)

            findChat.forEach((item) => {
                item.check = false
            })
            const copiedItems = findChat.map((item) => ({
                ...item,

                forward: {
                    activeStatus,
                    date,
                    id,
                    bgProfile,
                    profileImg,
                    relation,
                    userName,
                },
            }))
            findUserForward.messages.push(...copiedItems)
        }

        console.log(findChat)

        setChat(newChat)
        setShowForwardModal(false)
    }
    // forward
    const forwardSelfClickHandler = (userId) => {
        let findChat = null
        const newChat = [...chat]

        setCheckMessage([])
        // find user for forward message
        const findUserForward = newChat?.find((user) => user.id === userId)
        const newMessages = [...userMessage.messages]
        const {
            activeStatus,
            date,
            id,
            bgProfile,
            profileImg,
            relation,
            userName,
        } = userMessage

        if (!checkForward) {
            findChat = newMessages.find((item) => item?.messageId === messageID)
            console.log(findChat)

            if (findChat) {
                const {
                    replyData,
                    check = false,
                    messageId,
                    ...chatData
                } = findChat

                findUserForward.messages.push({
                    ...chatData,
                    check,
                    messageId: crypto.randomUUID(),
                    forwardSelf: {
                        activeStatus,
                        date,
                        id,
                        bgProfile,
                        profileImg,
                        relation,
                        userName,
                    },
                })
            }
        } else {
            findChat = newMessages.filter((item) => item?.check)

            findChat.forEach((item) => {
                item.check = false
                item.messageId = crypto.randomUUID()
            })
            const copiedItems = findChat.map((item) => ({
                ...item,

                forwardSelf: {
                    activeStatus,
                    date,
                    id,
                    bgProfile,
                    profileImg,
                    relation,
                    userName,
                },
            }))
            findUserForward.messages.push(...copiedItems)
        }

        console.log(findChat)

        setChat(newChat)
    }
    // forwardContact
    const forwardContactClickHandler = (userId) => {
        let findChat = null
        const newChat = [...chat]

        // find user for forward message
        const findUserForward = newChat?.find((user) => user.id === userId)

        const {
            activeStatus,
            date,
            id,
            bgProfile,
            profileImg,
            relation,
            userName,
        } = userMessage

        const message = {
            messageId: crypto.randomUUID(),
            messageDis: 'Contact',
            contact: {
                activeStatus,
                date,
                id,
                bgProfile,
                profileImg,
                relation,
                userName,
            },
            from: 'client',
            reaction: null,
            to: findUserForward.userName,
            date: new Date(),
            read: false,
            send: true,
            check: false,
            edited: false,
            pin: false,
            replyData: null,
        }
        findUserForward.messages.push(message)
        setChat(newChat)
        setShowForwardModal(false)
    }

    const removeCheckMessage = () => {
        const newChat = [...chat]
        const findedChat = newChat.find((item) => item.id == match?.id)
        const newMessage = findedChat.messages.filter(
            (message) => !message.check
        )
        findedChat.messages = newMessage
        setCheckMessage([])

        setMessage(newMessage)
        setChat(newChat)
    }

    const reactionEmojiHandler = (emojiId) => {
        const newChat = [...chat]
        const newMessage = [...message?.messages]
        const findedChat = newChat.find((item) => item.id == match?.id)
        const ractionUser = newChat.find((item) => item.relation === 'me')

        const { id, bgProfile, profileImg, relation, userName } = ractionUser
        const findMessage = newMessage.find(
            (message) => message.messageId === messageID
        )

        if (findMessage.reaction === emojiId) {
            findMessage.reaction = {}
        } else {
            findMessage.reaction = {
                reaction: emojiId,
                profile: {
                    id,
                    bgProfile,
                    profileImg,
                    relation,
                    userName,
                },
            }
        }

        setMessage(newMessage)
        findedChat.messages = newMessage
        setChat(newChat)
    }
    const removeReactionEmojiHandler = (messageid) => {
        const newChat = [...chat]
        const newMessage = [...message?.messages]
        const findedChat = newChat.find((item) => item.id == match?.id)

        const findMessage = newMessage.find(
            (message) => message.messageId === messageid
        )

        findMessage.reaction = ''
        setMessage(newMessage)
        findedChat.messages = newMessage
        setChat(newChat)
    }

    const DeleteChat = () => {
        setChat(chat.filter((item) => item.id != match?.id))
        navigate('/')
    }

    return (
        <div
            className={`grid transition-all duration-200 ${
                showChatInfo ? 'grid-cols-[1fr_30%]' : 'grid-cols-1'
            }`}
        >
            <div
                className={`bg-[url('../../../src/assets/images/bg-pattern.svg')] ${
                    showChatInfo ? 'bg-[size:35%] ' : ''
                }  h-screen relative overflow-hidden  transition-all duration-200 ease-in-out`}
                onContextMenu={(e) => e.preventDefault()}
            >
                <ChatHeader
                    info={message}
                    showPin={showPin}
                    setShowPin={setShowPin}
                    pinMessage={pinMessage}
                    setShowChatInfo={setShowChatInfo}
                    setCheckBox={setShowCheckBox}
                    showCheckBox={showCheckBox}
                    DeleteChat={DeleteChat}
                    setCheckMessage={setCheckMessage}
                    forwardContact={ForwardContactHandler}
                />

                <main
                    className="flex flex-col justify-between h-screen  overflow-hidden mb-5 relative "
                    ref={chatRef}
                >
                    {audio && <PinAudio path={audio} />}
                    {!showPin && pinMessage.length ? (
                        <PinBox
                            pins={pinMessage}
                            setPin={setPinMessage}
                            setShowPin={setShowPin}
                        />
                    ) : null}

                    {/* simple message */}
                    <section
                        className={`h-[90%]  overflow-y-auto  flex flex-col  mt-1 mb-1.5 transition-all duration-200 ease-linear w-full ${
                            showPin
                                ? '-translate-x-full hidden'
                                : 'translate-x-0 flex'
                        }`}
                    >
                        {message?.messages?.messageDis !== '' &&
                            message?.messages?.map((item, i, arr) => (
                                <Message
                                    key={crypto.randomUUID()}
                                    forward={item?.forward}
                                    forwardSelf={item?.forwardSelf}
                                    contact={item?.contact}
                                    {...item}
                                    remove={removeMessages}
                                    setCheckMessage={setCheckMessage}
                                    onContext={contextmenuHandler}
                                    onCheck={checkMessageHandler}
                                    checkArr={checkMessage}
                                    showCheck={showCheckBox}
                                    setReaction={removeReactionEmojiHandler}
                                    setFileId={setMessageIDFile}
                                    setAudio={setAudio}
                                    setShowPreview={setShowPreview}
                                />
                            ))}
                        {/* {message?.forward &&
                        message?.forward.map((message) => (
                            <ForwardMessage
                                id={message.id}
                                key={message.id}
                                {...message}
                                removeMessageFile={removeMessageFile}
                                setCheckMessage={setCheckMessage}
                                contextmenuHandler={contextmenuHandler}
                                checkMessageHandler={checkMessageHandler}
                                checkMessage={checkMessage}
                                showCheckBox={showCheckBox}
                            />
                        ))} */}
                    </section>
                    {/* pin message */}
                    <section
                        className={`h-[90%]  overflow-y-auto  flex flex-col  mt-1 mb-1.5 transition-all duration-200 ease-linear w-full${
                            showPin
                                ? 'translate-x-0 flex'
                                : 'translate-x-full hidden'
                        }`}
                    >
                        {pinMessage &&
                            pinMessage.map((item, i) => (
                                <Message
                                    key={item.messageId}
                                    from={item.from}
                                    {...item}
                                    remove={removeMessages}
                                    setCheckMessage={setCheckMessage}
                                    onContext={contextmenuHandler}
                                    onCheck={checkMessageHandler}
                                    checkArr={checkMessage}
                                    showCheck={showCheckBox}
                                />
                            ))}
                    </section>

                    {/* FORM */}
                    {!showPin ? (
                        !checkMessage.length && !showCheckBox ? (
                            <ChatForm
                                set={sendMessageHandler}
                                edit={editContent}
                                setEdit={setEditContent}
                                onEdit={editHandler}
                                reply={showReply}
                                setShowReply={setShowReply}
                                forwardSelf={showSelfForward}
                                setShowForwardSelf={setShowSelfForward}
                                replyMessage={replyMessage}
                                setReply={setReplyMessage}
                                forwardSelfMessage={forwardSelfMessage}
                                setForwardSelfMessage={setForwardSelfMessage}
                                forwardHandler={forwardSelfClickHandler}
                            />
                        ) : (
                            <CheckMessageBox
                                checkMessage={checkMessage}
                                setCheckMessage={setCheckMessage}
                                onRemove={removeCheckMessage}
                                onForward={ForwardHandler}
                            />
                        )
                    ) : (
                        <UnpinBtn unpin={unpinHandler} />
                    )}
                    {/* menu */}

                    <MessageMenu
                        pageX={pageX}
                        pageY={pageY}
                        show={showContextMenu}
                        setClose={setShowContextMenu}
                        messageID={messageID}
                        onSelect={checkMessageHandler}
                        onEdit={selectEditTextMessageHandler}
                        onReply={replyMessageHandler}
                        onForward={ForwardHandler}
                        onReaction={reactionEmojiHandler}
                        setAlert={setShowAlert}
                        remove={clickRemoveHandler}
                        isPin={isPin}
                        pinMessage={pinMessage}
                    />

                    <Uploader />

                    <Modal
                        show={showFrowardModal}
                        chat={chat}
                        onForward={forwardClickHandler}
                        onForwardContact={forwardContactClickHandler}
                        forwardContact={forwardContact}
                        setForwardContact={setForwardContact}
                        messageID={messageID}
                        setChat={setChat}
                        userID={match?.id}
                        setShow={setShowForwardModal}
                    />
                    <ToastContainer />
                </main>
                {showAlert && (
                    <Dialog
                        show={showAlert}
                        setShow={setShowAlert}
                        isRemove={isRemove}
                        onRemove={removeMessages}
                        onPin={pinMessageHandler}
                        messageID={messageID}
                        userInfo={message}
                        isPin={isPin}
                        pinMessage={pinMessage}
                    />
                )}
            </div>

            {showChatInfo && (
                <ChatInfo
                    info={message}
                    chat={chat}
                    setChatInfo={setShowChatInfo}
                    setAudio={setAudio}
                    pageX={pageX}
                    pageY={pageY}
                    show={isChatInfo}
                    setClose={setISChatInfo}
                    messageID={messageID}
                    onForward={ForwardHandler}
                    setAlert={setShowAlert}
                    remove={clickRemoveHandler}
                    onContext={contextmenuInfoHandler}
                    setChat={setMessage}
                />
            )}

            <ModalPreviewImg
                {...showPreview}
                setShowPreview={setShowPreview}
                DeleteChat={clickRemoveHandler}
                forward={ForwardHandler}
                setMessageID={setMessageID}
            />
        </div>
    )
}

export default Chat
