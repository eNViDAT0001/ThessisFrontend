import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  setCreateAtAfterOrderDbInBrandDetail,
  setCreateAtPrevOrderDbInBrandDetail,
} from "../../app/slices/QuerySlice";
import { convertDate } from "../../app/hook/CommonHook";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
export const DateOrderInDetailBrand = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState([
    {
      startDate: Date.now(),
      endDate: Date.now(),
      key: "selection",
    },
  ]);

  const handleChange = (item) => {
    setState([item.selection]);
    const startDate = item.selection.startDate;
    const endDate = item.selection.endDate;
    dispatch(setCreateAtPrevOrderDbInBrandDetail(convertDate(startDate)));
    dispatch(setCreateAtAfterOrderDbInBrandDetail(convertDate(endDate)));
  };
  return (
    <div>
      {" "}
      <DateRangePicker onChange={(item) => handleChange(item)} ranges={state} />
    </div>
  );
};
