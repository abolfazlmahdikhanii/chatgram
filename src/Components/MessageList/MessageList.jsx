import React from "react";
import Box from "../UI/Box/Box";
import MessageItem from "../Messageitem/MessageItem";

const MessageList = ({chats}) => {

  return (
    <Box style={"ml-3"}>
       <div className="py-1 px-2 mb-5">
        <h2 className="font-bold text-2xl text-white">Message</h2>
       </div>
      <div className="w-full overflow-hidden space-y-4 h-screen overflow-y-auto ">
    
        {
          chats.map((chat)=>(
            <MessageItem key={chat.id} {...chat} />
          ))
        }
    
      </div>
    </Box>
  );
};

export default MessageList;
