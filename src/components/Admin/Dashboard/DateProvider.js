import React, { useState } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import {
  setCreateAtAfterProviderDb,
  setCreateAtPrevProviderDb,
} from "../../../app/slices/QuerySlice";
import { convertDate } from "../../../app/hook/CommonHook";
import { useDispatch } from "react-redux";

export const DateProvider = () => {
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
    dispatch(setCreateAtPrevProviderDb(convertDate(startDate)));
    dispatch(setCreateAtAfterProviderDb(convertDate(endDate)));
  };
  return (
    <div>
      {" "}
      <DateRangePicker onChange={(item) => handleChange(item)} ranges={state} />
    </div>
  );
};
