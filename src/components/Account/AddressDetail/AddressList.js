import React from "react";
import { TableAddress } from "./TableAddress";

export const AddressList = (props) => {
  return (
    <div className="p-10 w-full space-y-5">
      <h1 className="ml-4 text-xl text-[#1D3178] font-semibold">Address</h1>
      <TableAddress id={props.id}/>
    </div>
  );
};
