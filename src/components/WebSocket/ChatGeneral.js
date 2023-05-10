import React, { useEffect, useState } from "react";
import { ChatList } from "react-chat-elements";
import "react-chat-elements/dist/main.css";
import { Divider } from "@mui/material";
import { MessageListComponent } from "./MessageListComponent";
import SpeakerNotesOffIcon from "@mui/icons-material/SpeakerNotesOff";
import { useFetchChat, useListChannel } from "../../app/hook/ChatHook";
import { useUserID } from "../../app/hook/UserHook";
import { useSelector } from "react-redux";

export const ChatGeneral = () => {
  const userID = useUserID();
  const [toUserID, setToUserID] = useState(null);
  const [dataChat, setDataChat] = useState(null);
  const chatList = useListChannel();
  const wsEvent = useSelector((state) => state.webSocket.WSEvent);

  useFetchChat(userID, "limit=5", toUserID, "", wsEvent,dataChat);

  const handleSetUserID = (e) => {
    setToUserID(e.user_id);
    setDataChat(e);
  };

  return (
    <div className="flex flex-row justify-between bg-white border space-x-2">
      <div className="py-5 flex flex-1 overflow-y-scroll w-[45%]">
        <ChatList
          className="chat-list"
          dataSource={chatList}
          onClick={handleSetUserID}
        />
      </div>
      <Divider orientation="vertical" variant="middle" flexItem />
      {!toUserID ? (
        <div className="flex-1 flex w-[55%] h-full">
          <div className="flex justify-center items-center w-full h-full">
            <div className="flex justify-center items-center">
              <div>
                <SpeakerNotesOffIcon />
              </div>
              <h1>You don't have any message</h1>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex w-[55%]">
          <MessageListComponent data={dataChat} />
        </div>
      )}
    </div>
  );
};
