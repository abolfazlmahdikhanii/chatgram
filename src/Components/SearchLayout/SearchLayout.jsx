import React from 'react'
import ColumnProfile from '../ColumnProfile/ColumnProfile'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
const SearchLayout = ({ chatData }) => {
  return (
    <div className=" w-full ">
      <Swiper
        slidesPerView={4}
        spaceBetween={70}
        className="w-full px-2 pt-1 pb-5"
      >
        {chatData?.map((profile) => (
          <SwiperSlide key={profile.id} className=''>
            <ColumnProfile {...profile} />
          </SwiperSlide>
        ))}
      </Swiper>
      <p className="border-[3px] border-base-200 mt-2 -mx-3"></p>
    </div>
  )
}

export default SearchLayout
