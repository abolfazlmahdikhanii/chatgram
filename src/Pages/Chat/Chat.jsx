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
// import { Notifications } from 'react-push-notification'
// import addNotification from 'react-push-notification'
import {
  MusicControlContext,
  MusicControlProvider,
} from '../../Context/MusicContext'
import ChatInfo from '../../Components/ChatInfo/ChatInfo'
import ModalPreviewImg from '../../Components/UI/ModalPreviewImg/ModalPreviewImg'

import { ChatContext, ChatProvider } from '../../Context/ChatContext'
import { supabase } from '../../superbase'
import { UserContext } from '../../Context/UserContext'
import decodeMessage from '../../Utility/decodeMessage'
import userNameSpliter from '../../Utility/userNameSpliter'
import ProfileImage from '../../Components/ProfileImage/ProfileImage'
import SkeletonLoaderMessage from '../../Components/UI/SkeletonLoaderMessage/SkeletonLoaderMessage'
import EmptyMessage from '../../Components/EmptyMessage/EmptyMessage'
import { toastOptions } from '../../Utility/toastOption'

const Chat = () => {
  const [showChatInfo, setShowChatInfo] = useState(false)

  const [groupedMessages, setGroupedMessages] = useState([])
  const [messages, setMessages] = useState([])
  const [unreadMessage, setUnreadMessage] = useState([])
  const match = useParams()
  const navigate = useNavigate()
  const chatRef = useRef()
  const messageEndRef = useRef(null)
  const [isScrolledUp, setIsScrolledUp] = useState(false)
  const [isShowUpBtn, setIsShowUpBtn] = useState(false)
  const [isLoad, setIsLoad] = useState(false)
  const [lastScrollTop, setLastScrollTop] = useState(0)

  const messagesContainerRef = useRef(null)

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
    showPinAudio,
    setProfileInfo,
    friendID,
    setPinMessage,
    checkMessageHandler,
    setShowContextMenu,
  } = useContext(ChatContext)
  const { user, chatBg } = useContext(UserContext)
  let lastMessage = []

  useEffect(() => {
    fetchMessages()
    requestNotificationPermission()

    if (!friendID) navigate('/')

    return () => {
      setIsShowUpBtn(false)
    }
  }, [match.id])
  useEffect(() => {
    getFriendinfo(friendID)
  }, [match.id, friendID])
  useEffect(() => {
    fetchMessages()

    updateMessageStatus()
    filterUnreadMessage()
    // Subscribe to real-time messages
    const subscription = supabase
      .channel('public:messages')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'messages' },
        (payload) => {
          const newMsg = payload.new
          setIsLoad(false)
          if (newMsg.status === 'send' && newMsg.recipientid == user?.userid) {
            showNotification('Chatgram', newMsg, newMsg?.content)
          }

          if (newMsg.chatID == match?.id || !newMsg.length) {
            setMessages((prevMessages) => [...prevMessages, payload.new])
            lastMessage[match.id] = payload.new

            setLastMessage(payload.new)

            fetchMessages()
            updateMessageStatus()
            filterUnreadMessage()
            if (!isScrolledUp && !payload.new.reactions||!payload.new.isForward||!payload.new.isPin) scrollToBottom()
          } else if (
            (newMsg.senderid === user?.userid &&
              newMsg.recipientid === user?.userid) ||
            !newMsg.length
          ) {
            setMessages((prevMessages) => [...prevMessages, payload.new])
            lastMessage[match.id] = payload.new

            setLastMessage(payload.new)

            fetchSavedMessages()
            updateSavedMessageStatus()
            if (!isScrolledUp && !payload.new.reactions||!payload.new.isForward||!payload.new.isPin) scrollToBottom()
            // groupMessageHandler(messages)
          }
        }
      )
      .subscribe()

    // Cleanup subscription on unmount
    return () => {
      supabase.removeChannel(subscription)
    }
  }, [match.id])
  useEffect(() => {
    if (!isScrolledUp) scrollToBottom()
    return () => {
      setIsShowUpBtn(false)
    }
  }, [isScrolledUp])
  const fetchMessages = async () => {
    try {
      if (match?.id == user?.userid) {
        fetchSavedMessages()
        updateSavedMessageStatus()
      }

      setIsLoad(true)

      let { data: message, error } = await supabase
        .from('messages')
        .select(
          `*,
          replayId(messageid,messageType,content,name,senderid,isDeleted)
          ,forward_from(email,bgProfile,username,userid),
          contact(email,username,bgProfile,avatar_url)`
        )
        .eq('chatID', match.id)
        .eq('isDeleted', false)
        .order('sentat', { ascending: true })

      if (error) throw Error('Error fetching messages:', error)
      setMessages((prev) => [...prev, message])
      lastMessage[match.id] = message
      setLastMessage(lastMessage)
      groupMessageHandler(message)
      getPinMessage(message)
      setIsLoad(false)
    } catch (error) {
      toast(error, toastOptions)
    } finally {
      setIsLoad(false)
    }
  }
  const fetchSavedMessages = async () => {
    setIsLoad(true)
    let { data: messages, error } = await supabase
      .from('messages')
      .select(
        `*,
          replayId(messageid,messageType,content,name,senderid,isDeleted)
          ,forward_from(email,bgProfile,username,userid),
          contact(email,username,bgProfile,avatar_url)`
      )
      .eq('recipientid', user.userid)
      .eq('senderid', user.userid)
      .eq('isDeleted',false)
      .order('sentat', { ascending: true })

    if (!error) {
      setMessages((prev) => [...prev, message])
      getPinMessage(messages)
      groupMessageHandler(messages)
      setIsLoad(false)
    }
  }
  const filterUnreadMessage = async () => {
    let { data: messages, error } = await supabase
      .from('messages')
      .select('*')
      .eq('chatID', match?.id)
      .neq('senderid', user?.userid)
      .eq('status', 'send')

    if (!error) setUnreadMessage(messages)
  }
  const updateMessageStatus = async () => {
    let { data, error } = await supabase
      .from('messages')
      .update({ status: 'read' })
      .eq('senderid', friendID)
      .eq('chatID', match?.id)
      .eq('status', 'send')
      .select()

    if (!error) setMessages(data)
  }
  const updateSavedMessageStatus = async () => {
    let { data, error } = await supabase
      .from('messages')
      .update({ status: 'read' })
      .eq('senderid', match?.id)
      .eq('recipientid', match?.id)
      .eq('status', 'send')
      .select()

    if (!error) setMessages(data)
  }
  const getFriendinfo = async (id) => {
    let { data: users, error } = await supabase
      .from('users')
      .select('*')
      .eq('userid', id)
      .single()
    if (!error) setProfileInfo(users)
  }
  const getSenderinfo = async (id) => {
    
      let { data: users, error } = await supabase
        .from('users')
        .select('*')
        .eq('userid', id)
        .single()
      if (!error) return users
    
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
    
    setPinMessage(filteredPin)
  }
  const closePinBox = () => {
    const pinArr = message?.messages?.filter(
      (item) => item.pin && chatId == match.id||item.senderid==match.id
    )
    pinArr.forEach((item) => {
      item.pin = false
    })
  }
  const checkBgIsSvg = (img) => {
    const splitedBg = chatBg?.split('/')
    const isSvg = splitedBg[splitedBg?.length - 1]?.includes('.svg')
    return isSvg
  }
  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission()
      return permission
    }
    return 'denied'
  }
  const showNotification = async (title, message, content) => {
    if (document.hidden && window.Notification.permission === 'granted') {
      console.log(content)

      const senderInfo = await getSenderinfo(message?.senderid)
      const reciverInfo = await getSenderinfo(message?.recipientid)

      // addNotification({
      //   // title: title,
      //   // title: `${senderInfo?.username||senderInfo.email?.split('@')[0]}->${reciverInfo?.username||reciverInfo.email?.split('@')[0]}`,
      //   title: `${senderInfo?.username||senderInfo.email?.split('@')[0]}`,
      //   subtitle:'test',
      //   duration: 1000,
      //   message: 'New Message!',
      //   theme: 'red',
      //   native: false,
      //   backgroundBottom: 'darkgreen',
      //   icon: senderInfo?.avatar_url?senderInfo.avatar_url:"../../../src/assets/images/noti-logo2.png", // when using native, your OS will handle theming.
      // })

      // new Notification(title,{
      //   body:msg,
      //   icon:'../../../src/assets/images/logo.png'
      // })
    }
  }
  const scrollToBottom = () => {
    const container = messagesContainerRef.current
    if (container) {
      container.scrollTop = container.scrollHeight
    }
  }
  const handleScroll = (e) => {
    const container = messagesContainerRef.current

    const isAtBottom = container.scrollHeight - container.clientHeight - 20

    setIsScrolledUp(!isAtBottom)
    //if scroll top show btn
    const currentScrollTop = container.scrollTop

    // Check if the user has scrolled up by more than 20px
    if (currentScrollTop < isAtBottom) {
      setIsShowUpBtn(true)
    } else if (currentScrollTop >= lastScrollTop) {
      setIsShowUpBtn(false)
    }

    // Update last scroll position
    setLastScrollTop(currentScrollTop)

    // }
  }
  return (
    <MusicControlProvider>
      <div
        className={`grid transition-all duration-200 h-[97dvh]  ${
          showChatInfo ? 'xl:grid-cols-[1fr_340px] grid-cols-1' : 'grid-cols-1'
        } `}
      >
        <div
          className={`${
            showChatInfo ? 'lg:bg-[size:35%] ' : ''
          }  h-screen relative overflow-hidden    ${
            !chatBg || checkBgIsSvg(chatBg)
              ? 'bg-contain bg-repeat  [-webkit-background-origin:border] transition-colors duration-200'
              : ' lg:bg-[size:80vw_100vh] bg-[size:100vw_100vh]  bg-no-repeat transition-all duration-200 relative'
          } dark:stroke-[#fff] `}
          onContextMenu={(e) => e.preventDefault()}
          style={{
            backgroundImage: `url(${
              chatBg
                ? `/images/chat-bg/${chatBg}`
                : '/images/bg-pattern.svg'
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
              className={`h-[90%]  overflow-y-auto scroll-smooth flex flex-col px-1  mt-1 mb-1.5 transition-all w-full ${
                showPin ? '-translate-x-full hidden' : 'translate-x-0 flex'
              }`}
              ref={messagesContainerRef}
              onScroll={handleScroll}
            >
              {isLoad && !groupedMessages?.length ? (
                <>
                  <SkeletonLoaderMessage />
                  <SkeletonLoaderMessage size="md" />
                </>
              ) : (
                <>
                  {messages?.content !== '' && groupedMessages.length ? (
                    groupedMessages?.map((group, i) => (
                      // console.log(grouped[item])

                      <div key={i + 1 * 2}>
                        {group.date === group.date && (
                          <div
                            className={`dark:bg-gray-500/20 backdrop-blur-lg px-4 py-1 w-fit text-sm rounded-lg mx-auto mt-2 mb-1 sticky top-2 dark:text-gray-50 text-blue-200 bg-gray-600/30 `}
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
                    ))
                  ) : (
                    <div className="grid place-items-center h-full">
                      <EmptyMessage />
                    </div>
                  )}
                </>
              )}
            </section>
            {/* pin message */}
            <section
              className={`h-[90%]  overflow-y-auto  flex flex-col  mt-1 mb-20 transition-all duration-200 ease-linear w-full ${
                pinMessage && showPin
                  ? 'translate-x-0 flex'
                  : 'translate-x-full hidden'
              }`}
            >
              {pinMessage &&
                pinMessage.map((item, i) => (
                  <Message
                    key={item.messageid}
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
              <UnpinBtn chatID={match.id!==user?.userid?match.id:null} senderId={match.id==user?.userid?match.id:null}  />
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

            <div className="fixed bottom-[105px] right-5">
              {isShowUpBtn && unreadMessage?.length > 0 ? (
                <span className="px-2 h-[20px] absolute -top-1 right-0  rounded-full bg-indigo-600 text-indigo-200  text-[10px] flex items-center justify-center z-10">
                  {unreadMessage?.length}
                </span>
              ) : null}
              <button
                className={`btn  mask mask-squircle ${
                  isShowUpBtn ? 'inline-block' : 'hidden'
                }`}
                ref={messageEndRef}
                onClick={scrollToBottom}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </button>
            </div>
          </main>
          {showAlert && <Dialog chatId={match.id!==user?.userid?match.id:null} senderId={match.id==user?.userid?match.id:null} />}
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

export default memo(Chat)
