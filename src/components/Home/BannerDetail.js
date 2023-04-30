import React from "react";
import { useBannerDetail } from "../../app/hook/BannerHook";
import { checkObjectEmpty } from "../../app/hook/CommonHook";

export const BannerDetail = () => {
  const bannerDetail = useBannerDetail() || {};
  return (
    <div>
      {!checkObjectEmpty(bannerDetail) && (
        <div>
          <div className="flex justify-center items-center px-[15%] border hover:shadow-md ">
            <div className="w-full h-full skew-y-3 md:transform-none">
              <img src={bannerDetail.image} alt="anh san pham"></img>
            </div>
          </div>
          <div>
            {bannerDetail.products.length !== 0 && (
              <div>
                {bannerDetail.products.map((data) => (
                  <div key={data.id}>
                    <h1>{data.name}</h1>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
