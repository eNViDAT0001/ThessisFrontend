import React from "react";
import TextField from "@mui/material/TextField";
import { useDispatch } from "react-redux";
import {
  useCategoryIdFix,
  useDiscountFix,
  useHeightInFix,
  useLengthInFix,
  useNameFix,
  usePriceFix,
  useShortDescriptionsFix,
  useWeightInFix,
  useWidthInFix,
} from "../../../app/hook/ProductHook";
import { useState } from "react";
import { useEffect } from "react";
import { CategoryTreeFix } from "./CategoryTreeFix";
import {
  setDiscountFix,
  setHeightFix,
  setLengthFix,
  setNameFix,
  setPriceFix,
  setShortDescriptionsFix,
  setWeightFix,
  setWidthFix,
} from "../../../app/slices/FixProductSlice";

export const FixBasicInformation = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  const name = useNameFix() || "";
  const category_id = useCategoryIdFix() || 0;
  const price = usePriceFix() || 0;
  const discount = useDiscountFix() || 0;
  const height = useHeightInFix() || 0;
  const weight = useWeightInFix() || 0;
  const length = useLengthInFix() || 0;
  const width = useWidthInFix() || 0;
  const short_descriptions = useShortDescriptionsFix() || "";
  const handleInputName = (e) => {
    dispatch(setNameFix(e.target.value));
  };
  const handleInputPrice = (e) => {
    dispatch(setPriceFix(e.target.value));
  };
  const handleInputDiscount = (e) => {
    dispatch(setDiscountFix(e.target.value));
  };
  const handleInputHeight = (e) => {
    dispatch(setHeightFix(e.target.value));
  };
  const handleInputWeight = (e) => {
    dispatch(setWeightFix(e.target.value));
  };
  const handleInputLength = (e) => {
    dispatch(setLengthFix(e.target.value));
  };
  const handleInputWidth = (e) => {
    dispatch(setWidthFix(e.target.value));
  };
  const handleInputShortDescriptions = (e) => {
    dispatch(setShortDescriptionsFix(e.target.value));
  };
  useEffect(() => {
    if (name && category_id && discount && price) {
      setIsLoaded(true);
    }
  }, [name, category_id, discount, price]);
  return (
    <div>
      {isLoaded && (
        <div className="p-10 border rounded-2xl space-y-6">
          <div className="flex flex-row justify-between space-x-4 items-center">
            <h1 className="font-semibold">Name Product:</h1>
            <TextField
              required
              sx={{ width: 0.75 }}
              size="small"
              onChange={handleInputName}
              defaultValue={name}
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
              defaultValue={price}
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
              defaultValue={discount}
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
              defaultValue={short_descriptions}
              onChange={handleInputShortDescriptions}
              label="Short Descriptions"
            />
          </div>
          <div className="flex flex-row justify-between space-x-4 items-center">
            <h1 className="font-semibold">Height:</h1>
            <TextField
              sx={{ width: 0.75 }}
              size="small"
              id="outlined-required"
              defaultValue={height}
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
              defaultValue={length}
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
              defaultValue={weight}
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
              defaultValue={width}
              onChange={handleInputWidth}
              label="Width"
            />
          </div>
          <div className="flex flex-row space-x-8 items-start">
            <h1 className="font-semibold mt-1">Select your Category:</h1>
            <CategoryTreeFix />
          </div>
        </div>
      )}
    </div>
  );
};
