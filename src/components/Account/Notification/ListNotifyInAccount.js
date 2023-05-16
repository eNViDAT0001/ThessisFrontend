import React from "react";
import {
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

export const ListNotifyInAccount = () => {
  const dispatch = useDispatch();
  const id = useUserID();
  const listNotification = useListNotification();
  const filter = useFilterNotification();
  const meta = useMetaInNotification();

  const handleShowMore = (e) => {
    dispatch(setMarkerInFilterNotify(meta.paging.Current));
  };
  console.log(listNotification);
  useFetchNotification(id, convertObjectToStringQuery(filter));

  return (
    <div className="border bg-white w-full">
      {listNotification.length !== 0 && (
        <div className="px-5 py-4">
          {listNotification.map((notice) => (
            <Link
              to={notice.url}
              key={notice.id}
              className={`flex flex-row border-b items-center ${
                notice.seen ? " bg-slate-200" : "hover:bg-slate-200"
              } space-x-3 border-[#000000]`}
            >
              {notice.img && (
                <img
                  src={notice.img}
                  alt="img"
                  className="w-[55px] h-[55px] rounded-full"
                ></img>
              )}
              <div className="flex flex-col my-5">
                <h1
                  className={`${
                    notice.seen ? "text-[#000000]" : "text-[#9295AA]"
                  }`}
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
