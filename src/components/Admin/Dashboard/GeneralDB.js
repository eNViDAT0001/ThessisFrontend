import React from "react";
import { checkObjectEmpty } from "../../../app/hook/CommonHook";
import { Divider } from "@mui/material";
import ReceiptIcon from "@mui/icons-material/Receipt";
import StorefrontIcon from "@mui/icons-material/Storefront";
import InventoryIcon from "@mui/icons-material/Inventory";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import { useReportAdmin } from "../../../app/hook/AdminHook";

export const GeneralDB = () => {
  const reportTab = useReportAdmin() || {};

  return (
    <div className="p-10">
      {!checkObjectEmpty(reportTab) && (
        <div className="space-y-4">
          <h1 className="text-lg font-bold">Dashboard</h1>
          <Divider />
          <div className="flex justify-center">
            <div className="flex flex-row w-full space-x-[10%]">
              <div className="w-[20%] h-[200px] border rounded-lg bg-[#F5C525] p-5 space-y-3">
                <div className="flex flex-row space-x-2 items-center">
                  <ReceiptIcon sx={{ color: "white" }} />
                  <h1 className="text-white text-2xl font-bold">Order</h1>
                </div>
                <div className=" bg-[#FFFFFF]">
                  <Divider />
                </div>
                <h1 className="text-white text-2xl font-bold items-center">
                  {reportTab.total_order}
                </h1>
              </div>
              <div className="w-[20%] h-[200px] border rounded-lg bg-[#FF9062] p-5 space-y-3">
                <div className="flex flex-row space-x-2 items-center">
                  <InventoryIcon sx={{ color: "white" }} />
                  <h1 className="text-white text-2xl font-bold">Product</h1>
                </div>
                <div className=" bg-[#FFFFFF]">
                  <Divider />
                </div>
                <h1 className="text-white text-2xl font-bold items-center">
                  {reportTab.total_product}
                </h1>
              </div>
              <div className="w-[20%] h-[200px] border rounded-lg bg-[#3ACBE8] p-5 space-y-3">
                <div className="flex flex-row space-x-2 items-center">
                  <StorefrontIcon sx={{ color: "white" }} />
                  <h1 className="text-white text-2xl font-bold">Provider</h1>
                </div>
                <div className=" bg-[#FFFFFF]">
                  <Divider />
                </div>
                <h1 className="text-white text-2xl font-bold items-center">
                  {reportTab.total_provider}
                </h1>
              </div>
              <div className="w-[20%] h-[200px] border rounded-lg bg-[#7C41F5] p-5 space-y-3">
                <div className="flex flex-row space-x-2 items-center">
                  <PermContactCalendarIcon sx={{ color: "white" }} />
                  <h1 className="text-white text-2xl font-bold">User</h1>
                </div>
                <div className=" bg-[#FFFFFF]">
                  <Divider />
                </div>
                <h1 className="text-white text-2xl font-bold items-center">
                  {reportTab.total_user}
                </h1>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
