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
import { useUnSeen } from "../../app/hook/NotificationHook";
import { checkNotLogin, checkObjectEmpty } from "../../app/hook/CommonHook";
import Cookies from "js-cookie";
import { useLoginGmail } from "../../app/hook/AuthHook";

export const Header = () => {
  const userID = useUserID();
  const userDetail = useUserDetail() || {};
  const unSeen = useUnSeen() || 0;
  const [showNotification, setShowNotification] = useState(false);
  const userIdCookies = Cookies.get("user_id");
  const access_token = Cookies.get("access_token");
  const access_token_expiry = Cookies.get("access_token_expiry");
  const refresh_token = Cookies.get("refresh_token");
  const refresh_token_expiry = Cookies.get("refresh_token_expiry");

  const handleMouseEnter = () => {
    setShowNotification(true);
  };

  const handleMouseLeave = () => {
    setShowNotification(false);
  };

  useLoginGmail(
    userIdCookies,
    access_token,
    access_token_expiry,
    refresh_token,
    refresh_token_expiry
  );

  return (
    <div className="w-full bg-[#151875] flex justify-center border-b">
      <div className="w-[80%] py-2">
        <div className="flex justify-between items-center">
          {!checkObjectEmpty(userDetail) && (
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
          )}
          <div className="flex flex-row space-x-4 items-center">
            <div className="relative h-[30px] visible">
              {!checkNotLogin() && (
                <Badge
                  badgeContent={unSeen}
                  color="primary"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <NotificationsIcon sx={{ color: "white" }} />
                </Badge>
              )}
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
            {!checkObjectEmpty(userDetail) && (
              <div className="flex flex-row space-x-5">
                {userDetail.type === "ADMIN" && (
                  <Link to={`admin/${userID}`} className="hover:cursor-pointer">
                    <AdminPanelSettingsIcon sx={{ color: "white" }} />
                  </Link>
                )}
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
            )}
          </div>
          {checkNotLogin() && (
            <div className="flex flex-row-reverse font-['Inter'] font-normal text-[#FFFFFF] text-sm uppercase">
              <Link to="/login">Login</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
