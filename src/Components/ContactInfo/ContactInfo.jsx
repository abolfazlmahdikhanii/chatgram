import React from 'react'
import { Link } from 'react-router-dom'
import ProfileImage from '../ProfileImage/ProfileImage'

const ContactInfo = (props) => {
    
  return (
    <Link
      to={`/chat/${props.forwardFormChat}`}
      className="flex gap-3 items-center px-0.5 py-1"
      onClick={() => props.setFriendID(props.forwardInfo)}
    >
      <div>
        <ProfileImage
          {...props.contact}
          src={props?.avatar_url}
          userName={
            props?.username || props?.email?.split('@')[0]
          }
        />
      </div>
      <div className="space-y-1">
        <p className="font-semibold">
          {props?.username || props?.email?.split('@')[0]}
        </p>
        <p
          data-name-color={props.color}
          className=" text-sm max-w-[145px] truncate font-semibold"
        >
          {props?.email}
        </p>
      </div>
    </Link>
  )
}

export default ContactInfo
