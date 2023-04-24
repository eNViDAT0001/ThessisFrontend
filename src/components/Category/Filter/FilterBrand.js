import React from "react";

import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import {
  fetchBrandFilterCategory,
  useFilterBrand,
  useListBrandInFilterCategory,
} from "../../../app/hook/CategoryHook";
import { useEffect } from "react";
import { convertObjectToStringQuery } from "../../../app/hook/CommonHook";
import { useDispatch } from "react-redux";
import { setProviderIDInFilterCategory, setSearchInBrandInFilterCategory } from "../../../app/slices/QuerySlice";
import TextField from "@mui/material/TextField";
import { useState } from "react";

export const FilterBrand = () => {
  const listBrand = useListBrandInFilterCategory() || [];
  const filterBrand = useFilterBrand();
  const [focusID, setFocusID] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const ferchData = (filterBrand) => {
      dispatch(fetchBrandFilterCategory(filterBrand));
    };
    ferchData(convertObjectToStringQuery(filterBrand));
  }, [filterBrand, dispatch]);

  const handleInputChange = (e) => {
    dispatch(setSearchInBrandInFilterCategory(e.currentTarget.value));
  };

  const handleClickBrand = (e) => {
    if (!focusID || focusID!=e.currentTarget.id) {
      setFocusID(e.currentTarget.id);
      dispatch(setProviderIDInFilterCategory(e.currentTarget.id))
    }else{
      setFocusID(null)
      dispatch(setProviderIDInFilterCategory(null))

    }
  };
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
          ey={data.id}
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
    </div>
  );
};
