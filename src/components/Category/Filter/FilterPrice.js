import React from "react";
import Slider from "@mui/material/Slider";
import { useState } from "react";
import Box from "@mui/material/Box";
import { useDispatch } from "react-redux";
import {
  setPriceAfterInCategory,
  setPricePrevInCategory,
} from "../../../app/slices/QuerySlice";
export const FilterPrice = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState([0, 100]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    dispatch(setPricePrevInCategory(newValue[0] * 1000000));
    dispatch(setPriceAfterInCategory(newValue[1] * 1000000));
  };
  return (
    <div>
      <Box sx={{ width: 300 }}>
        <Slider
          getAriaLabel={() => "Temperature range"}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
        />
      </Box>
    </div>
  );
};
