import React from "react";
import { Divider } from "@mui/material";
import InventoryIcon from "@mui/icons-material/Inventory";
import { TotalProduct } from "./TotalProduct";
import { TotalOrder } from "./TotalOrder";
import { TotalRevenue } from "./TotalRevenue";
import { useBrandDetail } from "../../../../app/hook/BrandHook";

export const GeneralBrandDetail = (props) => {
  const brandDetail = useBrandDetail() || {};
  return (
    <div className="flex justify-center">
      <div className="w-[80%] min-h-[200px] bg-white shadow-lg rounded-2xl p-5 font-[Inter]">
        <div className="flex flex-row items-center space-x-2">
          <InventoryIcon sx={{ width: 20, height: 20 }} />
          <h1 className=" text-2xl font-bold">
            General Information Detail Brand
          </h1>
        </div>
        <div className="my-2">
          <Divider />
        </div>
        <div className="flex flex-row justify-around flex-wrap">
          <TotalProduct id={props.id} />
          <TotalOrder order={brandDetail.total_orders} />
          <TotalRevenue revenue={brandDetail.revenue}/>
        </div>
        <div className="my-5">
          <Divider />
        </div>
      </div>
    </div>
  );
};
