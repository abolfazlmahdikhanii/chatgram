import React, { useContext, useEffect, useRef, useState } from 'react'
import ProfileImage from '../ProfileImage/ProfileImage'
import FileType from '../FileType/FileType'
import FooterMessage from '../FooterMessage/FooterMessage'
import { useLocation, useNavigate } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import { BsArrowRightShort } from 'react-icons/bs'
import TypeMessage from '../TypeMessage/TypeMessage'
import messageType from '../../Utility/MessageType'
import ReactionBox from '../UI/ReactionBox/ReactionBox'

import LinkPreview from '../LinkPerview/LinkPreview'
import Profile from '../Profile/Profile'
import { Link } from 'react-router-dom'
import { ChatContext } from '../../Context/ChatContext'

const Message = ({
  
    from,
    messageDis,
    date,
    read,
    edited,
    pin,
    send,
    messageId,
    contact,
    reaction,
    forward,
    forwardSelf,
    onContext,
    replyData,
    to
}) => {
    const location = useLocation()
    const navigate = useNavigate()
    const hashId = location.hash.substring(1)
    const [style, setStyle] = useState('')
    const [url, setUrl] = useState('')

    const {
        checkMessageHandler,
        showCheckBox,
        removeReactionEmojiHandler,
        checkMessage,
        contextmenuHandler,
        setAudio
       
    } = useContext(ChatContext)
    let messageContent = null

    
    useEffect(() => {
        if (hashId === messageId) {
            setStyle('bg-indigo-300/10')

            setTimeout(() => {
                setStyle('')
                location.hash.substring(0, -1)
                navigate(location.pathname)
            }, 800)
        }
        return () => {
            setStyle('')
        }
    }, [location, forward])


    const formatTime = (date) => {
        return new Intl.DateTimeFormat('tr', {
            hour: '2-digit',
            minute: '2-digit',
        }).format(date)
    }

    const checkHandler = (id, check) => {
        checkMessageHandler(id, check)
    }
    if (
        !messageDis?.includes('<img src=https://cdn.jsdelivr.net/npm/emoji-datasource-apple@14.0.0/img/apple/64/')&&
        !messageDis?.includes('<img src=')&&

        messageDis?.includes('http://') ||
        messageDis?.includes('https://') ||
        messageDis?.includes('www.')
    ) {
        messageContent = <LinkPreview text={messageDis} />
    } else {
        messageContent = (
            <div
                className={`text-white ${from?.relation !== 'me' && forward||contact?.userName!==to?'text-gray-700':'text-white'}`}
                dir="auto"
                dangerouslySetInnerHTML={{ __html: messageDis }}
            ></div>
        )
        if (contact) messageContent = ''
    }

    let arr = checkMessage?.findIndex((item) => item.messageId === messageId)
    return (
        <div
            className={`grid w-full  relative  px-6 py-3 ${
                from?.relation === 'me'  && !forward ||contact?.userName===to
                    ? 'chat-end '
                    : 'chat-start '
            } 
      ${
          checkMessage[arr]?.check ? 'bg-indigo-300/10' : ''
      }  ${style}  transition-all duration-200`}
            onContextMenu={(e) => contextmenuHandler(e, messageId)}
        >
            <section className="flex justify-between w-full ">
                {/* messageBody */}
                <div
                    data-id={messageId}
                    className={`chat-bubble relative justify-self-end break-words px-2.5 group ${
                        reaction ? 'min-w-[140px]' : ''
                    } ${
                        from?.relation === 'me' && !forward||contact?.userName===to
                            ? 'chat-bubble-primary order-1 justify-self-end  '
                            : 'chat-bubble order-0 dark:bg-gray-700 bg-gray-50 '
                    }  ${
                        messageDis&&messageDis[0]?.type === 'file' ||
                        typeof messageDis === 'string'
                            ? 'max-w-[345px]'
                            : 'max-w-[420px] px-1.5 py-1.5'
                    } `}
                >
                    {forwardSelf && (
                        <p className="text-xs pr-4 pb-1 pt-0.5 pl-0.5 text-gray-300">
                            Forward from {forwardSelf?.userName}
                        </p>
                    )}
                    {forward && (
                        <HashLink to={`/chat/${forward.id}/#${messageId}`}>
                            <span
                                data-text-color={forward.bgProfile}
                                className={`text-xs   mb-1.5 block mt-0.5`}
                                dir="auto"
                            >
                                {from.userName}
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
                                from?.relation === 'me' && !forward
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
                                        from?.relation === 'me' && !forward
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
                                    replyData.messageDis[0]?.type !==
                                        'video' ? (
                                        <TypeMessage
                                            dis={replyData.messageDis}
                                        />
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
                    {contact && (
                        <Link
                            to={`/chat/${contact.id}`}
                            className="flex gap-3 items-center px-0.5 py-1"
                        >
                            <div>
                                <Profile
                                    size="m"
                                    path={contact.profileImg}
                                    userName={contact.userName}
                                    bgProfile={contact.bgProfile}
                                    relation={contact.relation}
                                />
                            </div>
                            <div className="space-y-1">
                                <p className="font-semibold">
                                    {contact.userName}
                                </p>
                                <p className="text-gray-300 text-sm max-w-[145px] truncate font-semibold">
                                    abolfazlmk@gmail.com
                                </p>
                            </div>
                        </Link>
                    )}

                    {/* message for Text */}
                    {typeof messageDis === 'string' ? (
                        messageContent
                    ) : (
                        <ul
                            className={`${
                               messageDis&& messageDis[0]?.type === 'file'
                                    ? 'grid-2'
                                    : 'grid-1'
                            }  `}
                        >
                            {messageDis?.map((content, i, arr) => (
                                <>
                                    <FileType
                                        key={content.id}
                                        {...content}
                                        from={from}
                                        idType={content.id}
                                        contextMenu={contextmenuHandler}
                                        isChatInfo={false}
                                        messageId={messageId}
                                        setAudio={
                                            content.type === 'mp3'
                                                ? setAudio
                                                : null
                                        }
                                        isColor={
                                            from.relation === 'me' && !forward
                                                ? true
                                                : false
                                        }
                                    />
                                </>
                            ))}
                        </ul>
                    )}
                    {messageDis&&messageDis[messageDis?.length - 1]?.caption && (
                        <p className="text-sm px-2 my-1" dir="auto">
                            {messageDis[messageDis?.length - 1]?.caption}
                        </p>
                    )}
                    {reaction && (
                        <ReactionBox
                            reaction={reaction}
                            setReaction={() => removeReactionEmojiHandler(messageId)}
                        />
                    )}
                    <FooterMessage
                        message={messageDis&&messageDis[0]}
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
                        showCheckBox||checkMessage?.length>0 ? 'opacity-100' : 'opacity-0'
                    } ${
                        from?.relation === 'me' && !forward||contact?.userName===to
                            ? 'order-0 mr-16 self-end'
                            : 'order-1 ml-16'
                    }`}
                    checked={checkMessage[arr]?.check}
                    onChange={(e) =>
                        checkHandler(messageId, e.target.checked ? false : true)
                    }
                />
            </section>
        </div>
    )
}

export default Message
