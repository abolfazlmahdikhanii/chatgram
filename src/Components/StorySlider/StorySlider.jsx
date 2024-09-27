import React, { useContext, useEffect, useState } from 'react'
import StoryItem from './StoryItem'
import chatData from '../../data'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import StoryModal from '../UI/StoryModal/StoryModal'
import StoryCreator from '../UI/StoryModal/StoryCreator'
import { ChatContext } from '../../Context/ChatContext'
import { UserContext } from '../../Context/UserContext'
import { supabase } from '../../superbase'

const StorySlider = () => {
  const [showStoryModal, setShowStoryModal] = useState(false)
  const [showStoryCreatorModal, setShowStoryCreatorModal] = useState(false)
  const [currentUserStoryIndex, setCurrentUserStoryIndex] = useState(null)
  const [profileAdd, setProfileAdd] = useState(null)
  const { forwardList } = useContext(ChatContext)
  const { user } = useContext(UserContext)
  const forwardUserList = [{ meID: user }, ...forwardList]

  useEffect(() => {
    return () => {
      setShowStoryModal(false)
      setShowStoryCreatorModal(false)
    }
  }, [])

  const storyProfileClickHandler = async (id) => {
    setCurrentUserStoryIndex(id)
    setShowStoryModal(true)
    setShowStoryCreatorModal(false)

    
  }

  const addStoryHandler = (e) => {
    e.stopPropagation()
    setShowStoryCreatorModal(true)
    setShowStoryModal(false)
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
        {/* {!profileAdd?.stories ||
          (profileAdd?.stories && profileAdd?.stories.length <= 0 && (
            <SwiperSlide>
              <StoryItem
                addStory={true}
                userName={profileAdd.userName}
                profileImg={profileAdd.profileImg}
                onCreateStory={addStoryHandler}
                relation={profileAdd?.relation}
              />
            </SwiperSlide>
          ))} */}
        {forwardUserList.map((item) => (
          <SwiperSlide key={user.id}>
            <StoryItem
              chats={
                item?.senderid?.userid == user?.userid
                  ? { ...item?.recipientid }
                  : { ...item?.senderid }
              }
              saveChat={
                item?.meID?.userid == user?.userid ? { ...item.meID } : null
              }
              onStoryClick={storyProfileClickHandler}
              onCreateStory={addStoryHandler}
              // addStory={checkUserHasStory}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {showStoryModal && currentUserStoryIndex !== null && (
        <StoryModal
          show={showStoryModal}
          currentUserStory={currentUserStoryIndex}
          close={setShowStoryModal}
        />
      )}

      <StoryCreator
        show={showStoryCreatorModal}
        userId={profileAdd?.id}
        close={setShowStoryCreatorModal}
      />
    </div>
  )
}

export default StorySlider
