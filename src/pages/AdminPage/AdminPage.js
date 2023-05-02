import React from "react";
import { Layout } from "../../components/Admin/Layout";
import { useUserDetail } from "../../app/hook/UserHook";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

export const AdminPage = () => {
  const userDetail = useUserDetail();

  
  return (
    <div className="flex flex-col font-['Josefin_Sans'] font-medium	 space-y-6">
      <div className=" flex flex-row px-6 py-2 space-x-6 items-end">
        <div className="flex flex-row justify-between px-5 w-full">
          <div className="flex flex-row items-center">
            <img
              src={userDetail.avatar}
              alt="avatar"
              className="w-[60px] h-[60px] rounded-full"
            ></img>
            <div className="flex flex-col">
              <h1 className="font-bold text-lg leading-30 tracking-wider text-black">
                {userDetail.name}
              </h1>
              <h1 className="text-[#8E8E93]">{userDetail.email}</h1>
            </div>
          </div>
        </div>
        <div>
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 400,
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search Here"
              inputProps={{ "aria-label": "search google maps" }}
            />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          </Paper>
        </div>
      </div>

      <div className="bg-[#F7F7F7] p-6">
        <Layout />
      </div>
    </div>
  );
};
