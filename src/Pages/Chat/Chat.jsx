import React from "react";
import ChatHeader from "../../Components/ChatHeader/ChatHeader";
import Message from "../../Components/Message/Message";
import ChatForm from "../../Components/ChatForm/ChatForm";

const Chat = () => {
  return (
    <div className="bg-[url('../../../src/assets/images/bg-pattern.svg')] h-screen ">
      <ChatHeader />
      <main className="flex flex-col justify-between h-full  overflow-hidden">
        <section className="h-[90%] overflow-y-auto px-5 flex flex-col gap-5 mt-1 mb-1.5">
            <Message from="user"/>
            <Message from="client"/>
            <Message from="client"/>
        </section>

        {/* FORM */}
        <ChatForm/>
      </main>
    </div>
  );
};

export default Chat;
