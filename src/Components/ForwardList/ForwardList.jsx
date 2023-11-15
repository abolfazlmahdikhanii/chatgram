import React, { useEffect, useState } from 'react'
import UserProfile from '../userProfile/userProfile'

const ForwardList = ({chat,messageID,setChat,userID,setShow,onForward}) => {


  return (
    <>
      {
        chat?.map((item)=>(
          <UserProfile key={item.id} {...item} onForward={()=>onForward(item.id)}/>
        ))
      }
    </>
  )
}

export default ForwardList