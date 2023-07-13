import React from "react";
import { Divider } from "@mui/material";
import InventoryIcon from "@mui/icons-material/Inventory";
import { TotalBrand } from "./TotalBrand";
import { useLanguage } from "../../../app/hook/LanguageHook";

export const GeneralBrand = () => {
  const language = useLanguage();

  return (
    <div className="flex justify-center">
      <div className="w-[80%] min-h-[200px] bg-white shadow-lg rounded-2xl p-5 font-['Josefin_Sans']">
        <div className="flex flex-row items-center space-x-2">
          <InventoryIcon sx={{ width: 20, height: 20 }} />
          <h1 className=" text-2xl font-bold">
            {language ? "Thông tin chung" : "General Information"}
          </h1>
        </div>
        <div className="my-2">
          <Divider />
        </div>
        <div className="flex flex-row justify-start flex-wrap px-10">
          <TotalBrand />
        </div>
        <div className="my-5">
          <Divider />
        </div>
      </div>
    </div>
  );
};
