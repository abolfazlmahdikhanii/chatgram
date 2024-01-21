import React from 'react'
import StoryItem from './StoryItem'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

const StorySlider = () => {
    return (
        <div >
            <div className="py-1 px-2 mb-5">
                <h2 className="font-bold text-2xl dark:text-white text-gray-800">
                    Stories
                </h2>
            </div>
            <Swiper
                slidesPerView={3}
                spaceBetween={10}
                className="w-full px-2 pt-1 pb-5"
            >
                <SwiperSlide>
                    <StoryItem />
                </SwiperSlide>
                <SwiperSlide>
                    <StoryItem />
                </SwiperSlide>
                <SwiperSlide>
                    <StoryItem />
                </SwiperSlide>
                <SwiperSlide>
                    <StoryItem />
                </SwiperSlide>
                <SwiperSlide>
                    <StoryItem />
                </SwiperSlide>
            </Swiper>
        </div>
    )
}

export default StorySlider
