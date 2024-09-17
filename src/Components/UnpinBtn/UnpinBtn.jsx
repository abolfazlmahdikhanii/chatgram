import React, { useContext } from 'react'
import { ChatContext } from '../../Context/ChatContext'

const UnpinBtn = ({chatID}) => {
  const {unpinHandler}=useContext(ChatContext)
  return (
    <div className='unpin-btn' onClick={()=>unpinHandler(chatID)}>
        unpin all messages
    </div>
  )
}

export default UnpinBtn