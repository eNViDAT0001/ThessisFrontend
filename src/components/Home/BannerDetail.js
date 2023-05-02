import React from "react";
import {
  useBannerDetail,
  useProductInBannerDetail,
} from "../../app/hook/BannerHook";
import { checkObjectEmpty, currencyFormat } from "../../app/hook/CommonHook";
import { Link } from "react-router-dom";

export const BannerDetail = () => {
  const bannerDetail = useBannerDetail() || {};
  const listProducts = useProductInBannerDetail() || [];
  
  return (
    <div>
      {!checkObjectEmpty(bannerDetail) && (
        <div>
          <div className="flex justify-center items-center px-[15%] border hover:shadow-md ">
            <div className="w-full h-full skew-y-3 md:transform-none">
              <img src={bannerDetail.image} alt="anh san pham"></img>
            </div>
          </div>

          <div className="p-10 border my-20">
            {listProducts.length !== 0 && (
              <div className="flex flex-row space-x-6 ">
                {listProducts.map((data) => (
                  <Link
                    to={`/product/${data.id}`}
                    key={data.id}
                    className="border w-[25%] p-2"
                  >
                    <img
                      src={data.media[0].mediaPath}
                      alt="img product"
                      className="h-[200px] w-full"
                    ></img>
                    <div className="flex flex-row mt-2">
                      <h1 className="font-['Poppins_Regular'] text-gray-400 hover:text-blue-400 text-base font-bold">
                        {data.name}
                      </h1>
                    </div>
                    <div className="flex flex-row space-x-4">
                      <div className="flex flex-row space-x-1 font-[Helvetica] text-[#929292] items-center line-through">
                        <h1 className=" text-sm">
                          {currencyFormat(parseInt(data.price))}
                        </h1>
                        <h1 className=" text-xs">$</h1>
                      </div>
                      <div className="py-5 flex flex-row space-x-1 font-[Helvetica] text-[#EE4D2D]">
                        <h1 className=" text-2xl">
                          {currencyFormat(
                            (data.price * (100 - data.discount)) / 100
                          )}
                        </h1>
                        <h1 className=" text-xl">đ</h1>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
