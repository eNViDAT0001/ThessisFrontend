import React from "react";
import { ListNotifyInAccount } from "./ListNotifyInAccount";

export const NotificationInAccount = (props) => {
  return (
    <div className="p-10 w-full space-y-5">
      <div className="flex justify-between">
        <h1 className="ml-4 text-xl text-[#1D3178] font-semibold">
          Notification
        </h1>
      </div>
      <ListNotifyInAccount id={props.id} />
    </div>
  );
};
