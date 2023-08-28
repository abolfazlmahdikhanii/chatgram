import React, { useState } from "react";
import SideMenu from "../SideMenu/SideMenu";
import MessageList from "../MessageList/MessageList";
import Chat from "../../Pages/Chat/Chat";
import ChatInfo from "../ChatInfo/ChatInfo";
import { Route, Routes } from "react-router-dom";

const Layout = () => {
  const [chats, setChats] = useState([
    {
      id: 1,
      userName: "Abolfazl",
      profileImg: "https://imgv3.fotor.com/images/gallery/Realistic-Male-Profile-Picture.jpg",
      messages: [
        {
          messageId: 1,
          messageDis: "test",
          from: "user",
          to: "ab",
          date: new Date(),
          read: false,
          send: true,
        },
      ],
    },
    {
      id: 2,
      userName: "lorem23",
      profileImg: "https://images.nightcafe.studio/jobs/X0DIQhUI5yfPMmykyDSi/X0DIQhUI5yfPMmykyDSi--4--a0vw0.jpg?tr=w-1600,c-at_max",
      messages: [
        {
          messageId: 1,
          messageDis: "test222222",
          from: "ab",
          to: "user",
          date: new Date(),
          read: false,
          send: true,
        },
      ],
    },
  ]);
  return (
    <div className="grid-cols-[95px_340px,1fr_280px] h-screen grid  overflow-hidden">
      <SideMenu />
      <MessageList chats={chats}/>
      <Routes>
        <Route path="/chat/:id" element={<Chat />} />
      </Routes>

      <ChatInfo />

    </div>
  );
};

export default Layout;
