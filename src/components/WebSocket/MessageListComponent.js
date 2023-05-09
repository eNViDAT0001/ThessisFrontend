import React, { useState } from "react";
import { MessageList } from "react-chat-elements";
import { Input } from "react-chat-elements";
import { ChatItem } from "react-chat-elements";
import { Button } from "react-chat-elements";
import "react-chat-elements/dist/main.css";
import { sendChat, useListMessage } from "../../app/hook/ChatHook";
import { useUserID } from "../../app/hook/UserHook";

export const MessageListComponent = (props) => {
  const data = props.data;
  const userID = useUserID();
  const [inputValue, setInputValue] = useState("");

  const listMessage = useListMessage();

  const handleButtonSend = (e) => {
    if (inputValue !== "") {
      const body = {
        user_id: userID,
        to_user_id: data.user_id,
        content: inputValue,
        seen: false,
        type: "TEXT",
      };
      console.log(body);
      sendChat(body);
    }
  };

  const handleChangeText = (e) => {
    setInputValue(e.target.value);
  };
  return (
    <div className="w-full flex flex-col justify-between max-h-[300px]">
      <div className="">
        <div>
          <ChatItem
            avatar={data.avatar}
            alt="kursat_avatar"
            title={data.title}
          />
        </div>
      </div>
      <div className=" max-h-[100%] overflow-y-scroll">
        <MessageList
          className="message-list"
          lockable={true}
          toBottomHeight={"100%"}
          dataSource={listMessage}
        />
      </div>

      <div className=" border flex flex-row justify-between">
        <div className="w-full">
          <Input
            onChange={handleChangeText}
            placeholder="Type here..."
            multiline={true}
          />
        </div>
        <Button text={"Send"} onClick={handleButtonSend} title="Send" />
      </div>
    </div>
  );
};
