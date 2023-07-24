import React from "react";
import {
  useFetchListBrand,
  useFilterInListBrand,
} from "../../app/hook/BrandHook";
import { GeneralBrand } from "../../components/Brand/General/GeneralBrand";
import { BrandContain } from "../../components/Brand/General/ListBrand/BrandContain";
import { useUserID } from "../../app/hook/UserHook";
import { convertObjectToStringQuery } from "../../app/hook/CommonHook";
import { CouponInBrand } from "../../components/Brand/General/Coupon/CouponInBrand";
import { useFilterCouponInBrand } from "../../app/hook/CouponHook";
export const BrandPage = () => {
  const userID = useUserID();
  const filterBrand = useFilterInListBrand();
  const filterCoupon = useFilterCouponInBrand();
  useFetchListBrand(
    userID,
    convertObjectToStringQuery(filterBrand),
    convertObjectToStringQuery(filterCoupon)
  );

  return (
    <div className=" w-screen bg-[#F2F6F9] p-10">
      <div className="flex flex-col space-y-9">
        <GeneralBrand />
        <CouponInBrand />
        <BrandContain />
      </div>
    </div>
  );
};
