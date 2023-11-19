import React from "react";
import Box from "../UI/Box/Box";
import MessageItem from "../Messageitem/MessageItem";

const MessageList = ({chats}) => {

 

  return (
    <Box style={"ml-3"}>
       <div className="py-1 px-2 mb-5">
        <h2 className="font-bold text-2xl text-white">Message</h2>
       </div>
      <div className="w-full overflow-hidden space-y-2 h-screen overflow-y-auto ">
    
        {
          chats?.map((chat)=>(
            <MessageItem key={chat.id} {...chat} isSave={chat.relation==="me"?true:false}/>
          ))
        }
    
      </div>
    </Box>
  );
};

export default MessageList;
