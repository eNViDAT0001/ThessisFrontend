import React from "react";
import {
  fetchBrandFilterCategory,
  useFetchBrandInCategory,
  useFilterBrand,
  useListBrandInFilterCategory,
  useMetaInBrandInFilterCategory,
} from "../../../app/hook/CategoryHook";
import { useDispatch } from "react-redux";
import {
  setMarkerInBrandInFilterCategory,
  setProviderIDInFilterCategory,
  setSearchInBrandInFilterCategory,
} from "../../../app/slices/QuerySlice";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { checkObjectEmpty } from "../../../app/hook/CommonHook";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

export const FilterBrand = () => {
  const listBrand = useListBrandInFilterCategory() || [];
  const filterBrand = useFilterBrand();
  const [focusID, setFocusID] = useState(null);
  const metaInBrandInCategory = useMetaInBrandInFilterCategory() || {};
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    dispatch(setSearchInBrandInFilterCategory(e.currentTarget.value));
  };

  const handleClickBrand = (e) => {
    if (!focusID || focusID != e.currentTarget.id) {
      setFocusID(e.currentTarget.id);
      dispatch(setProviderIDInFilterCategory(e.currentTarget.id));
    } else {
      setFocusID(null);
      dispatch(setProviderIDInFilterCategory(null));
    }
  };

  const handleShowMore = (e) => {
    dispatch(
      setMarkerInBrandInFilterCategory(metaInBrandInCategory.paging.Current)
    );
  };
  useFetchBrandInCategory(filterBrand);

  return (
    <div>
      <div className="flex flex-row items-center my-2">
        <TextField
          id="standard-helperText"
          placeholder="Search your brand"
          variant="standard"
          sx={{ ml: 1, flex: 1 }}
          onChange={handleInputChange}
        />
      </div>

      {listBrand.map((data) => (
        <div
          key={data.id}
          id={data.id}
          onClick={handleClickBrand}
          className={
            data.id == focusID
              ? " text-pink-500 bg-gray-100 hover:cursor-pointer p-2"
              : " hover:text-pink-500 hover:bg-gray-100 hover:cursor-pointer p-2"
          }
        >
          <h1>{data.name}</h1>
        </div>
      ))}
      {!checkObjectEmpty(metaInBrandInCategory) && (
        <div>
          <button
            className="text-blue-500 hover:text-blue-700 mb-4"
            onClick={handleShowMore}
          >
            <ArrowDownwardIcon />
          </button>
        </div>
      )}
    </div>
  );
};
