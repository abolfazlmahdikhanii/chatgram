import React from 'react'

const Backdrop = ({show,close,preview}) => {

  return (
    <div className={`h-screen w-full ${preview?'bg-base-200/95':'bg-base-200/80'}  fixed inset-0 z-20 backdrop:backdrop-blur-xl  ${show?'block':'hidden'}`}
    onClick={close}
    >

    </div>
  )
}

export default Backdrop