import React, { useContext } from 'react'
import { ChatContext } from '../../Context/ChatContext'

const UnpinBtn = () => {
  const {unpinHandler}=useContext(ChatContext)
  return (
    <div className='unpin-btn' onClick={unpinHandler}>
        unpin all messages
    </div>
  )
}

export default UnpinBtn