import React from "react";
import { useProductForyou } from "../../app/hook/ProductHook";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";

const imageNotAvailable =
  "https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg";

export const ProductForyou = () => {
  const listProduct = useProductForyou() || [];
  console.log(listProduct);
  return (
    <div className="flex flex-row justify-around">
      {listProduct.map((data) => (
        <div className="flex flex-col space-y-4">
          <img
            src={data.media ? data.media[0].mediaPath : imageNotAvailable}
            className="w-[220px] h-[280px]"
            alt="img"
          />
          <div className="flex flex-row justify-between">
            <h1 className="flex flex-wrap">{data.name}</h1>
            <Rating
              name="text-feedback"
              value={data.rating}
              size="small"
              readOnly
              precision={1}
              emptyIcon={
                <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
              }
            />{" "}
          </div>
          <h1>{data.price}</h1>
        </div>
      ))}
    </div>
  );
};
