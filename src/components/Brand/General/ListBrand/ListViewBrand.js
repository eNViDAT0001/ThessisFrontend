import React, { useState } from "react";
import { Pagination } from "@mui/material";
import { Link } from "react-router-dom";
import { checkObjectEmpty, convertDate } from "../../../../app/hook/CommonHook";
import {
  useListBrand,
  useMetaInListBrand,
} from "../../../../app/hook/BrandHook";
import { setPageInFilterBrand } from "../../../../app/slices/QuerySlice";
import { useDispatch } from "react-redux";

const VARIANT = {
  contained: "contained",
  outlined: "outlined",
};

export const ListViewBrand = () => {
  const dispatch = useDispatch();
  const [variant, setVariant] = useState(VARIANT.contained);

  const metaInBrand = useMetaInListBrand();

  const listBrand = useListBrand() || [];

  const handleChangePage = (e, value) => {
    dispatch(setPageInFilterBrand(value));
  };
  return (
    <div className="px-5">
      <div className="flex flex-row justify-between">
        <h1 className=" text-xl font-bold">List your brand: </h1>
      </div>
      <div className="my-10 pl-10 border flex flex-row ">
        {listBrand.length == 0 ? (
          <h1 className=" text-xl uppercase">you don't have a brand</h1>
        ) : (
          <div className="flex flex-row flex-wrap justify-start w-full">
          {listBrand.map((data) => (
              <Link
                key={data.id}
                to={`/brand-detail/${data.id}`}
                className="w-[20%] min-w-[100px] min-h-[270px] max-h-[400px] border rounded-2xl shadow-xl my-5 mx-5 bg-white hover:scale-105"
              >
                <div className="flex justify-center">
                  <h1 className=" text-base font-bold my-2">{data.name}</h1>
                </div>

                <div className="flex flex-col">
                  <img
                    src={data.image_path}
                    alt="Anh brand"
                    className="w-full h-[200px] p-2  rounded-2xl"
                  />

                  <div className="flex justify-center">
                    <h1 className=" text-base text-[#B1B5B5] items-center">
                      Create at: {convertDate(data.created_at)}
                    </h1>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      {!checkObjectEmpty(metaInBrand) && (
        <div className="flex justify-center my-5">
          <Pagination
            count={metaInBrand.paging.Pages}
            defaultPage={metaInBrand.paging.Current}
            onChange={handleChangePage}
          />
        </div>
      )}
    </div>
  );
};
