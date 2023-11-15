import React, { useEffect, useId, useRef, useState } from 'react'
import ChatHeader from '../../Components/ChatHeader/ChatHeader'
import Message from '../../Components/Message/Message'
import ChatForm from '../../Components/ChatForm/ChatForm'
import { useParams } from 'react-router-dom'
import Uploader from '../../Components/Uploader/Uploader'
import MessageMenu from '../../Components/UI/MessageMenu/MessageMenu'
import CheckMessageBox from '../../Components/CheckMessageBox/CheckMessageBox'
import PinBox from '../../Components/PinBox/PinBox'
import UnpinBtn from '../../Components/UnpinBtn/UnpinBtn'
import Modal from '../../Components/UI/Modal/Modal'

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
    const [replyMessage, setReplyMessage] = useState(null)
    const [showFrowardModal, setShowForwardModal] = useState(false)
    const [userMessage, setUserMessage] = useState()
   const [reactEmoji,setReactEmoji]=useState()
    const [userForwardMessage, setUserForwardMessage] = useState(null)
    const [checkForward, setCheckForward] = useState(false)
    const match = useParams()
    const chatRef = useRef()
    const forwards = []

    useEffect(() => {
        filterChat(match.id)
        displayCheckBoxHandler(checkMessage)
    }, [match, chat, message, checkMessage, editContent, chatRef, pinMessage])

    useEffect(() => {
        const findUserMessage = chat?.find((user) => user.id == match.id)
        setUserMessage(findUserMessage)
    }, [match, chat, message, showFrowardModal, userMessage])

    const filterChat = (id) => {
        let findChat = chat.find((item) => item.id == id)

        setMessage(findChat)
    }

    const sendMessageHandler = (txt, replyMessage = null) => {
        const message = {
            messageId: crypto.randomUUID(),
            messageDis: txt,
            from: 'client',
            reaction:null,
            to: 'ab',
            date: new Date(),
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
    const removeMessages = (id) => {
        setMessageID(null)
        setMessageIDFile(null)
        const newChat = [...chat]

        const findedChat = newChat.find((item) => item.id == match?.id)
        const newMessge = findedChat?.messages
        newMessge[0].pin = false

        const filterPin = pinMessage.map((item) => item.pin)

        setPinMessage(filterPin)

        const findMessage = newMessge?.find(
            (item) => item?.messageId === messageID
        )

        console.log(findMessage)
        if (typeof findMessage?.messageDis === 'string') {
            removeMessageText(id, newChat, findedChat, newMessge)
        }
        if (findMessage?.messageDis.length > 0) {
            removeMessageFile(messageID, messageIDFile)
        }
    }
    // remove message type===file
    const removeMessageFile = (id, idType) => {
        const newChat = [...chat]

        const findedChat = newChat.find((item) => item.id == match?.id)
        const newMessge = findedChat?.messages

        const findMessage = newMessge?.find((item) => item.messageId === id)

        const filterMessage = findMessage.messageDis.findIndex(
            (item) => item.id === idType
        )
        console.log(filterMessage)

        findMessage.messageDis.splice(filterMessage, 1)

        findedChat.messages = newMessge.filter(
            (item) => item.messageDis.length !== 0
        )

        setChat(newChat)
    }
    const removeMessageText = (id, chat, findChat, newMessage) => {
        console.log(id)

        const findMessage = newMessage?.find((item) => item?.messageDis)
        findMessage.messageDis = ''
        console.log(findMessage)

        findChat.messages = newMessage.filter(
            (item) => item.messageDis !== '' || item.messageDis.length < 0
        )

        findChat.messages.messageDis = findMessage
        setChat(chat)
    }

    const contextmenuHandler = (e, id, idFile = null) => {
        e.preventDefault()
        e.stopPropagation()
        console.log(id)
        setShowContextMenu((prev) => !prev)
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
            findPin.pin = true
            setPinMessage((prev) => [...prev, findPin])
        } else {
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

    const ForwardHandler = (isCheck = false) => {
        setShowContextMenu(false)
        setShowForwardModal(true)
        isCheck ? setCheckForward(true) : setCheckForward(false)
    }
    const forwardClickHandler = (userId) => {
        let findChat = null
        const newChat = [...chat]

        setCheckMessage([])
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
        if (!checkForward) {
            findChat = userMessage?.messages.find(
                (item) => item?.messageId === messageID
            )
            findChat.check=false
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
        } else {
            findChat = userMessage?.messages.filter((item) => item?.check)
            findChat.forEach((item)=>item.check=false)
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

    const reactionEmojiHandler=(emojiId)=>{

        const newChat = [...chat]
        const newMessage = [...message?.messages]
        const findedChat = newChat.find((item) => item.id == match?.id)

        const findMessage = newMessage.find(
            (message) => message.messageId === messageID
        )
        
         if( findMessage.reaction === emojiId){
            findMessage.reaction = ""
       
         }
         else{
             findMessage.reaction=emojiId
        
         }

        setMessage(newMessage)
        findedChat.messages=newMessage
        setChat(newChat)
    }
    const removeReactionEmojiHandler=(messageid)=>{

        const newChat = [...chat]
        const newMessage = [...message?.messages]
        const findedChat = newChat.find((item) => item.id == match?.id)

        const findMessage = newMessage.find(
            (message) => message.messageId === messageid
        )
        
        
            findMessage.reaction = ""
        setMessage(newMessage)
        findedChat.messages=newMessage
        setChat(newChat)
    }
    return (
        <div
            className="bg-[url('../../../src/assets/images/bg-pattern.svg')] h-screen relative overflow-hidden"
            onContextMenu={(e) => e.preventDefault()}
        >
            <ChatHeader
                info={message}
                showPin={showPin}
                setShowPin={setShowPin}
                pinMessage={pinMessage}
            />

            <main
                className="flex flex-col justify-between h-screen  overflow-hidden mb-5 relative "
                ref={chatRef}
            >
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
                                from={item.from}
                                forward={item?.forward}
                                {...item}
                                remove={removeMessages}
                                setCheckMessage={setCheckMessage}
                                onContext={contextmenuHandler}
                                onCheck={checkMessageHandler}
                                checkArr={checkMessage}
                                showCheck={showCheckBox}
                                setReaction={removeReactionEmojiHandler}
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
                    !checkMessage.length ? (
                        <ChatForm
                            set={sendMessageHandler}
                            edit={editContent}
                            setEdit={setEditContent}
                            onEdit={editHandler}
                            reply={showReply}
                            setShowReply={setShowReply}
                            replyMessage={replyMessage}
                            setReply={setReplyMessage}
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
                    onRemove={removeMessages}
                    messageID={messageID}
                    onSelect={checkMessageHandler}
                    onEdit={selectEditTextMessageHandler}
                    onPin={pinMessageHandler}
                    onReply={replyMessageHandler}
                    onForward={ForwardHandler}
                    onReaction={reactionEmojiHandler}
                />
                <Uploader />

                <Modal
                    show={showFrowardModal}
                    chat={chat}
                    onForward={forwardClickHandler}
                    messageID={messageID}
                    setChat={setChat}
                    userID={match?.id}
                    setShow={setShowForwardModal}
                />
            </main>
        </div>
    )
}

export default Chat
