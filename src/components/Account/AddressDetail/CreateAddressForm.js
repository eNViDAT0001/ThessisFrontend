import { Autocomplete, Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SaveAddressForm } from "../../../models/SaveAddressForm/SaveAddressForm";
import {
  AddSaveAddress,
  fetchAllProvince,
  fetchDistrictFromProvince,
  fetchWardFromDistrict,
} from "../../../store/slices/AddressSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
export const CreateAddressForm = () => {
  const dispatch = useDispatch();
  const ID = localStorage.getItem("UserID");
  const [ProvinceID, setProvinceID] = useState("");
  const [DistrictID, setDistrictID] = useState("");
  const [districtName, setDistrictName] = useState("");
  const [wardName, setWardName] = useState("");
  const [WardID, setWardID] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState(true);
  const [street, setStreet] = useState("");

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
    setDistrictName(value.label)
    setWardName("");
  };
  const onChangeWard = (e, value) => {
    setWardID(value.id);
    setWardName(value.label)
  };

  useEffect(() => {
    dispatch(fetchAllProvince());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchDistrictFromProvince(ProvinceID));
  }, [dispatch, ProvinceID]);
  useEffect(() => {
    dispatch(fetchWardFromDistrict(DistrictID));
  }, [dispatch, DistrictID]);
  const DataProvince = useSelector((state) => state.address.Province);
  const DataDistrict = useSelector((state) => state.address.District);
  const DataWard = useSelector((state) => state.address.Ward);

  const newDataProvince = DataProvince.map(
    ({ Name: label, Code: id, ...rest }) => ({ label, id, ...rest })
  );

  const newDataDistrict = DataDistrict.map(
    ({ Name: label, Code: id, ...rest }) => ({ label, id, ...rest })
  );
  const newDataWard = DataWard.map(({ Name: label, Code: id, ...rest }) => ({
    label,
    id,
    ...rest,
  }));
  const onChangeGender = (e, value) => {
    setGender(value.id === 1);
  };
  const SaveNewAddress = (ID, body) => {
    dispatch(AddSaveAddress(ID, body))
      .then((res) => {
        toast("Add new address successful", {
          type: "success",
          autoClose: 1000,
          Close: setTimeout(
            () => window.location.replace(`/address-detail/${ID}`),
            1000
          ),
        });
      })
      .catch((err) => {
        toast("Add new address fail", {
          type: "error",
          autoClose: 1000,
          Close: setTimeout(
            () => window.location.replace(`/address-detail/${ID}`),
            1000
          ),
        });
      });
  };
  const handleButtonConfirm = (e) => {
    if (districtName === "" || wardName === "") {
      toast("Need select District and Ward", {
        type: "error",
        autoClose: 1000,
      });
    } else {
      const body = new SaveAddressForm({
        user_id: ID,
        name: name,
        gender: gender,
        phone: phone,
        province_code: ProvinceID,
        district_code: DistrictID,
        ward_code: WardID,
        street: street,
      });

      SaveNewAddress(ID, body);
    }
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
