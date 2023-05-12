import React, { useEffect, useState } from "react";
import { Divider } from "@mui/material";
import { MessageListComponent } from "./MessageListComponent";
import SpeakerNotesOffIcon from "@mui/icons-material/SpeakerNotesOff";
import { useFetchChat, useHandleChannel } from "../../app/hook/ChatHook";
import { useUserID } from "../../app/hook/UserHook";
import { useSelector } from "react-redux";
import { ListChannel } from "./ListChannel";

export const ChatGeneral = () => {
  const userID = useUserID();
  const handleChannel = useHandleChannel();
  const wsEvent = useSelector((state) => state.webSocket.WSEvent);

  useFetchChat(userID, "limit=5", handleChannel.to_user_id, "", wsEvent);

  return (
    <div className="flex flex-row justify-between bg-white border space-x-2">
      <div className="py-5 flex flex-1 overflow-y-scroll w-[45%] max-w-[250px]">
        <ListChannel />
      </div>
      <Divider orientation="vertical" variant="middle" flexItem />
      {!handleChannel.to_user_id ? (
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
          <MessageListComponent data={handleChannel} />
        </div>
      )}
    </div>
  );
};
