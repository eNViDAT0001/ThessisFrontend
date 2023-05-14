import React from "react";
import { Link } from "react-router-dom";
import {
  useFetchNotificationSmall,
  useNotificationSmall,
} from "../../app/hook/NotificationHook";
import { useUserID } from "../../app/hook/UserHook";
import { useSelector } from "react-redux";

export const Notification = () => {
  const handleMouseEnter = (e) => {
    e.stopPropagation();
  };
  const id = useUserID();
  const listNotification = useNotificationSmall();
  const wsEvent = useSelector((state) => state.webSocket.WSEvent);

  const handleShowMore = (e) => {
    window.location.replace(`/user/notification/${id}`)
  };
  useFetchNotificationSmall(id, wsEvent);
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
      <div className="flex justify-center">
        <button
          className="text-blue-500 hover:text-blue-700"
          onClick={handleShowMore}
        >
          Next
        </button>
      </div>
    </div>
  );
};
