import React, { useState } from "react";
import ProfileImage from "../ProfileImage/ProfileImage";
import FileType from "../FileType/FileType";
import FooterMessage from "../FooterMessage/FooterMessage";

const Message = ({
  from,
  messageDis,
  date,
  read,
  send,
  userInfo,
  remove,
  onContext,
  messageId,
  onCheck,
  setCheck,
  checkArr,
  showCheck,
  edited
}) => {
  const formatTime = (date) => {
    return new Intl.DateTimeFormat("tr", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const checkHandler = (id, check) => {
    onCheck(id, check);
   
  };
  let arr = checkArr.findIndex((item) => item.messageId === messageId);
  return (
    <div
      className={`chat relative flex justify-between px-6 py-3 items-end ${
        from === "user" ? "chat-end" : "chat-start"
      } ${
        checkArr[arr]?.check ? "bg-indigo-300/10" : ""
      } transition-all duration-200`}
      onContextMenu={(e) => onContext(e, messageId)}
    >
      <div
        className={`chat-bubble break-words  ${
          from === "user" ? "chat-bubble-primary" : "chat-bubble"
        }  ${
          messageDis[0]?.type === "file" || typeof messageDis === "string"
            ? "max-w-[345px]"
            : "max-w-[420px] px-1.5 py-1.5"
        } `}
      >
        {typeof messageDis === "string" ? (
          <div
            className="text-white"
            dangerouslySetInnerHTML={{ __html: messageDis }}
          ></div>
        ) : (
          <ul
            className={`${
              messageDis[0]?.type === "file" ? "grid-2" : "grid-1"
            }  `}
          >
            {messageDis?.map((content) => (
              <FileType
                key={content.id}
                {...content}
                onRemove={remove}
                from={from}
              />
            ))}
          </ul>
        )}

        <FooterMessage
          message={messageDis[0]}
          date={formatTime(date)}
          read={read}
          send={send}
          edited={edited}
        />
      </div>

      {showCheck && (
        <input
          type="checkbox"
          className={`checkbox checkbox-primary mr-16 `}
          checked={checkArr[arr]?.check}
          onChange={(e) => checkHandler(messageId, !checkArr[arr]?.check)}
        />
      )}
    </div>
  );
};

export default Message;
