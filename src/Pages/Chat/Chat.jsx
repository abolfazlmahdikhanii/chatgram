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
import {
  MusicControlContext,
  MusicControlProvider,
} from '../../Context/MusicContext'
import ChatInfo from '../../Components/ChatInfo/ChatInfo'
import ModalPreviewImg from '../../Components/UI/ModalPreviewImg/ModalPreviewImg'

import { ChatContext, ChatProvider } from '../../Context/ChatContext'
import { supabase } from '../../superbase'
import { UserContext } from '../../Context/UserContext'

const Chat = () => {
  const [showChatInfo, setShowChatInfo] = useState(false)
  const [groupedMessages, setGroupedMessages] = useState([])
  const [messages, setMessages] = useState([])
  const match = useParams()
  const navigate = useNavigate()
  const chatRef = useRef()
  const forwards = []
  const {
    chat,
    profileInfo,
    chatInfo,
    setLastMessage,
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
    showPinAudio,
    setProfileInfo,
    friendID,
  } = useContext(ChatContext)
  const { user } = useContext(UserContext)
  let lastMessage = []
  // useEffect(() => {
  //     filterChat(match?.id)
  //     findUserMessage(match?.id)
  //     displayCheckBoxHandler(checkMessage)
  //     groupMessageHandler(message?.messages)
  // }, [match, pinMessage, message])

  useEffect(() => {
    fetchMessages()

    if (!friendID) navigate('/')
  }, [match.id])
  useEffect(() => {
    getFriendinfo(friendID)
  }, [friendID])
  useEffect(() => {
    fetchMessages()

    // Subscribe to real-time messages
    const subscription = supabase
      .channel('public:messages')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages' },
        (payload) => {
          const newMsg = payload.new

          if (newMsg.chatID == match?.id) {
            setMessages((prevMessages) => [...prevMessages, payload.new])
            lastMessage[match.id] = payload.new

            setLastMessage(payload.new)
            // console.log(payload.new);
            fetchMessages()

            // groupMessageHandler(messages)
          }
        }
      )
      .subscribe()

    // Cleanup subscription on unmount
    return () => {
      // supabase.removeSubscription(subscription)
    }
  }, [match.id])
  const fetchMessages = async () => {
    let { data: messages, error } = await supabase
      .from('messages')
      .select('*')
      .eq('chatID', match.id)

      .order('sentat', { ascending: true })

    if (error) console.error('Error fetching messages:', error)
    setMessages(messages)
    lastMessage[match.id] = messages

    setLastMessage(lastMessage)
    groupMessageHandler(messages)
  }
  const fetchSavedMessages = async () => {
    let { data: messages, error } = await supabase
      .from('messages')
      .select('*')
      .eq('recipientid', user.userid)
      .order('sentat', { ascending: true })

    if (error) console.error('Error fetching messages:', error)
    setMessages(messages)

    groupMessageHandler(messages)
  }
  const getFriendinfo = async (id) => {
    try {
      let { data: users, error } = await supabase
        .from('users')
        .select('*')
        .eq('userid', id)
        .single()
      if (error) throw error
      setProfileInfo(users)
    } catch (error) {
      console.log(error)
    }
  }
  const deleteChat = () => {
    DeleteChat()
    navigate('/', { replace: true })
  }
  const groupMessageHandler = (message) => {
    console.log(message)
    const messageGroup = [...groupedMessages]
    let currentDate = null

    message?.forEach((messages,i) => {
      const messageDate = new Date(messages.sentat).toDateString()
  
      // If the message belongs to a new day, create a new group
      if (messageDate !== currentDate&&messageGroup[i]?.date!==messageDate) {
        messageGroup.push({
          date: messageDate,
          messages: [messages],
        })
        currentDate = messageDate
      } else {
        // If the message belongs to the current day, add it to the last group
        messageGroup[messageGroup.length - 1].messages.push(messages)
      }
    })

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
          style={{
            backgroundImage: `url(${
              chatBg ? chatBg : '../../../src/assets/images/bg-pattern.svg'
            })`,
          }}
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
            {message?.messages?.filter((item) => item.pin && chatId == match.id)
              .length > 0 ? (
              <PinBox close={closePinBox} />
            ) : null}

            {/* simple message */}
            <section
              className={`h-[90%]  overflow-y-auto  flex flex-col  mt-1 mb-1.5 transition-all duration-200 ease-linear w-full ${
                showPin ? '-translate-x-full hidden' : 'translate-x-0 flex'
              }`}
            >
              {messages?.content !== '' &&
                groupedMessages?.map((group, i) => (
                  // console.log(grouped[item])

                  <div key={group.date}>
                    <div
                      className={`bg-gray-500/20 backdrop-blur-lg px-4 py-1 w-fit text-sm rounded-full mx-auto mt-2 mb-1 sticky top-2`}
                    >
                      {group.date}
                    </div>

                    {group.messages.map((item) => (
                      <Message
                        key={item.id}
                        forward={item?.forward}
                        forwardSelf={item?.forwardSelf}
                        contact={item?.contact}
                        src={item.src}
                        messageType={
                          item.messageType ? item.messageType : item.type
                        }
                        {...item}
                      />
                    ))}
                  </div>
                ))}
            </section>
            {/* pin message */}
            <section
              className={`h-[90%]  overflow-y-auto  flex flex-col  mt-1 mb-1.5 transition-all duration-200 ease-linear w-full${
                showPin ? 'translate-x-0 flex' : 'translate-x-full hidden'
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
                <ChatForm setMessage={groupMessageHandler} />
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
