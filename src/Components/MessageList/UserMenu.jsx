import React from 'react'

const UserMenu = ({ show,pageX,pageY,chatId,closeMenu,deleteChat,markRead }) => {
    return (
        <div
            className={`transition-all duration-200 z-20 ${
                show
                    ? '[scale-z:1] scale-100 opacity-100 '
                    : '[scale-z:0] scale-0 opacity-0'
            } fixed `}
            style={{ left: `${pageX - 200}px`, top: `${pageY}px` }}
            onMouseLeave={() => closeMenu(false)}
            onTouchEnd={() => closeMenu(false)}
            onTouchCancel={() => closeMenu(false)}
        >
            <div
                className={`menu dark:bg-[rgba(39,45,53,.80)] backdrop-blur-xl rounded-xl gap-1.5 w-[200px] bg-base-300/80`}
            >
                <label className={`select-box--item  `} onClick={()=>markRead(chatId)}>
                    {/* icon */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeMiterlimit="10"
                            strokeWidth="1.5"
                            d="M22 10v3c0 4-2 6-6 6h-.5c-.31 0-.61.15-.8.4l-1.5 2c-.66.88-1.74.88-2.4 0l-1.5-2c-.16-.22-.53-.4-.8-.4H8c-4 0-6-1-6-6V8c0-4 2-6 6-6h6"
                        ></path>
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M19.5 7a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"
                        ></path>
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15.996 11h.01M11.995 11h.01M7.995 11h.008"
                        ></path>
                    </svg>
                    <p className={`font-[700] text-[14px]`}>Mark as read</p>
                </label>
                <label className={`  hover:bg-red-400/20 select-box--item `} onClick={deleteChat}>
                    {/* icon */}
                    <svg
                        width={18}
                        height={18}
                        className='text-red-500'
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
                    <p className={`font-[700] text-[14px] text-red-500`}>Delete</p>
                </label>
            </div>
        </div>
    )
}

export default UserMenu
