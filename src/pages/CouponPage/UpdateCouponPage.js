import React from "react";
import { useParams } from "react-router-dom";
import { UpdateCoupon } from "./UpdateCoupon";

export const UpdateCouponPage = () => {
  const { id } = useParams();

  // const bannerDetail = useBannerDetailInUpdate();
  // const filterInsert = useFilterInProductInUpdateBanner();
  // const filterRemove = useFilterOutUpdateBanner();

  // useFetchInBannerUpdate(
  //   id,
  //   convertObjectToStringQuery(filterInsert),
  //   convertObjectToStringQuery(filterRemove)
  // );

  return (
    <div className="flex justify-center">
      <div className="w-[80%] my-10">
        <div className=" mb-10 flex flex-col justify-center items-center space-y-4">
          <h1 className=" text-2xl font-bold">Update Coupon</h1>
          <h1 className=" text-sm text-[#9096B2]">
            Please fill out the information completely{" "}
          </h1>
        </div>
        <div className=""></div>
        <UpdateCoupon id={id} />
        {/* {!checkObjectEmpty(bannerDetail) && <UpdateBanner id={id} />} */}
      </div>
    </div>
  );
};
