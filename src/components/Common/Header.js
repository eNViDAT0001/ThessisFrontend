import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export const Header = () => {
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
          <div className="hover:cursor-pointer">
            <AccountCircleIcon   sx={{ color: "#FFFFFF", width:30, height: 30 }} />
          </div>
        </div>
      </div>
    </div>
  );
};
