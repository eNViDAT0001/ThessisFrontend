import React from "react";
import { useState } from "react";
import { uploadFile } from "../../../../app/hook/FileHook";
import { PhotoCamera } from "@mui/icons-material";
import { IconButton, Button } from "@mui/material";
import { updateStatusDelivered } from "../../../../app/hook/OrderHook";

export const FormUpdateStatus = ({ id }) => {
  const [image, setImage] = useState(null);

  const handleButtonUploadFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("files", file, file.name);
      uploadFile(formData).then((res) => {
        setImage(res.data[0]);
      });
    }
  };

  const handleButtonUpdate = (e) => {
    const body = {
      status: "DELIVERED",
      image: image.url,
    };
    updateStatusDelivered(id, body);
  };
  return (
    <div className=" px-6">
      {" "}
      <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-bold mb-4">Update order #{id}</h2>
          <div className="flex flex-col space-y-4">
            <div className="flex flex-row space-x-4">
              <p>Status: </p>
              <h1>Delivered</h1>
            </div>
            <div className="flex flex-row space-x-4 items-center">
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="label"
                onChange={handleButtonUploadFile}
              >
                <input hidden accept="image/*" type="file" />
                <PhotoCamera />
              </IconButton>
              {image && (
                <img
                  src={image.url}
                  className="w-[100px] h-[100px]"
                  alt="anh san pham"
                />
              )}
            </div>
            <div className="flex flex-row-reverse pr-10">
              <Button variant="contained" onClick={handleButtonUpdate}>
                Update
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
