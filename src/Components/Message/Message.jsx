import React, { useEffect, useRef, useState } from 'react'
import ProfileImage from '../ProfileImage/ProfileImage'
import FileType from '../FileType/FileType'
import FooterMessage from '../FooterMessage/FooterMessage'
import { useLocation } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'

const Message = ({
    from,
    messageDis,
    date,
    read,
    send,
    userInfo,
    remove,
    onContext,
    messageId,
    onCheck,
    setCheck,
    checkArr,
    showCheck,
    edited,
    pin,
    replyData,
    hoverMessage,
    hoverId,
}) => {
    const location = useLocation()
    const hashId = location.hash.substring(1)
    const [style, setStyle] = useState('')

    useEffect(() => {
        if (hashId === messageId) {
            setStyle('bg-indigo-300/10')

            setTimeout(() => {
                setStyle('')
            }, 800)
        }
    }, [location])

    const formatTime = (date) => {
        return new Intl.DateTimeFormat('tr', {
            hour: '2-digit',
            minute: '2-digit',
        }).format(date)
    }

    const checkHandler = (id, check) => {
        onCheck(id, check)
    }
 

    let arr = checkArr.findIndex((item) => item.messageId === messageId)
    return (
        <div
            className={`chat relative flex justify-between px-6 py-3 items-end ${
                from === 'user' ? 'chat-end' : 'chat-start'
            } 
      ${
          checkArr[arr]?.check ? 'bg-indigo-300/10' : ''
      }  ${style}  transition-all duration-200`}
            onContextMenu={(e) => onContext(e, messageId)}
        >
            {/* messageBody */}
            <div
                data-id={messageId}
                className={`chat-bubble break-words px-2.5 ${
                    from === 'user' ? 'chat-bubble-primary' : 'chat-bubble'
                }  ${
                    messageDis[0]?.type === 'file' ||
                    typeof messageDis === 'string'
                        ? 'max-w-[345px]'
                        : 'max-w-[420px] px-1.5 py-1.5'
                } `}
            >
                {/* box for reply Message */}

                {replyData && (
                    <HashLink
                    to={`#${replyData.messageId}`}
                    scroll={(el) => el.scrollIntoView({ behavior: 'smooth', block: 'end' }) }
                    className="  mx-0 py-1 px-2 mb-2 w-32 rounded-lg flex gap-2.5 cursor-pointer transition-all duration-200  hover:bg-gray-600/30"
                      
                    >
                        <p className="w-[2px] bg-gray-300 rounded-full "></p>
                        <div className="flex flex-col gap-0.5">
                            <p className="text-[14px] truncate text-white font-medium">
                                {replyData.user}
                            </p>
                            <p className="text-[14px] truncate text-gray-100 font-normal">
                                {replyData.messageDis}
                            </p>
                        </div>
                    </HashLink>
                )}

                {/* message for Text */}
                {typeof messageDis === 'string' ? (
                    <div
                        className="text-white"
                        dangerouslySetInnerHTML={{ __html: messageDis }}
                    ></div>
                ) : (
                    <ul
                        className={`${
                            messageDis[0]?.type === 'file' ? 'grid-2' : 'grid-1'
                        }  `}
                    >
                        {messageDis?.map((content) => (
                            <FileType
                                key={content.id}
                                {...content}
                                onRemove={remove}
                                from={from}
                            />
                        ))}
                    </ul>
                )}

                <FooterMessage
                    message={messageDis[0]}
                    date={formatTime(date)}
                    read={read}
                    send={send}
                    edited={edited}
                    pin={pin}
                />
            </div>

            {showCheck && (
                <input
                    type="checkbox"
                    className={`checkbox checkbox-primary mr-16 `}
                    checked={checkArr[arr]?.check}
                    onChange={(e) =>
                        checkHandler(messageId, e.target.checked ? false : true)
                    }
                />
            )}
        </div>
    )
}

export default Message
