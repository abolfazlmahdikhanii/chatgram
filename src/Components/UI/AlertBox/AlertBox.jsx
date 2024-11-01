import React from 'react'
import Backdrop from '../Backdrop/Backdrop'

const AlertBox = ({showAlert,setShowAlert,title,dis}) => {
    console.log(showAlert);
  return (
    <div>
    <Backdrop show={showAlert} />
    <dialog
      id="my_modal_1"
      className={`modal modal-box modal-bottom sm:modal-middle  justify-items-start [overflow-y:hidden] px-0  -translate-x-1/2 left-1/2 pt-0 mt-0 h-fit top-1/2 -translate-y-1/2 overflow-x-hidden w-11/12 md:w-[45%] ${
        showAlert ? 'pointer-events-auto visible opacity-100 ' : ''
      }`}
    >
      <div className="flex items-center gap-5 px-6 pt-4 w-full pb-3 mt-3 justify-center mb-4">
      
        <p className="text-[22px] font-semibold dark:text-white text-gray-800">
          {title}
        </p>
      </div>

      <div className=" flex flex-col gap-6 px-7 w-full">
        <p className=" dark:text-gray-200 text-lg  text-gray-600">
          {dis}
        </p>

        <div className="self-end flex items-center gap-x-1 w-full">
          <button
            className="btn bg-transparent w-full border-none text-[#8774e1] text-lg px-5 hover:bg-[rgba(135,116,225,0.08)]"
            onClick={() => setShowAlert(false)}
          >
            Got it
          </button>

         
        </div>
      </div>
    </dialog>
  </div>
  )
}

export default AlertBox