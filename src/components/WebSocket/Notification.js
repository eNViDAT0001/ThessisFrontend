import React from "react";
import { notification } from "../../dummy_data/notification";
import { Link } from "react-router-dom";
import {
  useFetchNotification,
  useListNotification,
} from "../../app/hook/NotificationHook";
import { useUserID } from "../../app/hook/UserHook";

export const Notification = () => {
  const handleMouseEnter = (e) => {
    e.stopPropagation();
  };
  const id = useUserID();
  const listNotification = useListNotification();

  useFetchNotification(id, "limit=5");
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
              {notice.img && (
                <img
                  src={notice.img}
                  alt="img"
                  className="w-[55px] h-[55px] rounded-full"
                ></img>
              )}
              <div className="flex flex-col my-5">
                <h1 className="text-[#9295AA]">{notice.content}</h1>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
