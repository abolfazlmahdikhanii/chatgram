import React, { useContext, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import Backdrop from '../Backdrop/Backdrop'

import ForwardList from '../../ForwardList/ForwardList'
import { ChatContext } from '../../../Context/ChatContext'
import UserProfile from '../../userProfile/userProfile'
const Modal = ({ userID }) => {
    const {
        showFrowardModal,
        chat,
        forwardClickHandler,
        forwardContactClickHandler,
        forwardContact,
        messageID,
        setShowForwardModal,
        setChat,
        setForwardContact,
    } = useContext(ChatContext)
    const [chatFilter, setChatFilter] = useState("")
    return (
        <>
            <Backdrop show={showFrowardModal} />
            <dialog
                id="my_modal_1"
                className={`modal modal-box modal-bottom sm:modal-middle  justify-items-start [overflow-y:hidden] px-0 max-h-[700px] -translate-x-1/2 left-1/2 pt-0 mt-0 h-fit top-1/2 -translate-y-1/2 overflow-x-hidden ${
                    showFrowardModal
                        ? 'pointer-events-auto visible opacity-100'
                        : ''
                }`}
            >
                <div className="flex items-center gap-5 px-6 py-4 w-full">
                    <button
                        className="btn btn-sm btn-square   grid place-items-center"
                        onClick={() => setShowForwardModal(false)}
                    >
                        <AiOutlineClose size={16} />
                    </button>
                    <input
                        type="text"
                        className="input focus-visible:outline-0 text-xl font-normal dark:text-white w-full text-gray-700"
                        value={chatFilter}
                        onChange={(e) => setChatFilter(e.target.value.trim())}
                        placeholder="Forward to ..."
                    />
                </div>

                <div className="modal-body max-h-[350px] h-full min-h-[230px]">
                    {/* body */}

                    <ul className="  w-full  flex flex-col gap-0.5">
                      
                        {chat &&
                            chat
                                ?.filter((item) => item.userName?.toLowerCase().includes(chatFilter.toLowerCase()))
                                ?.map((item) => (
                                    <UserProfile
                                        key={item.id}
                                        {...item}
                                        onForward={() => {
                                            !forwardContact
                                                ? forwardClickHandler(item.id)
                                                : forwardContactClickHandler(item.id)
                                            setForwardContact(false)
                                        }}
                                    />
                                ))}
                    </ul>
                </div>
            </dialog>
        </>
    )
}

export default Modal
