import React, { useState } from 'react'
import StoryItem from './StoryItem'
import chatData from '../../data'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import StoryModal from '../UI/StoryModal/StoryModal'

const StorySlider = () => {
    const [showStoryModal,setShowStoryModal]=useState(false)
    const [currentUserStoryIndex,setCurrentUserStoryIndex]=useState(null)
    const storyProfileClickHandler = (id) => {
        const findedIndex=chatData.findIndex((item)=>item.id===id)
        setCurrentUserStoryIndex(findedIndex)
        setShowStoryModal(true)
    }
  
    return (
        <div>
            <div className="py-1 px-2 mb-4">
                <h2 className="font-bold text-2xl dark:text-white text-gray-800">
                    Stories
                </h2>
            </div>

            <Swiper
                slidesPerView={3}
                spaceBetween={10}
                className="w-full px-2 pt-1 pb-5"
            >
                {chatData.map((user) => (
                    <SwiperSlide key={user.id}>
                        <StoryItem userName={user.userName} profileImg={user.profileImg} onStoryClick={()=>storyProfileClickHandler(user.id)}/>
                    </SwiperSlide>
                ))}
            </Swiper>

            {
                showStoryModal&&currentUserStoryIndex!==null&&(
                    <StoryModal show={showStoryModal} currentUserStory={currentUserStoryIndex} close={setShowStoryModal} />
                )
            }
        </div>
    )
}

export default StorySlider
