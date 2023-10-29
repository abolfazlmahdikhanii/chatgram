import React from 'react'

const UnpinBtn = ({unpin}) => {
  return (
    <div className='unpin-btn' onClick={unpin}>
        unpin all messages
    </div>
  )
}

export default UnpinBtn