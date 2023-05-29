import React, { useState } from "react";
import {
  useCategoryHandle,
  useListProductInCategory,
  useMetaInProductInCategory,
} from "../../../app/hook/CategoryHook";
import { useDispatch } from "react-redux";
import {
  setLimitInFilterCategory,
  setSortNameInSortCategory,
  setSortPriceInSortCategory,
} from "../../../app/slices/QuerySlice";
import { checkObjectEmpty } from "../../../app/hook/CommonHook";

export const TopFilter = (props) => {
  const dispatch = useDispatch();

  const categoryHandle = useCategoryHandle();
  const metaProductInCategory = useMetaInProductInCategory() || {};

  const handleChangePage = (e) => {
    dispatch(setLimitInFilterCategory(e.currentTarget.value));
  };

  const handleKeyPressPage = (e) => {
    const charCode = e.which ? e.which : e.keyCode;
    if (charCode < 48 || charCode > 57) {
      e.preventDefault();
    }
  };

  const handleChangeSort = (e) => {
    switch (e.target.value) {
      case "none":
        dispatch(setSortNameInSortCategory(null));
        dispatch(setSortPriceInSortCategory(null));
        break;
      case "price_asc":
        dispatch(setSortNameInSortCategory(null));
        dispatch(setSortPriceInSortCategory("ASC"));
        break;
      case "price_desc":
        dispatch(setSortNameInSortCategory(null));
        dispatch(setSortPriceInSortCategory("DESC"));
        break;
      case "name_asc":
        dispatch(setSortNameInSortCategory("ASC"));
        dispatch(setSortPriceInSortCategory(null));
        break;
      case "name_desc":
        dispatch(setSortNameInSortCategory("DESC"));
        dispatch(setSortPriceInSortCategory(null));
        break;
      default:
        return;
    }
  };
  return (
    <div className="my-10 flex flex-row justify-between items-center">
      <div className="flex flex-col space-y-4">
        <h1 className=" text-[#151875] text-xl">
          {props.id == 0 || !categoryHandle ? "All" : categoryHandle.name}
        </h1>
        <h1 className=" text-[#8A8FB9] text-base font-['Lato']">
          About{" "}
          {!checkObjectEmpty(metaProductInCategory)
            ? metaProductInCategory.paging.Count
            : 0}{" "}
          results
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
          <select
            id="sort-options"
            className="border px-2 py-1"
            onChange={handleChangeSort}
          >
            <option value="none">None</option>
            <option value="price_asc">Price Low to High</option>
            <option value="price_desc">Price High to Low</option>
            <option value="name_asc">Sort Name A-Z</option>
            <option value="name_desc">Sort Name Z-A</option>
          </select>
        </div>
      </div>
    </div>
  );
};
