import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { FileApi } from "../../../api/FileApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addFileInDescription,
  addFileInMedia,
  setDescriptionName,
  setMedia,
} from "../../../store/slices/AddProductSlice";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { TextField } from "@mui/material";

export const AddDescriptions = () => {
  const dispatch = useDispatch();

  const descriptionNameSelector = useSelector(
    (state) => state.addProduct.description_name
  );
  const descriptionMdSelector = useSelector(
    (state) => state.addProduct.description_md
  );

  const handleButtonUploadFile = (e) => {
    const file = e.target.files[0];
    dispatch(addFileInDescription(file));
    const formData = new FormData();
    formData.append("files", file);
  };

  const handleInputName = (e) => {
    dispatch(setDescriptionName(e.target.value));
  };
  return (
    <div className="p-10 border rounded-2xl space-y-6">
      <ToastContainer position="top-right" newestOnTop />
      <div className="flex flex-row items-center space-x-4">
        <h1 className="font-semibold">Name description:</h1>
        <TextField
          required
          sx={{ width: 0.75 }}
          size="small"
          onChange={handleInputName}
          id="outlined-required"
          label="Name"
        />
      </div>

      <div className="flex flex-row justify-start space-x-4 items-center">
        <h1 className="font-semibold">Upload Your File Markdown:</h1>
        <IconButton
          color="primary"
          aria-label="upload picture"
          onChange={handleButtonUploadFile}
          component="label"
        >
          <input hidden accept="image/*" type="file" />
          <FileUploadIcon />
        </IconButton>
      </div>
      <div className="flex justify-start space-x-2">
        {descriptionMdSelector.length !== 0 ? (
          descriptionMdSelector.map((data) => (
            <div>
              <CheckBoxIcon />
              <h1>{data.name}</h1>
            </div>
          ))
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};
