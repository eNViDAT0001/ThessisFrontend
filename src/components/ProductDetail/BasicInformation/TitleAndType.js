import React from "react";
import { Divider } from "@mui/material";
import { useProductDetail } from "../../../app/hook/ProductHook";

export const TitleAndType = (props) => {
  const productDetail = useProductDetail();
  
  
  return (
    <div className="flex flex-col space-y-2">
      <h1 className="text-3xl text-[#0D134E] font-bold ">
        {productDetail.name}
      </h1>
      <div className="flex flex-row space-x-3">
        <div className=" flex flex-row space-x-2 items-center">
          <h1 className=" underline">0</h1>
          <h1 className=" text-[#767676] hover:underline hover:cursor-pointer">
            Reviewed
          </h1>
        </div>
        <Divider orientation="vertical" flexItem />
      </div>
    </div>
  );
};
