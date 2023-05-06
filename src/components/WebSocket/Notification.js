import React from "react";
import { notification } from "../../dummy_data/notification";
import { Link } from "react-router-dom";

export const Notification = () => {
  const handleMouseEnter = (e) => {
    e.stopPropagation();
  };
  const listNotification = notification;
  return (
    <div onMouseEnter={handleMouseEnter} className="border bg-white w-full">
      {listNotification.length !== 0 && (
        <div className="px-5 py-4">
          {listNotification.map((notice) => (
            <Link
              to={notice.url}
              key={notice.id}
              className="flex flex-row border-b items-center hover:bg-slate-200 space-x-3"
            >
              <img
                src={notice.img}
                alt="img"
                className="w-[55px] h-[55px] rounded-full"
              ></img>
              <div className="flex flex-col">
                <h1 className="text-[#151875] text-lg font-semibold">
                  {notice.title}
                </h1>
                <h1 className="text-[#9295AA]">{notice.description}</h1>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
