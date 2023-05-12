import React, { useState } from "react";
import { Input } from "react-chat-elements";
import { Button } from "react-chat-elements";
import "react-chat-elements/dist/main.css";
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

export const MessageListComponent = (props) => {
  const dispatch = useDispatch();
  const userID = useUserID();
  const [inputValue, setInputValue] = useState("");
  const metaInMessage = useMetaInListMessage();
  const messageListRef = useRef(null);
  const handleChannel = useHandleChannel();

  const handleButtonSend = (e) => {
    if (inputValue !== "") {
      const body = {
        user_id: userID,
        to_user_id: parseInt(handleChannel.to_user_id),
        content: inputValue,
        seen: false,
        type: "TEXT",
      };
      dispatch(sendChat(body));
    }
  };

  const handleScroll = () => {
    if (messageListRef.current.scrollTop === 0) {
      dispatch(setMarkerInFilterMessage(metaInMessage.paging.Current));
    }
  };

  const handleChangeText = (e) => {
    setInputValue(e.target.value);
  };
  return (
    <div className="w-full flex flex-col justify-between max-h-[300px]">
      <div className="flex-grow">
        <div>
          <ItemChat />
        </div>
        <div
          className="h-[245px] overflow-y-scroll"
          onScroll={handleScroll}
          ref={messageListRef}
        >
          <MessageListCustom />
        </div>
      </div>

      <div className="border flex flex-row justify-between">
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
