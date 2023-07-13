import React from "react";
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
import { useDispatch } from "react-redux";
import {
  addNewBanner,
  selectProductInAddBanner,
  useFetchListProductInAddBanner,
  useFilterInProductInAddBanner,
  useMetaInProductInAddBanner,
  useProductInAddBanner,
} from "../../../app/hook/BannerHook";
import Pagination from "@mui/material/Pagination";
import {
  checkObjectEmpty,
  convertObjectToStringQuery,
  getSelectedIds,
} from "../../../app/hook/CommonHook";
import { setListProductInAddBanner } from "../../../app/slices/BannerSlice";
import {
  setNameInProductInAddBanner,
  setPageInProductInAddBanner,
} from "../../../app/slices/QuerySlice";
import { useUserID } from "../../../app/hook/UserHook";


export const AddBanner = () => {
  const dispatch = useDispatch();

  let timeoutId;
  const [title, setTitle] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [newImage, setNewImage] = useState(null);
  const [endTime, setEndTime] = useState(Date.now());

  const filterInProductAdd = useFilterInProductInAddBanner();
  const listProductInForm = useProductInAddBanner() || [];
  const metaInProductInAddBanner = useMetaInProductInAddBanner() || {};
  const userID = useUserID();

  const handleInputTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleSetDiscount = (e) => {
    setDiscount(e.target.value);
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

  useFetchListProductInAddBanner(
    convertObjectToStringQuery(filterInProductAdd)
  );

  const handleCheckProduct = (productID) => {
    const newProduct = selectProductInAddBanner(listProductInForm, productID);
    dispatch(setListProductInAddBanner(newProduct));
  };

  const handleChangePage = (e, value) => {
    dispatch(setPageInProductInAddBanner(value));
  };

  const handleChangeDataPicker = (e) => {
    setEndTime(e.target.value);
  };

  const handleChangeSearchText = (event) => {
    clearTimeout(timeoutId);
    const textEvent = event.target.value;
    setTimeout(() => {
      dispatch(setNameInProductInAddBanner(textEvent));
    }, 200);
  };

  const handleAddBanner = (e) => {
    const body = {
      user_id: userID,
      title: title,
      discount: parseInt(discount),
      end_time: endTime,
      image: newImage,
      product_ids: getSelectedIds(listProductInForm),
    };
    console.log(body)
    addNewBanner(body);
  };

  return (
    <div className="w-full p-10 border space-y-5">
      <ToastContainer position="top-right" newestOnTop />

      <div className="flex flex-row  space-x-11 items-center">
        <h1 className="font-semibold whitespace-nowrap ">Title :</h1>
        <TextField
          required
          sx={{ width: 0.75 }}
          size="small"
          id="outlined-required"
          onChange={handleInputTitle}
          label="title"
        />
      </div>
     
      <div className="flex flex-row  space-x-5 items-center">
        <h1 className="font-semibold whitespace-nowrap ">Discount:</h1>
        <TextField
          required
          sx={{ width: 0.2 }}
          size="small"
          id="outlined-required"
          onChange={handleSetDiscount}
          label="discount"
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
      <div className="flex flex-row items-start">
        <div className="flex flex-row items-center space-x-4">
          <h1 className="font-semibold whitespace-nowrap ">End time :</h1>
          <div>
            <TextField
              id="date"
              label="Birthday"
              type="date"
              defaultValue={endTime}
              onChange={handleChangeDataPicker}
              sx={{ width: 220 }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col  space-x-4 items-start">
        <div className="flex flex-row items-center space-x-5">
          <h1 className="font-semibold whitespace-nowrap ">
            Select your product:
          </h1>
          <div>
            <Paper
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: 400,
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search Here"
                onChange={handleChangeSearchText}
                inputProps={{ "aria-label": "search google maps" }}
              />
              <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
              </IconButton>
              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            </Paper>
          </div>
        </div>
        {listProductInForm.length !== 0 && (
          <div className="w-full border flex flex-row justify-start flex-wrap mt-[50px]">
            {listProductInForm.map((data) => (
              <div
                key={data.id}
                className="w-[20%] h-[300px] border my-5 mx-5 mb-10 hover:scale-105 p-2 hover:border"
                onClick={() => handleCheckProduct(data.id)}
              >
                <div>
                  <Checkbox id={data.id} checked={data.isSelected} />
                  <img
                    src={data.media[0].mediaPath}
                    alt="img product"
                    className="h-[200px] w-full"
                  />
                </div>
                <div className="flex flex-row mt-2">
                  <h1 className="font-['Josefin_Sans'] text-gray-400 hover:text-blue-400 text-base font-bold">
                    {data.name}
                  </h1>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {!checkObjectEmpty(metaInProductInAddBanner) && (
        <div className="flex justify-center">
          <Pagination
            count={metaInProductInAddBanner.paging.Pages}
            defaultPage={metaInProductInAddBanner.paging.Current}
            onChange={handleChangePage}
          />
        </div>
      )}
      <div className="flex flex-row-reverse">
        <Button variant="contained" onClick={handleAddBanner}>
          Add
        </Button>
      </div>
    </div>
  );
};
