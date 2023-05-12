import React from "react";
import { useListMessage } from "../../app/hook/ChatHook";

export const MessageListCustom = () => {
  const listMessage = useListMessage() || [];
  return (
    <div className="flex flex-col space-y-2 h-full">
      {listMessage.length !== 0 &&
        listMessage.map((message) => (
          <div
            key={message.id}
            className={`px-2 flex space-x-2 ${
              message.position === "left" ? "flex-row" : "flex-row-reverse "
            }`}
          >
            <img src={message.avatar} alt="avatar" className="w-[30px] h-[30px] rounded-full"></img>
            <div className={` border max-w-[60%] rounded-xl px-3 py-1 ${message.position === "right" && "bg-[#0084FF] text-white"}` }>
              <h1 className=" ">{message.text}</h1>
            </div>
          </div>
        ))}
    </div>
  );
};
