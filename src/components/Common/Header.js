import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export const Header = () => {
  return (
    <div className="w-full bg-[#081B15] flex justify-center">
      <div className="w-[80%] py-[30px]">
        <div className="flex justify-between items-center">
          <div className="font-['Inter'] font-bold text-[#FFFFFF] text-lg uppercase ">
            <div className="flex flex-row space-x-[30px]">
              <h1 className="hover:underline underline-offset-8 hover:cursor-pointer">
                Home
              </h1>
              <h1 className="hover:underline underline-offset-8 hover:cursor-pointer">
                Category
              </h1>
              <h1 className="hover:underline underline-offset-8 hover:cursor-pointer">
                Order
              </h1>
              <h1 className="hover:underline underline-offset-8 hover:cursor-pointer">
                Contact
              </h1>
            </div>
          </div>
          <div className="hover:cursor-pointer">
            <AccountCircleIcon   sx={{ color: "#FFFFFF", width:45, height: 45 }} />
          </div>
        </div>
      </div>
    </div>
  );
};
