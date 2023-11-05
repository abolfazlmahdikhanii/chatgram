import React, { useEffect, useRef, useState } from 'react'
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
    const [checkMessage, setCheckMessage] = useState([])
    const [showCheckBox, setShowCheckBox] = useState(false)
    const [editContent, setEditContent] = useState('')
    const [pinMessage, setPinMessage] = useState([])
    const [showPin, setShowPin] = useState(false)
    const [showReply, setShowReply] = useState(false)
    const [replyMessage, setReplyMessage] = useState(null)
    const [showFrowardModal,setShowForwardModal]=useState(false)
    

    const match = useParams()
    const chatRef = useRef()

    useEffect(() => {
        filterChat(match.id)
        displayCheckBoxHandler(checkMessage)
    }, [match, chat, message, checkMessage, editContent, chatRef,pinMessage])

    const filterChat = (id) => {
        let findChat = chat.find((item) => item.id == id)

        setMessage(findChat)
    }

    const sendMessageHandler = (txt, replyMessage = null) => {
        const message = {
            messageId: crypto.randomUUID(),
            messageDis: txt,
            from: 'client',
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
    // remove message type===file
    const removeMessageFile = (id) => {
        console.log(id)
        const newChat = [...chat]

        const findedChat = newChat.find((item) => item.id == match?.id)
        const newMessge = findedChat?.messages
        newMessge[0].pin = false

        const filterPin = pinMessage.filter((item) => item.pin)

        setPinMessage(filterPin)
        const findMessage = newMessge?.map((item) => item?.messageDis)

        let index = null

        for (const item of findMessage) {
            for (const val of item) {
                if (val.id === id) {
                    index = item.indexOf(val)
                    item.splice(index, 1)
                }
            }
        }

        findedChat.messages = newMessge.filter(
            (item) => item.messageDis.length !== 0
        )

        findedChat.messages.messageDis = findMessage
        setChat(newChat)
    }

    const contextmenuHandler = (e, id) => {
        e.preventDefault()
        setShowContextMenu((prev) => !prev)
        setPageX(e.pageX)
        setPageY(e.pageY)

        setMessageID(id)
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

    const ForwardHandler=()=>{
        setShowContextMenu(false)
        setShowForwardModal(true)
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
                    className={`h-[90%]  overflow-y-auto  flex flex-col  mt-1 mb-1.5 transition-all duration-200 ease-linear  ${
                        showPin
                            ? '-translate-x-full hidden'
                            : 'translate-x-0 flex'
                    }`}
                >
                    {message?.messages?.messageDis !== '' &&
                        message?.messages?.map((item, i) => (
                            <Message
                                key={item.messageId}
                                from={item.from}
                                {...item}
                                remove={removeMessageFile}
                                setCheckMessage={setCheckMessage}
                                onContext={contextmenuHandler}
                                onCheck={checkMessageHandler}
                                checkArr={checkMessage}
                                showCheck={showCheckBox}
                            />
                        ))}
                </section>
                {/* pin message */}
                <section
                    className={`h-[90%]  overflow-y-auto  flex flex-col  mt-1 mb-1.5 transition-all duration-200 ease-linear ${
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
                                remove={removeMessageFile}
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
                    onRemove={removeMessageFile}
                    messageID={messageID}
                    onSelect={checkMessageHandler}
                    onEdit={selectEditTextMessageHandler}
                    onPin={pinMessageHandler}
                    onReply={replyMessageHandler}
                    onForward={ForwardHandler}
                />
                <Uploader />

                <Modal show={showFrowardModal} chat={chat}/>
            </main>
        </div>
    )
}

export default Chat
