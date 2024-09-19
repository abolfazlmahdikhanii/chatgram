import React, { useContext } from 'react'
import ColumnProfile from '../ColumnProfile/ColumnProfile'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { ChatContext } from '../../Context/ChatContext'
import MessageItem from '../Messageitem/MessageItem'
import { UserContext } from '../../Context/UserContext'
import SearchItem from '../SearchItem/SearchItem'
const SearchLayout = ({ chatData, setActiveSearch }) => {
  const { searchChat } = useContext(ChatContext)
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
          <SwiperSlide key={profile?.userid} className="">
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
        {searchChat&&searchChat.map((chat, i, arr) => (
          <SearchItem
            key={chat?.id}
            chats={chat}
            isSave={user.userid == chat?.userid}
            isFriend={filterFriend(chat?.userid)}
          />
        ))}
      </div>
    </div>
  )
}

export default SearchLayout
