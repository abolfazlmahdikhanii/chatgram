import React from 'react'

const Box = ({children,style}) => {
  return (
    <div className={`dark:bg-base-100 px-2 py-4 ${style}`}>
      {children}
    </div>
  )
}

export default Box