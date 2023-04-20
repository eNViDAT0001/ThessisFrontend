import React from "react";
import TextField from "@mui/material/TextField";

export const TopFilter = () => {
  return (
    <div className="my-10 flex flex-row justify-between items-center">
      <div className="flex flex-col space-y-4">
        <h1 className=" text-[#151875] text-xl">
          Ecommerce Acceories & Fashion item
        </h1>
        <h1 className=" text-[#8A8FB9] text-base font-['Lato']">
          About 10 results
        </h1>
      </div>
      <div className="space-x-20 flex flex-row">
        <div className="flex flex-row items-center space-x-2">
          <h1 className=" text-[#151875] text-base">Per page:</h1>
          <input type="text" className=" border-2 w-[55px] h-[25px] px-2 py-1"></input>
        </div>
        <div className="flex flex-row items-center space-x-2">
          <h1 className=" text-[#151875] text-base">Sort by:</h1>
          <input type="text" className=" border-2 w-[55px] h-[25px] px-2 py-1"></input>
        </div>
      </div>
    </div>
  );
};
