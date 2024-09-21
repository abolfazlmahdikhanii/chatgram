import React, {
  memo,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react'
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
    setPinMessage,
    checkMessageHandler,
    setShowContextMenu,
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
    // if (match?.id == user?.userid) fetchSavedMessages()
  }, [match.id])
  useEffect(() => {
    getFriendinfo(friendID)
  }, [friendID])
  useEffect(() => {
    // if (match?.id == user?.userid) {
    //   fetchSavedMessages()
    // } else {
      fetchMessages()
    // }

    updateMessageStatus()

    // Subscribe to real-time messages
    const subscription = supabase
      .channel('public:messages')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'messages' },
        (payload) => {
          const newMsg = payload.new
       
          if (newMsg.chatID == match?.id || !newMsg.length) {
            setMessages((prevMessages) => [...prevMessages, payload.new])
            lastMessage[match.id] = payload.new
            console.log(payload.new)
            setLastMessage(payload.new)
            // console.log(payload.new);
            fetchMessages()
            updateMessageStatus()
            // groupMessageHandler(messages)
          }
           else if (
            (newMsg.senderid === user?.userid &&
              newMsg.recipientid === user?.userid) ||
            !newMsg.length
          ) {
            setMessages((prevMessages) => [...prevMessages, payload.new])
            lastMessage[match.id] = payload.new
            console.log(message)
            setLastMessage(payload.new)
            // console.log(payload.new);
            fetchSavedMessages()
            updateMessageStatus()
            // groupMessageHandler(messages)
          }
        }
      )
      .subscribe()

    // Cleanup subscription on unmount
    return () => {
      // supabase&&supabase.removeSubscription(subscription)
    }
  }, [match.id])
  const fetchMessages = async () => {
    if(match?.id==user?.userid) fetchSavedMessages()
      else{
    
    let { data: message, error } = await supabase
      .from('messages')
      .select(
        '*,replayId(messageid,messageType,content,name,senderid,isDeleted),forward_from(email,bgProfile,username,userid),contact(email,username,bgProfile,avatar_url)'
      )
      .eq('chatID', match.id)
      .eq('isDeleted', false)
      .order('sentat', { ascending: true })

    if (error) console.error('Error fetching messages:', error)
    setMessages(prev=>[...prev,message])
    lastMessage[match.id] = message
    setLastMessage(lastMessage)
    groupMessageHandler(message)
    getPinMessage(message)
  }
  }
  const fetchSavedMessages = async () => {
    let { data: messages, error } = await supabase
      .from('messages')
      .select('*')
      .eq('recipientid', user.userid)
      .eq('senderid', user.userid)
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
    DeleteChat(match.id)
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
  const getPinMessage = (arr) => {
    const filteredPin = arr?.filter((message) => message?.isPin)
    console.log(filteredPin)
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
  const checkBgIsSvg=(img)=>{
    const splitedBg=chatBg?.split('/')
    const isSvg=splitedBg[splitedBg?.length-1]?.includes('.svg')
    return isSvg
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
          }  h-screen relative overflow-hidden    ${!chatBg||checkBgIsSvg(chatBg)?'bg-contain bg-repeat  [-webkit-background-origin:border] transition-colors duration-200':' bg-[size:100vw_100vh]  bg-no-repeat transition-all duration-200 relative before:absolute before:inset-0 before:top-20 before:backdrop-blur-[2px] before:w-full before:h-full'} dark:stroke-[#fff] `}
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
            chatID={match.id}
            isMessage={groupedMessages.length}
          />

          <main
            className="flex flex-col justify-between h-screen  overflow-hidden mb-5 relative "
            ref={chatRef}
          >
            <PinAudio path={audio} />
            {pinMessage?.length > 0 ? <PinBox close={closePinBox} /> : null}

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
                        key={item.messageid}
                        forwardInfo={item?.forward_from}
                        forwardSelf={item?.forwardSelf}
                        contact={item?.contact}
                        src={item.src}
                        replayData={item?.replayId}
                        isSelected={checkMessage.includes(item.messageid)}
                        chatId={match.id}
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
                pinMessage && showPin
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
              (!checkMessage?.length && !showCheckBox) ||
              !groupedMessages.length ? (
                <ChatForm setMessage={groupMessageHandler} />
              ) : (
                <CheckMessageBox chatId={match.id} />
              )
            ) : (
              <UnpinBtn chatID={match.id} />
            )}
            {/* menu */}

            <MessageMenu
              show={showContextMenu}
              isChatInfo={false}
              close={() => setShowContextMenu(false)}
              chatID={match.id}
            />

            {/* <Uploader /> */}

            <Modal userID={match?.id} />
            <ToastContainer />
          </main>
          {showAlert && <Dialog chatId={match.id} />}
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
