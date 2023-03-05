import { Button, Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Pagination } from "@mui/material";
import FilterIcon from "@mui/icons-material/Filter";
import { Link } from "react-router-dom";
import { convertDate } from "../../../../app/hook/CommonHook";
import { FilterFormBrand } from "./FilterFormBrand";

const VARIANT = {
  contained: "contained",
  outlined: "outlined",
};

export const ListViewBrand = () => {
    const [variant, setVariant] = useState(VARIANT.contained);
    const listBrand = []

    const handleButtonFilter = (e) =>{

    }
    return(
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
        {variant === VARIANT.contained ? <div></div> : <FilterFormBrand />}
        <div className="my-10 pl-10 border flex flex-row bg-gradient-to-r from-[#ffafbd] to-[#ffc3a0] rounded-2xl shadow-lg">
          {listBrand.length==0 ? (
            <h1 className=" text-xl uppercase">you don't have a brand</h1>
          ) : (
            <div className="flex flex-row flex-wrap justify-start w-full">
              {listBrand.map((data) => (
                <Link
                  to={`/brand-detail/${data.id}`}
                  className="w-[20%] min-h-[320px] max-h-[400px] border rounded-2xl shadow-xl my-5 mx-5 bg-white hover:scale-105"
                >
                  <div className="flex justify-center">
                    <h1 className=" text-base font-bold my-2">{data.name}</h1>
                  </div>
                  <Divider />
                  <div className="flex flex-col">
                    <img
                      src={data.image_path}
                      alt="Anh brand"
                      className="w-full h-[200px] p-2"
                    />
                    <div className="mt-4">
                      <Divider />
                    </div>
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
      </div>

    )
};
