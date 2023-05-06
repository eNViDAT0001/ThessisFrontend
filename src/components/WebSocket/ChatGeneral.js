import React from "react";
import { ChatList } from "react-chat-elements";
import "react-chat-elements/dist/main.css";
import { dataChatList } from "../../dummy_data/chatlist";
import { Divider } from "@mui/material";
import { MessageListComponent } from "./MessageListComponent";

export const ChatGeneral = () => {
  const chatlist = dataChatList;
  return (
    <div className="flex flex-row justify-between bg-white border space-x-2">
      <div className="py-5 w-[35%]">
        <ChatList className="chat-list" dataSource={chatlist} />
      </div>
      <Divider orientation="vertical" variant="middle" flexItem />
      <div className="flex-1">
        <MessageListComponent />
      </div>
    </div>
  );
};
