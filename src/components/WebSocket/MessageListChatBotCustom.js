import React from "react";
import { useListMessageChatbot } from "../../app/hook/ChatHook";

export const MessageListChatBotCustom = () => {
  const listMessageChatbot = useListMessageChatbot() || [];
  return (
    <div className="flex flex-col space-y-2 h-full">
      {listMessageChatbot.length !== 0 &&
        listMessageChatbot.map((message) => (
          <div
            key={message.id}
            className={`px-2 flex space-x-2 ${
              message.position === "left" ? "flex-row" : "flex-row-reverse "
            }`}
          >
            <img
              src={
                message.avatar
                  ? message.avatar
                  : "https://cdn-icons-png.flaticon.com/512/61/61205.png"
              }
              alt="avatar"
              className="w-[30px] h-[30px] rounded-full"
            ></img>
            <div
              className={` border max-w-[60%] rounded-xl px-3 py-1 ${
                message.position === "right" && "bg-[#0084FF] text-white"
              }`}
            >
              <h1 className=" ">{message.text}</h1>
            </div>
          </div>
        ))}
    </div>
  );
};
