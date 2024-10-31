import React, { useContext, useEffect } from 'react'
import TypeMessage from '../TypeMessage/TypeMessage'
import { HashLink } from 'react-router-hash-link'
import { ChatContext } from '../../Context/ChatContext'


const ReplayBox = (props) => {
  const {profileInfo}=useContext(ChatContext)
  

  return (
    <HashLink
    to={!props?.replayData.isDeleted && `#${props?.replayData.messageid}`}
    scroll={(el) =>
      el.scrollIntoView({
        behavior: 'smooth',

        block: 'end',
      })
    }
    className={`  mx-0 py-1 px-2 mb-2 rounded-lg flex gap-2.5 cursor-pointer transition-all duration-200 overflow-hidden  ${
      props.userid === props.senderid
        ? 'bg-opacity-75 dark:bg-opacity-60 '
        : ''
    }`}
    data-rp-color={props.color || 'purple'}
  >
    <p
      data-rp-border-color={props.color || 'purple'}
      className="w-[2px]  rounded-full"
    ></p>

    {props?.replayData.messageType === 'img' ||
    props?.replayData.messageType === 'video' ? (
      <TypeMessage
        dis={props?.replayData.content}
        type={props?.replayData.messageType}
        w={'w-9 aspect-square'}
      />
    ) : null}

    <div className="flex flex-col gap-0.5 ">
      {props?.replayData.isDeleted ? (
        <p
          data-name-color={props.color || 'purple'}
          className="text-[13px]   py-2"
        >
          Deleted Message
        </p>
      ) : (
        <>
          <p
            data-name-color={props.color || 'purple'}
            className={`font-semibold  text-sm `}
            dir="auto"
          >
       {props?.replayData?.senderid ===props.userid
                  ? props.user?.username || props.user?.email?.split('@')[0]
                  : profileInfo?.username || profileInfo?.email?.split('@')[0]}
          </p>
          <p
            data-name-color={props.color || 'purple'}
            className="text-[12px] truncate "
          >
            {props?.replayData.content &&
            props?.replayData.messageType !== 'img' &&
            props?.replayData.messageType !== 'video' ? (
              <TypeMessage
                dis={props?.replayData.content}
                type={props?.replayData.messageType}
              />
            ) : (
              props.messageTypeChecker(
                props?.replayData.messageType,
                props?.replayData.name
              )
            )}
          </p>
        </>
      )}
    </div>
  </HashLink>
  )
}

export default ReplayBox