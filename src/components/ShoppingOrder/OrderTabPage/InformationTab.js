import { Autocomplete, TextField } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { setFormAddressSelected } from "../../../app/slices/AddressSlice";
import {
  useFormAddressSelected,
  useListAddress,
} from "../../../app/hook/AddressHook";
import { Link } from "react-router-dom";
import { useListItemInCartSelected } from "../../../app/hook/CartHook";
import { useEffect } from "react";
import { ShippingFee, useShippingFee } from "../../../app/hook/OrderHook";
import { checkObjectEmpty } from "../../../app/hook/CommonHook";

export const InformationTab = () => {
  const dispatch = useDispatch();
  const addressForm = useFormAddressSelected();
  const dataAddressSave = useListAddress() || [];
  const newAddressSave = dataAddressSave.map((data) => ({
    ...data,
    label:
      data.street + "," + data.ward + "," + data.district + "," + data.province,
  }));

  const selectTheAddress = (e, value) => {
    dispatch(setFormAddressSelected(value));
  };

  const listItem = useListItemInCartSelected();

  useShippingFee(listItem, addressForm);

  useEffect(()=>{
    dispatch(setFormAddressSelected({}))
  },[dispatch])
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
      <Link to="/account-address/create" className="flex justify-center">
        <h1 className=" hover:underline hover:text-[#FF2AAA] hover:cursor-pointer">
          ---If you don't have any address. Create your address now---
        </h1>
      </Link>
    </div>
  );
};
