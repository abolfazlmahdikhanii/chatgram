import React, { useEffect, useState } from 'react'
import UserProfile from '../userProfile/userProfile'

const ForwardList = ({chat,messageID,setChat,userID,setShow,onForward}) => {
  const [userMessage,setUserMessage]=useState()
  const [userForwardMessage,setUserForwardMessage]=useState([])
const forwards=[]
  useEffect(()=>{
    // const findUserMessage=chat?.find((user)=>user?.id==userID)
    // setUserMessage(findUserMessage)
  },[messageID,userMessage,setChat])

// console.log(messageID)
//   const forwardClickHandler=(id)=>{
//     const newChat=[...chat]
//     const findUserForward=newChat?.find((user)=>user.id===id)
    
//     const findChat=userMessage?.messages.find((item)=>item.messageId===messageID)
   
//     findUserForward.messages.push(findChat)
//      setUserForwardMessage(prev=>[...prev,userMessage])
//     findUserForward.forward=userForwardMessage
    
//   setChat(newChat)
//   setShow(false)

    
//   }

  return (
    <>
      {
        chat.map((item)=>(
          <UserProfile key={item.id} {...item} onForward={()=>onForward(item.id)}/>
        ))
      }
    </>
  )
}

export default ForwardList