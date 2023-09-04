import React,{useRef, useState} from "react";
import { Icon } from '@fluentui/react/lib/Icon';
import { getFileTypeIconProps } from '@fluentui/react-file-type-icons';
const ModalPerviewFile = () => {
  const [height, setHeight] = useState(100);

  

  return (
    <dialog
      id="my_modal_1"
      className="modal modal-box  opacity-100 visible  pointer-events-auto justify-items-start [overflow-y:hidden] px-0 max-h-[500px] -translate-x-1/2 left-1/2 pt-0 mt-0 h-fit top-1/2 -translate-y-1/2"
    >
      <div className="flex items-center gap-7 px-6 py-4 ">
        <button className="btn btn-square btn-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <p className="text-2xl font-semibold text-white">Send File</p>
      </div>
      <form
        method="#"
        className="modal-body max-h-full h-full min-h-[120px]"
      >
        {/* body */}

        <ul className="  w-full gap-4   ">
          <li>
              <div>
                <img src="https://contoso.sharepoint.com/documents/filename.docx" alt="" />
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-lg text-white font-semibold truncate">Holland تیپ سنجی شغلی_ابوالفضل مهدیخانی.pdf</p>
                <p className="">573 KB</p>
              </div>
          </li>
        </ul>
      </form>

      <div className=" pl-2  w-full flex items-center justify-between gap-3 pr-5   pt-3" >
      <textarea className="input focus:outline-none  w-full  resize-none  text-white bg-transparent "  placeholder="Add a Caption"  
      ></textarea>

        <button className="btn btn-primary px-6">Send</button>
      </div>
    </dialog>
  );
};

export default ModalPerviewFile;
