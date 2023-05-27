import React from "react";
import {
  seenNotificationInAccount,
  useFetchNotification,
  useFilterNotification,
  useListNotification,
  useMetaInNotification,
} from "../../../app/hook/NotificationHook";
import { useUserID } from "../../../app/hook/UserHook";
import { useDispatch } from "react-redux";
import { setMarkerInFilterNotify } from "../../../app/slices/QuerySlice";
import {
  checkObjectEmpty,
  convertObjectToStringQuery,
} from "../../../app/hook/CommonHook";
import { Link } from "react-router-dom";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

export const ListNotifyInAccount = () => {
  const dispatch = useDispatch();
  const id = useUserID();
  const listNotification = useListNotification() || [];
  const filter = useFilterNotification() || {};
  const meta = useMetaInNotification();

  const handleShowMore = (e) => {
    dispatch(setMarkerInFilterNotify(meta.paging.Current));
  };

  const handleSetSeenNotify = (e) => {
    const notifyID = e.currentTarget.id;
    seenNotificationInAccount(notifyID, id);
  };
  useFetchNotification(id, convertObjectToStringQuery(filter));

  return (
    <div className="border bg-white w-full">
      {listNotification.length !== 0 && (
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
                  `}
                >
                  {notice.content}
                </h1>
              </div>
            </Link>
          ))}
        </div>
      )}
      {!checkObjectEmpty(meta) && (
        <div className="flex justify-center">
          <button
            className="text-blue-500 hover:text-blue-700 mb-4"
            onClick={handleShowMore}
          >
            <ArrowDownwardIcon />
          </button>
        </div>
      )}
    </div>
  );
};
