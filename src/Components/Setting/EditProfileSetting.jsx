import React from 'react'
import SettingContainer from './SettingContainer'
import Profile from '../Profile/Profile'

const EditProfileSetting = ({ close,profile }) => {
  return (
    <SettingContainer title="Edit Profile" onBack={close}>
      <form className="py-2 px-3 space-y-6 overflow-y-auto n-scroll relative">
        {/* Profile */}
        <div className='flex items-center justify-center mt-4 mb-7 relative'>
        <Profile
              path={profile?.profileImg}
              userName={profile?.userName}
              bgProfile={profile?.bgProfile}
              relation={profile?.relation}
              isSave={false}
              size="lg"
            />
            <div className=' bg-gray-800/50 z-[1] absolute left-1/2  w-32 h-32 -translate-x-1/2 mask mask-squircle'></div>
        </div>
        <div className="relative">
          <input
            type="text"
            className="bg-transparent p-[15px] text-base  w-full rounded-[10px] border-2 focus:outline-0 border-gray-700 focus:border-primary-focus transition-all duration-200  peer"
            id="name"
          />
          <label htmlFor="name" className="lbl-focus ">
            Name
          </label>
        </div>
        <div className="relative">
          <input
            type="text"
            className="bg-transparent p-[15px] text-base  w-full rounded-[10px] border-2 focus:outline-0 border-gray-700 focus:border-primary-focus transition-all duration-200  peer"
            id="lastName"
          />
          <label htmlFor="lastName" className="lbl-focus ">
            Last Name
          </label>
        </div>
        <div className="relative">
          <input
            type="text"
            className="bg-transparent p-[15px] text-base  w-full rounded-[10px] border-2 focus:outline-0 border-gray-700 focus:border-primary-focus transition-all duration-200  peer"
            id="bio"
          />
          <label htmlFor="bio" className="lbl-focus ">
            Bio (optional)
          </label>
        </div>

        <div className='bg-base-300 text-[#aaa] -mx-5 pt-2 px-5 text-sm pb-5 font-medium leading-5'>
          Any details such as age, occupation or city.
          <br />
          Example: 23 y.o. designer from San Francisco
        </div>
        <p className='text-primary-focus font-bold '>Username</p>
        <div className="relative">
          <input
            type="text"
            className="bg-transparent p-[15px] text-base  w-full rounded-[10px] border-2 focus:outline-0 border-gray-700 focus:border-primary-focus transition-all duration-200  peer"
            id="username"
          />
          <label htmlFor="username" className="lbl-focus ">
            Username (optional)
          </label>
        </div>
        <div className='bg-base-300 text-[#aaa]  pt-2 px-7 text-sm pb-5 font-medium leading-5 -mx-5'>
        
        You can choose a username on <b>Telegram</b>. If you do, people will be able to find you by this username and contact you without needing your phone number.<br/><br/>You can use <b>a–z</b>, <b>0–9</b> and underscores. Minimum length is <b>5</b> characters
       
        </div>
      </form>
    </SettingContainer>
  )
}

export default EditProfileSetting
