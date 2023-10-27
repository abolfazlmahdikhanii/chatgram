import React from 'react'
import PinMessage from './PinMessage'
import {AiOutlineClose} from "react-icons/ai"
const PinBox = ({pins}) => {
    return (
        <div className='py-2 px-4 bg-base-200  flex items-center  justify-between sticky top-0 '>
            <div className='flex items-center gap-2'>
           {/* dot */}
           <div className='h-full'>
           {
                pins.map((pin)=>{
                    <div key={pin.messageId} className='w-1 bg-blue-400 h-full'></div>
                })
            }
           </div>
            {/* message */}
            <ul className='flex flex-col'>
            {
            pins.map((pin,i)=>(
               <li  key={pin.messageId}>
                 <PinMessage {...pin} index={i}/>
               </li>
            ))
           }
            </ul>

            </div>
            <div>
                {
                    pins.length>1?
                <button className='grid place-items-center '>  
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={27}
                        height={27}
                        viewBox="0 0 24 24"

                    >
                        <path
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeWidth={1.5}
                            d="M13.632 8.224c1.53 1.53 2.295 2.295 2.294 3.124a2 2 0 01-.162.788c-.328.762-1.333 1.162-3.344 1.963l-.145.057c-.57.227-.855.34-1.085.523a2.001 2.001 0 00-.444.492c-.158.247-.242.542-.41 1.132-.259.915-.389 1.373-.666 1.576a1 1 0 01-.714.186c-.341-.042-.678-.379-1.35-1.051l-3.13-3.13c-.673-.674-1.01-1.01-1.052-1.35a1 1 0 01.186-.715c.203-.277.66-.407 1.576-.667.59-.167.885-.251 1.132-.409.188-.12.354-.27.492-.444.182-.23.296-.515.523-1.085l.057-.145c.8-2.01 1.2-3.016 1.963-3.344a2 2 0 01.788-.162c.362 0 .712.145 1.118.437M3.347 18.142l2.694-2.694M22 8h-5m5 4.5h-4m4 4.5h-1m-8 0h4"
                        />
                    </svg>
                </button>
                :
                <button className='btn btn-sm btn-square   grid place-items-center' >
                <AiOutlineClose size={16}/>
            </button>
}
            </div>
        </div>
    )
}

export default PinBox