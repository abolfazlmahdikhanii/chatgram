import React from 'react'

const Box = ({children}) => {
  return (
    <div className='dark:bg-gray-800 px-3 py-4 rounded-xl'>
      {children}
    </div>
  )
}

export default Box