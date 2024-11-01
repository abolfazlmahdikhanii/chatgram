import React, { useContext } from 'react'
import Backdrop from '../Backdrop/Backdrop'
import { AiOutlineClose } from 'react-icons/ai'
import Profile from '../../Profile/Profile'
import { ChatContext } from '../../../Context/ChatContext'
import { UserContext } from '../../../Context/UserContext'
import { supabase } from '../../../superbase'

const Dialog = ({ chatId,senderId }) => {
  const {
    showAlert,
    setShowAlert,
    deleteMessage,
    pinMessageHandler,
    messageID,
    message,
    isPin,
    pinMessage,
    isRemove,
  } = useContext(ChatContext)
  const { user } = useContext(UserContext)

  let title = ''
  let dis = ''

  const findItemPin =  () => {
    
 
        
    if (isPin.mID===messageID&&isPin.isPin) return true
     else return false
  }

  if (!Object.values(isPin).length && isRemove) {
    title = 'Delete Message'
    dis = 'Are you sure you want to delete this message?'
  }
    if(Object.values(isPin).length>0){
        if (findItemPin(messageID)===true) {
            title = 'Unpin Message'
            dis = 'Would you like to unpin this message?'
          } else {
            title = 'Pin Message'
            dis = 'Would you like to pin this message?'
          }
    }

  return (
    <div>
      <Backdrop show={showAlert} />
      <dialog
        id="my_modal_1"
        className={`modal modal-box modal-bottom sm:modal-middle  justify-items-start [overflow-y:hidden] px-0  -translate-x-1/2 left-1/2 pt-0 mt-0 h-fit top-1/2 -translate-y-1/2 overflow-x-hidden w-11/12 md:w-[25%] ${
          showAlert ? 'pointer-events-auto visible opacity-100 ' : ''
        }`}
      >
        <div className="flex items-center gap-5 px-6 pt-4 w-full pb-3 mt-2">
          <Profile
            {...user}
            src={user?.avatar_url}
            userName={user?.username || user?.email?.split('@')[0]}
            isSave={user?.userid === chatId ? true : false}
          />
          <p className="text-[24px] font-semibold dark:text-white text-gray-800">
            {title}
          </p>
        </div>

        <div className=" flex flex-col gap-6 px-7 w-full">
          <p className=" dark:text-gray-50 text-lg max-w-[240px] text-gray-600">
            {dis}
          </p>

          <div className="self-end flex items-center gap-x-1">
            <button
              className="btn bg-transparent border-none text-[#8774e1] text-lg px-5 hover:bg-[rgba(135,116,225,0.08)]"
              onClick={() => setShowAlert(false)}
            >
              Cancel
            </button>

            {!isPin && isRemove ? (
              <button
                className="btn bg-transparent border-none text-[#ff595a] text-lg px-5 hover:bg-[rgba(255,89,90,0.08)] "
                onClick={() => {
                  deleteMessage(messageID, chatId)
                  setShowAlert(false)
                }}
              >
                Delete
              </button>
            ) : (
              <button
                className={`btn bg-transparent border-none  text-lg px-5  ${
                  findItemPin(messageID)
                    ? 'text-[#ff595a] hover:bg-[rgba(255,89,90,0.08)]'
                    : ' hover:bg-[rgba(135,116,225,0.08)] text-[#8774e1]'
                }`}
                onClick={() => {
                  pinMessageHandler(messageID, chatId,isPin,senderId)
                  setShowAlert(false)
                }}
              >
                {!findItemPin(messageID) ? 'Pin' : 'UNPIN'}
              </button>
            )}
          </div>
        </div>
      </dialog>
    </div>
  )
}

export default Dialog
