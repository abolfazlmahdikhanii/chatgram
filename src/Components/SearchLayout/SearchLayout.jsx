import React, { useContext } from 'react'
import ColumnProfile from '../ColumnProfile/ColumnProfile'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { ChatContext } from '../../Context/ChatContext'
import MessageItem from '../Messageitem/MessageItem'
const SearchLayout = ({ chatData }) => {
  console.log(chatData)
  const { searchChat } = useContext(ChatContext)
  const filterMessage=(messages)=>{
    const indexMessage= messages.
    console.log(indexMessage);
    return indexMessage
  }
  return (
    <div className=" w-full ">
      <Swiper
        slidesPerView={4}
        spaceBetween={70}
        className="w-full px-2 pt-1 pb-5"
      >
        {chatData?.map((profile) => (
          <SwiperSlide key={profile.id} className="">
            <ColumnProfile {...profile} />
          </SwiperSlide>
        ))}
      </Swiper>
      <p className="border-[3px] border-base-200 mt-2 -mx-3"></p>

      <div className='my-3'>
        {searchChat&&chatData
          .filter(
            (item, i) =>
              item?.userName.toLowerCase().includes(searchChat.toLowerCase()) ||
              item?.messages[item.messages.findIndex(item=>item.messageDis.includes(searchChat))]?.messageDis
          )
          .map((data,i,arr) => (
            <MessageItem
              key={data.id}
              {...data}
              isSave={data.relation === 'me' ? true : false}
              isSearch={ arr}
             
              // onContext={(e) => contextMenuHandler(e, data.id)}
            />
          ))}
      </div>
    </div>
  )
}

export default SearchLayout
