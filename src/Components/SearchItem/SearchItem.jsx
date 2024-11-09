import React, { useContext, useEffect, useState } from 'react'
import { PiChecksBold } from 'react-icons/pi'

import { PiCheck } from 'react-icons/pi'
import Profile from '../Profile/Profile'
import NotifyNumber from '../UI/NotifyNumber/NotifyNumber'
import { Link, NavLink } from 'react-router-dom'
import MessageItemContent from '../MessageItemContent/MessageItemContent'
import { ChatContext } from '../../Context/ChatContext'
import { supabase } from '../../superbase'
import { UserContext } from '../../Context/UserContext'

const SearchItem = ({
  isSave,
  onContext,
  messagesArr,
  chats,

  isFriend,
  isPending = false,
  isReceiveRequest,
  getList
}) => {
  const [messages, setMessages] = useState([])
  const [unreadMessage, setUnreadMessage] = useState([])

  const { searchChat, lastMessage, setLastMessage, setFriendID } =
    useContext(ChatContext)
  const [isPendingRequest, setIsPendingRequest] = useState(isPending || false)
  const { user } = useContext(UserContext)

  useEffect(() => {
    checkIsFriends(chats?.userid)
     
  }, [])

  useEffect(() => {
    if (isFriend) {
      fetchMessages()
      filterUnreadMessage()
    }
  }, [lastMessage])
  useEffect(() => {
    if (isFriend) {
      fetchMessages()

      // Subscribe to real-time messages
      const subscription = supabase
        .channel('public:messages')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'messages' },
          (payload) => {
            const newMsg = payload.new
         
            if (
              newMsg.chatID == isFriend?.requestid ||
              isFriend?.meID?.userid
            ) {
              setMessages(payload.new)

       
              fetchMessages()
              filterUnreadMessage()
              
            }
          }
        )
        .subscribe()
    }

    // Cleanup subscription on unmount
  }, [])

  const fetchMessages = async () => {
    let { data: messages, error } = await supabase
      .from('messages')
      .select('*')
      .eq('chatID', isFriend?.requestid)
      .order('sentat', { ascending: false })
      .limit(1)
    if (error) console.error('Error fetching messages:', error)

    setMessages(messages)
  }
  const filterUnreadMessage = async () => {
    let { data: messages, error } = await supabase
      .from('messages')
      .select('*')
      .eq('chatID', isFriend?.requestid)
      .neq('senderid', user.userid)
      .eq('status', 'send')

    if (error) console.error('Error fetching messages:', error)
    setUnreadMessage(messages)
  }
  const formatTime = (date) => {
    return new Intl.DateTimeFormat('tr', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(date)
  }
  let icon = null

  if (messages && messages[messages?.length - 1]?.status === 'read') {
    icon = <PiChecksBold size={18} color="#818cf8" />
  } else {
    icon = <PiCheck size={16} color="#9ca3af" />
  }

  const showSearchMessage = () => {
    let dis = null
    messagesArr.forEach((item) => {
      dis =
        item?.messages[
          item.messages.findIndex((item) =>
            item.messageDis.includes(searchChat)
          )
        ]
    })

    return dis
  }

  const checkIsFriends = async (id) => {
    try {
      let { data: friendrequests, error } = await supabase
        .from('friendrequests')
        .select('*')
        .eq('senderid', user?.userid)
        .eq('recipientid', id)
        .eq('status', 'pending')
      if (error) throw Error

      if (friendrequests.length) {
        setIsPendingRequest(true)
        return true
      } else {
        return false
      }
    } catch (error) {
      console.log(error)
      return false
    }
  }
  const addToFriends = async (id) => {
    if (checkIsFriends(id) === true) {
      setIsPendingRequest(true)
    } else {
      const { data, error: err } = await supabase
        .from('friendrequests')
        .insert([{ senderid: user?.userid, recipientid: id }])

      if (err) console.log(err)
      setIsPendingRequest(true)
    }
  }
  const removeToFriendsPending = async (id) => {
    try {
      const { data, error: err } = await supabase
        .from('friendrequests')
        .delete()
        .eq('senderid', user?.userid)
        .eq('recipientid', id)
        .eq('status', 'pending')
        .select()

      if (err) throw Error
      setIsPendingRequest(false)
    } catch (error) {
      console.log(error)
    }
  }
  const removeFriendRequest = async (id) => {
    try {
      const { data, error: err } = await supabase
        .from('friendrequests')
        .delete()
        .eq('senderid', id)
        .eq('recipientid', user?.userid)
        .eq('status', 'pending')
        .select()

      if (err) throw Error
     getList()
    } catch (error) {
      console.log(error)
    }
  }
  const acceptFriendRequest = async (id) => {
    try {
      const { data, error} = await supabase
        .from('friendrequests')
        .update({ status: 'accepted' })
        .eq('senderid', id)
        .eq('recipientid', user?.userid)
        .select()

      if (error) throw Error
     getList()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {isFriend ? (
        <NavLink
          to={`/chat/${isFriend?.requestid || isFriend?.meID?.userid}`}
          className={({ isActive }) =>
            `message-item relative  ${isActive ? 'message-item--active ' : ''}`
          }
          onContextMenu={onContext}
          onClick={() => setFriendID(chats?.userid)}
        >
          <Profile
            size="m"
            path={chats?.avatar_url}
            userName={chats?.username || chats?.email?.split('@')[0]}
            bgProfile={chats?.bgProfile}
            relation={chats?.relation}
            isSave={isSave}
          />

          <div className="w-full flex-col gap-2 flex">
            {/* top */}
            <div className="flex items-center justify-between w-full">
              <p className="font-semibold  dark:text-white capitalize text-[17px] text-gray-800 w-[130px] truncate">
                {!isSave
                  ? chats?.username || chats?.email?.split('@')[0]
                  : 'Saved Messages'}
              </p>
              <div className="flex items-center gap-1.5">
                <p>{messages?.length > 0 && icon}</p>
                <p className="text-[11px] dark:text-gray-400 text-gray-600">
                  {messages?.length > 0 &&
                    formatTime(messages[messages.length - 1]?.date)}
                </p>
              </div>
            </div>
            {/* bottom */}
            {messages?.length > 0 ? (
              <div className="flex items-center justify-between w-full">
                <MessageItemContent
                  message={
                    messagesArr?.length && showSearchMessage()
                      ? showSearchMessage()
                      : messages[messages.length - 1]
                  }
                />

                {unreadMessage?.length > 0 && (
                  <NotifyNumber unread={unreadMessage.length} />
                )}
              </div>
            ) : (
              <p className="-mt-1 text-sm font-normal dark:text-gray-400 text-gray-500">
                {chats?.relation === 'me' ? 'online' : 'last seen recently'}
              </p>
            )}
          </div>
        </NavLink>
      ) : (
        <div
          className={`message-item relative `}
          onContextMenu={onContext}
          // onClick={() => setFriendID(chats?.userid)}
        >
          <Profile
            size="m"
            path={chats?.avatar_url}
            userName={chats?.username || chats?.email?.split('@')[0]}
            bgProfile={chats?.bgProfile}
            relation={chats?.relation}
            isSave={isSave}
          />

          <div className="w-full flex-col gap-2 flex">
            {/* top */}
            <div className="flex items-center justify-between w-full">
              <p className="font-semibold  dark:text-white capitalize text-[17px] text-gray-800 w-[130px] truncate">
                {!isSave
                  ? chats?.username || chats?.email?.split('@')[0]
                  : 'Saved Messages'}
              </p>
            </div>
            {/* bottom */}
            <div className="flex items-center justify-between relative">
              <p className="-mt-1 text-sm font-normal dark:text-gray-400 text-gray-500">
                {chats?.relation === 'me' ? 'online' : 'last seen recently'}
              </p>
              {!isReceiveRequest ? (
                <button
                  className={`mask mask-squircle btn  absolute h-[20px] w-[20px] right-0 -bottom-1 grid place-items-center ${
                    isPendingRequest
                      ? 'btn-primary dark:bg-opacity-20 dark:outline-primary/20 dark:border-primary/20 bg-opacity-60 outline-primary/60 border-primary/60'
                      : 'btn-primary'
                  }`}
                  onClick={() =>
                    !isPendingRequest
                      ? addToFriends(chats?.userid)
                      : removeToFriendsPending(chats?.userid)
                  }
                >
                  {!isPendingRequest ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M18.5 19.5h-4M16.5 21.5v-4M12.16 10.87c-.1-.01-.22-.01-.33 0a4.42 4.42 0 01-4.27-4.43A4.428 4.428 0 0111.99 2c2.45 0 4.44 1.99 4.44 4.44 0 2.4-1.9 4.35-4.27 4.43zM11.99 21.81c-1.82 0-3.63-.46-5.01-1.38-2.42-1.62-2.42-4.26 0-5.87 2.75-1.84 7.26-1.84 10.01 0"
                      ></path>
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M18.41 18.09l-2.82 2.82M18.41 20.91l-2.82-2.82M12.16 10.87c-.1-.01-.22-.01-.33 0a4.42 4.42 0 01-4.27-4.43C7.56 3.99 9.54 2 12 2a4.435 4.435 0 01.16 8.87zM12 21.81c-1.82 0-3.63-.46-5.01-1.38-2.42-1.62-2.42-4.26 0-5.87 2.75-1.84 7.26-1.84 10.01 0"
                      ></path>
                    </svg>
                  )}
                </button>
              ) : (
                <div className="flex items-center gap-2 right-0 -bottom-1 absolute">
                  <button
                    className={`mask mask-squircle  bg-gray-700 border-gray-700 outline-gray-700  text-white h-[32px] w-[32px]  grid place-items-center hover:bg-gray-600 transition-all duration-200`}
                    onClick={() => removeFriendRequest(chats?.userid)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      width="17"
                      height="17"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18 18 6M6 6l12 12"
                      />
                    </svg>
                  </button>

                  <button
                    className={`mask mask-squircle  bg-green-500 border-green-500 outline-green-500  text-white h-[32px] w-[32px]  grid place-items-center hover:bg-green-600 transition-all duration-200`}
                    onClick={() => acceptFriendRequest(chats?.userid)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      width="18"
                      height="18"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 12.75 6 6 9-13.5"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default SearchItem
