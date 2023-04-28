import React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import { useDispatch } from "react-redux";
import { setRatingInFilterCategory } from "../../../app/slices/QuerySlice";

export const FilterBasicInformation = () => {
  const dispatch = useDispatch()
  
  const handleClickRating = (newValue) =>{
    dispatch(setRatingInFilterCategory(newValue))
  }
  return (
    <div>
       <Box
            sx={{
              width: 200,
              display: "flex",
            }}
          >
            <Rating
              name="hover-feedback"
              precision={1}
              onChange={(event, newValue) => {
                handleClickRating(newValue);
              }}

            ></Rating>
          </Box>
    </div>
  );
};
