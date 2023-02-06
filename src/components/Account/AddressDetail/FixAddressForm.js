import { Autocomplete, Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SaveAddressForm } from "../../../models/SaveAddressForm/SaveAddressForm";
import {
  fetchAllProvince,
  fetchDistrictFromProvince,
  fetchWardFromDistrict,
} from "../../../store/slices/AddressSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import { AddressApi } from "../../../api/AddressApi";
export const FixAddressForm = (props) => {
  const dispatch = useDispatch();
  const userID = props.userID;
  const addressID = props.addressID.id;
  useEffect(() => {
    dispatch(fetchAllProvince());
  }, [dispatch]);

  const CurrentAddress = JSON.parse(localStorage.getItem("SaveAddressFix"));

  const [ProvinceID, setProvinceID] = useState(CurrentAddress.ProvinceCode);
  const [DistrictID, setDistrictID] = useState(CurrentAddress.DistrictCode);
  const [WardID, setWardID] = useState(CurrentAddress.WardCode);
  const [districtName, setDistrictName] = useState(CurrentAddress.District);
  const [wardName, setWardName] = useState(CurrentAddress.Ward);
  const [disableDistrict, setDisableDistrict] = useState(true);
  const [disableWard, setDisableWard] = useState(true);
  const [name, setName] = useState(CurrentAddress.Name);
  const [phone, setPhone] = useState(CurrentAddress.Phone);
  const [gender, setGender] = useState(CurrentAddress.Gender);
  const [street, setStreet] = useState(CurrentAddress.Street);

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
    setDisableDistrict(false);
    setDistrictName("");
    setWardName("");
    setDisableWard(true);
  };

  const onChangeDistrict = (e, value) => {
    setDistrictID(value.id);
    setDistrictName(value.label);
    setWardName("");
    setDisableWard(false);
  };
  const onChangeWard = (e, value) => {
    setWardID(value.id);
    setWardName(value.label);
  };

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
  const UpdateAddress = async (addressID, userID, body) => {
    await AddressApi.UpdateAddress(addressID, userID, body)
      .then((res) => {
        localStorage.removeItem("SaveAddressFix");
        toast("Update address successful", {
          type: "success",
          autoClose: 2000,
          Close: setTimeout(
            () => window.location.replace(`/address-detail/${userID}`),
            2000
          ),
        });
      })
      .catch((err) => {
        toast("Add new address fail", {
          type: "error",
          autoClose: 2000,
          Close: setTimeout(
            () => window.location.replace(`/address-detail/${userID}`),
            2000
          ),
        });
      });
  };
  const handleButtonConfirm = (e) => {
    if (districtName === "" || wardName === "") {
      toast("Need Select District or Ward", {
        type: "error",
        autoClose: 5000,
      });
    } else {
      const body = new SaveAddressForm({
        name: name,
        gender: gender,
        phone: phone,
        province_code: ProvinceID,
        district_code: DistrictID,
        ward_code: WardID,
        street: street,
      });

      UpdateAddress(addressID, userID, body);
    }
  };
  return (
    <div className="mt-10 ml-10 space-y-10  w-[60%] p-10 py-10 mb-32 border shadow-md w-min-[200px]">
      <ToastContainer position="top-right" newestOnTop />

      <h1 className="ml-4 text-xl text-[#1D3178] font-semibold">
        Fix Address Detail
      </h1>
      <TextField
        required
        id="outlined-required"
        label="Name"
        defaultValue={name}
        onChange={handleNameText}
        sx={{ width: 1 }}
      />
      <div className="flex flex-row space-x-4">
        <TextField
          required
          id="outlined-required"
          onChange={handlePhoneText}
          label="Phone number"
          defaultValue={phone}
          sx={{ width: 1 }}
        />
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          defaultValue={gender ? "Male" : "Female"}
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
        defaultValue={street}
        sx={{ width: 1 }}
      />
      <div className="flex flex-row space-x-4">
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={newDataProvince}
          defaultValue={CurrentAddress.Province}
          onChange={onChangeProvince}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Province" />}
        />
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          disabled={disableDistrict}
          options={newDataDistrict}
          defaultValue={districtName}
          value={districtName}
          onChange={onChangeDistrict}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="District" />}
        />
        <Autocomplete
          disablePortal
          disabled={disableWard}
          id="combo-box-demo"
          onChange={onChangeWard}
          defaultValue={wardName}
          value={wardName}
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
