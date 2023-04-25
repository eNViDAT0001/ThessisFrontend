import React from "react";
import { Layout } from "../../components/Admin/Layout";
import { useUserDetail } from "../../app/hook/UserHook";

export const AdminPage = () => {
  const userDetail = useUserDetail();
  return (
    <div className="flex flex-col font-['Josefin_Sans'] font-medium	 space-y-6">
      <div className=" flex flex-row px-6 py-2 space-x-6 items-end">
        <div className="flex flex-row">
          <img
            src={userDetail.avatar}
            alt="avatar"
            className="w-[60px] h-[60px] rounded-full"
          ></img>
        </div>
        <div className="flex flex-col">
          <h1 className="font-bold text-lg leading-30 tracking-wider text-black">
            {userDetail.name}
          </h1>
          <h1 className="text-[#8E8E93]">{userDetail.email}</h1>
        </div>
      </div>
      <div className="bg-[#F7F7F7] p-6">
        <Layout />
      </div>
    </div>
  );
};