import React from "react";
import { useHandleChannel } from "../../app/hook/ChatHook";

export const ItemChat = () => {
  const handleChannel = useHandleChannel();
  return (
    <div className=" flex justify-between  p-4 w-full border min-w-[300px]">
      <div className="flex flex-row space-x-4">
        <img
          src={handleChannel.avatar}
          alt="avatar"
          className="w-[45px] h-[45px] rounded-full"
        ></img>
        <h1 className=" font-semibold">{handleChannel.name}</h1>
      </div>
    </div>
  );
};
