import React from "react";
import { BiCheckDouble } from "react-icons/bi";
import { BiCheck } from "react-icons/bi";
import { Watch } from "react-loader-spinner";
import ProfileImage from "../ProfileImage/ProfileImage";
const Message = ({ from, txt,userInfo }) => {
  return (

      <div
        className={`message ${
          from === "user" ? "message--user" : "message--client"
        }`}
      >
        <div>{txt}</div>
        <div className="mt-3 flex items-center gap-1.5 mb-0.5 px-1">
          <p className="text-gray-400 text-[11px]">12:24</p>

          {/* <Watch
          height="10"
          width="10"
          radius="48"
          color="#ffff"
          ariaLabel="watch-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        /> */}
          <BiCheckDouble size={16} color="" />
        </div>
      </div>

  );
};

export default Message;
