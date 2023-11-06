import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import Backdrop from '../Backdrop/Backdrop'

import ForwardList from '../../ForwardList/ForwardList'
const Modal = ({ show, chat, messageID, setChat, userID,setShow }) => {

    return (
        <>
            <Backdrop show={show} />
            <dialog
                id="my_modal_1"
                className={`modal modal-box modal-bottom sm:modal-middle  justify-items-start [overflow-y:hidden] px-0 max-h-[700px] -translate-x-1/2 left-1/2 pt-0 mt-0 h-fit top-1/2 -translate-y-1/2 overflow-x-hidden ${
                    show ? 'pointer-events-auto visible opacity-100' : ''
                }`}
            >
                <div className="flex items-center gap-5 px-6 py-4 w-full">
                    <button className="btn btn-sm btn-square   grid place-items-center" onClick={()=>setShow(false)}>
                        <AiOutlineClose size={16} />
                    </button>
                    <input
                        type="text"
                        className="input focus-visible:outline-0 text-xl font-normal text-white w-full"
                        placeholder="Forward to ..."
                    />
                </div>

                <div className="modal-body max-h-[350px] h-full min-h-[120px]">
                    {/* body */}

                    <ul className="  w-full  flex flex-col gap-0.5">
                        <ForwardList
                            chat={chat}
                            messageID={messageID}
                            setChat={setChat}
                            userID={userID}
                            setShow={setShow}
                        />
                    </ul>
                </div>
            </dialog>
        </>
    )
}

export default Modal
