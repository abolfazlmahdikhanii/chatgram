import React, { useRef, useEffect, useState } from "react";

import Picker from "@emoji-mart/react";

import BtnAction from "../UI/BtnAction/BtnAction";
import BtnUploader from "../BtnUploader/BtnUploader";
import ContentWrapper from "../ContentWrapper/ContentWrapper";
import SelectBox from "../UI/SelectBox/SelectBox";

const ChatForm = ({ set }) => {
  const [text, setText] = useState("");
  const [emoji, setEmoji] = useState([]);
  const [showEmoji, setShowEmoji] = useState(false);
  const [showUploader, setShowUploader] = useState(false);
  const [imagesUpload, setImagesUpload] = useState([]);
  const [filesUpload, setFilesUpload] = useState([]);

  const inputRef = useRef(null);

  useEffect(() => {
    setText(inputRef.current);
  }, [inputRef]);

  // find chat with id and store  in the object in the place
  const submitFormHandler = (e) => {
    e.preventDefault();
    if (inputRef.current.innerHTML !== "") {
      set(text.innerHTML);
      inputRef.current.innerHTML = "";
    } 
  };
  const uploadFileHandler=()=>{
    if(filesUpload) set(filesUpload)
 
    
  }
  const uploadImageHandler=()=>{
    if(imagesUpload)  set(imagesUpload)
    
  }
  const closeEmojiPicker = () => {
    setTimeout(() => {
      setShowEmoji(false);
    }, 100);
  };
  const closeUploader = () => {
    setTimeout(() => {
      setShowUploader(false);
    }, 200);
  };

  return (
    <form
      action="#"
      className=" w-11/12 mx-auto  mb-24 flex gap-3.5 h-[48px] max-w-2xl"
      onSubmit={submitFormHandler}
    >
      <div className="bg-base-200 flex items-center justify-between py-1.5 rounded-xl w-full px-3">
        <div className="flex items-center gap-0.5 w-full">
          <button
            className="text-yellow-500 grid place-items-center"
            onMouseEnter={() => {
              setShowEmoji((prev) => !prev);
            }}
          >
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

          <div
            className="chat__input overflow-hidden"
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
        <BtnUploader click={setShowUploader} />
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
      <SelectBox
        show={showUploader}
        close={closeUploader}
        setImages={setImagesUpload}
        images={imagesUpload}
        filesUpload={filesUpload}
        setFilesUpload={setFilesUpload}
        onUploadImage={uploadImageHandler}
        onUploadFile={uploadFileHandler}
      />
    </form>
  );
};

export default ChatForm;
