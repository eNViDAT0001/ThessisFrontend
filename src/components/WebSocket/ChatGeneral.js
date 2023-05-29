import React from "react";
import { Divider } from "@mui/material";
import { MessageListComponent } from "./MessageListComponent";
import SpeakerNotesOffIcon from "@mui/icons-material/SpeakerNotesOff";
import {
  useFetchChat,
  useFilterChannel,
  useFilterMessage,
  useHandleChannel,
} from "../../app/hook/ChatHook";
import { useUserID } from "../../app/hook/UserHook";
import { useSelector } from "react-redux";
import { ListChannel } from "./ListChannel";
import { convertObjectToStringQuery } from "../../app/hook/CommonHook";

export const ChatGeneral = () => {
  const userID = useUserID();
  const handleChannel = useHandleChannel();
  const filterChannel = useFilterChannel();
  const filterMessage = useFilterMessage();
  const wsEvent = useSelector((state) => state.webSocket.WSEvent);

  const handleChangeSearch = (e) => {};

  useFetchChat(
    userID,
    convertObjectToStringQuery(filterChannel),
    convertObjectToStringQuery(filterMessage),
    wsEvent,
    handleChannel
  );
  return (
    <div className="flex flex-row justify-between bg-white border space-x-2">
      <div className="py-5 flex flex-auto flex-col max-w-[250px]  ">
        <div className="pb-4 px-4 space-y-4 ">
          <h1 className="text-lg font-bold">Chat</h1>
          <input
            type="text"
            className="w-full py-2 px-2 border border-gray-300 rounded-full shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search channel..."
            onChange={handleChangeSearch}
          />
        </div>
        <Divider />

        <ListChannel />
      </div>
      <Divider orientation="vertical" variant="middle" flexItem />
      <div className="flex-auto flex w-[55%] justify-center items-center">
        {!handleChannel.to_user_id ? (
          <div className="flex justify-center items-center">
            <div>
              <SpeakerNotesOffIcon />
            </div>
            <h1>You don't have any message</h1>
          </div>
        ) : (
          <MessageListComponent data={handleChannel} />
        )}
      </div>
    </div>
  );
};
