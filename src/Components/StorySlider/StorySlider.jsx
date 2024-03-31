import React, { useEffect, useState } from 'react'
import StoryItem from './StoryItem'
import chatData from '../../data'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import StoryModal from '../UI/StoryModal/StoryModal'
import StoryCreator from '../UI/StoryModal/StoryCreator'

const StorySlider = () => {
  const [showStoryModal, setShowStoryModal] = useState(false)
  const [showStoryCreatorModal, setShowStoryCreatorModal] = useState(false)
  const [currentUserStoryIndex, setCurrentUserStoryIndex] = useState(null)
  const [profileAdd, setProfileAdd] = useState(null)
  useEffect(() => {
    checkUserHasStory()

    return () => {
      setShowStoryModal(false)
      setShowStoryCreatorModal(false)
    }
  }, [])
  const storyProfileClickHandler = (id) => {
    const findedIndex = chatData.findIndex((item) => item.id === id)
    setCurrentUserStoryIndex(findedIndex)
    setShowStoryModal(true)
    setShowStoryCreatorModal(false)
  }
  const checkUserHasStory = () => {
    const findedUser = chatData.find((item) => item.relation === 'me')
    setProfileAdd(findedUser)
    // if (findedUser.stories && findedUser.stories.length >= 0) {
    //   setProfileAdd(findedUser)
    // } else setProfileAdd(null)
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
        {!profileAdd?.stories ||
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
          ))}
        {chatData.map(
          (user) =>
            user.stories &&
            user.stories.length > 0 && (
              <SwiperSlide key={user.id}>
                <StoryItem
                  userName={user.userName}
                  profileImg={user.profileImg}
                  onStoryClick={() => storyProfileClickHandler(user.id)}
                  onCreateStory={addStoryHandler}
                  relation={
                    user?.id === profileAdd?.id ? profileAdd?.relation : null
                  }
                />
              </SwiperSlide>
            )
        )}
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
