import React, { useContext, useEffect, useRef, useState } from 'react'
import ProfileImage from '../ProfileImage/ProfileImage'
import FileType from '../FileType/FileType'
import FooterMessage from '../FooterMessage/FooterMessage'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import { BsArrowRightShort } from 'react-icons/bs'
import TypeMessage from '../TypeMessage/TypeMessage'
import messageTypeChecker from '../../Utility/messageTypeChecker'
import ReactionBox from '../UI/ReactionBox/ReactionBox'

import LinkPreview from '../LinkPerview/LinkPreview'
import Profile from '../Profile/Profile'
import { Link } from 'react-router-dom'
import { ChatContext } from '../../Context/ChatContext'
import decodeMessage from '../../Utility/decodeMessage'
import { UserContext } from '../../Context/UserContext'
import { supabase } from '../../superbase'

const Message = ({
  recipientid,
  content,
  date,
  read,
  edited,
  pin,
  send,
  messageid,
  contact,
  reactions,
  forward,
  forwardSelf,
  onContext,
  replayData,
  senderid,
  messageType,
  caption,
  name,
  status,
  src,
  sentat,
  isDeleted,
  isEdited,
  isPin,
  forwardInfo,
  isForward,
  forward_type,
  forwardFormChat,
  forwardMessageID,
  isSelected,
  chatId,
}) => {
  const location = useLocation()
  const navigate = useNavigate()
  const hashId = location.hash.substring(1)
  const [style, setStyle] = useState('')
  const [url, setUrl] = useState('')
  // const [replayData, setReplayData] = useState(null)
  const param = useParams()

  const {
    checkMessageHandler,
    showCheckBox,
    removeReactionEmojiHandler,
    checkMessage,
    contextmenuHandler,
    setAudio,
    setFriendID,
    setLink,
    link,
  } = useContext(ChatContext)
  const { user,font } = useContext(UserContext)
  let messageContent = null

  useEffect(() => {
    if (hashId === messageid) {
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
  }, [location, param.id])
  // useEffect(() => {
  //   if (replayId) getReplayMessageInfo(replayId)
  // }, [])

  const formatTime = (date) => {
    const messageDate = new Date(sentat)
    // console.log(messageDate.toLocaleString());
    return new Intl.DateTimeFormat('en', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(messageDate)
  }

  // const getReplayMessageInfo = async (id) => {
  //   try {
  //     let { data, error } = await supabase
  //       .from('messages')
  //       .select('messageid,content,messageType,name,senderid')
  //       .eq('chatID', param.id)
  //       .eq('messageid', id)
  //       .single()
  //       if(error) throw error
  //       setReplayData(data)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  const checkHandler = (id, check) => {
    checkMessageHandler(id, check)
  }
  if (
    (content &&
      !decodeMessage(content)?.includes(
        '<img src=https://cdn.jsdelivr.net/npm/emoji-datasource-apple@14.0.0/img/apple/64/'
      ) &&
      decodeMessage(content)?.includes('http://')) ||
    decodeMessage(content)?.includes('https://') ||
    decodeMessage(content)?.includes('www.')
  ) {
    messageContent = <LinkPreview text={decodeMessage(content)} />
    const findedLink = link.find((item) => item.messageid === messageid)
    if (!findedLink)
      setLink((prev) => [...prev, { content, messageid, senderid }])
  } else {
    messageContent = (
      <div
        className={`text-white ${
          (senderid !== user.userid && forward) ||
          contact?.username !== recipientid
            ? 'text-gray-700'
            : 'text-white'
        }`}
        dir="auto"
        dangerouslySetInnerHTML={{ __html: content && decodeMessage(content) }}
      ></div>
    )
    if (contact) messageContent = ''
  }

  let arr = checkMessage?.findIndex((item) => item.messageId === messageid)
  return (
    <div
      className={`grid w-full  relative  px-6 py-3   ${
        (senderid === user.userid && user.userid !== recipientid) ||
        (senderid === user.userid && user.userid === recipientid)
          ? 'chat-end '
          : 'chat-start '
      } 
      ${
        isSelected ? 'bg-indigo-300/10' : ''
      }  ${style}  transition-all duration-200`}
      onContextMenu={(e) =>
        contextmenuHandler(
          e,
          messageid,
          senderid,
          messageType,
          content,
          name,
          isPin
        )
      }
    >
      <section className="flex justify-between w-full ">
        {/* messageBody */}
        <div
          style={{ fontSize: `${font}px` }}
          id={messageid}
          data-id={messageid}
          className={`chat-bubble relative break-words px-2.5 group 
            ${
              isDeleted
                ? 'animate-fade-out-down [animation-iteration-count:1_!important]'
                : ''
            } ${reactions?.length>0 ? 'min-w-[140px]' : ''} ${
              (senderid === user.userid && user.userid !== recipientid) ||
              (senderid === user.userid && user.userid === recipientid)
                ? 'chat-bubble-primary order-1 justify-self-end  '
                : 'chat-bubble order-0 dark:bg-gray-700 bg-gray-50 '
            }  ${
              (content &&
                content &&
                decodeMessage(content) &&
                messageType === 'file') ||
              messageType === 'text'
                ? 'max-w-[430px]'
                : 'max-w-[450px] px-1.5 py-1.5'
            } `}
        >
          {/* {forwardSelf && (
            <p className="text-xs pr-4 pb-1 pt-0.5 pl-0.5 text-gray-300">
              Forward from {forwardSelf?.userName}
            </p>
          )} */}
          {isForward && (
            <Link
              to={
                user?.userid !== forwardInfo?.userid
                  ? `/chat/${forwardFormChat}#${forwardMessageID}`
                  : ''
              }
              onClick={() =>
                user?.userid !== forwardInfo?.userid &&
                setFriendID(forwardInfo?.userid)
              }
            >
              <span
                data-text-color={forwardInfo?.bgProfile}
                className={`text-xs   mb-1.5 block mt-0.5 max-w-[130px] truncate`}
                dir="auto"
              >
                Forward from{' '}
                {forwardInfo?.username || forwardInfo?.email?.split('@')[0]}
              </span>

              <button className="absolute bottom-2 -right-11 btn btn-circle btn-sm text-white bg-opacity-70 -translate-x-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0">
                <BsArrowRightShort size={24} />
              </button>
            </Link>
          )}
          {/* box for reply Message */}

          {replayData && (
            <HashLink
              to={!replayData?.isDeleted && `#${replayData?.messageid}`}
              scroll={(el) =>
                el.scrollIntoView({
                  behavior: 'smooth',

                  block: 'end',
                })
              }
              className={`  mx-0 py-1 px-2 mb-2 w-[132px] rounded-lg flex gap-2.5 cursor-pointer transition-all duration-200 overflow-hidden  ${
                // user?.userid === replayData?.senderid && !forward
                user?.userid === replayData?.senderid
                  ? 'bg-indigo-400/30 hover:bg-indigo-400/60 '
                  : 'bg-gray-600/30'
              }`}
            >
              <p className="w-[2px] bg-gray-300 rounded-full "></p>

              {replayData?.messageType === 'img' ||
              replayData?.messageType === 'video' ? (
                <TypeMessage
                  dis={replayData?.content}
                  type={replayData?.messageType}
                  w={'w-9 aspect-square'}
                />
              ) : null}

              <div className="flex flex-col gap-0.5 ">
                {replayData?.isDeleted ? (
                  <p className="text-[13px]  text-gray-300 py-2">
                    Deleted Message
                  </p>
                ) : (
                  <>
                    <p
                      className={`font-semibold  text-sm ${
                        // from?.relation === 'me' && !forward
                        user?.userid === replayData?.senderid
                          ? 'text-white'
                          : 'text-indigo-500'
                      }`}
                      dir="auto"
                    >
                      Abolfazl
                    </p>
                    <p className="text-[12px] truncate text-gray-300">
                      {replayData?.content &&
                      replayData?.messageType !== 'img' &&
                      replayData?.messageType !== 'video' ? (
                        <TypeMessage
                          dis={replayData?.content}
                          type={replayData?.messageType}
                        />
                      ) : (
                        messageTypeChecker(
                          replayData?.messageType,
                          replayData?.name
                        )
                      )}
                    </p>
                  </>
                )}
              </div>
            </HashLink>
          )}
          {contact && (
            <Link
              to={`/chat/${forwardFormChat}`}
              className="flex gap-3 items-center px-0.5 py-1"
              onClick={() => setFriendID(forwardInfo?.userid)}
            >
              <div>
                <ProfileImage
                  {...contact}
                  src={contact?.avatar_url}
                  userName={contact?.username || contact?.email?.split('@')[0]}
                />
              </div>
              <div className="space-y-1">
                <p className="font-semibold">
                  {contact?.username || contact?.email?.split('@')[0]}
                </p>
                <p className="text-gray-300 text-sm max-w-[145px] truncate font-semibold">
                  {contact?.email}
                </p>
              </div>
            </Link>
          )}

          {/* message for Text */}
          {messageType === 'text' ? (
            messageContent
          ) : (
            <ul className={`${messageType !== 'text' ? 'grid-2' : 'grid-1'}  `}>
              <>
                <FileType
                  src={content && decodeMessage(content)}
                  path={src}
                  mType={messageType}
                  from={senderid}
                  idType={messageid}
                  contextMenu={contextmenuHandler}
                  isChatInfo={false}
                  messageId={messageid}
                  setAudio={messageType?.includes('audio') && setAudio}
                  isColor={senderid !== user.userid && !forward ? true : false}
                  caption={caption}
                  senderID={senderid}
                  name={name}
                />
              </>
            </ul>
          )}
          {content &&
            decodeMessage(content) &&
            decodeMessage(content)[content?.length - 1]?.caption && (
              <p className="text-sm px-2 my-1" dir="auto">
                {content[content?.length - 1]?.caption}
              </p>
            )}
          <div className={`flex items-center ${reactions?.length?'justify-between':'justify-end px-1'}`}>
            {reactions?.length>0 &&
              reactions?.map((item,i) => (
                <ReactionBox
                   key={i+1}
                  reaction={item}
                  setReaction={() =>
                    item.userInfos?.userid===user?.userid? removeReactionEmojiHandler(messageid, chatId,item.userInfos,user):null
                  }
                />
              ))}

            <FooterMessage
              message={
                content && decodeMessage(content) && decodeMessage(content)[0]
              }
              date={sentat && formatTime(sentat)}
              status={status}
              edited={isEdited}
              messageType={messageType}
              caption={caption}
              pin={isPin}
              reaction={reactions}
            />
          </div>
        </div>

        <input
          type="checkbox"
          className={`checkbox checkbox-primary ${
            showCheckBox || checkMessage?.length > 0
              ? 'opacity-100'
              : 'opacity-0'
          } ${
            (senderid === user.userid && user.userid !== recipientid) ||
            (senderid === user.userid && user.userid === recipientid)
              ? 'order-0 mr-16 self-end'
              : 'order-1 ml-16'
          }`}
          checked={isSelected}
          onChange={(e) => checkHandler(messageid)}
        />
      </section>
    </div>
  )
}

export default Message
