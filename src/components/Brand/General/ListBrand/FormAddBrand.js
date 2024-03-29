import React, { useState } from "react";
import { Autocomplete, Button, IconButton, TextField } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { ToastContainer } from "react-toastify";
import { uploadFile } from "../../../../app/hook/FileHook";
import { PhotoCamera } from "@mui/icons-material";
import { useAddFormBrand, addNewBrand } from "../../../../app/hook/BrandHook";
import { useDispatch } from "react-redux";
import {
  setFileUploadInAddForm,
  setNameInAddForm,
} from "../../../../app/slices/BrandSlice";
import { useUserID } from "../../../../app/hook/UserHook";
import { toast } from "react-toastify";

import {
  changeAttributeForOptionInDistrict,
  changeAttributeForOptionInProvince,
  changeAttributeForOptionInWard,
  useDistrict,
  useFetchInformationInAddAddressInAddBrand,
  useProvince,
  useWard,
} from "../../../../app/hook/AddressHook";
import { useLanguage } from "../../../../app/hook/LanguageHook";

const OPTION = {
  input: "input",
  upload: "upload",
};

export const FormAddBrand = () => {
  const dispatch = useDispatch();

  const userID = useUserID();
  const language = useLanguage();
  const [optionButton, setOptionButton] = useState(OPTION.input);
  const addFormBrand = useAddFormBrand();
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

  const handleNameText = (e) => {
    dispatch(setNameInAddForm(e.target.value));
  };

  const handleButtonInput = (e) => {
    setOptionButton(e.target.value);
  };

  const handleButtonUpload = (e) => {
    setOptionButton(e.target.value);
  };

  const handleTextImage = (e) => {
    dispatch(setFileUploadInAddForm(e.target.value));
  };

  const handleInputStreet = (e) => {
    setStreet(e.target.value);
  };

  const handleButtonUploadFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("files", file, file.name);
      uploadFile(formData).then((res) => {
        dispatch(setFileUploadInAddForm(res.data[0].url));
      });
    }
  };

  const handleButtonAdd = (e) => {
    if (
      !addFormBrand.name ||
      !addFormBrand.image_path ||
      !provinceID ||
      !districtID ||
      !wardID
    ) {
      toast("Must fill all information", {
        type: "warning",
        autoClose: 1000,
      });
    } else {
      const body = {
        name: addFormBrand.name,
        image_path: addFormBrand.image_path,
        province_id: parseInt(JSON.stringify(provinceID)),
        district_id: parseInt(JSON.stringify(districtID)),
        ward_code: wardID,
        province: provinceName,
        district: districtName,
        ward: wardName,
        street: street,
      };
      addNewBrand(userID, body);
    }
  };

  useFetchInformationInAddAddressInAddBrand(provinceID, districtID);
  return (
    <div className="flex flex-col space-y-5 px-5 w-full min-w-[350px] my-10">
      <ToastContainer position="top-right" newestOnTop />
      <h1 className=" text-xl font-bold">
        {language ? "Thêm cửa hàng của bạn:" : "Add your brand:"}
      </h1>
      <div className="border space-y-6 p-4 rounded-md shadow-md">
        <div className="flex flex-row justify-around  items-center">
          <h1 className=" text-lg font-bold mr-2 ">
            {language ? "Tên:" : "Name:"}
          </h1>
          <div className="w-full px-10">
            <TextField
              sx={{
                width: 1,
              }}
              id="outlined-basic"
              label="Write new brand's name here"
              size="small"
              onChange={handleNameText}
              multiline
              maxRows={4}
            />
          </div>
        </div>
        <div className="flex flex-row space-x-5 items-center">
          <h1 className=" text-lg font-bold mr-2 ">
            {language ? "Địa chỉ:" : " Address:"}
          </h1>
          <div className="flex flex-col">
            <div className="flex flex-row  space-x-4">
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={newDataProvince}
                onChange={onChangeProvince}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                sx={{ width: 200 }}
                renderInput={(params) => (
                  <TextField {...params} label="Province" />
                )}
              />
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={newDataDistrict}
                value={districtName}
                onChange={onChangeDistrict}
                sx={{ width: 150 }}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={(params) => (
                  <TextField {...params} label="District" />
                )}
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
          <div className="w-full pr-10">
            <TextField
              required
              id="outlined-required"
              onChange={handleInputStreet}
              label="Street"
              sx={{ width: 1 }}
            />
          </div>
        </div>

        {optionButton === OPTION.input ? (
          <div className="flex flex-row justify-around space-y-2 items-center">
            <h1 className="text-lg font-bold  whitespace-nowrap">
              {language ? "Ảnh :" : "  Image :"}
            </h1>
            <div className="w-full px-10">
              <TextField
                sx={{
                  width: 1,
                }}
                id="outlined-basic"
                label="Input url image here"
                size="small"
                multiline
                onChange={handleTextImage}
                maxRows={4}
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-row items-center">
            <h1 className=" text-xl font-bold  whitespace-nowrap">
              {language ? "Tải ảnh từ máy bạn" : "Upload your file:"}
            </h1>
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="label"
              onChange={handleButtonUploadFile}
            >
              <input hidden accept="image/*" type="file" />
              <PhotoCamera />
            </IconButton>
          </div>
        )}
        <FormControl>
          <FormLabel id="demo-row-radio-buttons-group-label">
            {language ? "Lựa chọn" : " Option about image"}
          </FormLabel>
          <RadioGroup row name="row-radio-buttons-group">
            <FormControlLabel
              value={OPTION.input}
              checked={optionButton === OPTION.input}
              onClick={handleButtonInput}
              control={<Radio />}
              label={language ? "Nhập url" : "Input url"}
            />
            <FormControlLabel
              value={OPTION.upload}
              checked={optionButton === OPTION.upload}
              onClick={handleButtonUpload}
              control={<Radio />}
              label={language ? "Tải ảnh từ máy" : "Upload"}
            />
          </RadioGroup>
        </FormControl>
        {addFormBrand.image_path && (
          <img
            src={addFormBrand?.image_path}
            alt="Anh upload"
            className="w-[200px] h-[200px]"
          ></img>
        )}
        <div className="flex flex-row-reverse pr-10">
          <Button variant="contained" onClick={handleButtonAdd}>
            {" "}
            {language ? "Thêm" : "Add"}
          </Button>
        </div>
      </div>
    </div>
  );
};
