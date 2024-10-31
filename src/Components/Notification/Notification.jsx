import React from 'react'

const Notification = ({title,dis}) => {
  return (
    <div>
        <p>{title}</p>
        <p>{dis}</p>
    </div>
  )
}

export default Notification