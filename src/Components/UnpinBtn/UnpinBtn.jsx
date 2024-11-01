import React, { useContext } from 'react'
import { ChatContext } from '../../Context/ChatContext'

const UnpinBtn = ({chatID,senderId}) => {
  const {unpinHandler}=useContext(ChatContext)
  return (
    <div className='unpin-btn' onClick={()=>unpinHandler(chatID,senderId)}>
        unpin all messages
    </div>
  )
}

export default UnpinBtn