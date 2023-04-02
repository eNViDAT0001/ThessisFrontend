import { Autocomplete, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import { saveNewAddress, useDistrict, useProvince, useWard } from "../../../../app/hook/AddressHook";
import { changeAttributeForOption } from "../../../../app/hook/CommonHook";
export const CreateAddressForm = () => {
  const id = localStorage.getItem("UserID");
  const [provinceID, setProvinceID] = useState("");
  const [districtID, setDistrictID] = useState("");
  const [districtName, setDistrictName] = useState("");
  const [wardName, setWardName] = useState("");
  const [wardID, setWardID] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState(true);
  const [street, setStreet] = useState("");

  const dataProvince = useProvince()
  const dataDistrict = useDistrict()
  const dataWard = useWard()

  const newDataProvince = changeAttributeForOption(dataProvince)
  const newDataDistrict = changeAttributeForOption(dataDistrict)
  const newDataWard = changeAttributeForOption(dataWard)
    
  const handleNameText = (e) => {
    setName(e.target.value);
  };
  const handlePhoneText = (e) => {
    setPhone(e.target.value);
  };
  const handleAddressText = (e) => {
    setStreet(e.target.value);
  };

  const onChangeProvince = (e, value) => {
    setProvinceID(value.id);
    setDistrictName("");
    setWardName("");
  };

  const onChangeDistrict = (e, value) => {
    setDistrictID(value.id);
    setDistrictName(value.label);
    setWardName("");
  };
  const onChangeWard = (e, value) => {
    setWardID(value.id);
    setWardName(value.label);
  };

  const onChangeGender = (e, value) => {
    setGender(value.id === 1);
  };

  const handleButtonConfirm = (e) => {
    saveNewAddress(
      id,
      name,
      gender,
      phone,
      provinceID,
      districtID,
      wardID,
      street,
      districtName,
      wardName
    );
  };
  return (
    <div className="mt-10 ml-10 space-y-10  w-[60%] p-10 py-10 mb-32 border shadow-md w-min-[200px]">
      <ToastContainer position="top-right" newestOnTop />

      <h1 className="ml-4 text-xl text-[#1D3178] font-semibold">
        Address Detail
      </h1>
      <TextField
        required
        id="outlined-required"
        label="Name"
        onChange={handleNameText}
        sx={{ width: 1 }}
      />
      <div className="flex flex-row space-x-4">
        <TextField
          required
          id="outlined-required"
          onChange={handlePhoneText}
          label="Phone number"
          sx={{ width: 1 }}
        />
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={[
            { id: 1, label: "Male" },
            { id: 0, label: "Female" },
          ]}
          onChange={onChangeGender}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Gender" />}
        />
      </div>
      <TextField
        required
        id="outlined-required"
        onChange={handleAddressText}
        label="Address"
        sx={{ width: 1 }}
      />
      <div className="flex flex-row space-x-4">
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={newDataProvince}
          onChange={onChangeProvince}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Province" />}
        />
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={newDataDistrict}
          value={districtName}
          onChange={onChangeDistrict}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="District" />}
        />
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          value={wardName}
          onChange={onChangeWard}
          options={newDataWard}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Ward" />}
        />
      </div>
      <div className="flex flex-row-reverse mt-5">
        <Button variant="contained" size="large" onClick={handleButtonConfirm}>
          Confirm
        </Button>
      </div>
    </div>
  );
};
