import React from "react";
import {
  useMetaProductRecommend,
  useProductRecommend,
} from "../../app/hook/ProductHook";
import { Divider, Pagination } from "@mui/material";
import { addSuffixToPrice, checkObjectEmpty } from "../../app/hook/CommonHook";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setMarkerInFilterRecommendProduct } from "../../app/slices/QuerySlice";

const imageNotAvailable =
  "https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg";

export const ProductForyou = () => {
  const dispatch = useDispatch();

  const listProduct = useProductRecommend() || [];
  const metaProduct = useMetaProductRecommend() || {};

  const handleChangePage = (e, value) => {
    dispatch(setMarkerInFilterRecommendProduct(value));
  };
  return (
    <div className="flex flex-col space-y-5 font-[Satoshi]">
      <h1 className="text-xl font-semibold ">Can get you excited :</h1>
      <div className="my-5">
        <Divider />
      </div>
      {!checkObjectEmpty(listProduct) && (
        <div>
          <div className="p-10 my-20">
            {listProduct.length === 0 ? (
              <h1>YOU DON'T HAVE PRODUCT RECOMMEND</h1>
            ) : (
              <div className="flex flex-row justify-start flex-wrap mt-[50px] ">
                {listProduct.map((data) => (
                  <Link
                    key={data.id}
                    id={data.id}
                    to={`/product/${data.id}`}
                    className=" w-[20%] h-[300px] border my-5 mx-5 mb-10 hover:scale-105 p-2 hover:border hover:shadow-2xl hover:rounded-xl hover:cursor-pointer  "
                  >
                    {data.media ? (
                      <div className=" relative">
                        <img
                          id={data.publicID}
                          src={data.media[0].mediaPath}
                          alt="anh san pham"
                          className="h-[200px] w-full"
                        />
                        <div className=" absolute top-0 right-0 pl-4 pr-2 my-2 py-1 border bg-[#D80001] text-[#FFFFFF]">
                          - {data.discount}%
                        </div>
                      </div>
                    ) : (
                      <img
                        src="data:image/jpeg;base64,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"
                        alt="oh no"
                      ></img>
                    )}

                    <div className="flex flex-row mt-2">
                      <h1 className="font-['Poppins_Regular'] text-gray-400 hover:text-blue-400 text-base font-bold truncate">
                        {data.name}
                      </h1>
                    </div>

                    <div className="flex flex-row space-x-4">
                      <div className="flex flex-row space-x-1 font-[Helvetica] text-[#929292] items-center line-through">
                        <h1 className=" text-sm">
                          {addSuffixToPrice(parseInt(data.price))}
                        </h1>
                        <h1 className=" text-xs">$</h1>
                      </div>
                      <div className="py-5 flex flex-row space-x-1 font-[Helvetica] text-[#EE4D2D]">
                        <h1 className=" text-2xl">
                          {addSuffixToPrice(
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
            {!checkObjectEmpty(metaProduct) && (
              <div className="flex justify-center my-5">
                <Pagination
                  count={metaProduct.paging.Pages}
                  defaultPage={metaProduct.paging.Current}
                  onChange={handleChangePage}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
