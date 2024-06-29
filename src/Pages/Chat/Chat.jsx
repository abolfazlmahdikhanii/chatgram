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
import { MusicControlContext, MusicControlProvider } from '../../Context/MusicContext'
import ChatInfo from '../../Components/ChatInfo/ChatInfo'
import ModalPreviewImg from '../../Components/UI/ModalPreviewImg/ModalPreviewImg'

import { ChatContext, ChatProvider } from '../../Context/ChatContext'

const Chat = () => {
    const [showChatInfo, setShowChatInfo] = useState(false)
    const [groupedMessages, setGroupedMessages] = useState([])
    const match = useParams()
    const navigate = useNavigate()
    const chatRef = useRef()
    const forwards = []
    const {
        chat,
        filterChat,
        findUserMessage,
        displayCheckBoxHandler,
        checkMessage,
        showPin,
        pinMessage,
        message,
        showCheckBox,
        showAlert,
        showContextMenu,
        setShowAlert,
        DeleteChat,
        userMessage,
        messageID,
        audio,
        setISChatInfo,
        isChatInfo,
        chatId,
        chatBg,
        showPinAudio
    } = useContext(ChatContext)

    useEffect(() => {
        filterChat(match?.id)
        findUserMessage(match?.id)
        displayCheckBoxHandler(checkMessage)
        groupMessageHandler(message?.messages)
    }, [match, pinMessage, message])

    const deleteChat = () => {
        DeleteChat()
        navigate('/', { replace: true })
    }
    const groupMessageHandler = (message) => {
     
        const messageGroup = [];
        let currentDate = null;
    
        message?.forEach((messages) => {
          const messageDate = new Date(messages.date).toDateString();
    
          // If the message belongs to a new day, create a new group
          if (messageDate !== currentDate) {
            messageGroup.push({
              date: messageDate,
              messages: [messages],
            });
            currentDate = messageDate;
          } else {
            // If the message belongs to the current day, add it to the last group
            messageGroup[messageGroup.length - 1].messages.push(messages);
          }
        });

        setGroupedMessages(messageGroup)
    }
    const closePinBox = () => {
        const pinArr = message?.messages?.filter(
            (item) => item.pin && chatId == match.id
        )
        pinArr.forEach((item) => {
            item.pin = false
        })
    }
    console.log(groupedMessages)
    return (
        <MusicControlProvider>
     
        <div
            className={`grid transition-all duration-200 ${
                showChatInfo ? 'grid-cols-[1fr_30%]' : 'grid-cols-1'
            }`}
        >
            <div
                className={`${
                    showChatInfo ? 'bg-[size:35%] ' : ''
                }  h-screen relative overflow-hidden  transition-all duration-200 ease-in-out`}
                onContextMenu={(e) => e.preventDefault()}
                style={{backgroundImage:`url(${chatBg?chatBg:'../../../src/assets/images/bg-pattern.svg'})`}}
            >
                <ChatHeader
                    DeleteChat={deleteChat}
                    setShowChatInfo={setShowChatInfo}
                    deleteChat={deleteChat}
                />

                <main
                    className="flex flex-col justify-between h-screen  overflow-hidden mb-5 relative "
                    ref={chatRef}
                >
                     <PinAudio path={audio} />
                    {message?.messages?.filter(
                        (item) => item.pin && chatId == match.id
                    ).length > 0 ? (
                        <PinBox close={closePinBox} />
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
                            groupedMessages?.map((group) => (
                                    // console.log(grouped[item])
                                    <>
                                        <div key={group.date} className={`bg-gray-500/20 backdrop-blur-lg px-4 py-1 w-fit text-sm rounded-full mx-auto mt-2 mb-1 sticky top-2`}>
                                            {group.date}
                                        </div>

                                        {
                                            group.messages.map((item)=>(
                                                <Message
                                                key={crypto.randomUUID()}
                                                 forward={item?.forward}
                                                 forwardSelf={
                                                     item?.forwardSelf
                                                }
                                                 contact={item?.contact}
                                                  {...item}
                                             />
                                            ))
                                        }
                                     
                                               
                                       
                                            
                                           
                                    </>
                                ))
                            }
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
                                    key={crypto.randomUUID()}
                                    forwardSelf={item?.forwardSelf}
                                    contact={item?.contact}
                                    {...item}
                                />
                            ))}
                    </section>

                    {/* FORM */}
                    {!showPin ? (
                        !checkMessage?.length && !showCheckBox ? (
                            <ChatForm />
                        ) : (
                            <CheckMessageBox />
                        )
                    ) : (
                        <UnpinBtn />
                    )}
                    {/* menu */}

                    <MessageMenu show={showContextMenu} isChatInfo={false} />

                    {/* <Uploader /> */}

                    <Modal userID={match?.id} />
                    <ToastContainer />
                </main>
                {showAlert && <Dialog />}
            </div>

            {showChatInfo && (
                <ChatInfo
                    setChatInfo={setShowChatInfo}
                    show={isChatInfo}
                    setClose={setISChatInfo}
                />
            )}

            <ModalPreviewImg />
        </div>
        </MusicControlProvider>
    )
}

export default Chat
