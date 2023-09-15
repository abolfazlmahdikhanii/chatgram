import React from "react";

const BtnAction = ({ isText = false }) => {
  return (
    <button className="h-full px-[16px] btn btn-primary rounded-xl flex items-center justify-center  overflow-hidden max-w-[60px] flex-nowrap">
      <div
        className={`grid place-items-center transition-all duration-300 ${
          isText
            ? "translate-x-[76%] opacity-100 scale-100"
            : " opacity-0 scale-0"
        }`}
      >
        <svg
          width={19}
          height={19}
          className={`pointer-events-none inline-flex `}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.51 4.23l8.56 4.28c3.84 1.92 3.84 5.06 0 6.98l-8.56 4.28c-5.76 2.88-8.11.52-5.23-5.23l.87-1.73c.22-.44.22-1.17 0-1.61l-.87-1.74C1.4 3.71 3.76 1.35 9.51 4.23zM5.44 12h5.4"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div
        className={`grid place-items-center transition-all duration-300 ${
          !isText
            ? "-translate-x-[60%] opacity-100 scale-100"
            : " opacity-0 scale-0"
        }`}
      >
        <svg
          width={22}
          height={22}
          viewBox="0 0 24 24"
          fill="none"
          className={`pointer-events-none inline-flex `}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 15.5c2.21 0 4-1.79 4-4V6c0-2.21-1.79-4-4-4S8 3.79 8 6v5.5c0 2.21 1.79 4 4 4z"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4.35 9.65v1.7C4.35 15.57 7.78 19 12 19c4.22 0 7.65-3.43 7.65-7.65v-1.7M10.61 6.43c.9-.33 1.88-.33 2.78 0M11.2 8.55c.53-.14 1.08-.14 1.61 0M12 19v3"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </button>
  );
};

export default BtnAction;
