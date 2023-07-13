import React from "react";
import ListIcon from "@mui/icons-material/List";
import { Divider } from "@mui/material";
import { ListViewProduct } from "./ListViewProduct";
import { useDispatch } from "react-redux";
import { setNameSearchInProductInDetailBrand } from "../../../../app/slices/QuerySlice";

export const ProductInDetailBrand = (props) => {
  const dispatch = useDispatch();
  const handleChangeSearch = (e) => {
    dispatch(setNameSearchInProductInDetailBrand(e.target.value));
  };

  return (
    <div className="flex justify-center">
      <div className="w-[80%] min-h-[200px] bg-white shadow-lg rounded-2xl p-5 font-['Josefin_Sans']">
        <div className="flex flex-row items-center space-x-2">
          <ListIcon sx={{ width: 20, height: 20 }} />
          <h1 class="font-bold text-2xl ">Products</h1>{" "}
          <div className="relative">
            <input
              type="text"
              className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search your product..."
              onChange={handleChangeSearch}
            />
          </div>
        </div>{" "}
        <div className="flex flex-col my-5">
          <ListViewProduct id={props.id} />
        </div>
        <Divider />
      </div>
    </div>
  );
};
