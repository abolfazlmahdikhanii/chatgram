import React, { useRef, useEffect, useState } from "react";

import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data/sets/14/apple.json";
import { MdOutlineEdit } from "react-icons/md";
import { IoMdClose } from "react-icons/io";

import BtnAction from "../UI/BtnAction/BtnAction";
import BtnUploader from "../BtnUploader/BtnUploader";
import ContentWrapper from "../ContentWrapper/ContentWrapper";
import SelectBox from "../UI/SelectBox/SelectBox";
import AudioRecorders from "../AudioRecorder/AudioRecorder";

const ChatForm = ({ set, edit, setEdit, onEdit }) => {
  const [text, setText] = useState("");
  const [emoji, setEmoji] = useState([]);
  const [showEmoji, setShowEmoji] = useState(false);
  const [showUploader, setShowUploader] = useState(false);
  const [record, setRecord] = useState(false);
  const [imagesUpload, setImagesUpload] = useState([]);
  const [filesUpload, setFilesUpload] = useState([]);
  const [content, setContent] = useState("");

  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      setText(inputRef.current);
    }

    if (record) {
      setText("");
      
      setEmoji([]);

    }
  }, [inputRef, text, emoji,set]);
  // useEffect(() => {
  //   if (inputRef.current.innerHTML === ""&&edit) inputRef.current.innerHTML = edit;
  // }, [edit, record, setEdit]);

  // find chat with id and store  in the object in the place
  const submitFormHandler = (e) => {
    e.preventDefault();
    if (inputRef.current) {
      if (inputRef.current.innerHTML !== "") {
        set(text.innerHTML);
        inputRef.current.innerHTML = "";
      }
    }
  };
  const editHandler = (e) => {
    e.preventDefault();
    if (inputRef.current) {
        onEdit(inputRef.current.innerHTML);
        inputRef.current?inputRef.current.innerHTML = "":null
        setText("")
      
    }
  };
  const uploadFileHandler = () => {
    if (filesUpload) set(filesUpload);
  };
  const uploadImageHandler = () => {
    if (imagesUpload) set(imagesUpload);
  };
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
      className=" w-11/12 mx-auto  mb-28 flex gap-3 h-[48px] max-w-2xl items-center relative self-end"
      onSubmit={submitFormHandler}
    >
      {!record ? (
        <>
          <div className="flex flex-col w-full relative">
            <EditBox edit={edit} setEdit={setEdit} input={inputRef} />
            <div className="form-box ">
              <div className="flex items-center gap-0.5 w-full relative">
                <button
                  className="text-yellow-500 grid place-items-center"
                  onClick={(e) => {
                    e.preventDefault()
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
                  className="chat__input overflow-hidden  z-10"
                  ref={inputRef}
                  onInput={(e) => setContent(inputRef.current.innerHTML)}
                  autoFocus
                  contentEditable
                  placeholder="message"
                  suppressContentEditableWarning={true}
                  onKeyDown={(e) => {
                    e.key === "Enter" ? submitFormHandler(e) : null;
                    // e.key === "Backspace"&&edit ? setEdit(e.target.innerText) : edit;
                    setContent(inputRef.current.innerHTML);
                  }}
                >
                  {emoji &&
                    emoji?.map((item, i) => (
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
          </div>
          <div className="h-[53px] mask mask-squircle ">
            <BtnAction
              isText={text}
              setRecord={setRecord}
              setText={setEmoji}
              emoji={emoji}
              isEdit={edit}
              setEdit={setEdit}
              onEdit={editHandler}
            />
          </div>
        </>
      ) : (
        <AudioRecorders
          record={record}
          setRecord={setRecord}
          setMessage={set}
        />
      )}

      {/* emoji */}
      <div className="absolute bottom-16 left-10" onMouseOut={closeEmojiPicker}>
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
            data={data}
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

const EditBox = ({ edit, setEdit, input }) => {
  return (
    <div
      className={`form-box rounded-b-none  transition-all duration-300 absolute top-0 ${
        !edit
          ? "-translate-y-7 opacity-0  -z-[1] overflow-hidden"
          : "-translate-y-14 opacity-100 -mb-2"
      }`}
    >
      {/* info */}
      <div className="flex items-center py-1">
        <p className="px-1">
          <MdOutlineEdit size={26} color="rgb(129 140 248)" />
        </p>
        <div className="flex flex-col gap-0.5 border-l-2 border-l-indigo-700 px-4 ml-5 w-[470px]">
          <p className="text-[15px] text-indigo-400 font-medium">Editing</p>
          <p className="text-[14px] truncate w-[80%]" dangerouslySetInnerHTML={{__html:edit}}></p>
        </div>
      </div>
      <button
        className="btn btn-square btn-sm"
        onClick={(e) => {
          e.preventDefault();
          setEdit("");
          input.current.innerHTML = "";
        }}
      >
        <IoMdClose size={20} />
      </button>
    </div>
  );
};
