import React from 'react'

const EmptyMessage = () => {
  return (
    <div className='flex flex-col items-center justify-center gap-2 bg-gray-500/20 backdrop-blur-2xl  w-[30%]  h-[150px] rounded-2xl'>
      <p className='text-lg font-semibold text-white'>No message here yet...</p>
      <p className='text-gray-100'>Send a message</p>
    </div>
  )
}

export default EmptyMessage