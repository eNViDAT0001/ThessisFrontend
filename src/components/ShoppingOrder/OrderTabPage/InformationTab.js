import { Autocomplete, TextField } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { setFormAddressSelected } from "../../../app/slices/AddressSlice";
import { useListAddress } from "../../../app/hook/AddressHook";

export const InformationTab = () => {
  const dispatch = useDispatch();

  const dataAddressSave = useListAddress() || [];
  const newAddressSave = dataAddressSave.map((data) => ({
    ...data,
    label:
      data.street + "," + data.ward + "," + data.district + "," + data.province,
  }));

  const selectTheAddress = (e, value) => {
    dispatch(setFormAddressSelected(value));
  };

  return (
    <div className="w-full space-y-8 bg-[#F7FAFC] p-8">
      <h1 className=" text-xl font-sans font-semibold"> Shipping Detail</h1>
      <div className="flex flex-row justify-between items-center mt">
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={newAddressSave}
          onChange={selectTheAddress}
          isOptionEqualToValue={(option, value) => option === value}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Address" />}
        />
      </div>
    </div>
  );
};
