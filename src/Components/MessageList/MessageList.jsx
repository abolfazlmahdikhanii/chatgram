import React, { useContext, useEffect, useState } from 'react'
import Box from '../UI/Box/Box'
import MessageItem from '../Messageitem/MessageItem'
import { ChatContext } from '../../Context/ChatContext'
import UserMenu from './UserMenu'
import { useNavigate, useParams } from 'react-router-dom'
import StorySlider from '../StorySlider/StorySlider'
import SearchBar from '../UI/SearchBar/SearchBar'
import ColumnProfile from '../ColumnProfile/ColumnProfile'
import SearchLayout from '../SearchLayout/SearchLayout'
import { UserContext } from '../../Context/UserContext'
import { supabase } from '../../superbase'
import SearchItem from '../SearchItem/SearchItem'
import SkeletonLoader from '../UI/SkeletonLoader/SkeletonLoader'

const MessageList = () => {
  const { user } = useContext(UserContext)
  const [chatId, setChatId] = useState(null)
  const [pageX, setPageX] = useState(null)
  const [pageY, setPageY] = useState(null)
  const [showMenu, setShowMenu] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [friends, setFriends] = useState([])
  const [requests, setRequests] = useState([])
  const [tab, setTab] = useState('friends')
  const {
    chat,
    DeleteChat,
    setChatInfo,
    lastMessage,
    setForwardList,
    forwardList,
    friendID
  } = useContext(ChatContext)
  const match=useParams()
  const [isActiveSearch, setIsActiveSearch] = useState(false)
  const navigate = useNavigate()
  useEffect(() => {
    getFriendsList()
    getRequestsList()
    // Subscribe to real-time changes in the chat_requests table
    const subscription = supabase
      .channel('public:friendrequests')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'friendrequests' },
        (payload) => {
          // Handle insert, update, delete events
          getFriendsList()
          getRequestsList()
        }
      )
      .subscribe()
      return () => {
        supabase.removeChannel(subscription);
      };
  }, [])
  const contextMenuHandler = (e, id) => {
    e.preventDefault()
    setShowMenu(false)
    setPageX(e.pageX)
    setPageY(e.pageY)
    setShowMenu(true)
    setChatId(id)
  }

  const markAsReadHandler = async (id) => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .update({ status: 'read' })
        .eq('chatID', id)
        .eq('recipientid', user?.userid)
        .select()
      if (error) throw error
    } catch (error) {
      console.log(error)
    }
  }

  const getFriendsList = async () => {
    try {
      setIsLoading(true)
      let { data: friendrequests, error } = await supabase
        .from('friendrequests')
        .select('requestid,senderid(*),recipientid(*)')
        .or(`senderid.eq.${user?.userid},recipientid.eq.${user?.userid}`)
        .eq('status', 'accepted')

      if (error) throw error
      setIsLoading(false)
      setFriends(friendrequests)
      setForwardList(friendrequests)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }
  const getRequestsList = async () => {
    try {
      setIsLoading(true)
      let { data: friendrequests, error } = await supabase
        .from('friendrequests')
        .select('requestid,senderid(*),recipientid(*)')
        .or(`senderid.eq.${user?.userid},recipientid.eq.${user?.userid}`)
        .eq('status', 'pending')

      if (error) throw error
      setIsLoading(false)
      setRequests(friendrequests)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }
  const filterSendeRequest = (request) => {
    return request?.filter((item) => item?.recipientid?.userid == user?.userid)
  }

  return (
    <Box style={`ml-3 overflow-hidden ${friendID?'hidden lg:block':'block'}`}>
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
            <div role="tablist" className="tabs tabs-boxed mt-5 p-1.5 h-[48px]">
              <a
                role="tab"
                className={`tab w-1/2  h-full transition-all duration-200 ${
                  tab === 'friends' ? 'tab-active ' : ''
                }`}
                onClick={() => setTab('friends')}
              >
                Friends
              </a>
              <a
                role="tab"
                className={`tab  w-1/2 h-full transition-all duration-200 gap-2 ${
                  tab === 'requests' ? 'tab-active ' : ''
                }`}
                onClick={() => {
                  setTab('requests')
                  getRequestsList()
                }}
              >
                Requests{' '}
                {requests?.length && filterSendeRequest(requests)?.length ? (
                  <span className="relative  transition-all duration-200 inline-flex items-center justify-center rounded-full h-[20px] min-w-2  bg-rose-600 px-2 text-[10px] text-white">
                    {filterSendeRequest(requests)?.length}
                  </span>
                ) : null}
              </a>
            </div>
          </div>
          {tab === 'friends' && (
            <>
              {isLoading ? (
                <>
                  <SkeletonLoader />
                  <SkeletonLoader />
                </>
              ) : (
                <>
                  <div className="w-full overflow-hidden space-y-2 h-screen overflow-y-auto  ">
                    {friends.length ? (
                      <>
                        <MessageItem
                          chats={user}
                          chatID={user?.id || user?.userid}
                          isSave={true}
                          onContext={(e) => contextMenuHandler(e, user?.id)}
                        />
                        <>
                          {friends?.map((chat) => (
                            <MessageItem
                              key={chat?.requestid}
                              chats={
                                chat?.senderid?.userid == user?.userid
                                  ? { ...chat?.recipientid }
                                  : { ...chat?.senderid }
                              }
                              chatID={chat?.requestid}
                              isSave={false}
                              onContext={(e) =>
                                contextMenuHandler(e, chat?.requestid)
                              }
                            />
                          ))}
                        </>
                      </>
                    ) : (
                      <div className="h-full w-[63%] grid place-items-center my-2 mx-auto">
                        <img
                          src="../../../src/assets/images/nofound.svg"
                          className="w-full h-auto object-contain"
                          alt=""
                        />
                        <p className="dark:text-gray-400 text-gray-500 -mt-16">
                          No Friends !{' '}
                        </p>
                      </div>
                    )}
                  </div>
                  <UserMenu
                    show={showMenu}
                    pageX={pageX + 150}
                    pageY={pageY}
                    chatId={chatId}
                    closeMenu={setShowMenu}
                    deleteChat={() => {
                      DeleteChat(chatId)
                      navigate('/')
                    }}
                    markRead={markAsReadHandler}
                  />
                </>
              )}
            </>
          )}

          {tab === 'requests' && (
            <>
              {isLoading ? (
                <>
                  <SkeletonLoader />
                  <SkeletonLoader />
                </>
              ) : (
                <div className="w-full overflow-hidden space-y-2 h-screen overflow-y-auto  ">
                  {requests.length ? (
                    requests?.map((chat) => (
                      <SearchItem
                        key={chat?.id}
                        chats={
                          chat?.senderid?.userid == user?.userid
                            ? { ...chat?.recipientid }
                            : { ...chat?.senderid }
                        }
                        isSave={false}
                        isPending={chat?.senderid?.userid == user?.userid}
                        isReceiveRequest={
                          chat?.recipientid?.userid == user?.userid
                        }
                        getList={getRequestsList}
                      />
                    ))
                  ) : (
                    <div className="h-full w-[63%] grid place-items-center my-2 mx-auto">
                      <img
                        src="../../../src/assets/images/nofound.svg"
                        className="w-full h-auto object-contain"
                        alt=""
                      />
                      <p className="dark:text-gray-400 text-gray-500 -mt-16">
                        No Friends !{' '}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </>
      ) : (
        <SearchLayout chatData={friends} setActiveSearch={setIsActiveSearch} />
      )}
    </Box>
  )
}

export default MessageList
