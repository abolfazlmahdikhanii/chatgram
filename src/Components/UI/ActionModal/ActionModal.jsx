import React, { useState } from "react";

const ActionModal = ({click}) => {
  const [caption, setCaption] = useState('')
  return (
    <div className=" pl-2  w-full flex items-center justify-between gap-3 pr-5   pt-3">
      <textarea
        className="input focus:outline-none  w-full  resize-none  dark:text-white bg-transparent text-gray-800"
        placeholder="Add a Caption"
        onChange={(e)=>setCaption(e.target.value)}
        value={caption}
        dir="auto"
      ></textarea>

      <button  className="btn btn-primary px-6" onClick={()=>{
        click(caption)
        setCaption("")
        }}>Send</button>
    </div>
  );
};

export default ActionModal;
