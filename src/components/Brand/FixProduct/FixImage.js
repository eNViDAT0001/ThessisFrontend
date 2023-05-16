import React from "react";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import { useListMediaOld, useMediaFix } from "../../../app/hook/ProductHook";
import { uploadFile } from "../../../app/hook/FileHook";
import { useDispatch } from "react-redux";
import { addFileInMediaFix } from "../../../app/slices/FixProductSlice";
export const FixImage = () => {
  const listMedia = useMediaFix();
  const dispatch = useDispatch();
  const listMediaOld = useListMediaOld();

  const handleButtonUploadFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("files", file, file.name);
      uploadFile(formData).then((res) => {
        dispatch(addFileInMediaFix(res.data[0]));
      });
    }
  };
  return (
    <div className="space-y-7">
      <div className="p-10 border rounded-2xl space-y-6">
        <ToastContainer position="top-right" newestOnTop />
        <div className="flex flex-row justify-start space-x-4 items-center">
          <h1 className="font-semibold">Old Image:</h1>
          {listMediaOld.length !== 0 && (
            <div className=" flex flex-row space-x-6">
              {listMediaOld.map((media) => (
                <div key={media.public_id}>
                  <img
                    src={media.media_path}
                    alt="ahihi"
                    className=" w-[200px] h-[200px]"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
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
          {listMedia.length !== 0 &&
            listMedia.map((data) => (
              <img
                src={data.url}
                alt="anh comment"
                className="w-[150px] h-[150px]"
              ></img>
            ))}
        </div>
      </div>
    </div>
  );
};
