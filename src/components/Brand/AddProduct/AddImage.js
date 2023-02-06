import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { FileApi } from "../../../api/FileApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import { useDispatch, useSelector } from "react-redux";
import { addFileInMedia, setMedia } from "../../../store/slices/AddProductSlice";
export const AddImage = () => {
  const dispatch = useDispatch();

  const imageSelector = useSelector((state) => state.addProduct.media);
  const [displayUpload, setDisplayUpload] = useState([]);

  const UseApiUploadPicture = async (body) => {
    await FileApi.UploadNewPicture(body).then((res) => {
      toast("Up ảnh thành công", {
        type: "success",
        autoClose: 1000,
      });
      displayUpload.push(res.data.data[0].url);
    });
  };

  const handleButtonUploadFile = (e) => {
    const file = e.target.files[0];

    dispatch(addFileInMedia(file))

    const formDataDisplayImage = new FormData();
    formDataDisplayImage.append("files", file);

    UseApiUploadPicture(formDataDisplayImage);
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
        {displayUpload.length !== 0 ? (
          displayUpload.map((data) => (
            <img
              src={data}
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
