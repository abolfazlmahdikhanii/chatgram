import React from "react";

const SideMenuItem = ({ name,showSetting }) => {
  let icon = null;
  switch (name) {
    case "chat":
      icon = (
        <svg
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.5 10.5H15.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7 18.4299H11L15.45 21.39C16.11 21.83 17 21.3599 17 20.5599V18.4299C20 18.4299 22 16.4299 22 13.4299V7.42993C22 4.42993 20 2.42993 17 2.42993H7C4 2.42993 2 4.42993 2 7.42993V13.4299C2 16.4299 4 18.4299 7 18.4299Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
      break;
    case "save":
      icon = (
        <svg
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 8.98987V20.3499C16 21.7999 14.96 22.4099 13.69 21.7099L9.76001 19.5199C9.34001 19.2899 8.65999 19.2899 8.23999 19.5199L4.31 21.7099C3.04 22.4099 2 21.7999 2 20.3499V8.98987C2 7.27987 3.39999 5.87988 5.10999 5.87988H12.89C14.6 5.87988 16 7.27987 16 8.98987Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M22 5.10999V16.47C22 17.92 20.96 18.53 19.69 17.83L16 15.77V8.98999C16 7.27999 14.6 5.88 12.89 5.88H8V5.10999C8 3.39999 9.39999 2 11.11 2H18.89C20.6 2 22 3.39999 22 5.10999Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7 12H11"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
      break;
    case "chanel":
      icon = (
        <svg
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.5 10v4c0 2 1 3 3 3h1.43c.37 0 .74.11 1.06.3l2.92 1.83c2.52 1.58 4.59.43 4.59-2.54V7.41c0-2.98-2.07-4.12-4.59-2.54L10.99 6.7c-.32.19-.69.3-1.06.3H8.5c-2 0-3 1-3 3z"
            stroke="currentColor"
            strokeWidth={1.5}
          />
        </svg>
      );

      break;
    case "profile":
      icon = (
        <svg
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9 2.75a3.686 3.686 0 00-3.69 3.69 3.67 3.67 0 003.505 3.679 2.59 2.59 0 01.362 0A3.686 3.686 0 009 2.75zM3.81 6.44A5.186 5.186 0 019 1.25a5.193 5.193 0 015.19 5.19v.003c-.012 2.8-2.219 5.083-5.005 5.177a.756.756 0 01-.1-.004 1.077 1.077 0 00-.187 0 .761.761 0 01-.093.004A5.17 5.17 0 013.81 6.44zM15.66 4a.75.75 0 01.75-.75 4.247 4.247 0 014.25 4.25 4.255 4.255 0 01-4.092 4.25c-.04.001-.081 0-.121-.006a.385.385 0 00-.084.001.75.75 0 01-.166-1.49c.118-.014.241-.017.363-.007a2.755 2.755 0 002.6-2.748 2.747 2.747 0 00-2.75-2.75.75.75 0 01-.75-.75zM9.172 12.438c1.929 0 3.895.483 5.414 1.498 1.366.91 2.149 2.184 2.149 3.555 0 1.372-.782 2.648-2.148 3.562-1.524 1.02-3.493 1.507-5.422 1.507-1.929 0-3.897-.487-5.421-1.506-1.366-.91-2.149-2.184-2.149-3.555 0-1.372.782-2.648 2.148-3.562l.003-.002c1.528-1.014 3.498-1.498 5.426-1.498zm-4.596 2.746c-1.054.706-1.481 1.559-1.481 2.315 0 .755.427 1.606 1.48 2.307h.002c1.226.82 2.887 1.254 4.588 1.254 1.7 0 3.362-.433 4.588-1.253 1.054-.706 1.482-1.56 1.482-2.316 0-.755-.427-1.606-1.48-2.307h-.002c-1.22-.815-2.879-1.246-4.58-1.246s-3.366.43-4.597 1.246zM17.638 13.835a.75.75 0 01.897-.567c.79.178 1.564.496 2.218.994.94.707 1.467 1.692 1.467 2.733 0 1.04-.526 2.026-1.467 2.732-.661.508-1.448.838-2.26 1.007a.75.75 0 01-.306-1.468c.626-.13 1.198-.38 1.656-.73l.007-.006c.617-.463.87-1.027.87-1.535s-.253-1.072-.87-1.535l-.005-.004c-.446-.34-1.01-.582-1.64-.724a.75.75 0 01-.567-.897z"
            fill="currentColor"
          />
        </svg>
      );
      break;
    case "setting":
      icon = (
        <svg
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 9.11v5.77C3 17 3 17 5 18.35l5.5 3.18c.83.48 2.18.48 3 0l5.5-3.18c2-1.35 2-1.35 2-3.46V9.11C21 7 21 7 19 5.65l-5.5-3.18c-.82-.48-2.17-.48-3 0L5 5.65C3 7 3 7 3 9.11z"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 15a3 3 0 100-6 3 3 0 000 6z"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
      break;
    default:
      break;
  }
  return (
    <li className=" text-gray-400  cursor-pointer transition-all duration-200 hover:text-indigo-500 " onClick={()=>showSetting(prev=>!prev)}>
      <p>{icon}</p>
    </li>
  );
};

export default SideMenuItem;
