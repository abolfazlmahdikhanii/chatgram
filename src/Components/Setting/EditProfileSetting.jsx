import React, { useContext, useEffect, useState } from 'react'
import SettingContainer from './SettingContainer'
import Profile from '../Profile/Profile'
import { ChatContext } from '../../Context/ChatContext'
import { UserContext } from '../../Context/UserContext'
import { supabase } from '../../superbase'
import { data } from 'autoprefixer'

const EditProfileSetting = ({ close, profile }) => {
  const { setChat, chat } = useContext(ChatContext)
  const { user, setUser } = useContext(UserContext)
  const [imgUploaded, setImgUploaded] = useState('')
  const [isEnterWord, setIsEnterWord] = useState(false)
  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [bio, setBio] = useState('')
  const [username, setUsername] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isImageLoading, setIsImageLoading] = useState(false)
  const [isSelectedImage, setIsSelectedImage] = useState(null)
  const [errorContent, setErrorContent] = useState({})
  useEffect(() => {
    setUsername(user.username)
    setBio(user.bio)
    setName(user.name)
    setLastName(user.lastName)
    setImgUploaded(user?.avatar_url)
  }, [])

  const updateProfileHandler = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const { data, error } = await supabase
        .from('users')
        .update({
          username: username,
          name: name,
          lastName: lastName,
          bio: bio,
          avatar_url: imgUploaded,
        })
        .eq('userid', user.userid)
        .select()
      if (error) throw error
      setUser(data[0])

      // close()
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
    // close edit profile
  }
  const uploadProfileImage = async (file) => {

    setIsImageLoading(true)
    setIsSelectedImage(file)
    setImgUploaded(URL.createObjectURL(file))
    const { data: signedUrlData, error: urlError } = await supabase.storage
      .from('avatars')
      .upload(`${user?.email.split('@')[0]}/${file.name}`, file,{
        upsert: true
      })
     
    if (urlError) {
      setIsImageLoading(false)
  
      return false
    }
    
    
    const { data: publicUrl } = supabase.storage
      .from('avatars')
      .getPublicUrl(`${user?.email.split('@')[0]}/${file.name}`)

    setImgUploaded(publicUrl.publicUrl)
    setIsImageLoading(false)
    setIsSelectedImage(null)
  }
  const userNameValidator = async (e) => {
    if (e.target.value.length >= 5) {
      let { data: users, error } = await supabase
        .from('users')
        .select('*')
        .eq('username', e.target.value)
      if (users.length) {
        setErrorContent({
          msg: 'This username is already occupied',
          type: 'error',
        })
        return false
      }

      setErrorContent({ msg: 'This username is available', type: 'success' })
      return true
    } else {
      setErrorContent({ msg: 'This username is too short', type: 'error' })
      return false
    }
  }
  return (
    <SettingContainer title="Edit Profile" onBack={close}>
      <form className="py-2 px-3 space-y-6 overflow-y-auto n-scroll relative w-full overflow-x-hidden">
        {/* Profile */}
        <div className="flex items-center justify-center mt-4 mb-7 relative">
          <Profile
            path={imgUploaded ? imgUploaded : user?.avatar_url}
            userName={user?.username || user.email.split('@')[0]}
            bgProfile={user?.bgProfile}
            isSave={false}
            size="lg"
          />
          <label
            htmlFor="img-upload"
            className=" bg-gray-800/50 z-[1] absolute left-1/2  w-32 h-32 -translate-x-1/2 mask mask-squircle grid place-items-center group transition-all duration-200 cursor-pointer"
          >
            {isImageLoading ? (
              <span className="loading loading-spinner w-[40px]    inline-block  z-1"></span>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="36"
                  height="36"
                  fill="none"
                  viewBox="0 0 24 24"
                  className=" group-hover:scale-125 transition-all duration-200"
                >
                  <path
                    stroke="#fff"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M6.76 22h10.48c2.76 0 3.86-1.69 3.99-3.75l.52-8.26A3.753 3.753 0 0018 6c-.61 0-1.17-.35-1.45-.89l-.72-1.45C15.37 2.75 14.17 2 13.15 2h-2.29c-1.03 0-2.23.75-2.69 1.66l-.72 1.45C7.17 5.65 6.61 6 6 6 3.83 6 2.11 7.83 2.25 9.99l.52 8.26C2.89 20.31 4 22 6.76 22zM10.5 8h3"
                  ></path>
                  <path
                    stroke="#fff"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M12 18c1.79 0 3.25-1.46 3.25-3.25S13.79 11.5 12 11.5s-3.25 1.46-3.25 3.25S10.21 18 12 18z"
                  ></path>
                </svg>
                <input
                  type="file"
                  id="img-upload"
                  className="hidden"
                  accept='image/*'
                  value={""}
                  onChange={(e) => {
                    uploadProfileImage(e.target.files[0])

                  }}
                />
              </>
            )}
          </label>
        </div>
        <div className="relative">
          <input
            type="text"
            className="  peer input-profile"
            id="name"
            dir="auto"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
              e.target.value !== ''
                ? setIsEnterWord(true)
                : setIsEnterWord(false)
            }}
          />

          <label
            htmlFor="name"
            className={` lbl-focus  ${name !== '' ? 'lbl-shown' : ''}`}
          >
            Name
          </label>
        </div>
        <div className="relative">
          <input
            type="text"
            className=" peer input-profile"
            id="lastName"
            value={lastName}
            dir="auto"
            onChange={(e) => {
              setLastName(e.target.value)
              e.target.value !== ''
                ? setIsEnterWord(true)
                : setIsEnterWord(false)
            }}
          />

          <label
            htmlFor="lastName"
            className={` lbl-focus ${lastName !== '' ? 'lbl-shown' : ''}`}
          >
            Last Name
          </label>
        </div>
        <div className="relative">
          <input
            type="text"
            className="  peer input-profile"
            id="bio"
            dir="auto"
            value={bio}
            onChange={(e) => {
              setBio(e.target.value)
              e.target.value !== ''
                ? setIsEnterWord(true)
                : setIsEnterWord(false)
            }}
          />

          <label
            htmlFor="bio"
            className={`lbl-focus  ${bio !== '' ? 'lbl-shown' : ''}`}
          >
            Bio (optional)
          </label>
        </div>

        <div className=" text-[#aaa] -mx-5 pt-2 px-5 text-xs pb-5 font-medium leading-5 flex gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            fill="none"
            viewBox="0 0 24 24"
            className="text-blue-500"
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M16.334 2C19.723 2 22 4.378 22 7.916v8.168C22 19.622 19.723 22 16.332 22H7.664C4.276 22 2 19.622 2 16.084V7.916C2 4.378 4.276 2 7.664 2h8.67zm0 1.5h-8.67C5.135 3.5 3.5 5.233 3.5 7.916v8.168c0 2.683 1.635 4.416 4.164 4.416h8.668c2.532 0 4.168-1.733 4.168-4.416V7.916c0-2.683-1.636-4.416-4.166-4.416zm-4.34 7.75a.75.75 0 01.75.75v4a.75.75 0 01-1.5 0v-4a.75.75 0 01.75-.75zm.005-4.046a1 1 0 110 2 1.003 1.003 0 01-1.005-1c0-.553.443-1 .995-1h.01z"
              clipRule="evenodd"
            ></path>
          </svg>
          Any details such as age, occupation or city.
          <br />
          Example: 23 y.o. designer from San Francisco
        </div>
        <p className="text-[#8774E1] font-bold ">Username</p>
        <div className="relative">
          <input
            type="text"
            className="peer input-profile"
            id="username"
            dir="auto"
            value={username}
            onChange={(e) => {
              userNameValidator(e)
                ? setUsername(e.target.value)
                : setUsername('')
              e.target.value !== ''
                ? setIsEnterWord(true)
                : setIsEnterWord(false)
            }}
          />

          <label
            htmlFor="username"
            className={`lbl-focus  ${
              isEnterWord || username !== '' ? 'lbl-shown' : ''
            }`}
          >
            Username (optional)
          </label>
          {errorContent.msg !== '' && (
            <span
              className={`mt-2.5 inline-block px-2.5 text-xs ${
                errorContent.type === 'error' ? 'text-red-500' : 'text-sky-500'
              }`}
            >
              {errorContent.msg}
            </span>
          )}
        </div>
        <div className=" text-[#aaa]  pt-2 px-7 text-sm pb-5 font-medium leading-5 -mx-5 flex gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            fill="none"
            viewBox="0 0 24 24"
            className="text-blue-500"
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M16.334 2C19.723 2 22 4.378 22 7.916v8.168C22 19.622 19.723 22 16.332 22H7.664C4.276 22 2 19.622 2 16.084V7.916C2 4.378 4.276 2 7.664 2h8.67zm0 1.5h-8.67C5.135 3.5 3.5 5.233 3.5 7.916v8.168c0 2.683 1.635 4.416 4.164 4.416h8.668c2.532 0 4.168-1.733 4.168-4.416V7.916c0-2.683-1.636-4.416-4.166-4.416zm-4.34 7.75a.75.75 0 01.75.75v4a.75.75 0 01-1.5 0v-4a.75.75 0 01.75-.75zm.005-4.046a1 1 0 110 2 1.003 1.003 0 01-1.005-1c0-.553.443-1 .995-1h.01z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="w-[80%]">
            You can choose a username on <b>Chatgram</b>. If you do, people will
            be able to find you by this username and contact you without needing
            your phone number.
            <br />
            <br />
            You can use <b>a–z</b>, <b>0–9</b> and underscores. Minimum length
            is <b>5</b> characters
          </span>
        </div>
        {isEnterWord ||
          isSelectedImage && (
            <div className="relative">
              <button
                className="btn btn-success mask mask-squircle fixed bottom-7 ml-[210px] md:ml-[245px] text-white grid place-items-center"
                onClick={updateProfileHandler}
                disabled={isLoading}
              >
                {!isLoading ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m4.5 12.75 6 6 9-13.5"
                    />
                  </svg>
                ) : (
                  <span className="loading loading-spinner w-[20px]    inline-block"></span>
                )}
              </button>
            </div>
          )}
      </form>
    </SettingContainer>
  )
}

export default EditProfileSetting
