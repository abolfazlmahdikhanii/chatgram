import React from "react";

const ActionModal = () => {
  return (
    <div className=" pl-2  w-full flex items-center justify-between gap-3 pr-5   pt-3">
      <textarea
        className="input focus:outline-none  w-full  resize-none  text-white bg-transparent "
        placeholder="Add a Caption"
      ></textarea>

      <button className="btn btn-primary px-6">Send</button>
    </div>
  );
};

export default ActionModal;
