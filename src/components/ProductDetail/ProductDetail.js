import React from "react";
import { BasicInformation } from "./BasicInformation";
import { ImageProduct } from "./BasicInformation/ImageProduct";

export const ProductDetail = (props) => {
  return (
    <div className="flex justify-center border p-5 my-10 max-w-[1000px] bg-white">
      <div className=" flex flex-row space-x-10">
        <ImageProduct id={props.id} />
        <div className="min-w-[450px]">
          <BasicInformation id={props.id} />
        </div>
      </div>
    </div>
  );
};
