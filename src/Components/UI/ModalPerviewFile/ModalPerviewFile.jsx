import React, { useRef, useState } from "react";
import FileItem from "../../FIleItem/FileItem";
import ActionModal from "../ActionModal/ActionModal";
import HeaderModal from "../HeaderModal/HeaderModal";
import Backdrop from "../Backdrop/Backdrop";

const ModalPerviewFile = ({ show, close, files, onRemove, onUpload }) => {
  return (
    <dialog
      id="my_modal_1"
      className={`modal modal-box   justify-items-start [overflow-y:hidden] px-0 max-h-[700px] -translate-x-1/2 left-1/2 pt-0 mt-0 h-fit top-1/2 -translate-y-1/2 overflow-x-hidden ${
        show ? "pointer-events-auto visible opacity-100" : ""
      }`}
    >
      <HeaderModal title="Send File" clickClose={close} />
      <div className="modal-body max-h-[350px] h-full min-h-[120px]">
        {/* body */}

        <ul className="  w-full  flex flex-col gap-3 ">
          {files?.map((file) => (
            <FileItem
              key={file.id}
              name={file.name}
              type={file.name.split(".").pop()}
              src={file?.src}
              size={file.size}
              onRemove={() => onRemove(file?.id)}
            />
          ))}
        </ul>
      </div>

      <ActionModal
        click={() => {
          onUpload();
          close();
        }}
      />
    </dialog>
  );
};

export default ModalPerviewFile;
