import React from "react";
import { UpdateBanner } from "./UpdateBanner";
import { useParams } from "react-router-dom";
import { useBannerDetailInUpdate, useFetchInBannerUpdate, useFilterInProductInUpdateBanner } from "../../../app/hook/BannerHook";
import { checkObjectEmpty, convertObjectToStringQuery } from "../../../app/hook/CommonHook";

export const UpdateBannerPage = () => {
  const { id } = useParams();

  const bannerDetail = useBannerDetailInUpdate()
  const filter = useFilterInProductInUpdateBanner()
  console.log(bannerDetail)
  useFetchInBannerUpdate(id,convertObjectToStringQuery(filter));
  return (
    <div className="flex justify-center">
      <div className="w-[80%] my-10">
      <div className=" mb-10 flex flex-col justify-center items-center space-y-4">
          <h1 className=" text-2xl font-bold">Update Banner</h1>
          <h1 className=" text-sm text-[#9096B2]">
            Please fill out the information completely{" "}
          </h1>
        </div>
        <div className=""></div>
        {!checkObjectEmpty(bannerDetail)&&<UpdateBanner />}
      </div>
    </div>
  );
};
