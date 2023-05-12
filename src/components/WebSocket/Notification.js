import React from "react";
import { notification } from "../../dummy_data/notification";
import { Link } from "react-router-dom";
import {
  useFetchNotification,
  useFilterNotification,
  useListNotification,
  useMetaInNotification,
} from "../../app/hook/NotificationHook";
import { useUserID } from "../../app/hook/UserHook";
import { useDispatch, useSelector } from "react-redux";
import {
  checkObjectEmpty,
  convertObjectToStringQuery,
} from "../../app/hook/CommonHook";
import { setMarkerInFilterNotify } from "../../app/slices/QuerySlice";

export const Notification = () => {
  const handleMouseEnter = (e) => {
    e.stopPropagation();
  };
  const id = useUserID();
  const dispatch = useDispatch();
  const listNotification = useListNotification();
  const filter = useFilterNotification();
  const meta = useMetaInNotification();
  const wsEvent = useSelector((state) => state.webSocket.WSEvent);

  const handleShowMore = (e) => {
    dispatch(setMarkerInFilterNotify(meta.paging.Current));
  };
  useFetchNotification(id, convertObjectToStringQuery(filter), wsEvent);
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
      {!checkObjectEmpty(meta) && (
        <div className="flex justify-center">
          <button
            className="text-blue-500 hover:text-blue-700"
            onClick={handleShowMore}
            disabled={meta.paging.Count - meta.paging.Perpage < 0}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};
