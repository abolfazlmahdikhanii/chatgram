import React,{useState} from 'react'
import { BiDotsHorizontalRounded, BiDotsVerticalRounded } from 'react-icons/bi'
import Box from '../UI/Box/Box'
import Profile from '../Profile/Profile'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { TbSquareRoundedCheck } from 'react-icons/tb'

const ChatHeader = ({
    info,
    showPin,
    pinMessage,
    setShowPin,
    setShowChatInfo,
    
}) => {

    const [showMenu,setShowMenu]=useState(false)
    return (
        <Box>
            {!showPin ? (
                <HeaderMessage info={info} setShowChatInfo={setShowChatInfo} showMenu={showMenu} setShowMenu={setShowMenu}/>
            ) : (
                <HeaderPinMessage
                    pinMessage={pinMessage}
                    setShowPin={setShowPin}
                />
            )}
        </Box>
    )
}
const HeaderMessage = ({ info, setShowChatInfo,showMenu,setShowMenu }) => {
    return (
        <section className="px-5 flex items-center justify-between relative">
            <div className="flex gap-4">
                <Profile
                    path={info?.profileImg}
                    userName={info?.userName}
                    bgProfile={info?.bgProfile}
                    relation={info?.relation}
                    isSave={info?.relation === 'me' ? true : false}
                />
                <div className="w-full flex-col   flex">
                    <p className="font-semibold  text-white capitalize text-[17px]">
                        {info?.userName}
                    </p>
                    <p className="text-indigo-300 text-[11px] capitalize">
                        Online
                    </p>
                </div>
            </div>

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
                <p className="btn btn-ghost mask mask-squircle -mr-2" onClick={()=>setShowMenu(prev=>!prev)}>
                    <BiDotsVerticalRounded size={20} color="#9ca3af" />
                </p>
            </div>

            {/* menu */}
            <div className={`menu bg-base-200  rounded-box absolute right-0 top-[70px] z-[11] w-[200px] space-y-1 transition-all duration-200 ease-linear ${!showMenu?'scale-0 opacity-0 translate-x-12':'scale-100 opacity-100 translate-x-0'}`} onMouseLeave={()=>setShowMenu(false)}>
                <div className=" select-box--item ">
                    <TbSquareRoundedCheck
                        size={21}
                        strokeWidth={1.5}
                        className="self-start mr-1"
                    />

                    <p className={`font-[700] text-[14px] `}>Select</p>
                </div>
                <div className=" select-box--item ">
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

                <div className=" select-box--item text-red-500 hover:bg-red-400/20">
                    <svg
                        width={18}
                        height={18}
                        viewBox="0 0 19 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M16.459 7.012c.199 0 .38.087.523.234.133.157.2.352.18.558 0 .068-.532 6.808-.837 9.645-.19 1.741-1.313 2.798-2.996 2.827-1.295.029-2.56.039-3.806.039-1.322 0-2.616-.01-3.871-.04-1.627-.038-2.75-1.114-2.932-2.826-.313-2.847-.836-9.577-.846-9.645a.79.79 0 01.19-.558.706.706 0 01.524-.234h13.87zM11.584.315c.884 0 1.674.617 1.903 1.497l.163.73a1.28 1.28 0 001.24 1.016h2.917c.389 0 .713.323.713.734v.38a.73.73 0 01-.713.734H1.233a.73.73 0 01-.713-.734v-.38c0-.411.323-.734.713-.734H4.15c.592 0 1.108-.421 1.241-1.015l.153-.682C5.78.93 6.56.315 7.455.315h4.13z"
                            stroke="currentColor"
                            strokeWidth={1.5}
                        />
                    </svg>

                    <p className={`font-[700] text-[14px] ml-1`}>Delete</p>
                </div>
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

            <p className="font-semibold text-white">
                {pinMessage.length} Pinned Message
            </p>
        </div>
    )
}

export default ChatHeader
