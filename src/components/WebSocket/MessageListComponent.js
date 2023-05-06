import React from "react";
import { MessageList } from "react-chat-elements";
import { Input } from "react-chat-elements";
import { ChatItem } from "react-chat-elements";
import { Button } from "react-chat-elements";

export const MessageListComponent = () => {
  return (
    <div className="w-full h-full flex flex-col justify-end">
      <ChatItem
        avatar="https://avatars.githubusercontent.com/u/80540635?v=4"
        alt="kursat_avatar"
        title="Kursat"
        date={new Date()}
        unread={0}
      />
      <MessageList
        className="message-list"
        lockable={true}
        toBottomHeight={"100%"}
        dataSource={[
          {
            position: "left",
            type: "text",
            title: "Kursat",
            text: "Give me a message list example !",
          },
          {
            position: "right",
            type: "text",
            title: "Emre",
            text: "That's all.",
          },
        ]}
      />
      <div className="mt-auto border pb-2 flex flex-row justify-between">
        <div className="w-full">
          <Input placeholder="Type here..." multiline={true} />
        </div>

        <Button
          text={"Send"}
          onClick={() => alert("Sending...")}
          title="Send"
        />
      </div>
    </div>
  );
};
