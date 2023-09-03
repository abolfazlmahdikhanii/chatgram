import React from "react";

const SelectBox = () => {
  return (
    <div className=" rounded-xl bg-[rgba(33,33,33,.85)] backdrop:backdrop-blur-[50px] absolute bottom-20 right-24 w-[190px] py-1.5 px-1.5">
      {/* item1 */}
      <div className="flex items-center gap-5 text-white py-1.5 px-3 transition-all duration-300 hover:bg-[rgba(170,170,170,0.08)] rounded-lg cursor-pointer">
        {/* icon */}
        <p className="grid place-items-center">
          <svg
            width={22}
            height={22}
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
              d="M9 10a2 2 0 100-4 2 2 0 000 4zM2.67 18.95l4.93-3.31c.79-.53 1.93-.47 2.64.14l.33.29c.78.67 2.04.67 2.82 0l4.16-3.57c.78-.67 2.04-.67 2.82 0L22 13.9"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </p>
        <p className="font-[500] text-[14px]">Photo or Video</p>
      </div>
      {/* item2 */}
      <div className="flex items-center gap-5 text-white py-1.5 px-3 transition-all duration-300 hover:bg-[rgba(170,170,170,0.08)] rounded-lg cursor-pointer">
        {/* icon */}
        <p className="grid place-items-center">
          <svg
            width={22}
            height={22}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22 10v5c0 5-2 7-7 7H9c-5 0-7-2-7-7V9c0-5 2-7 7-7h5"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M22 10h-4c-3 0-4-1-4-4V2l8 8z"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </p>
        <p className="font-[500] text-[14px]">Document</p>
      </div>
    </div>
  );
};

export default SelectBox;
