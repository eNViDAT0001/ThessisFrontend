import React from "react";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import { useMedia } from "../../../app/hook/ProductHook";
import { uploadFile } from "../../../app/hook/FileHook";
import { useDispatch } from "react-redux";
import { addFileInMedia } from "../../../app/slices/AddProductSlice";
export const AddImage = () => {
  const listMedia = useMedia()
  const dispatch = useDispatch()

  const handleButtonUploadFile = (e) => {
    const file = e.target.files[0];  
    if (file) {
      const formData = new FormData();
      formData.append("files", file, file.name);
      uploadFile(formData).then(res=>{
        dispatch(addFileInMedia(res.data[0]))
      })
    }
  };
  return (
    <div className="p-10 border rounded-2xl space-y-6">
      <ToastContainer position="top-right" newestOnTop />
      <div className="flex flex-row justify-start space-x-4 items-center">
        <h1 className="font-semibold">Upload Your Image:</h1>
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
      <div className="flex justify-start space-x-2">
        {listMedia.length !== 0 ? (
          listMedia.map((data) => (
            <img
              src={data.url}
              alt="anh comment"
              className="w-[150px] h-[150px]"
            ></img>
          ))
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};
