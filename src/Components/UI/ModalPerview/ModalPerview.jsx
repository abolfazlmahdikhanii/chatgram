import React, { useRef, useState } from "react";
import HeaderModal from "../HeaderModal/HeaderModal";
import ActionModal from "../ActionModal/ActionModal";

const ModalPerview = ({ show, close, images, onUpload,dis,setDis }) => {
  
  const submitFormHandler = (caption) => {

    onUpload(caption)


    close()
 
}
  return (
    <dialog
      id="my_modal_1"
      className={`modal modal-box modal-bottom md:modal-middle   justify-items-start [overflow-y:hidden] px-0 md:max-h-[600px] -translate-x-1/2 left-1/2 pt-0 mt-0 ${
        show ? "pointer-events-auto visible opacity-100" : ""
      }`}
    >
      <HeaderModal
        title={
          images?.length === 1
            ? `Send ${images[0]?.type==='img'?'image':'video'}`
            : `Send ${images?.length} Files`
        }
        clickClose={close}
      />

        {/* body */}
  <div className="modal-body h-[70vh] md:h-[90%]  ">
        <ul className="md:max-h-[100%] grid grid-cols-[repeat(auto-fit,minmax(40%,1fr))] w-full gap-4 [grid-auto-rows:minmax(220px,1fr)]  ">
          {images?.map((img) => (
            <li
              key={img.id}
              className="w-full h-full  rounded-lg overflow-hidden "
            >
              {img?.type === "video" ? (
                <video className=" h-auto object-cover w-full aspect-video">
                  <source src={img.src} />
                </video>
              ) : (
                <img
                  src={img.src}
                  alt=""
                  className="object-cover w-full h-full rounded-lg "
                />
              )}
            </li>
          ))}
        </ul>
        </div>

      <ActionModal
       
        click={submitFormHandler}
      />
          
          
    </dialog>
  );
};

export default ModalPerview;
