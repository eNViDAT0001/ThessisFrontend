import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";
import { useUserDetail, useUserID } from "../../app/hook/UserHook";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";
import { useState } from "react";
import { Notification } from "../WebSocket/Notification";
import { useNotificationSmall } from "../../app/hook/NotificationHook";

export const Header = () => {
  const userID = useUserID();
  const userDetail = useUserDetail();
  const listNotification = useNotificationSmall();
  const [showNotification, setShowNotification] = useState(false);

  const handleMouseEnter = () => {
    setShowNotification(true);
  };

  const handleMouseLeave = () => {
    setShowNotification(false);
  };

  return (
    <div className="w-full bg-[#151875] flex justify-center border-b">
      <div className="w-[80%] py-2">
        <div className="flex justify-between items-center">
          <div className="flex flex-row space-x-10 font-['Inter'] font-normal text-[#FFFFFF] text-sm uppercase ">
            <div className="flex flex-row space-x-2 items-center">
              <EmailIcon fontSize="small" />
              <h1 className="">{userDetail.email}</h1>
            </div>
            <div className="flex flex-row space-x-2 items-center">
              <LocalPhoneIcon fontSize="small" />
              <h1 className="">{userDetail.phone}</h1>
            </div>
          </div>
          <div className="flex flex-row space-x-4 items-center">
            <div className="relative h-[30px] visible">
              <Badge
                badgeContent={listNotification.length}
                color="primary"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <NotificationsIcon sx={{ color: "white" }} />
              </Badge>
              {showNotification && (
                <div
                  className="absolute z-10 w-[400px]"
                  style={{ top: "30px", left: "-300px" }}
                  onMouseEnter={() => setShowNotification(true)}
                  onMouseLeave={() => setShowNotification(false)}
                >
                  <Notification />
                </div>
              )}
            </div>
            <Link to={`admin/${userID}`} className="hover:cursor-pointer">
              <AdminPanelSettingsIcon sx={{ color: "white" }} />
            </Link>
            <Link
              to={`account-detail/${userID}`}
              className="hover:cursor-pointer"
            >
              {userDetail.avatar ? (
                <img
                  src={userDetail.avatar}
                  alt="avatar"
                  className="w-[30px] h-[30px] rounded-full"
                ></img>
              ) : (
                <AccountCircleIcon
                  sx={{ width: 30, height: 30, color: "white" }}
                />
              )}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
