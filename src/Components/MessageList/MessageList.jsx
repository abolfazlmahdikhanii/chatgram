import React, { useContext, useState } from 'react'
import Box from '../UI/Box/Box'
import MessageItem from '../Messageitem/MessageItem'
import { ChatContext } from '../../Context/ChatContext'
import UserMenu from './UserMenu'
import { useNavigate } from 'react-router-dom'
import StorySlider from '../StorySlider/StorySlider'
import SearchBar from '../UI/SearchBar/SearchBar'
import ColumnProfile from '../ColumnProfile/ColumnProfile'
import SearchLayout from '../SearchLayout/SearchLayout'

const MessageList = () => {
  const [chatId, setChatId] = useState(null)
  const [pageX, setPageX] = useState(null)
  const [pageY, setPageY] = useState(null)
  const [showMenu, setShowMenu] = useState(false)
  const { chat, DeleteChat } = useContext(ChatContext)
  const [isActiveSearch, setIsActiveSearch] = useState(false)
  const navigate = useNavigate()

  const contextMenuHandler = (e, id) => {
    e.preventDefault()
    setShowMenu((prev) => !prev)
    setPageX(e.pageX)
    setPageY(e.pageY)
    setChatId(id)
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
            {chat?.map((chat) => (
              <MessageItem
                key={chat.id}
                {...chat}
                isSave={chat.relation === 'me' ? true : false}
                onContext={(e) => contextMenuHandler(e, chat.id)}
              />
            ))}
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
