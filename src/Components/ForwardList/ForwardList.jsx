import React, { useEffect, useState } from 'react'
import UserProfile from '../userProfile/userProfile'

const ForwardList = ({chat,messageID,setChat,userID,setShow,onForward,onForwardContact,setForwardContact,forwardContact,chatFilter}) => {

  console.log(chatFilter)
  return (
    <>
      {
        chat&&chat?.filter((item)=>item.userName==chatFilter)?.map((item)=>(
          <UserProfile key={item.id} {...item} onForward={()=>{
            !forwardContact? onForward(item.id):onForwardContact(item.id)
            setForwardContact(false)
          }} />
        ))
      }
    </>
  )
}

export default ForwardList