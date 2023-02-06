import { Button, Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Pagination } from "@mui/material";
import FilterIcon from "@mui/icons-material/Filter";
import { Link } from "react-router-dom";
import { FiltersBrand } from "./FiltersBrand";
import { useDispatch, useSelector } from "react-redux";
import { FetchGetListBrand } from "../../../../store/slices/ProviderSlice";
import { convertDate } from "../../../../stogare_function/listActions";

const VARIANT = {
  contained: "contained",
  outlined: "outlined",
};
export const ListViewBrand = () => {
  const userID = localStorage.getItem("UserID");
  const DataBrand = useSelector((state) => state.provider.ListBrand) || [];
  const dispatch = useDispatch();
  useEffect(() => {
    if (DataBrand.status != 204 && DataBrand.status != 200) {
      dispatch(FetchGetListBrand(userID));
    }
  }, [dispatch, DataBrand, userID]);
  const [variant, setVariant] = useState(VARIANT.contained);
  const handleButtonFilter = (e) => {
    if (variant === VARIANT.contained) setVariant(VARIANT.outlined);
    else setVariant(VARIANT.contained);
  };

  const emptyBrand = () => {
    return DataBrand.status == 204 || DataBrand.status != 200;
  };
  return (
    <div className="px-5">
      <div className="flex flex-row justify-between">
        <h1 className=" text-xl font-bold">List your brand: </h1>
        <Button
          variant={variant}
          startIcon={<FilterIcon />}
          onClick={handleButtonFilter}
        >
          Filter
        </Button>
      </div>
      {variant === VARIANT.contained ? <div></div> : <FiltersBrand />}
      <div className="my-10 pl-10 border flex flex-row bg-gradient-to-r from-[#ffafbd] to-[#ffc3a0] rounded-2xl shadow-lg">
        {emptyBrand() ? (
          <h1 className=" text-xl uppercase">you don't have a brand</h1>
        ) : (
          <div className="flex flex-row flex-wrap justify-start w-full">
            {DataBrand.data.data.map((data) => (
              <Link
                to={`/brand-detail/${data.ID}`}
                className="w-[20%] min-h-[320px] max-h-[400px] border rounded-2xl shadow-xl my-5 mx-5 bg-white hover:scale-105"
              >
                <div className="flex justify-center">
                  <h1 className=" text-base font-bold my-2">{data.Name}</h1>
                </div>
                <Divider />
                <div className="flex flex-col">
                  <img
                    src={data.ImagePath}
                    alt="Anh brand"
                    className="w-full h-[200px] p-2"
                  />
                  <div className="mt-4">
                    <Divider />
                  </div>
                  <div className="flex justify-center">
                    <h1 className=" text-base text-[#B1B5B5] items-center">
                      Create at: {convertDate(data.CreatedAt)}
                    </h1>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
