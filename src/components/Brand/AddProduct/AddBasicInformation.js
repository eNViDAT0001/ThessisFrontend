import React from "react";
import TextField from "@mui/material/TextField";
import { useDispatch } from "react-redux";
import {
  setDiscount,
  setHeight,
  setLength,
  setName,
  setPrice,
  setShortDescriptions,
  setWeight,
  setWidth,
} from "../../../app/slices/AddProductSlice";
import {
  useFetchCategoryInAddProduct,
  useTreeInAddProduct,
} from "../../../app/hook/ProductHook";
import { TreeCategoryInAddProduct } from "./TreeCategoryInAddProduct";

export const AddBasicInformation = () => {
  const dispatch = useDispatch();
  const treeCategory = useTreeInAddProduct();

  const handleInputName = (e) => {
    dispatch(setName(e.target.value));
  };
  const handleInputPrice = (e) => {
    dispatch(setPrice(parseInt(e.target.value)));
  };
  const handleInputDiscount = (e) => {
    dispatch(setDiscount(parseInt(e.target.value)));
  };
  const handleInputHeight = (e) => {
    dispatch(setHeight(parseInt(e.target.value)));
  };
  const handleInputLength = (e) => {
    dispatch(setLength(parseInt(e.target.value)));
  };
  const handleInputWeight = (e) => {
    dispatch(setWeight(parseInt(e.target.value)));
  };
  const handleInputWidth = (e) => {
    dispatch(setWidth(parseInt(e.target.value)));
  };
  const handleInputShortDescriptions = (e) =>{
    dispatch(setShortDescriptions(e.target.value))
  }
  
  useFetchCategoryInAddProduct();
  return (
    <div className="p-10 border rounded-2xl space-y-6">
      <div className="flex flex-row justify-between space-x-4 items-center">
        <h1 className="font-semibold">Name Product:</h1>
        <TextField
          required
          sx={{ width: 0.75 }}
          size="small"
          onChange={handleInputName}
          id="outlined-required"
          label="Name"
        />
      </div>

      <div className="flex flex-row justify-between space-x-4 items-center">
        <h1 className="font-semibold">Price:</h1>
        <TextField
          required
          sx={{ width: 0.75 }}
          size="small"
          id="outlined-required"
          onChange={handleInputPrice}
          label="Price"
        />
      </div>
      <div className="flex flex-row justify-between space-x-4 items-center">
        <h1 className="font-semibold">Discount:</h1>
        <TextField
          sx={{ width: 0.75 }}
          size="small"
          id="outlined-required"
          defaultValue="0"
          onChange={handleInputDiscount}
          label="Discount"
        />
      </div>
      <div className="flex flex-row justify-between space-x-4 items-center">
        <h1 className="font-semibold">Short Descriptions:</h1>
        <TextField
          sx={{ width: 0.75 }}
          size="small"
          id="outlined-required"
          defaultValue="0"
          onChange={handleInputShortDescriptions}
          label="Short Descriptions"
        />
      </div>
      <div className="flex flex-row  justify-between space-x-4 items-center">
        <h1 className="font-semibold">Height:</h1>
        <TextField
          sx={{ width: 0.75 }}
          size="small"
          id="outlined-required"
          defaultValue="0"
          onChange={handleInputHeight}
          label="Height"
        />
      </div>
      <div className="flex flex-row justify-between space-x-4 items-center">
        <h1 className="font-semibold">Length:</h1>
        <TextField
          sx={{ width: 0.75 }}
          size="small"
          id="outlined-required"
          defaultValue="0"
          onChange={handleInputLength}
          label="Length"
        />
      </div>
      <div className="flex flex-row justify-between space-x-4 items-center">
        <h1 className="font-semibold">Weight:</h1>
        <TextField
          sx={{ width: 0.75 }}
          size="small"
          id="outlined-required"
          defaultValue="0"
          onChange={handleInputWeight}
          label="Weight"
        />
      </div>
      <div className="flex flex-row justify-between space-x-4 items-center">
        <h1 className="font-semibold">Width:</h1>
        <TextField
          sx={{ width: 0.75 }}
          size="small"
          id="outlined-required"
          defaultValue="0"
          onChange={handleInputWidth}
          label="Width"
        />
      </div>
      <div className="flex flex-row space-x-8 items-center">
        <h1 className="font-semibold">Select your Category:</h1>
        <TreeCategoryInAddProduct data={treeCategory} />
      </div>
    </div>
  );
};
