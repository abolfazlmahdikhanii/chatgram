import React, { useContext, useEffect, useState } from 'react'
import Box from '../UI/Box/Box'
import MessageItem from '../Messageitem/MessageItem'
import { ChatContext } from '../../Context/ChatContext'
import UserMenu from './UserMenu'
import { useNavigate } from 'react-router-dom'
import StorySlider from '../StorySlider/StorySlider'
import SearchBar from '../UI/SearchBar/SearchBar'
import ColumnProfile from '../ColumnProfile/ColumnProfile'
import SearchLayout from '../SearchLayout/SearchLayout'
import { UserContext } from '../../Context/UserContext'
import { supabase } from '../../superbase'

const MessageList = () => {
  const { user } = useContext(UserContext)
  const [chatId, setChatId] = useState(null)
  const [pageX, setPageX] = useState(null)
  const [pageY, setPageY] = useState(null)
  const [showMenu, setShowMenu] = useState(false)
  const [friends, setFriends] = useState([])
  const { chat, DeleteChat,setChatInfo,lastMessage } = useContext(ChatContext)
  const [isActiveSearch, setIsActiveSearch] = useState(false)
  const navigate = useNavigate()

  const contextMenuHandler = (e, id) => {
    setShowMenu(false)
    e.preventDefault()
    setPageX(e.pageX)
    setPageY(e.pageY)
    setShowMenu(true)
    setChatId(id)
  }
  useEffect(() => {
    getFriendsList()
    
  }, [])

  const getFriendsList = async () => {
    try {
      let { data: friendrequests, error } = await supabase
        .from('friendrequests')
        .select('requestid,senderid(*),recipientid(*)')
        .or(`senderid.eq.${user?.userid},recipientid.eq.${user?.userid}`)
        .eq('status','accepted')
      

      if (error) throw error

      setFriends(friendrequests)

    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <Box style={'ml-3 overflow-hidden'}>
      <SearchBar
        setActiveSearch={setIsActiveSearch}
        activeSearch={isActiveSearch}
      />
      {!isActiveSearch ? (
        <>
          <StorySlider />
          <div className="py-1 px-2 mb-5">
            <h2 className="font-bold text-2xl dark:text-white text-gray-800">
              Message
            </h2>
          </div>
          <div className="w-full overflow-hidden space-y-2 h-screen overflow-y-auto ">
            <MessageItem
              key={user?.userid}
              chats={user}
              chatID={user?.userid}
              isSave={true}
              onContext={(e) => contextMenuHandler(e, user?.id)}
            />
            {friends.length?friends?.map((chat) => (
              <MessageItem
                key={chat?.id}
                chats={chat?.senderid?.userid==user?.userid?{...chat?.recipientid}:{...chat?.senderid}}
                chatID={chat?.requestid}
                isSave={false}
                onContext={(e) => contextMenuHandler(e, chat?.id)}
              />
            )):null}
          </div>
          <UserMenu
            show={showMenu}
            pageX={pageX}
            pageY={pageY}
            chatId={chatId}
            closeMenu={setShowMenu}
            deleteChat={() => {
              DeleteChat(chatId)
              navigate('/')
            }}
          />
        </>
      ) : (
        <SearchLayout chatData={chat} />
      )}
    </Box>
  )
}

export default MessageList
