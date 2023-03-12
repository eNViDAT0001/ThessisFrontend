import React from "react";
import ListIcon from "@mui/icons-material/List";
import { Button, Divider } from "@mui/material";
import { ListViewProduct } from "./ListViewProduct";

export const ProductInDetailBrand = (props) => {
  const handleButtonAdd = (e) => {
    window.location.replace(`/add-product-in-brand/${props.id}`);
  };
  return (
    <div className="flex justify-center">
      <div className="w-[80%] min-h-[200px] bg-white shadow-lg rounded-2xl p-5 font-[Inter]">
        <div className="flex flex-row items-center space-x-2">
          <ListIcon sx={{ width: 20, height: 20 }} />
          <h1 class="font-bold text-2xl ">List product in this brand</h1>{" "}
        </div>{" "}
        <div className="my-5">
          <Button variant="contained" onClick={handleButtonAdd}>
            + Add new Product
          </Button>
        </div>
        <Divider />
        <div className="flex flex-col my-5">
          <ListViewProduct />
        </div>
        <Divider />
      </div>
    </div>
  );
};
