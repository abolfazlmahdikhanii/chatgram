import React from "react";
import Box from "../UI/Box/Box";
import MessageItem from "../Messageitem/MessageItem";

const MessageList = () => {
  return (
    <Box style={"ml-3"}>
       <div className="py-1 px-2 mb-5">
        <h2 className="font-bold text-2xl text-white">Message</h2>
       </div>
      <ul className="w-full overflow-hidden space-y-4 h-screen overflow-y-auto ">
        <MessageItem />
        <MessageItem />
        <MessageItem />
        <MessageItem />
    
      </ul>
    </Box>
  );
};

export default MessageList;
