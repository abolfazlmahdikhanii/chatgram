import React from 'react'
import Layout from '../../Components/Layout/Layout'

const Home = ({ isSmall }) => {
  return (
    <>
    {
      !isSmall?
    
      <div className="w-8/12  flex-col items-center justify-center mx-auto h-screen gap-16 p-4 flex ">
        <div>
          <img src="search-chat.svg" alt="" />
        </div>
        <p className="text-2xl text-white ">Choose one of the chats to start</p>
      </div>
      :<Layout/>
}
    </>
  )
}

export default Home
