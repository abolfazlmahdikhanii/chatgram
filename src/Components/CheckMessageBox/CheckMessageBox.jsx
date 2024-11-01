import React, { useContext } from 'react'
import {AiOutlineClose} from "react-icons/ai"
import {TiArrowForwardOutline} from "react-icons/ti"
import {MdOutlineDeleteOutline} from "react-icons/md"
import { ChatContext } from '../../Context/ChatContext'

const CheckMessageBox = ({chatId}) => {
  const {checkMessage,setCheckMessage,removeCheckMessage,ForwardHandler,setShowCheckBox,}=useContext(ChatContext)
  
  const cancelSelectHandler=()=>{
    setCheckMessage([])
  
  }
  return (
    <div className={`check-message flex items-center justify-between w-full `}>        

  {/* close */}
  <div className='flex items-center gap-1.5'>
    <button className='btn btn-sm md:btn-md btn-circle btn-ghost  grid place-items-center' onClick={()=>{
      setCheckMessage([])
      setShowCheckBox(false)
      }}>
        <AiOutlineClose size={21}/>
    </button>
    <p className='dark:text-white font-semibold text-gray-800 md:text-base text-sm whitespace-nowrap'>{checkMessage.length} {checkMessage.length<=1?'Message':'Messages'}</p>
  </div>
{/* btn */}
  <div className=' flex items-center md:gap-2 md:pr-2'>

{/* forward */}
<button className=' hover:bg-[rgba(170,170,170,0.20)] dark:hover:bg-[rgba(170,170,170,0.08)] text-gray-600 check-message--btn dark:text-white disabled:text-gray-500 ' onClick={()=>ForwardHandler(true)} disabled={checkMessage.length>0?false:true}>
    <TiArrowForwardOutline size={26}/>
    <p className=' font-semibold capitalize text-base '>Forward</p>
</button>
{/* remove */}
<button className='  hover:bg-red-500/10  check-message--btn' onClick={()=>removeCheckMessage(chatId)}>
    <MdOutlineDeleteOutline size={26} color='rgb(239,68,68)'/>
    <p className='text-red-500 font-semibold capitalize text-base'>Delete</p>
</button>

  </div>
    </div>
  )
}

export default CheckMessageBox