import React from "react";
import { Link } from "react-router-dom";
import {
  seenNotification,
  useFetchNotificationSmall,
  useNotificationSmall,
} from "../../app/hook/NotificationHook";
import { useUserID } from "../../app/hook/UserHook";
import { useDispatch, useSelector } from "react-redux";
import { setListNotificationSmall } from "../../app/slices/NotificationSlice";
import { truncateString } from "../../app/hook/CommonHook";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

export const Notification = () => {
  const handleMouseEnter = (e) => {
    e.stopPropagation();
  };
  const id = useUserID();
  const dispatch = useDispatch();
  const listNotification = useNotificationSmall() || [];
  const wsEvent = useSelector((state) => state.webSocket.WSEvent);

  const handleShowMore = (e) => {
    window.location.replace(`/user/notification/${id}`);
  };

  const handleSetSeenNotify = async (e) => {
    const notifyID = e.currentTarget.id;
    const newNotify = await seenNotification(listNotification, notifyID, id);
    dispatch(setListNotificationSmall(newNotify));
  };

  useFetchNotificationSmall(id, wsEvent);
  return (
    <div onMouseEnter={handleMouseEnter} className="border bg-white w-full">
      {listNotification.length !== 0 ? (
        <div className="px-5 py-4">
          {listNotification.map((notice) => (
            <Link
              to={notice.url}
              key={notice.id}
              id={notice.id}
              className={`flex flex-row border-b items-center ${
                !notice.seen ? " bg-[#FFF0DC]" : "hover:bg-slate-200"
              } space-x-3 px-5`}
              onClick={handleSetSeenNotify}
            >
              {notice.image && (
                <img
                  src={notice.image}
                  alt="img"
                  className="w-[55px] h-[55px] rounded-full border-[#000000]"
                ></img>
              )}
              <div className="flex flex-col my-5">
                <h1>{notice.title}</h1>
                <h1
                  className={`
                    text-[#9295AA]
                   truncate`}
                >
                  {truncateString(notice.content, 30)}
                </h1>
              </div>
            </Link>
          ))}
          <div className="flex justify-center">
            <button
              className="text-blue-500 hover:text-blue-700 mb-4"
              onClick={handleShowMore}
            >
              <ArrowDownwardIcon />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-center px-4 py-2">
          You Don't have notification
        </div>
      )}
    </div>
  );
};
