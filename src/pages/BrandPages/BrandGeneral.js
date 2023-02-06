import React from "react";
import { GeneralBrand } from "../../components/Brand/GeneralBrand/GeneralBrand";
import { ListBrand } from "../../components/Brand/GeneralBrand/ListBrand/ListBrand";

export const BrandPages = () => {
  return (
    <div className=" w-screen bg-[#F2F6F9] p-10">
      <div className="flex flex-col space-y-9">
        <GeneralBrand />
        <ListBrand />
      </div>
    </div>
  );
};
