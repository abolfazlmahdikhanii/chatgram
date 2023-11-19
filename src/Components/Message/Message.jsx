import React, { useEffect, useRef, useState } from 'react'
import ProfileImage from '../ProfileImage/ProfileImage'
import FileType from '../FileType/FileType'
import FooterMessage from '../FooterMessage/FooterMessage'
import { useLocation, useNavigate } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import { BsArrowRightShort } from 'react-icons/bs'
import TypeMessage from '../TypeMessage/TypeMessage'
import messageType from '../../Utility/MessageType'
import ReactionBox from '../UI/ReactionBox/ReactionBox'
const Message = ({
    id,
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
    forward,
    reaction,
    setReaction,
    setFileId,
    caption,
}) => {
    const location = useLocation()
    const navigate = useNavigate()
    const hashId = location.hash.substring(1)
    const [style, setStyle] = useState('')
    console.log(messageDis)
    useEffect(() => {
        if (hashId === messageId) {
            setStyle('bg-indigo-300/10')

            setTimeout(() => {
                setStyle('')
                location.hash.substring(0, -1)
                navigate(location.pathname)
            }, 800)
        }
    }, [location, forward])

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
            className={`flex w-full relative  justify-between px-6 py-3 ${
                from === 'client' && !forward ? 'chat-end ' : 'chat-start'
            } 
      ${
          checkArr[arr]?.check ? 'bg-indigo-300/10' : ''
      }  ${style}  transition-all duration-200`}
            onContextMenu={(e) => onContext(e, messageId)}
        >
            {/* messageBody */}
            <div
                data-id={messageId}
                className={`chat-bubble relative justify-self-end break-words px-2.5 group ${
                    reaction ? 'min-w-[140px]' : ''
                } ${
                    from === 'client' && !forward
                        ? 'chat-bubble-primary order-1 justify-self-end'
                        : 'chat-bubble order-0'
                }  ${
                    messageDis[0]?.type === 'file' ||
                    typeof messageDis === 'string'
                        ? 'max-w-[345px]'
                        : 'max-w-[420px] px-1.5 py-1.5'
                } `}
            >
                {forward && (
                    <HashLink to={`/chat/${forward.id}/#${messageId}`}>
                        <span
                            data-text-color={forward.bgProfile}
                            className={`text-sm  `}
                            dir="auto"
                        >
                            {from}
                        </span>

                        <button className="absolute bottom-2 -right-11 btn btn-circle btn-sm text-white bg-opacity-70 -translate-x-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0">
                            <BsArrowRightShort size={24} />
                        </button>
                    </HashLink>
                )}
                {/* box for reply Message */}

                {replyData && (
                    <HashLink
                        to={`#${replyData.messageId}`}
                        scroll={(el) =>
                            el.scrollIntoView({
                                behavior: 'smooth',
                                // block: 'end',
                            })
                        }
                        className={`  mx-0 py-1 px-2 mb-2 w-32 rounded-lg flex gap-2.5 cursor-pointer transition-all duration-200  ${
                            from === 'client' && !forward
                                ? 'bg-indigo-400/30 hover:bg-indigo-400/60 '
                                : 'bg-gray-600/30'
                        }`}
                    >
                        <p className="w-[2px] bg-gray-300 rounded-full "></p>

                        {replyData.messageDis[0]?.type === 'img' ||
                        replyData.messageDis[0]?.type === 'video' ? (
                            <TypeMessage
                                dis={replyData.messageDis}
                                w={'w-9 aspect-square'}
                            />
                        ) : null}

                        <div className="flex flex-col gap-0.5 ">
                            <p
                                className={`font-semibold  text-sm ${
                                    from === 'client' && !forward
                                        ? 'text-white'
                                        : 'text-indigo-500'
                                }`}
                                dir="auto"
                            >
                                Abolfazl
                            </p>
                            <p className="text-[14px] truncate ">
                                {replyData.messageDis &&
                                replyData.messageDis[0]?.type !== 'img' &&
                                replyData.messageDis[0]?.type !== 'video' ? (
                                    <TypeMessage dis={replyData.messageDis} />
                                ) : (
                                    messageType(
                                        replyData.messageDis[0]?.type,
                                        replyData.messageDis[0]?.name
                                    )
                                )}
                            </p>
                        </div>
                    </HashLink>
                )}

                {/* message for Text */}
                {typeof messageDis === 'string' ? (
                    <div
                        className="text-white"
                        dir="auto"
                        dangerouslySetInnerHTML={{ __html: messageDis }}
                    ></div>
                ) : (
                    <ul
                        className={`${
                            messageDis[0]?.type === 'file' ? 'grid-2' : 'grid-1'
                        }  `}
                    >
                        {messageDis?.map((content, i, arr) => (
                            <>
                                <FileType
                                    key={content.id}
                                    {...content}
                                    onRemove={remove}
                                    from={from}
                                    idType={content.id}
                                    messageId={messageId}
                                    contextMenu={onContext}
                    
                                    isColor={
                                        from === 'client' && !forward
                                            ? true
                                            : false
                                    }
                                />
                            </>
                        ))}
                    </ul>
                )}
                {messageDis[messageDis.length - 1]?.caption && (
                    <p className="text-sm px-2 my-1" dir="auto">
                        {messageDis[messageDis.length - 1]?.caption}
                    </p>
                )}
                {reaction && (
                    <ReactionBox
                        reaction={reaction}
                        setReaction={() => setReaction(messageId)}
                    />
                )}
                <FooterMessage
                    message={messageDis[0]}
                    date={formatTime(date)}
                    read={read}
                    send={send}
                    edited={edited}
                    pin={pin}
                    reaction={reaction}
                />
            </div>

            <input
                type="checkbox"
                className={`checkbox checkbox-primary ${
                    showCheck ? 'opacity-100' : 'opacity-0'
                } ${
                    from === 'client' && !forward
                        ? 'order-0 mr-16'
                        : 'order-1 ml-16'
                }`}
                checked={checkArr[arr]?.check}
                onChange={(e) =>
                    checkHandler(messageId, e.target.checked ? false : true)
                }
            />
        </div>
    )
}

export default Message
