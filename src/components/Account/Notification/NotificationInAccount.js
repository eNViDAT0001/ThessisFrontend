import React from "react";
import { ListNotifyInAccount } from "./ListNotifyInAccount";
import { Button } from "@mui/material";
import { ToastContainer } from "react-toastify";
import { seenAllNotificationInAccount } from "../../../app/hook/NotificationHook";
import { useUserID } from "../../../app/hook/UserHook";

export const NotificationInAccount = (props) => {
  const userID = useUserID();
  const handleButtonSeenAll = (e) => {
    seenAllNotificationInAccount(userID);
  };
  return (
    <div className="p-10 w-full space-y-5">
      <div className="flex justify-between">
        <ToastContainer position="top-right" newestOnTop />
        <h1 className="ml-4 text-xl text-[#1D3178] font-semibold">
          Notification
        </h1>
        <Button variant="contained" onClick={handleButtonSeenAll}>
          Seen all
        </Button>
      </div>
      <ListNotifyInAccount id={props.id} />
    </div>
  );
};
