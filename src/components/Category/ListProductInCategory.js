import React from "react";
import { useListProductInCategory } from "../../app/hook/CategoryHook";
import { currencyFormat } from "../../app/hook/CommonHook";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import { Link } from "react-router-dom";

const imageNotAvailable =
  "https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg";
export const ListProductInCategory = (props) => {
  const listProduct = useListProductInCategory() || [];
  return (
    <div>
      {listProduct.map((data) => (
        <Link to={`/product/${data.id}`} className="w-full my-5 p-4">
          <div className="flex flex-row">
            <img
              src={data.media ? data.media[0].mediaPath : imageNotAvailable}
              alt="Anh san pham"
              className="w-[150px] h-[110px]"
            />
            <div className="my-4 mx-4">
              <h1 className="text-[#111C85]">{data.name}</h1>
              <div className="flex flex-row flex-wrap">
                <h1 className="font-normal text-[#111C85] text-sm mr-[9px]">
                  {`$${currencyFormat(
                    (data.price * (100 - data.discount)) / 100
                  )}`}
                </h1>
                <h1 className="font-normal text-[#FF2AAA] text-sm line-through mb-[10px] mr-4">
                  {`$${currencyFormat(data.price)}`}
                </h1>
                <Rating
                  name="text-feedback"
                  value={data.rating}
                  size="small"
                  readOnly
                  precision={1}
                  emptyIcon={
                    <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                  }
                />
              </div>
              <h1 className="text-[#9295AA]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna
                in est adipiscing in phasellus non in justo.
              </h1>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
