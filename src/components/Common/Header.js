import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";
import { useUserDetail } from "../../app/hook/UserHook";

export const Header = () => {
  const userID = localStorage.getItem("UserID")
  const userDetail = useUserDetail()

  
  return (
    <div className="w-full bg-[#081B15] flex justify-center border-b">
      <div className="w-[80%] py-[10px]">
        <div className="flex justify-between items-center">
          <div className="font-['Inter'] font-normal text-[#FFFFFF] text-sm uppercase ">
            <div className="flex flex-row space-x-[30px]">
              <h1 className="">
                HomePage
              </h1>
            
            </div>
          </div>
          <Link to={`account-detail/${userID}`} className="hover:cursor-pointer">
          {(userDetail.avatar) ? (
          <img
            src={userDetail.avatar}
            alt="avatar"
            className="w-[30px] h-[30px] rounded-full"
          ></img>
        ) : (
          <AccountCircleIcon sx={{ width: 30, height: 30 }} />
        )}
          </Link>
        </div>
      </div>
    </div>
  );
};
