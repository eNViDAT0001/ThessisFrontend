import React from "react";
import { Divider } from "@mui/material";
import { ListViewOrders } from "./ListViewOrders";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { useDispatch } from "react-redux";
import { setNameInFilterOrderInBrandDetail } from "../../../../app/slices/QuerySlice";

export const OrderInDetailBrand = (props) => {
  const dispatch = useDispatch();
  const handleChangeSearch = (e) => {
    dispatch(setNameInFilterOrderInBrandDetail(e.target.value));
  };
  return (
    <div className="flex justify-center">
      <div className="w-[80%] min-h-[200px] bg-white shadow-lg rounded-2xl p-5 font-[Inter]">
        <div className="flex flex-row items-center space-x-2">
          <ListAltIcon sx={{ width: 20, height: 20 }} />
          <h1 class="font-bold text-2xl ">Orders</h1>{" "}
          <div className="relative">
            <input
              type="text"
              className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search your order name..."
              onChange={handleChangeSearch}
            />
          </div>
        </div>{" "}
        <div className="my-3">
          <Divider />
        </div>
        <div className="flex flex-col my-5">
          <ListViewOrders id={props.id} />
        </div>
      </div>
    </div>
  );
};
