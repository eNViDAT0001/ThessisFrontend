import React from "react";
import {
  useHandleChannel,
  useListMessageChatbot,
} from "../../app/hook/ChatHook";
import { useState } from "react";
import {
  dataChatBotGuide,
  dataChatBotRoot,
  guideContact,
  guideSellProduct,
} from "../../dummy_data/chatbot";
import { useUserDetail } from "../../app/hook/UserHook";
import { useEffect } from "react";
import { addEndInMessageChatBot } from "../../app/slices/ChatSlice";
import { useDispatch } from "react-redux";

export const MessageListChatBotCustom = () => {
  const handleChannel = useHandleChannel() || {};
  const userDetail = useUserDetail() || {};
  const [handleClick, setHandleClick] = useState({});
  const listMessageChatbot = useListMessageChatbot() || [];

  const dispatch = useDispatch();

  const handleClickBot = (data) => {
    const message = {
      type: "TEXT",
      text: data.textOption,
      position: "right",
    };
    dispatch(addEndInMessageChatBot(message));
    setHandleClick(data.data);
  };

  useEffect(() => {
    setHandleClick(dataChatBotRoot);
  }, []);

  useEffect(() => {
    if (handleClick) {
      const message = {
        type: handleClick.type,
        text: handleClick.textHelp,
        position: "left",
        option: handleClick.option,
      };
      dispatch(addEndInMessageChatBot(message));
    }
  }, [handleClick, dispatch]);

  return (
    <div className="flex flex-col space-y-2 h-full ">
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
                message.position === "left"
                  ? handleChannel.avatar
                  : userDetail.avatar
              }
              alt="avatar"
              className="w-[30px] h-[30px] rounded-full"
            ></img>
            <div
              className={` border max-w-[60%] rounded-xl px-3 py-1 ${
                message.position === "right" && "bg-[#0084FF] text-white"
              }`}
            >
              {message.type === "TEXT" ? (
                <h1 className=" max-w-[200px]">{message.text}</h1>
              ) : (
                <div className="space-y-4 flex flex-col max-w-[300px]">
                  <h1>{message.text}</h1>
                  {message.option &&
                    message.option.map((data) => (
                      <button
                        onClick={(e) => handleClickBot(data)}
                        className="border px-2 py-1 rounded-md shadow bg-slate-100"
                      >
                        <h1>{data.textOption}</h1>
                      </button>
                    ))}
                </div>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};
