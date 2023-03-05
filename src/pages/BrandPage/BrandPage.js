import React from "react";
import { GeneralBrand } from "../../components/Brand/General/GeneralBrand";
import { BrandContain } from "../../components/Brand/General/ListBrand/BrandContain";
export const BrandPage = () => {
  return (
    <div className=" w-screen bg-[#F2F6F9] p-10">
      <div className="flex flex-col space-y-9">
        <GeneralBrand />
        <BrandContain />
      </div>
    </div>
  );
};