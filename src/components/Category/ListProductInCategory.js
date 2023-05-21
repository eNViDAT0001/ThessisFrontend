import React from "react";
import {
  useListProductInCategory,
  useMetaInProductInCategory,
} from "../../app/hook/CategoryHook";
import { checkObjectEmpty, currencyFormat } from "../../app/hook/CommonHook";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import { Link } from "react-router-dom";
import { ProductNotAvailable } from "../../asset/ProductNotAvailable";
import { useDispatch } from "react-redux";
import { setMarkerInFilterCategory } from "../../app/slices/QuerySlice";

const imageNotAvailable =
  "https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg";
export const ListProductInCategory = () => {
  const dispatch = useDispatch();
  const listProduct = useListProductInCategory() || [];
  const metaInProductInCategory = useMetaInProductInCategory() || {};

  const handleShowMore = (e) => {
    dispatch(setMarkerInFilterCategory(metaInProductInCategory.paging.Current));
  };
  return (
    <div>
      {listProduct.length === 0 ? (
        <div className="flex justify-center">
          <ProductNotAvailable />
        </div>
      ) : (
        <div>
          {listProduct.map((data) => (
            <Link
              key={data.id}
              to={`/product/${data.id}`}
              className="w-full my-5 p-4"
            >
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
                      {`${currencyFormat(
                        (data.price * (100 - data.discount)) / 100
                      )}đ`}
                    </h1>
                    <h1 className="font-normal text-[#FF2AAA] text-sm line-through mb-[10px] mr-4">
                      {`${currencyFormat(data.price)}đ`}
                    </h1>
                    <Rating
                      name="text-feedback"
                      value={data.rating}
                      size="small"
                      readOnly
                      precision={1}
                      emptyIcon={
                        <StarIcon
                          style={{ opacity: 0.55 }}
                          fontSize="inherit"
                        />
                      }
                    />
                  </div>
                  <h1 className="text-[#9295AA]">{data.short_descriptions}</h1>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
      {!checkObjectEmpty(metaInProductInCategory) && (
        <div className="flex justify-center">
          <button
            className="text-blue-500 hover:text-blue-700 mb-4"
            onClick={handleShowMore}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 inline-block mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 6h2v6H9V6zm2 8h1v1h-1v-1z"
                clipRule="evenodd"
              />
            </svg>
            Load More
          </button>
        </div>
      )}
    </div>
  );
};
