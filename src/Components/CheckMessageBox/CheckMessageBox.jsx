import React from 'react'
import {AiOutlineClose} from "react-icons/ai"
import {TiArrowForwardOutline} from "react-icons/ti"
import {MdOutlineDeleteOutline} from "react-icons/md"

const CheckMessageBox = ({checkMessage,setCheckMessage,setCheck,onRemove,onForward}) => {
  
  const cancelSelectHandler=()=>{
    setCheckMessage([])
  
  }
  return (
    <div className={`check-message flex items-center justify-between`}>        

  {/* close */}
  <div className='flex items-center gap-1'>
    <button className='btn btn-md btn-circle btn-ghost  grid place-items-center' onClick={()=>setCheckMessage([])}>
        <AiOutlineClose size={21}/>
    </button>
    <p className='text-white font-semibold '>{checkMessage.length} {checkMessage.length<=1?'Message':'Messages'}</p>
  </div>
{/* btn */}
  <div className=' flex items-center gap-2 pr-2'>

{/* forward */}
<button className='  hover:bg-[rgba(170,170,170,0.08)]  check-message--btn' onClick={()=>onForward(true)}>
    <TiArrowForwardOutline size={26}/>
    <p className='text-white font-semibold capitalize text-base'>Forward</p>
</button>
{/* remove */}
<button className='  hover:bg-red-500/10  check-message--btn' onClick={onRemove}>
    <MdOutlineDeleteOutline size={26} color='rgb(239,68,68)'/>
    <p className='text-red-500 font-semibold capitalize text-base'>Delete</p>
</button>

  </div>
    </div>
  )
}

export default CheckMessageBox