import React, { useContext } from 'react'
import ColumnProfile from '../ColumnProfile/ColumnProfile'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { ChatContext } from '../../Context/ChatContext'
import MessageItem from '../Messageitem/MessageItem'
import { UserContext } from '../../Context/UserContext'
import SearchItem from '../SearchItem/SearchItem'
import SkeletonLoader from '../UI/SkeletonLoader/SkeletonLoader'
const SearchLayout = ({ chatData, setActiveSearch }) => {
  const { searchChat, searchText, searchLoading } = useContext(ChatContext)
  const { user } = useContext(UserContext)
  const forwardUserList = [{ meID: user }, ...chatData]
  const filterFriend = (id) => {
    const findChat = forwardUserList.find(
      (item) =>
        item?.senderid?.userid === id ||
        item?.recipientid?.userid === id ||
        item?.meID?.userid === id
    )
    return findChat
  }

  return (
    <div className=" w-full ">
      <Swiper
        slidesPerView={4}
        spaceBetween={75}
        className="w-full px-1 pt-1 pb-5"
      >
        {forwardUserList?.map((profile) => (
          <SwiperSlide key={profile?.userid||profile.meID} className="">
            <ColumnProfile
              {...profile}
              key={profile?.userid}
              chats={
                profile?.senderid?.userid == user?.userid
                  ? { ...profile?.recipientid }
                  : { ...profile?.senderid }
              }
              saveChat={
                profile?.meID?.userid == user?.userid
                  ? { ...profile.meID }
                  : null
              }
              chatID={profile?.requestid}
              setActiveSearch={setActiveSearch}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <p className="border-[3px] border-base-200 mt-2 -mx-3"></p>

      <div className="my-3">
        {searchLoading ? (
          <>
            <SkeletonLoader/>
            <SkeletonLoader/>
         
          </>
        ) : (
          <>
            {searchChat?.length ? (
              searchChat.map((chat, i, arr) => (
                <SearchItem
                  key={chat?.id}
                  chats={chat}
                  isSave={user.userid == chat?.userid}
                  isFriend={filterFriend(chat?.userid)}
                />
              ))
            ) : (
              <div className="h-full w-[65%] grid place-items-center my-[65px] mx-auto">
                <img
                  src="./images/Search.svg"
                  className="w-full h-full"
                  alt=""
                />
                <p className="dark:text-gray-400 text-gray-500 -mt-2">
                  No results{' '}
                </p>
                <p className="dark:text-gray-500 text-gray-400 mt-1 text-sm truncate max-w-[250px]">
                  There were no results for {`"${searchText}"`}{' '}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default SearchLayout
