import React from "react";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { Divider } from "@mui/material";
import { TableOrderDetail } from "./TableOrderDetail";

export const OrderDetailGeneral = (props) => {
  return (
    <div className="flex justify-center">
      <div className="w-[80%] min-h-[200px] bg-white shadow-lg rounded-2xl p-5 font-[Inter]">
        <div className="flex flex-row items-center space-x-2">
          <ListAltIcon sx={{ width: 20, height: 20 }} />
          <h1 class="font-bold text-2xl ">List product in this brand</h1>{" "}
        </div>{" "}
        <div className="my-5">
          <Divider />
        </div>
        <div className="flex flex-col my-5">
          <TableOrderDetail id={props.id} />
        </div>
      </div>
    </div>
  );
};
