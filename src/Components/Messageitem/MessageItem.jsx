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

const MessageItem = ({ isSave, onContext, messagesArr, chats, chatID }) => {
  const [messages, setMessages] = useState([])
  const [unreadMessage, setUnreadMessage] = useState([])

  const { searchChat, lastMessage, setLastMessage, setFriendID } =
    useContext(ChatContext)

  const { user } = useContext(UserContext)

  useEffect(() => {
    fetchMessages()
    filterUnreadMessage()
  }, [lastMessage])
  useEffect(() => {
    fetchMessages()

    // Subscribe to real-time messages
    const subscription = supabase
      .channel('public:messages')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'messages' },
        (payload) => {
          const newMsg = payload.new
     
          if (newMsg.chatID == chatID) {
        
            fetchMessages()
            filterUnreadMessage()
       
          }
          if (newMsg.chatID == null) {
            fetchSavedMessages()
          }
        }
      )
      .subscribe()

    // Cleanup subscription on unmount
    return () => {
      supabase.removeChannel(subscription)
    }
  }, [])

  const fetchMessages = async () => {
    
      if (chatID == user?.userid) fetchSavedMessages()

    

      let { data: message, error } = await supabase
        .from('messages')
        .select(
          `*`
        )
        .eq('chatID', chatID)
        .eq('isDeleted', false)
        .order('sentat', { ascending: true })

      if (error) throw Error('Error fetching messages:', error)
        setMessages(message)
   
    
  }
  const fetchSavedMessages = async () => {
    let { data: messages, error } = await supabase
      .from('messages')
      .select(`*`)
      .eq('recipientid', user.userid)
      .eq('senderid', user.userid)
      .order('sentat', { ascending: true })

    if (!error) {
      setMessages(messages)
    }
  }
  const filterUnreadMessage = async () => {
    let { data: messages, error } = await supabase
      .from('messages')
      .select('*')
      .eq('chatID', chatID)
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
  const getIcon = () => {
    const lastMessageStatus = messages[messages?.length - 1]?.status
    return lastMessageStatus === 'read' ? (
      <PiChecksBold size={18} color="#818cf8" />
    ) : (
      <PiCheck size={16} color="#9ca3af" />
    )
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

  return (
    <NavLink
      to={`/chat/${chatID}`}
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
            <p>{messages?.length > 0 && getIcon()}</p>
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
              <NotifyNumber unread={unreadMessage?.length} />
            )}
          </div>
        ) : (
          <p className="-mt-1 text-sm font-normal dark:text-gray-400 text-gray-500">
            {chats?.userid === user?.userid ? 'online' : 'last seen recently'}
          </p>
        )}
      </div>
    </NavLink>
  )
}

export default MessageItem
