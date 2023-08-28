import React from "react";
import BtnAction from "../UI/BtnAction/BtnAction";
import BtnUploader from "../BtnUploader/BtnUploader";

const ChatForm = () => {
  return (
    <form action="#" className=" w-11/12 mx-auto  mb-24 flex gap-3.5 h-[48px]">
      {/* input */}
      <div className="bg-gray-900 flex items-center justify-between py-1.5 rounded-xl w-full px-3">
        <div className="flex items-center gap-0.5 w-full">
          {/* emoji */}
          <button className="text-yellow-500 grid place-items-center">
            <svg
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 22h6c5 0 7-2 7-7V9c0-5-2-7-7-7H9C4 2 2 4 2 9v6c0 5 2 7 7 7z"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15.5 9.75a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM8.5 9.75a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM8.4 13.3h7.2c.5 0 .9.4.9.9 0 2.49-2.01 4.5-4.5 4.5s-4.5-2.01-4.5-4.5c0-.5.4-.9.9-.9z"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeMiterlimit={10}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <input
            type="text"
            placeholder="Write message to User..."
            className="appearance-none px-3 py-2 placeholder:text-xs w-full text-gray-50 bg-transparent focus-visible:outline-none "
          />
        </div>
        {/* action */}
        <div>
          <BtnUploader/>
        </div>
      </div>
   
   <BtnAction/>
    </form>
  );
};

export default ChatForm;
