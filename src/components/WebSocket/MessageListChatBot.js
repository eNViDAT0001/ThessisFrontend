import React, { useState } from "react";
import {
  sendChat,
  useHandleChannel,
  useMetaInListMessage,
} from "../../app/hook/ChatHook";
import { useUserID } from "../../app/hook/UserHook";
import { useDispatch } from "react-redux";
import { MessageListCustom } from "./MessageListCustom";
import { ItemChat } from "./ItemChat";
import { useRef } from "react";
import { setMarkerInFilterMessage } from "../../app/slices/QuerySlice";
import { memo } from "react";
import { MessageListChatBotCustom } from "./MessageListChatBotCustom";

export const MessageListChatBot = () => {
  const dispatch = useDispatch();
  const userID = useUserID();
  const [inputValue, setInputValue] = useState("");
  const metaInMessage = useMetaInListMessage();
  const messageListRef = useRef(null);
  const handleChannel = useHandleChannel();

  const handleChangeText = (e) => {};

  const handleScroll = (e) => {};

  const handleButtonSend = (e) => {};
  return (
    <div className="w-full flex flex-col justify-between h-[450px] min-w-[700px]">
      <div className="flex-grow">
        <div>
          <ItemChat />
        </div>
        <div
          className="h-[220px] overflow-y-scroll"
          onScroll={handleScroll}
          ref={messageListRef}
        >
          <MessageListChatBotCustom />
        </div>
      </div>

      <div className="flex flex-row justify-between mb-1">
        <div className="bg-white rounded-lg w-full h-full p-5 ">
          <form className="flex items-center flex-row space-x-5 ">
            <input
              type="text"
              onChange={handleChangeText}
              placeholder="Type your message..."
              className="flex-grow bg-gray-200 text-gray-700 rounded-md  p-2 overflow-y-scroll"
            />
            <button
              type="submit"
              onClick={handleButtonSend}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-md py-2 px-4 transition-colors duration-300 "
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
