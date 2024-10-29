import React from 'react'
import { Link } from 'react-router-dom'
import { BsArrowRightShort } from 'react-icons/bs'
import { HashLink } from 'react-router-hash-link'

const ForwardMessage = ({forwardMessageID,userid,email,username,senderid,userID,forwardFormChat,setFriendID,contact}) => {
  return (
    <Link
    to={
      senderid !== userid
        ? !contact?`/chat/${forwardFormChat}#${forwardMessageID}`:`/chat/${forwardFormChat}`
        : ''
    }
    onClick={() =>
      userID !== userid &&
      setFriendID(userid)
    }
  >
    <span
      data-text-color={'indigo'}
      className={`text-xs   mb-1.5 block mt-0.5 max-w-[150px] truncate`}
      dir="auto"
    >
      Forward from{' '}
      {username || email?.split('@')[0]}
    </span>

    <button
      className={`absolute bottom-2  btn btn-circle btn-sm text-white bg-opacity-70  opacity-0 group-hover:opacity-100 group-hover:translate-x-0 ${
        senderid === userID
          ? '-left-11 translate-x-3 rotate-180'
          : '-right-11 -translate-x-3'
      }`}
    >
      <BsArrowRightShort size={24} />
    </button>
  </Link>
  )
}

export default ForwardMessage