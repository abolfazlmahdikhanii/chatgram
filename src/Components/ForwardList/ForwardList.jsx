import React, { useEffect, useState } from 'react'
import UserProfile from '../userProfile/userProfile'

const ForwardList = ({chat,messageID,setChat,userID,setShow}) => {
  const [userMessage,setUserMessage]=useState()
  const [userForwardMessage,setUserForwardMessage]=useState()

  useEffect(()=>{
    const findUserMessage=chat?.find((user)=>user?.id==userID)
    setUserMessage(findUserMessage)
  },[messageID,userMessage,setChat])

console.log(messageID)
  const forwardClickHandler=(id)=>{
    const newChat=[...chat]
    const findUserForward=newChat?.find((user)=>user.id===id)
    
    const findChat=userMessage?.messages.find((item)=>item.messageId===messageID)
   
    findUserForward.messages.push(findChat)
    findUserForward.forward=userMessage
    
  setChat(newChat)
  setShow(false)

    
  }

  return (
    <>
      {
        chat.map((item)=>(
          <UserProfile key={item.id} {...item} onForward={forwardClickHandler}/>
        ))
      }
    </>
  )
}

export default ForwardList