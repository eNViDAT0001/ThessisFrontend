import {
  Autocomplete,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import {
  resetFormAddressInOrder,
  setDistrictInFormCreate,
  setFormAddressSelected,
  setIsSelectedCustom,
  setNameInFormCreate,
  setPhoneInFormCreate,
  setProvinceInFormCreate,
  setStreetInFormCreate,
  setWardInFormCreate,
} from "../../../app/slices/AddressSlice";
import {
  changeAttributeForOptionInDistrict,
  changeAttributeForOptionInProvince,
  changeAttributeForOptionInWard,
  resetAddressSelected,
  useAddressInFormCreate,
  useDistrict,
  useFetchInformationAddressInOrder,
  useFormAddressSelected,
  useIsSelectedCustom,
  useListAddress,
  useProvince,
  useWard,
} from "../../../app/hook/AddressHook";
import { useListItemInCartSelected } from "../../../app/hook/CartHook";
import { useEffect } from "react";
import { useShippingFee } from "../../../app/hook/OrderHook";

export const InformationTab = () => {
  const dispatch = useDispatch();
  const addressForm = useFormAddressSelected();
  const dataAddressSave = useListAddress() || [];
  const isClickCustom = useIsSelectedCustom() || false;

  const formAddressCreated = useAddressInFormCreate() || {};

  const listProvince = useProvince() || [];
  const listDistrict = useDistrict() || [];
  const listWard = useWard() || [];

  const newDataProvince = changeAttributeForOptionInProvince(listProvince);
  const newDistrict = changeAttributeForOptionInDistrict(listDistrict);
  const newWard = changeAttributeForOptionInWard(listWard);

  const newAddressSave = dataAddressSave.map((data) => ({
    ...data,
    label:
      data.street + "," + data.ward + "," + data.district + "," + data.province,
  }));

  const selectTheAddress = (e, value) => {
    dispatch(setFormAddressSelected(value));
    dispatch(setNameInFormCreate(value.name));
    dispatch(setPhoneInFormCreate(value.phone));
    dispatch(setStreetInFormCreate(value.street));
    dispatch(setProvinceInFormCreate(value.province));
    dispatch(setDistrictInFormCreate(value.district));
    dispatch(setWardInFormCreate(value.ward));
  };

  const listItem = useListItemInCartSelected();

  const changeUIWhenClickButton = (e) => {
    if (isClickCustom) {
      dispatch(setFormAddressSelected({}));
      dispatch(resetFormAddressInOrder());
    }
    dispatch(setIsSelectedCustom(!isClickCustom));
  };

  const handleInputName = (e) => {
    dispatch(setNameInFormCreate(e.target.value));
  };

  const handleInputPhone = (e) => {
    dispatch(setPhoneInFormCreate(e.target.value));
  };

  const handleInputStreet = (e) => {
    dispatch(setStreetInFormCreate(e.target.value));
  };

  const onChangeProvince = (e) => {};

  const onChangeDistrict = (e) => {};
  const onChangeWard = (e) => {};

  useShippingFee(listItem, addressForm);
  useFetchInformationAddressInOrder(
    formAddressCreated.provinceId,
    formAddressCreated.districtId
  );

  return (
    <div className="w-full space-y-8 bg-[#F7FAFC] p-8">
      <h1 className=" text-xl font-sans font-semibold"> Shipping Detail</h1>
      <div className="flex flex-row justify-start items-center">
        <FormControlLabel
          className="text-[#2D3748]"
          control={<Checkbox size="small" color="default" />}
          isOptionEqualToValue={(option, value) => option === value}
          label="Choose address save"
          onChange={changeUIWhenClickButton}
        />
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          disabled={!isClickCustom}
          options={newAddressSave}
          onChange={selectTheAddress}
          isOptionEqualToValue={(option, value) => option === value}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Address" />}
        />
      </div>
      <div className="flex flex-row ">
        <div className="flex flex-col space-y-3">
          <h1 className=" text-[#ABB1B9]">Full Name</h1>
          <TextField
            id="outlined-basic"
            InputProps={{
              readOnly: isClickCustom,
            }}
            label="Name"
            sx={{ width: 300 }}
            variant="outlined"
            value={formAddressCreated.name}
            disabled={isClickCustom}
            onChange={handleInputName}
            className="h-max-[5px] "
          />
        </div>
        <div className="flex flex-col  ml-10  space-y-3">
          <h1 className=" text-[#ABB1B9]">Phone</h1>
          <TextField
            id="outlined-basic"
            label="Phone"
            InputProps={{
              readOnly: isClickCustom,
            }}
            disabled={isClickCustom}
            value={formAddressCreated.phone}
            sx={{ width: 175 }}
            onChange={handleInputPhone}
            variant="outlined"
            className="h-max-[5px] "
          />
        </div>
      </div>

      <div className="space-y-8">
        <h1 className="text-[#ABB1B9]">Select Address: </h1>
        <div className="flex flex-row space-x-6">
          {newDataProvince && (
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              disabled={isClickCustom}
              options={newDataProvince}
              isOptionEqualToValue={(option, value) =>
                value && option && option.id === value.id
              }
              value={formAddressCreated.province}
              sx={{ width: 300 }}
              onChange={onChangeProvince}
              renderInput={(params) => (
                <TextField {...params} label="Province" />
              )}
            />
          )}
          {newDistrict && (
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              disabled={isClickCustom}
              value={formAddressCreated.district}
              options={newDistrict}
              isOptionEqualToValue={(option, value) =>
                value && option && option.id === value.id
              }
              onChange={onChangeDistrict}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="District" />
              )}
            />
          )}
          {newWard && (
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              disabled={isClickCustom}
              value={formAddressCreated.ward}
              options={newWard}
              isOptionEqualToValue={(option, value) =>
                value && option && option.id === value.id
              }
              onChange={onChangeWard}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Ward" />}
            />
          )}
        </div>
        <h1 className=" text-[#ABB1B9]">Street Name: </h1>
        <TextField
          id="outlined-basic"
          label="Street"
          variant="outlined"
          value={formAddressCreated.street}
          disabled={isClickCustom}
          onChange={handleInputStreet}
          className="h-max-[5px] w-full"
        />
      </div>
    </div>
  );
};
