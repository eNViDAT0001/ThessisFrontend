import React, { useEffect, useState } from "react";
import { Button, IconButton, TextField } from "@mui/material";
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
} from "../../../../app/slice/BrandSlice";

const OPTION = {
  input: "input",
  upload: "upload",
};

export const FormAddBrand = () => {
  const dispatch = useDispatch();

  const userID = localStorage.getItem("UserID")
  const [optionButton, setOptionButton] = useState(OPTION.input);
  const addFormBrand = useAddFormBrand();

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

  const handleButtonUploadFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("files", file, file.name);
      uploadFile(formData).then(res=>{
        dispatch(setFileUploadInAddForm(res.data[0].url));
      })
    }
  };

  const handleButtonAdd = (e) => {
    const body={
      user_id: userID,
      name: addFormBrand.name,
      image_path: addFormBrand.image_path
    }
    addNewBrand(userID,body)
  };
  return (
    <div className="flex flex-col space-y-5 px-5 w-full min-w-[350px] my-10">
      <ToastContainer position="top-right" newestOnTop />
      <h1 className=" text-xl font-bold">Add your brand:</h1>
      <div className="border space-y-6 p-4 rounded-md shadow-md">
        <div className="flex flex-row justify-around  items-center">
          <h1 className=" text-xl font-bold mr-2 ">Name:</h1>
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

        {optionButton === OPTION.input ? (
          <div className="flex flex-row justify-around space-y-2 items-center">
            <h1 className=" text-xl font-bold  whitespace-nowrap">Image :</h1>
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
              Upload your file:
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
            Option about image
          </FormLabel>
          <RadioGroup row name="row-radio-buttons-group">
            <FormControlLabel
              value={OPTION.input}
              checked={optionButton === OPTION.input}
              onClick={handleButtonInput}
              control={<Radio />}
              label="Input url"
            />
            <FormControlLabel
              value={OPTION.upload}
              checked={optionButton === OPTION.upload}
              onClick={handleButtonUpload}
              control={<Radio />}
              label="Upload file"
            />
          </RadioGroup>
        </FormControl>
        <img
          src={addFormBrand?.image_path}
          alt="Anh upload"
          className="w-[200px] h-[200px]"
        ></img>

        <div className="flex flex-row-reverse pr-10">
          <Button variant="contained" onClick={handleButtonAdd}>
            {" "}
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};
