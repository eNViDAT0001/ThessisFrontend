import React, { useState } from "react";
import { Divider } from "@mui/material";
import {
  useOptionHandle,
  useProductDetail,
  useSpecificaionProduct,
} from "../../../app/hook/ProductHook";
import { checkObjectEmpty, currencyFormat } from "../../../app/hook/CommonHook";
import { setOptionHandle } from "../../../app/slices/ProductSlice";
import { useDispatch } from "react-redux";
import { useMetaInComment } from "../../../app/hook/CommentHook";

export const TitleAndType = () => {
  const dispatch = useDispatch();

  const metaInComment = useMetaInComment();
  const optionHandle = useOptionHandle();
  const productDetail = useProductDetail();
  const [priceTotal, setPriceTotal] = useState();

  const specificationProduct = useSpecificaionProduct() || [];

  const handleClickOption = (e) => {
    const value = JSON.parse(e.target.getAttribute("value"));
    dispatch(setOptionHandle(value));
    setPriceTotal(parseInt(productDetail.price) + parseInt(value.price));
  };

  return (
    <div>
      {!checkObjectEmpty(productDetail) && (
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl text-[#0D134E] font-bold ">
            {productDetail.name}
          </h1>
          <div className="flex flex-row space-x-3">
            <div className=" flex flex-row space-x-2 items-center">
              <h1 className=" underline">
                {!checkObjectEmpty(metaInComment)
                  ? metaInComment.paging.Count
                  : 0}
              </h1>
              <h1 className=" text-[#767676] hover:underline hover:cursor-pointer">
                Reviewed
              </h1>
            </div>
            <Divider orientation="vertical" flexItem />
            {!checkObjectEmpty(optionHandle) && (
              <div className="px-3 py-1 border text-[#EE4D2D] border-[#EE4D2D]">
                {optionHandle.name}
              </div>
            )}
          </div>
          <div className="flex flex-row items-center space-x-3">
            <div className="py-5 pl-5 flex flex-row space-x-1 font-[Helvetica] text-[#929292] items-center line-through">
              <h1 className=" text-base ">
                {priceTotal || productDetail.price}
              </h1>
              <h1 className=" text-xs">$</h1>
            </div>
            <div className="py-5 flex flex-row space-x-1 font-[Helvetica] text-[#EE4D2D]">
              <h1 className=" text-2xl">
                {currencyFormat(
                  ((priceTotal || productDetail.price) *
                    (100 - productDetail.discount)) /
                    100
                )}
              </h1>
              <h1 className=" text-xl">$</h1>
            </div>
            <div className=" px-2 bg-[#EE4D2D] flex flex-row space-x-1 font-[Helvetica] text-[#FFFFFF] items-center ">
              <h1 className=" text-sm ">- {productDetail.discount}%</h1>
            </div>
          </div>
          <div className="space-y-4 font-[Helvetica]">
            {specificationProduct.map((data) => (
              <div 
              key={data.id}
              className="space-y-4">
                <div className="flex flex-row space-x-4 whitespace-nowrap items-start">
                  <h1 className="text-[#929292] text-lg ">
                    {data.properties}:{" "}
                  </h1>
                  {data.options.length === 0 ? (
                    <div></div>
                  ) : (
                    <div className="flex flex-row flex-wrap items-center">
                      {data.options.map((option) => (
                        <div
                          value={JSON.stringify(option)}
                          key={option.id}
                          onClick={handleClickOption}
                          className=" border py-1 px-6 m-1 hover:text-[#EE4D2D] hover:border-[#EE4D2D] hover:cursor-pointer "
                        >
                          {option.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <Divider />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
