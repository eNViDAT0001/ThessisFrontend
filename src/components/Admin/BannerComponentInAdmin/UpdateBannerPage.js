import React from "react";
import { UpdateBanner } from "./UpdateBanner";
import { useParams } from "react-router-dom";
import {
  useBannerDetailInUpdate,
  useFetchInBannerUpdate,
  useFilterInProductInUpdateBanner,
  useFilterOutUpdateBanner,
} from "../../../app/hook/BannerHook";
import {
  checkObjectEmpty,
  convertObjectToStringQuery,
} from "../../../app/hook/CommonHook";
import { useEffect } from "react";

export const UpdateBannerPage = () => {
  const { id } = useParams();

  const bannerDetail = useBannerDetailInUpdate();
  const filterInsert = useFilterInProductInUpdateBanner();
  const filterRemove = useFilterOutUpdateBanner();


  useFetchInBannerUpdate(
    id,
    convertObjectToStringQuery(filterInsert),
    convertObjectToStringQuery(filterRemove)
  );

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
        {!checkObjectEmpty(bannerDetail) && <UpdateBanner id={id} />}
      </div>
    </div>
  );
};
