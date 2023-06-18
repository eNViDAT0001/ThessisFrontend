import React from "react";
import {
  useFetchListBrand,
  useFilterInListBrand,
} from "../../app/hook/BrandHook";
import { GeneralBrand } from "../../components/Brand/General/GeneralBrand";
import { BrandContain } from "../../components/Brand/General/ListBrand/BrandContain";
import { useUserDetail, useUserID } from "../../app/hook/UserHook";
import { convertObjectToStringQuery } from "../../app/hook/CommonHook";
import { redirect } from "react-router-dom";
export const BrandPage = () => {
  const userID = useUserID();
  const userDetail = useUserDetail();
  const filterBrand = useFilterInListBrand();

  useFetchListBrand(userID, convertObjectToStringQuery(filterBrand));

  return (
    <div className=" w-screen bg-[#F2F6F9] p-10">
      <div className="flex flex-col space-y-9">
        <GeneralBrand />
        <BrandContain />
      </div>
    </div>
  );
};
