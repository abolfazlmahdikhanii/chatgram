import React, { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa6'
import userNameSpliter from '../../Utility/userNameSpliter'
import { supabase } from '../../superbase'

const StoryItem = ({
  onStoryClick,
  addStory,
  onCreateStory,
  chats,
  saveChat,
}) => {
  let profile = null
  if (chats) profile = chats
  if (saveChat) profile = saveChat
  const [isStory, setIsStory] = useState(false)
  useEffect(() => {
    checkUserHasStory(profile?.userid)


    // // Subscribe to real-time changes in the chat_requests table
    const subscription = supabase
      .channel('public:stories')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'stories' },
        (payload) => {
          // Handle insert, update, delete events
          if(payload.new)
          checkUserHasStory(profile?.userid)
       
        }
      )
      .subscribe()
  }, [profile,isStory])
  const checkUserHasStory = async (id) => {
   
    try {
      let { data: stories, error } = await supabase
        .from('active_stories')
        .select('*')
        .eq('userid', id)
     

      if (error) throw Error
  
      if (stories && stories?.length > 0) setIsStory(true)
      else setIsStory(false)
    } catch (error) {
      console.log(error)
      return false
    }
  }


  return (
    <div
      className={` flex-col gap-2 justify-center items-center ${
        !isStory && !saveChat ? 'hidden' : 'flex'
      }`}
      onClick={() => {
        isStory ? onStoryClick(profile?.userid) : null
      }}
    >
      <div className="p-1 relative ">
        <div
          data-color={!saveChat ? profile?.bgProfile : 'purple'}
          className="w-[65px] h-[65px] mask mask-squircle z-[5] relative grid place-items-center"
        >
          {profile?.avatar_url ? (
            <img src={profile?.avatar_url} alt="story img" />
          ) : (
            <span className="text-2xl text-white font-bold">
              {userNameSpliter(
                profile?.username || profile?.email?.split('@')[0]
              )}
            </span>
          )}
        </div>

        {/* border */}

        <div className="w-full h-full absolute top-0 left-0  mask mask-squircle bg-base-100 z-[3]"></div>
        {isStory ? (
          <div
            data-color="purple"
            className="w-[80px] h-[81px]  absolute -top-1 -left-1  mask mask-squircle  z-[2] "
          ></div>
        ) : null}
        {saveChat ? (
          <div className="absolute -bottom-1 -right-2 z-40">
            <button
              data-color="yellow"
              className="  mask mask-squircle w-6 h-6 text-white grid place-items-center"
              onClick={onCreateStory}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </button>
          </div>
        ) : null}
      </div>
      <p className="dark:text-gray-200 font-medium truncate text-gray-800 max-w-[90px] text-center">
        {!saveChat ? profile?.username || profile?.email?.split('@')[0] : 'You'}
      </p>
    </div>
  )
}

export default StoryItem
