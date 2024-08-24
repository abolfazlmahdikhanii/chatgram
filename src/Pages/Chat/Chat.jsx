import React, { useCallback, useContext, useEffect, useId, useRef, useState } from 'react'
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
    setPinMessage
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
    updateMessageStatus()

    // Subscribe to real-time messages
    const subscription = supabase
      .channel('public:messages')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'messages' },
        (payload) => {
          const newMsg = payload.new
         
          if (newMsg.chatID == match?.id||!newMsg.length) {
            setMessages((prevMessages) => [...prevMessages, payload.new])
            lastMessage[match.id] = payload.new
            console.log(message);
            setLastMessage(payload.new)
            // console.log(payload.new);
            fetchMessages()
            updateMessageStatus()
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
  const fetchMessages =async () => {
    let { data: messages, error } = await supabase
      .from('messages')
      .select('*,replayId(messageid,messageType,content,name,senderid,isDeleted),forward_from(email,bgProfile,username,userid)')
      .eq('chatID', match.id)
      .eq('isDeleted',false)
      .order('sentat', { ascending: true })

    if (error) console.error('Error fetching messages:', error)
    setMessages(messages)
    lastMessage[match.id] = messages
    setLastMessage(lastMessage)
    groupMessageHandler(messages)
    getPinMessage(messages)
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

  const updateMessageStatus = async () => {
    try {
      let { data, error } = await supabase
        .from('messages')
        .update({ status: 'read' })
        .eq('senderid', friendID)
        .eq('chatID', match?.id)
        .eq('status', 'send')
        .select()

      if (error) throw error
      setMessages(data)
    } catch (error) {
      console.log(error)
    }
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
  const groupMessageHandler = (message, isSend) => {
    let messageGroup = []
    if (isSend) {
      messageGroup = [...groupedMessages]
    } else {
      messageGroup = []
    }
    let currentDate = null

    message?.forEach((messages, i) => {
      const messageDate = new Date(messages.sentat).toDateString()

      // If the message belongs to a new day, create a new group
      if (
        messageDate !== currentDate &&
        messageGroup[i]?.date !== messageDate
      ) {
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
  const getPinMessage=(arr)=>{
    const filteredPin=arr.filter(message=>message?.isPin)
    console.log(filteredPin);
    setPinMessage(filteredPin)
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
            getInfo={getFriendinfo}
          />

          <main
            className="flex flex-col justify-between h-screen  overflow-hidden mb-5 relative "
            ref={chatRef}
          >
            <PinAudio path={audio} />
            {pinMessage?.length>0 ? (
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

                  <div key={crypto.randomUUID()}>
                    {group.date === group.date && (
                      <div
                        className={`bg-gray-500/20 backdrop-blur-lg px-4 py-1 w-fit text-sm rounded-full mx-auto mt-2 mb-1 sticky top-2`}
                      >
                        {group.date}
                      </div>
                    )}

                    {group.messages.map((item) => (
                      <Message
                        key={item.id}
                        forwardInfo={item?.forward_from}
                        forwardSelf={item?.forwardSelf}
                        contact={item?.contact}
                        src={item.src}
                        replayData={item?.replayId}
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
          {showAlert && <Dialog chatId={match.id}/>}
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
