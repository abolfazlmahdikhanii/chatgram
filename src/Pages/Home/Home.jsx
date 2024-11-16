import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = ({ isSmall,setFriendID }) => {

  const navigate=useNavigate()

  useEffect(()=>{
     if(isSmall){
      navigate("/")
      setFriendID("")
     }
  },[])
  return (
    <>
    
      <div className="w-8/12  flex-col items-center justify-center mx-auto h-screen gap-16 p-4 flex ">
        <div>
          <img src="search-chat.svg" alt="" />
        </div>
        <p className="text-2xl text-white ">Choose one of the chats to start</p>
      </div>
    </>
  )
}

export default Home
