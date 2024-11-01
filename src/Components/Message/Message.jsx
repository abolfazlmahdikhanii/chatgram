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
import ForwardMessage from '../ForwardMessage/ForwardMessage'
import ReplayBox from '../ReplayBox/ReplayBox'
import ContactInfo from '../ContactInfo/ContactInfo'

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
  forward_from,
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
  const { user, font, color } = useContext(UserContext)

  let messageContent = null
  const decodedContent = content ? decodeMessage(content) : null

  useEffect(() => {
    if (hashId === messageid) {
      setStyle('bg-indigo-300/10')
      const timer = setTimeout(() => {
        setStyle('')
        navigate(location.pathname) // Clean hashId
      }, 800)
      return () => clearTimeout(timer) // Cleanup timer
    }
  }, [hashId, messageid, navigate, location.pathname])

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
  const isLink = /http[s]?:\/\/|www\./.test(decodedContent)
  if (decodedContent && isLink) {
    messageContent = <LinkPreview text={decodedContent} />
    if (
      !link.some((item) => item.messageid === messageid) &&
      !content?.includes('<img src=')
    ) {
      setLink((prev) => [...prev, { content, messageid, senderid }])
    }
  } else {
    messageContent = (
      <div
        className={` ${
          (senderid === user.userid && user.userid !== recipientid) ||
          (senderid === user.userid && user.userid === recipientid)
            ? ' text-white'
            : 'dark:text-white text-gray-800'
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
  >
    <section className={`flex justify-between w-full `}>
      {/* messageBody */}
      <div
        style={{ fontSize: `${font}px` }}
        id={messageid}
        data-id={messageid}
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
        className={`chat-bubble relative break-words px-3 group 
          transition-all duration-200 min-w-[110px] ${isForward ? 'hover:mx-6' : ''}
          ${isDeleted ? 'blur-lg hidden ' : ''} ${
            reactions?.length > 0 ? 'min-w-[140px]' : ''
          } ${
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
        {isForward && (
            <ForwardMessage
              {...forwardInfo}
              forwardMessageID={forwardMessageID}
              userID={user?.userid}
              senderid={senderid}
              forwardFormChat={forwardFormChat}
              setFriendID={setFriendID}
              contact={contact}
            />
          )}

          {replayData && (
            <ReplayBox
              replayData={replayData}
              color={color}
              messageTypeChecker={messageTypeChecker}
              senderid={senderid}
              userid={user?.userid}
              user={user}
            />
          )}

          {contact && (
            <ContactInfo
             {...contact}
             contact={contact}
              forwardFormChat={forwardFormChat}
              forwardInfo={forwardInfo?.userid}
              setFriendID={setFriendID}
              color={color}
            />
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
                date={sentat}
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
        <div
          className={`flex items-center ${
            reactions?.length ? 'justify-between' : 'justify-end px-1'
          }`}
        >
          {reactions?.length > 0 &&
            reactions?.map((item, i) => (
              <ReactionBox
                key={i + 1}
                reaction={item}
                setReaction={() =>
                  item.userInfos?.userid === user?.userid
                    ? removeReactionEmojiHandler(
                        messageid,
                        chatId,
                        item.userInfos,
                        user
                      )
                    : null
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
