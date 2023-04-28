import React, { useState } from "react";
import {
  useCategoryHandle,
  useListProductInCategory,
} from "../../../app/hook/CategoryHook";
import { useDispatch } from "react-redux";
import { setLimitInFilterCategory, setSortPriceInFilterCategory } from "../../../app/slices/QuerySlice";

export const TopFilter = (props) => {
  const dispatch = useDispatch();

  const categoryHandle = useCategoryHandle();
  const listProduct = useListProductInCategory() || [];

  const [isDescendingPrice, setIsDescendingPrice] = useState(false);
  const [arrowDirectionPrice, setArrowDirectionPrice] = useState("");

  const [isDescendingName, setIsDescendingName] = useState(false);
  const [arrowDirectionName, setArrowDirectionName] = useState("");
  const handleChangePage = (e) => {
    dispatch(setLimitInFilterCategory(e.currentTarget.value));
  };

  const handleKeyPressPage = (e) => {
    const charCode = e.which ? e.which : e.keyCode;
    if (charCode < 48 || charCode > 57) {
      e.preventDefault();
    }
  };

  function handleClickPrice() {
    isDescendingPrice ? dispatch(setSortPriceInFilterCategory("DESC")) : dispatch(setSortPriceInFilterCategory("ASC"))
    setIsDescendingPrice(!isDescendingPrice);
    setArrowDirectionPrice(isDescendingPrice ? "rotate-0" : "rotate-180");
  }

  function handleResetPrice() {
    dispatch(setSortPriceInFilterCategory(null))
    setIsDescendingPrice(false);
    setArrowDirectionPrice("");
  }

  function handleClickName() {
    setIsDescendingName(!isDescendingName);
    setArrowDirectionName(isDescendingName ? "rotate-0" : "rotate-180");
  }

  function handleResetName() {
    setIsDescendingName(false);
    setArrowDirectionName("");
  }
  return (
    <div className="my-10 flex flex-row justify-between items-center">
      <div className="flex flex-col space-y-4">
        <h1 className=" text-[#151875] text-xl">
          {props.id == 0 || !categoryHandle ? "All" : categoryHandle.name}
        </h1>
        <h1 className=" text-[#8A8FB9] text-base font-['Lato']">
          About {listProduct.length} results
        </h1>
      </div>
      <div className="space-x-20 flex flex-row">
        <div className="flex flex-row items-center space-x-2">
          <h1 className=" text-[#151875] text-base">Per page:</h1>
          <input
            type="text"
            onKeyPress={handleKeyPressPage}
            onChange={handleChangePage}
            className=" border-2 w-[55px] h-[25px] px-2 py-1"
          ></input>
        </div>
        <div className="flex flex-row items-center space-x-2">
          <h1 className="text-[#151875] text-base">Sort by:</h1>
          <h1
            onClick={handleClickPrice}
            className={`p-2 cursor-pointer hover:bg-gray-100 ${
              arrowDirectionPrice ? "text-pink-500" : "text-black"
            }`}
          >
            Price
            <span
              className={`${
                arrowDirectionPrice ? "inline-block" : "hidden"
              } ml-2 transition-transform duration-300 transform ${arrowDirectionPrice}`}
            >
              &#x25BC;
            </span>
          </h1>
          <h1
            onClick={handleResetPrice}
            className={`p-2 cursor-pointer hover:bg-gray-100 ${
              arrowDirectionPrice ? "text-black" : "hidden"
            }`}
          >
            &#x2715;
          </h1>
          <h1
            onClick={handleClickName}
            className={`p-2 cursor-pointer hover:bg-gray-100 ${
              arrowDirectionName ? "text-pink-500" : "text-black"
            }`}
          >
            Name
            <span
              className={`${
                arrowDirectionName ? "inline-block" : "hidden"
              } ml-2 transition-transform duration-300 transform ${arrowDirectionName}`}
            >
              &#x25BC;
            </span>
          </h1>
          <h1
            onClick={handleResetName}
            className={`p-2 cursor-pointer hover:bg-gray-100 ${
              arrowDirectionName ? "text-black" : "hidden"
            }`}
          >
            &#x2715;
          </h1>
        </div>
      </div>
    </div>
  );
};
