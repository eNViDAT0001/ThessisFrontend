import React from "react";
import { useListChannel } from "../../app/hook/ChatHook";
import { useDispatch } from "react-redux";
import { setHandleChannel } from "../../app/slices/ChatSlice";
import { truncateString } from "../../app/hook/CommonHook";

export const ListChannel = () => {
  const dispatch = useDispatch();
  const listChannel = useListChannel() || [];

  const handleClick = (data) => {
    dispatch(setHandleChannel(data));
  };
  return (
    <div className="flex flex-col">
      {listChannel.length !== 0 &&
        listChannel.map((data) => (
          <div
            onClick={(e) => handleClick(data)}
            key={data.channel_id}
            className=" mx-2 hover:bg-slate-100 hover:cursor-pointer"
          >
            <div className="flex flex-row items-center space-x-4">
              <img
                src={
                  data.avatar
                    ? data.avatar
                    : "https://cdn-icons-png.flaticon.com/512/61/61205.png"
                }
                alt="avatar"
                className="w-[40px] h-[40px] rounded-full"
              ></img>
              <div className="flex flex-col border-b py-2">
                <h1 className=" font-semibold">{data.name}</h1>
                {data.seen ? (
                  <h1 className=" text-[#000000] truncate">
                    {truncateString(data.content, 20)}
                  </h1>
                ) : (
                  <h1 className=" text-[#A9ACC6] truncate">
                    {truncateString(data.content, 20)}
                  </h1>
                )}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};
