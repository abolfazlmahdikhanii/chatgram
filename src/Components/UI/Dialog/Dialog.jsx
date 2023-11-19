import React from 'react'
import Backdrop from '../Backdrop/Backdrop'
import { AiOutlineClose } from 'react-icons/ai'
import Profile from '../../Profile/Profile'


const Dialog = ({
    show,
    setShow,
    onRemove,
    isRemove,
    onPin,
    messageID,
    userInfo,
    isPin
}) => {
   


    let title=""
    let dis=""
    if(isRemove){
        title="Delete Message"
        dis="Are you sure you want to delete this message?"
    }
    else if(isPin){
        title="Unpin Message"
        dis="Would you like to unpin this message?"
      }
      else{
        title="Pin Message"
        dis="Would you like to pin this message?"
      }
      
    
    return (
        <div>
            <Backdrop show={show} />
            <dialog
                id="my_modal_1"
                className={`modal modal-box modal-bottom sm:modal-middle  justify-items-start [overflow-y:hidden] px-0  -translate-x-1/2 left-1/2 pt-0 mt-0 h-fit top-1/2 -translate-y-1/2 overflow-x-hidden w-[25%] ${
                    show ? 'pointer-events-auto visible opacity-100' : ''
                }`}
            >
                <div className="flex items-center gap-5 px-6 pt-4 w-full pb-3 mt-2">
                    <Profile {...userInfo} path={userInfo?.profileImg} isSave={userInfo?.relation==="me"?true:false}/>
                    <p className="text-[24px] font-semibold text-white">
                       {title}
                    </p>
                </div>

                <div className=" flex flex-col gap-6 px-7 w-full">
                    <p className=" text-gray-50 text-lg max-w-[240px] ">
                       {dis}
                    </p>

                    <div className="self-end flex items-center gap-x-1">
                        <button className="btn bg-transparent border-none text-[#8774e1] text-lg px-5 hover:bg-[rgba(135,116,225,0.08)]" onClick={()=>setShow(false)}>
                            Cancel
                        </button>

                        {isRemove ? (
                            <button className="btn bg-transparent border-none text-[#ff595a] text-lg px-5 hover:bg-[rgba(255,89,90,0.08)] " onClick={()=>{
                                onRemove(messageID)
                                setShow(false)
                                }}>
                                Delete
                            </button>
                        ) : (
                            <button className={`btn bg-transparent border-none  text-lg px-5  ${isPin?"text-[#ff595a] hover:bg-[rgba(255,89,90,0.08)]":" hover:bg-[rgba(135,116,225,0.08)] text-[#8774e1]"}`} onClick={()=>{
                                onPin(messageID)
                                setShow(false)
                                }}>
                                {!isPin?"Pin":"UNPIN"}
                            </button>
                        )}
                    </div>
                </div>
            </dialog>
        </div>
    )
}

export default Dialog
