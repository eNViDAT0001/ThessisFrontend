import React from "react";
import { ToastContainer } from "react-toastify";
import TextField from "@mui/material/TextField";
import {
  updateCategory,
  useCategoryHandleInAdmin,
  useCategoryIDHandleInUpdateTree,
  useListTreeCategoryLogic,
} from "../../../app/hook/CategoryHook";
import Button from "@mui/material/Button";
import { TreeCategoryInUpdateInAdmin } from "./TreeCategoryInUpdateInAdmin";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { uploadFile } from "../../../app/hook/FileHook";
import { useDispatch } from "react-redux";

export const UpdateCategory = () => {
  const dispatch = useDispatch();
  const categoryHandleInAdmin = useCategoryHandleInAdmin();
  const parentID = useCategoryIDHandleInUpdateTree();
  const [name, setName] = useState(categoryHandleInAdmin.name);
  const [newImage, setNewImage] = useState(null);
  const categoryTree = useListTreeCategoryLogic();

  const handleInputName = (e) => {
    setName(e.target.value);
  };

  const handleButtonUploadFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("files", file, file.name);
      uploadFile(formData).then((res) => {
        dispatch(setNewImage(res.data[0].url));
      });
    }
  };

  const handleUpdateCategory = (e) => {
    const body = {
      name: name,
      image_path: newImage,
      category_parent_id: parentID,
    };
    const categoryID = categoryHandleInAdmin.id;
    updateCategory(categoryID, body);
  };
  return (
    <div className="space-y-5">
      <h1 className="text-xl font-bold">Update form</h1>
      <div className="flex justify-start">
        <ToastContainer position="top-right" newestOnTop />
        <div className="w-full p-10 border rounded-2xl space-y-6">
          <div className="flex flex-row  space-x-4 items-center">
            <h1 className="font-semibold whitespace-nowrap ">Name Product:</h1>
            <TextField
              required
              sx={{ width: 0.75 }}
              size="small"
              defaultValue={categoryHandleInAdmin.name}
              id="outlined-required"
              onChange={handleInputName}
              label="Name"
            />
          </div>
          <div className="flex flex-row space-x-10">
            <div className="flex flex-row  space-x-4 items-start">
              <h1 className="font-semibold whitespace-nowrap ">Old Image :</h1>
              {categoryHandleInAdmin.image_path && (
                <img
                  src={categoryHandleInAdmin.image_path}
                  alt="anh category"
                  className="w-[150px] h-[150px]"
                />
              )}
            </div>
            <div className="flex flex-row  space-x-4 items-start">
              <div className="flex flex-row items-center">
                <h1 className="font-semibold whitespace-nowrap ">
                  New Image :
                </h1>
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  onChange={handleButtonUploadFile}
                  component="label"
                >
                  <input hidden accept="image/*" type="file" />
                  <PhotoCamera />
                </IconButton>{" "}
              </div>
              {newImage && (
                <img
                  src={newImage}
                  alt="anh category"
                  className="w-[150px] h-[150px]"
                />
              )}
            </div>
          </div>

          <div className="flex flex-row space-x-4 items-start">
            <h1 className="font-semibold whitespace-nowrap mt-2">
              Select category parent:
            </h1>
            <TreeCategoryInUpdateInAdmin data={categoryTree} idHandle={0} />
          </div>
          <div className="flex flex-row-reverse">
            <Button variant="contained" onClick={handleUpdateCategory}>
              Update
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
