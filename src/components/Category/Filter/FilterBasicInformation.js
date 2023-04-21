import React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import Checkbox from "@mui/material/Checkbox";

const RatingCheckbox = (props) => {
  return (
    <Box
      sx={{
        width: 200,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Checkbox size="small" />
      <Rating
        name="text-feedback"
        value={props.star}
        size="small"
        readOnly
        precision={1}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
    </Box>
  );
};
export const FilterBasicInformation = () => {
  const rating = [];

  for (let i = 1; i <= 5; i++) {
    rating.push(<RatingCheckbox star={i} />);
  }
  return (
    <div className="flex flex-col">
      <div>{rating}</div>
    </div>
  );
};
