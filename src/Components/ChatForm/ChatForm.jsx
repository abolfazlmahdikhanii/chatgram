<<<<<<< HEAD
import React from "react";
import BtnAction from "../UI/BtnAction/BtnAction";
import BtnUploader from "../BtnUploader/BtnUploader";

const ChatForm = () => {
  return (
    <form action="#" className=" w-11/12 mx-auto  mb-24 flex gap-3.5 h-[48px]">
=======
import React, { useRef, useEffect, useState } from "react";

import Picker from "@emoji-mart/react";

import BtnAction from "../UI/BtnAction/BtnAction";
import BtnUploader from "../BtnUploader/BtnUploader";
import ContentWrapper from "../ContentWrapper/ContentWrapper";

const ChatForm = ({ set }) => {
  const [text, setText] = useState("");
  const [emoji, setEmoji] = useState([]);
  const [showEmoji, setShowEmoji] = useState(false);

  const inputRef = useRef(null);

  useEffect(()=>{
    setText(inputRef.current);

  },[inputRef])

  // find chat with id and store  in the object in the place
  const submitFormHandler = (e) => {
    e.preventDefault();
    if (inputRef.current.innerHTML!=="") {
      
      set(text.innerHTML);
      inputRef.current.innerHTML=""
    }
  };
  const closeEmojiPicker = () => {
    setTimeout(() => {
      setShowEmoji(false);
    }, 500);
  };

  return (
    <form
      action="#"
      className=" w-11/12 mx-auto  mb-24 flex gap-3.5 h-[48px] max-w-2xl"
      onSubmit={submitFormHandler}
    >
>>>>>>> 63e42ce (add emoji)
      {/* input */}
      <div className="bg-gray-900 flex items-center justify-between py-1.5 rounded-xl w-full px-3">
        <div className="flex items-center gap-0.5 w-full">
          {/* emoji */}
<<<<<<< HEAD
          <button className="text-yellow-500 grid place-items-center">
=======
          <button
            className="text-yellow-500 grid place-items-center"
            onMouseEnter={() => {
              setShowEmoji((prev) => !prev);
            }}
          >
>>>>>>> 63e42ce (add emoji)
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

<<<<<<< HEAD
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
=======
          <div
            type="text"
            placeholder="Write message to User..."
            className="chat__input overflow-hidden"
            // onInput={(e) => setText(e.target.innerHTML)}
            ref={inputRef}
            contentEditable
            suppressContentEditableWarning={true}
          >
            {emoji.map((item, i) => (
              <img
                key={i}
                src={`https://cdn.jsdelivr.net/npm/emoji-datasource-apple@14.0.0/img/apple/64/${item.unified}.png`}
                className="w-[20px] h-[20px] inline-flex"
              />
            ))}
          </div>
        </div>
        {/* action */}
        <div>
          <BtnUploader />
        </div>
      </div>

      <BtnAction />
      {/* emoji */}
      <div className="absolute bottom-20 left-14" onMouseOut={closeEmojiPicker}>
        {showEmoji && (
          <Picker
            onEmojiSelect={(e) =>
              setEmoji((prev) => {
                return [
                  ...prev,
                  {
                    id: e.id,
                    shortcodes: e.shortcodes,
                    unified: e.unified,
                  },
                ];
              })
            }
            emojiSize={25}
            previewPosition="none"
            value={text}
            set={"apple"}
          />
        )}
      </div>
>>>>>>> 63e42ce (add emoji)
    </form>
  );
};

export default ChatForm;
