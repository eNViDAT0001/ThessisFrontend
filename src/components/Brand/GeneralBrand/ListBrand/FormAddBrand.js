import React, { useEffect, useState } from "react";
import { Button, IconButton, TextField } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import { PhotoCamera } from "@mui/icons-material";
import { FileApi } from "../../../../api/FileApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import { ProviderApi } from "../../../../api/ProviderApi";
const OPTION = {
  input: "input",
  upload: "upload",
};
export const FormAddBrand = () => {
  const [optionButton, setOptionButton] = useState(OPTION.input);
  const [name, setName] = useState();
  const [fileUpload, setFileUpload] = useState();
  const handleButtonInput = (e) => {
    setOptionButton(e.target.value);
  };
  const handleButtonUpload = (e) => {
    setOptionButton(e.target.value);
  };
  const UploadFile = async (body) => {
    await FileApi.UploadNewPicture(body).then((res) => {
      toast("Up ảnh thành công", {
        type: "success",
        autoClose: 1000,
      });
      setFileUpload(res.data.data[0].url);
    });
  };
  const handleTextImage = (e) => {
    setFileUpload(e.currentTarget.value);
  };
  const handleNameText = (e) => {
    setName(e.currentTarget.value);
  };
  const handleButtonUploadFile = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("files", file);

    UploadFile(formData);
  };

  const AddNewBrand = async (id, body) => {
    await ProviderApi.AddNewBrand(id, body).then((res) => {
      toast("Add brand success", {
        type: "success",
        autoClose: 1000,
        onClose: setTimeout(() => {
          window.location.reload();
        }, 1000),
      });
    });
  };
  const handleButtonAdd = (e) => {
    if (!name) {
      toast("Missing name brand", {
        type: "warning",
        autoClose: 1000,
      });
    } else if (!fileUpload) {
      toast("Missing image brand", {
        type: "warning",
        autoClose: 1000,
      });
    } else {
      const id = parseInt(localStorage.getItem("UserID"));
      const body = {
        user_id: id,
        name: name,
        image_path: fileUpload,
      };
      AddNewBrand(id, body);
    }
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
        {fileUpload ? (
              <img
                src={fileUpload}
                alt="Anh upload"
                className="w-[200px] h-[200px]"
              ></img>
            ) : (
              <div></div>
            )}
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
