import React, { useEffect, useState } from "react";
import ChatHeader from "../../Components/ChatHeader/ChatHeader";
import Message from "../../Components/Message/Message";
import ChatForm from "../../Components/ChatForm/ChatForm";
import { useParams } from "react-router-dom";
import Uploader from "../../Components/Uploader/Uploader";

const Chat = ({ chat, setChat }) => {
  const [message, setMessage] = useState();
  const [newChat, setNewChat] = useState([]);

  const match = useParams();

  useEffect(() => {
    filterChat(match.id);
  }, [match, chat, message]);

  const filterChat = (id) => {
    let findChat = chat.find((item) => item.id == id);

    setMessage(findChat);
  };

  const sendMessageHandler = (txt) => {
    const message = {
      messageId: crypto.randomUUID(),
      messageDis: txt,
      from: "client",
      to: "ab",
      date: new Date(),
      read: false,
      send: true,
    };
    const newChat = [...chat];

    const findedChat = newChat.find((item) => item.id == match?.id);
    findedChat.messages.push(message);

    setChat(newChat);
  };
  const removeMessageFile = (id) => {
  

    // const filterd = newChat?.messages
    //   ?.map((message) => message?.messageDis)
    //   .map((item) => item).filterd?.findIndex((item) => item?.id !== id);

    
  };

  return (
    <div className="bg-[url('../../../src/assets/images/bg-pattern.svg')] h-screen relative">
      <ChatHeader info={message} />
      <main className="flex flex-col justify-between h-full  overflow-hidden">
        <section className="h-[90%] overflow-y-auto px-5 flex flex-col gap-2.5 mt-1 mb-1.5 transition-all duration-200">
          {message?.messages?.map((item) => (
            <Message
              key={item.messageId}
              from={item.from}
              {...item}
              remove={removeMessageFile}
            />
          ))}
        </section>

        {/* FORM */}
        <ChatForm set={sendMessageHandler} />

        <Uploader />
      </main>
    </div>
  );
};

export default Chat;
