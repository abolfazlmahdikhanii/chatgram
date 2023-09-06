import React, { useRef, useState } from "react";
import HeaderModal from "../HeaderModal/HeaderModal";
import ActionModal from "../ActionModal/ActionModal";

const ModalPerview = ({ show, close, images }) => {

  return (
    <dialog
      id="my_modal_1"
      className={`modal modal-box   justify-items-start [overflow-y:hidden] px-0 max-h-[600px] -translate-x-1/2 left-1/2 pt-0 mt-0 ${
        show ? "pointer-events-auto visible opacity-100" : ""
      }`}
    >
      <HeaderModal title="Send Photo" clickClose={close} />

      <div className="modal-body max-h-[76vh] min-h-[250px]">
        {/* body */}

        <ul className="max-h-[72vh] grid grid-cols-[repeat(auto-fit,minmax(40%,1fr))] w-full gap-4 [grid-auto-rows:minmax(220px,1fr)]  ">
          {images?.map((img,i) => (
            <li key={img.id} className="w-full h-full  rounded-lg overflow-hidden ">
              <img
                src={img.src}
                alt=""
                className="object-cover w-full h-full "
              />
            </li>
          ))}
        </ul>
      </div>

      <ActionModal />
    </dialog>
  );
};

export default ModalPerview;
