import React, { useEffect, useState } from "react";
import ChatHeader from "../../Components/ChatHeader/ChatHeader";
import Message from "../../Components/Message/Message";
import ChatForm from "../../Components/ChatForm/ChatForm";
import { useParams } from "react-router-dom";

const Chat = ({ chat }) => {
  const [message, setMessage] = useState();

  const match = useParams();

  useEffect(() => {
    filterChat(match.id);
    console.log(message)
  }, [match.id]);

  const filterChat = (id) => {
    let findChat = chat.find((item) => item.id == id);

  
    setMessage(findChat);
  };

  return (
    <div className="bg-[url('../../../src/assets/images/bg-pattern.svg')] h-screen ">
      <ChatHeader info={message}/>
      <main className="flex flex-col justify-between h-full  overflow-hidden">
        <section className="h-[90%] overflow-y-auto px-5 flex flex-col gap-5 mt-1 mb-1.5">
          {message?.messages?.map((item) => (
            <Message key={item.messageId} from={item.from} {...item} />
          ))}
        </section>

        {/* FORM */}
        <ChatForm />
      </main>
    </div>
  );
};

export default Chat;
