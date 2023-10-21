import React, { useEffect, useState } from "react";
import ChatHeader from "../../Components/ChatHeader/ChatHeader";
import Message from "../../Components/Message/Message";
import ChatForm from "../../Components/ChatForm/ChatForm";
import { useParams } from "react-router-dom";
import Uploader from "../../Components/Uploader/Uploader";
import MessageMenu from "../../Components/UI/MessageMenu/MessageMenu";
import CheckMessageBox from "../../Components/CheckMessageBox/CheckMessageBox";

const Chat = ({ chat, setChat }) => {
  const [message, setMessage] = useState();
  const [pageX, setPageX] = useState(null);
  const [pageY, setPageY] = useState(null);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [messageID, setMessageID] = useState(null);
  const [checkMessage, setCheckMessage] = useState([]);

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
    console.log(id);
    const newChat = [...chat];

    const findedChat = newChat.find((item) => item.id == match?.id);
    const newMessge = findedChat?.messages;
    const findMessage = newMessge?.map((item) => item?.messageDis);

    let index = null;

    for (const item of findMessage) {
      for (const val of item) {
        if (val.id === id) {
          index = item.indexOf(val);
          item.splice(index, 1);
        }
      }
    }

    findedChat.messages = newMessge.filter(
      (item) => item.messageDis.length !== 0
    );

    findedChat.messages.messageDis = findMessage;
    setChat(newChat);
  };

  const contextmenuHandler = (e, id) => {
    e.preventDefault();
    setShowContextMenu((prev) => !prev);
    setPageX(e.pageX);
    setPageY(e.pageY);

    setMessageID(id);
  };
  const checkMessageHandler = (id, check) => {
    const newMessage = [...message?.messages];
    const findCheck = newMessage.find((item) => item.messageId === id);

    setCheckMessage((prev) => [...prev, findCheck]);
    if (!check) {
      
    
    
      const filterCheck = checkMessage.filter((item) => item.messageId !== id);
    
      setCheckMessage(filterCheck)
    }
  };
  return (
    <div
      className="bg-[url('../../../src/assets/images/bg-pattern.svg')] h-screen relative overflow-hidden"
      onContextMenu={(e) => e.preventDefault()}
    >
      <ChatHeader info={message} />
      <main className="flex flex-col justify-between h-screen  overflow-hidden">
        <section
          className=".
        h-[90%] overflow-y-auto  flex flex-col  mt-1 mb-1.5 transition-all duration-200"
        >
          {message?.messages?.messageDis !== null &&
            message?.messages?.map((item) => (
              <Message
                key={item.messageId}
                from={item.from}
                {...item}
                remove={removeMessageFile}
                setCheckMessage={setCheckMessage}
                onContext={contextmenuHandler}
                onCheck={checkMessageHandler}
              />
            ))}
        </section>

        {/* FORM */}
        {
          !checkMessage.length? 
          (
          <ChatForm set={sendMessageHandler} />
          )
          :
          (
            <CheckMessageBox 
            checkMessage={checkMessage}
            setCheckMessage={setCheckMessage}
            />
          )
        }
        {/* menu */}
        <MessageMenu
          pageX={pageX}
          pageY={pageY}
          show={showContextMenu}
          setClose={setShowContextMenu}
          onRemove={removeMessageFile}
          messageID={messageID}
        />
        <Uploader />

      </main>
    </div>
  );
};

export default Chat;
