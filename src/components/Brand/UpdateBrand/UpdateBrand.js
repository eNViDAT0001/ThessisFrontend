import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { uploadFile } from "../../../app/hook/FileHook";
import {
  changeAttributeForOptionInDistrict,
  changeAttributeForOptionInProvince,
  changeAttributeForOptionInWard,
  useDistrict,
  useFetchInformationInAddAddressInUpdateBrand,
  useProvince,
  useWard,
} from "../../../app/hook/AddressHook";
import { Autocomplete } from "@mui/material";
import { updateBrand } from "../../../app/hook/BrandHook";
import { useUserID } from "../../../app/hook/UserHook";
export const UpdateBrand = (props) => {
  const brandDetail = props.brandDetail;
  const userId = useUserID();
  const [name, setName] = useState(null);
  const [newImage, setNewImage] = useState(null);
  const [provinceName, setProvinceName] = useState(null);
  const [provinceID, setProvinceID] = useState(null);
  const [districtName, setDistrictName] = useState(null);
  const [districtID, setDistrictID] = useState(null);
  const [wardName, setWardName] = useState(null);
  const [wardID, setWardID] = useState(null);
  const [street, setStreet] = useState(null);

  const dataProvince = useProvince() || [];
  const dataDistrict = useDistrict() || [];
  const dataWard = useWard() || [];

  const newDataProvince = changeAttributeForOptionInProvince(dataProvince);
  const newDataDistrict = changeAttributeForOptionInDistrict(dataDistrict);
  const newDataWard = changeAttributeForOptionInWard(dataWard);

  const handleInputName = (e) => {
    setName(e.target.value);
  };

  const handleButtonUploadFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("files", file, file.name);
      uploadFile(formData).then((res) => {
        setNewImage(res.data[0].url);
      });
    }
  };

  const onChangeProvince = (e, value) => {
    setProvinceName(value.label);
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

  const handleInputStreet = (e) => {
    setStreet(e.target.value);
  };

  const handleUpdateBrand = (e) => {
    const body = {
      name: name,
      image_path: newImage,
      province_id: parseInt(JSON.stringify(provinceID)),
      district_id: parseInt(JSON.stringify(districtID)),
      ward_code: wardID,
      province: provinceName,
      district: districtName,
      ward: wardName,
      street: street,
    };
    updateBrand(props.id, userId, body);
  };

  useEffect(() => {
    if (brandDetail) {
      setName(brandDetail.name);
      setProvinceName(brandDetail.province);
      setProvinceID(brandDetail.province_id);
      setDistrictName(brandDetail.district);
      setDistrictID(brandDetail.district_id);
      setWardName(brandDetail.ward);
      setWardID(brandDetail.ward_code);
      setStreet(brandDetail.street);
    }
  }, [brandDetail]);
  useFetchInformationInAddAddressInUpdateBrand(provinceID, districtID);
  return (
    <div className="w-full p-10 border space-y-5">
      <ToastContainer position="top-right" newestOnTop />
      <div className="flex flex-row  space-x-14 items-center">
        <h1 className="font-semibold whitespace-nowrap ">Name :</h1>
        <TextField
          required
          sx={{ width: 0.75 }}
          size="small"
          id="outlined-required"
          onChange={handleInputName}
          defaultValue={brandDetail.name}
          label="title"
        />
      </div>

      <div className="flex flex-row  space-x-4 items-start">
        <div className="flex flex-row items-center">
          <h1 className="font-semibold whitespace-nowrap ">Old Image :</h1>
        </div>
        <img
          src={brandDetail.image_path}
          alt="anh category"
          className="w-[150px] h-[150px]"
        />
      </div>
      <div className="flex flex-row  space-x-4 items-start">
        <div className="flex flex-row items-center">
          <h1 className="font-semibold whitespace-nowrap ">Upload Image :</h1>
          <IconButton
            color="primary"
            aria-label="upload picture"
            onChange={handleButtonUploadFile}
            component="label"
          >
            <input hidden accept="image/*" type="file" />
            <PhotoCamera />
          </IconButton>
        </div>
        {newImage && (
          <img
            src={newImage}
            alt="anh category"
            className="w-[150px] h-[150px]"
          />
        )}
      </div>

      <div className="flex flex-row space-x-7 items-center">
        <h1 className=" font-semibold whitespace-nowrap ">Address:</h1>
        <div className="flex flex-row  space-x-4">
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={newDataProvince}
            value={provinceName}
            onChange={onChangeProvince}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            sx={{ width: 200 }}
            renderInput={(params) => <TextField {...params} label="Province" />}
          />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={newDataDistrict}
            value={districtName}
            onChange={onChangeDistrict}
            sx={{ width: 150 }}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderInput={(params) => <TextField {...params} label="District" />}
          />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            value={wardName}
            onChange={onChangeWard}
            options={newDataWard}
            sx={{ width: 200 }}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderInput={(params) => <TextField {...params} label="Ward" />}
          />
        </div>
      </div>
      <div className="flex flex-row space-x-11 items-center">
        <h1 className=" font-semibold whitespace-nowrap ">Street:</h1>
        <div className="w-[50%] pr-10">
          <TextField
            required
            id="outlined-required"
            onChange={handleInputStreet}
            label="Street"
            defaultValue={brandDetail.street}
            sx={{ width: 1 }}
          />
        </div>
      </div>
      <div className="flex flex-row-reverse">
        <Button variant="contained" onClick={handleUpdateBrand}>
          Update
        </Button>
      </div>
    </div>
  );
};
