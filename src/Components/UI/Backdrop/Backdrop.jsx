import React from 'react'

const Backdrop = ({show,close}) => {

  return (
    <div className={`h-screen w-full bg-base-200/80  fixed inset-0 backdrop:backdrop-blur-xl  ${show?'block':'hidden'}`}
    onClick={close}
    >

    </div>
  )
}

export default Backdrop