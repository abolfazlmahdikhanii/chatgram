import React, { useContext, useState } from 'react'
import { BiDotsHorizontalRounded, BiDotsVerticalRounded } from 'react-icons/bi'
import Box from '../UI/Box/Box'
import Profile from '../Profile/Profile'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { TbSquareRoundedCheck } from 'react-icons/tb'
import { ChatContext } from '../../Context/ChatContext'
import { MdOutlineAccessTime } from 'react-icons/md'
import { UserContext } from '../../Context/UserContext'
import { useMatch, useNavigate, useParams } from 'react-router-dom'
import useTypingStatus from '../../CustomHooks/useTypingStatus'
import { ThreeDots } from 'react-loader-spinner'
import SkeletonLoaderProfile from '../UI/SkeletonLoaderProfile/SkeletonLoaderProfile'

const ChatHeader = ({
  setShowChatInfo,
  DeleteChat,
  getInfo,
  chatID,
  isMessage,
  senderId
}) => {
  const typingUsers = useTypingStatus()

  const [showMenu, setShowMenu] = useState(false)
  const {
    profileInfo,
    showCheckBox,
    ForwardContactHandler,
    pinMessage,
    setShowCheckBox,
    setCheckMessage,
    showPin,
    showPinHandler,
    chatId,
    clearHistory,
    checkMessage,
    setFriendID,
  } = useContext(ChatContext)

  return (
    <Box>
      {!showPin ? (
        <HeaderMessage
          info={profileInfo}
          setShowChatInfo={setShowChatInfo}
          showMenu={showMenu}
          setShowMenu={setShowMenu}
          setCheckBox={setShowCheckBox}
          showCheckBox={showCheckBox}
          DeleteChat={DeleteChat}
          setCheckMessage={setCheckMessage}
          forwardContact={ForwardContactHandler}
          userId={chatId}
          clearHistory={clearHistory}
          typingUsers={typingUsers}
          getInfo={getInfo}
          checkMessage={checkMessage}
          chatId={chatID}
          isMessage={isMessage}
          setFriendID={setFriendID}
          senderId={senderId}
        />
      ) : (
        <HeaderPinMessage pinMessage={pinMessage} setShowPin={showPinHandler} />
      )}
    </Box>
  )
}
const HeaderMessage = ({
  info,
  setShowChatInfo,
  showMenu,
  setShowMenu,
  setCheckBox,
  showCheckBox,
  DeleteChat,
  setCheckMessage,
  forwardContact,
  userId,
  clearHistory,
  typingUsers,
  getInfo,
  checkMessage,
  chatId,
  isMessage,
  setFriendID,
  senderId
}) => {
  const { user } = useContext(UserContext)
  const navigate = useNavigate()
  return (
    <section className="md:px-5 flex items-center justify-between relative">
      {info ? (
        <div className="flex gap-4">
          <button
            className="p-2.5 rounded-full btn-ghost  grid place-items-center transition-all duration-200"
            onClick={() => {
              navigate('/')
              setFriendID('')
            }}
          >
            <AiOutlineArrowLeft size={20} />
          </button>
          <Profile
            path={info?.avatar_url}
            userName={info?.username || info?.email.split('@')[0]}
            bgProfile={info?.bgProfile}
            relation={info?.relation}
            isSave={info?.userid === user.userid}
          />
          <div className="w-full flex-col   flex">
            <p className="font-semibold md:w-full w-[170px] truncate  dark:text-white capitalize text-[17px] text-gray-900">
              {user?.userid !== info?.userid
                ? info?.username || info?.email.split('@')[0]
                : 'Saved Messages'}
            </p>
            <p className="dark:text-indigo-300 text-[11px] capitalize text-indigo-600">
              {typingUsers?.length &&
              chatId == typingUsers[1] &&
              user.userid !== typingUsers[0] ? (
                <p>
                  {(info.userid === typingUsers && info?.username) ||
                    info?.email.split('@')[0]}{' '}
                  <span className="inline-flex items-end  gap-x-1.5">
                    is typing
                    <ThreeDots
                      visible={true}
                      height="12"
                      width="12"
                      color=""
                      radius="9"
                      ariaLabel="three-dots-loading"
                      wrapperStyle={{}}
                      wrapperClass="typing-loader"
                    />
                  </span>
                </p>
              ) : (
                info?.userStatus
              )}
              {/* {user?.userid == info?.userid||typingUsers?info.userStatus:''} */}
            </p>
          </div>
        </div>
      ) : (
        <SkeletonLoaderProfile />
      )}
      {/* right-side */}

      <div className="flex items-center">
        <p
          className="btn btn-ghost mask mask-squircle -mr-2"
          onClick={() => setShowChatInfo((prev) => !prev)}
        >
          <svg
            width={20}
            height={20}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 2H9C4 2 2 4 2 9v6c0 5 2 7 7 7h6c5 0 7-2 7-7V9c0-5-2-7-7-7zM15 22V2"
              stroke="#9ca3af"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </p>
        <p
          className="btn btn-ghost mask mask-squircle -mr-2"
          onClick={() => setShowMenu((prev) => !prev)}
        >
          <BiDotsVerticalRounded size={20} color="#9ca3af" />
        </p>
      </div>

      {/* menu */}
      <div
        className={`menu bg-base-200  rounded-box absolute right-0 top-[70px] z-[11] w-[200px] space-y-1 transition-all duration-200  ${
          !showMenu
            ? 'scale-0 opacity-0 translate-x-12'
            : 'scale-100 opacity-100 translate-x-0'
        }`}
        onMouseLeave={() => setShowMenu(false)}
      >
        <div
          className=" select-box--item "
          onClick={() => {
            isMessage ? setCheckBox((prev) => !prev) : null
            showCheckBox ? setCheckMessage([]) : null
            setShowMenu(false)
          }}
        >
          <TbSquareRoundedCheck
            size={21}
            strokeWidth={1.5}
            className="self-start mr-1"
          />

          <p className={`font-[700] text-[14px] `}>
            {!showCheckBox && !checkMessage.length
              ? 'Select Message'
              : 'Clear Selection'}
          </p>
        </div>
        <div
          className=" select-box--item "
          onClick={() => forwardContact(userId)}
        >
          <svg
            width={19}
            height={19}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 22h6c5 0 7-2 7-7V9c0-5-2-7-7-7H9C4 2 2 4 2 9v6c0 5 2 7 7 7z"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10.74 15.53L14.26 12l-3.52-3.53"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <p className={`font-[700] text-[14px] ml-1`}>Share contact</p>
        </div>

        <div
          className=" select-box--item "
          onClick={() => clearHistory(chatId,senderId)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="19"
            height="19"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M22 12c0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2s10 4.48 10 10z"
            ></path>
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M15.71 15.18l-3.1-1.85c-.54-.32-.98-1.09-.98-1.72v-4.1"
            ></path>
          </svg>

          <p className={`font-[700] text-[14px] ml-1`}>Clear History</p>
        </div>
        {senderId !== user?.userid ? (
          <div
            className=" select-box--item text-red-500 hover:bg-red-400/20"
            onClick={DeleteChat}
          >
            <svg
              width={18}
              height={18}
              viewBox="0 0 19 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-red-500"
            >
              <path
                d="M16.459 7.012c.199 0 .38.087.523.234.133.157.2.352.18.558 0 .068-.532 6.808-.837 9.645-.19 1.741-1.313 2.798-2.996 2.827-1.295.029-2.56.039-3.806.039-1.322 0-2.616-.01-3.871-.04-1.627-.038-2.75-1.114-2.932-2.826-.313-2.847-.836-9.577-.846-9.645a.79.79 0 01.19-.558.706.706 0 01.524-.234h13.87zM11.584.315c.884 0 1.674.617 1.903 1.497l.163.73a1.28 1.28 0 001.24 1.016h2.917c.389 0 .713.323.713.734v.38a.73.73 0 01-.713.734H1.233a.73.73 0 01-.713-.734v-.38c0-.411.323-.734.713-.734H4.15c.592 0 1.108-.421 1.241-1.015l.153-.682C5.78.93 6.56.315 7.455.315h4.13z"
                stroke="currentColor"
                strokeWidth={1.5}
              />
            </svg>

            <p className={`font-[700] text-[14px] ml-1 text-red-500`}>Delete</p>
          </div>
        ) : null}
      </div>
    </section>
  )
}
const HeaderPinMessage = ({ pinMessage, setShowPin }) => {
  return (
    <div className="flex items-center gap-3.5 px-1">
      <button
        className="p-2.5 rounded-full btn-ghost  grid place-items-center transition-all duration-200"
        onClick={() => setShowPin(false)}
      >
        <AiOutlineArrowLeft size={20} />
      </button>

      <p className="font-semibold dark:text-white text-gray-800">
        {pinMessage.length} Pinned Message
      </p>
    </div>
  )
}

export default ChatHeader
