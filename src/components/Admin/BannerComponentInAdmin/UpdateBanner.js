import React, { useEffect } from "react";
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
  selectProductInProductInUpdateBanner,
  selectProductOutProductInUpdateBanner,
  updateTheBanner,
  useBannerDetailInUpdate,
  useProductInUpdateBanner,
  useProductOutInUpdateBanner,
} from "../../../app/hook/BannerHook";
import Pagination from "@mui/material/Pagination";
import {
  checkObjectEmpty,
  convertDate,
  getSelectedIds,
} from "../../../app/hook/CommonHook";
import {
  setListProductInUpdateBanner,
  setListProductOutInUpdateBanner,
} from "../../../app/slices/BannerSlice";
import { setNameInProductInUpdateBanner } from "../../../app/slices/QuerySlice";
import { useUserID } from "../../../app/hook/UserHook";

export const UpdateBanner = (props) => {
  const dispatch = useDispatch();
  const bannerID = props.id.toString();
  let timeoutId;
  const [title, setTitle] = useState(null);
  const [collection, setCollection] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [newImage, setNewImage] = useState(null);
  const [endTime, setEndTime] = useState(Date.now());

  const listProductOutInForm = useProductOutInUpdateBanner() || [];
  const listProductInUpdateBanner = useProductInUpdateBanner() || [];
  const userID = useUserID();

  const bannerDetail = useBannerDetailInUpdate();

  useEffect(() => {
    if (!checkObjectEmpty(bannerDetail)) {
      setTitle(bannerDetail.title);
      setCollection(bannerDetail.collection);
      setDiscount(bannerDetail.discount);
      setEndTime(convertDate(bannerDetail.endTime));
    }
  }, [bannerDetail]);
  const handleInputTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleInputCollection = (e) => {
    setCollection(e.target.value);
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

  const handleCheckProductIn = (productID) => {
    const newProduct = selectProductInProductInUpdateBanner(
      listProductInUpdateBanner,
      productID
    );
    dispatch(setListProductInUpdateBanner(newProduct));
  };

  const handleCheckProductOut = (productID) => {
    const newProduct = selectProductOutProductInUpdateBanner(
      listProductOutInForm,
      productID
    );
    dispatch(setListProductOutInUpdateBanner(newProduct));
  };

  const handleChangeDataPicker = (e) => {
    setEndTime(e.target.value);
  };
  const handleChangeSearchText = (event) => {
    clearTimeout(timeoutId);
    const textEvent = event.target.value;
    setTimeout(() => {
      dispatch(setNameInProductInUpdateBanner(textEvent));
    }, 200);
  };

  const handleAddBanner = (e) => {
    const body = {
      title: title,
      collection: collection,
      discount: parseInt(discount),
      end_time: endTime,
      image: newImage,
      product_ids_in: getSelectedIds(listProductInUpdateBanner),
      product_ids_out: getSelectedIds(listProductOutInForm),
    };
    updateTheBanner(bannerID, userID, body);
  };
  return (
    <div className="w-full p-10 border space-y-5">
      <ToastContainer position="top-right" newestOnTop />
      <div className="flex flex-row  space-x-14 items-center">
        <h1 className="font-semibold whitespace-nowrap ">Title :</h1>
        <TextField
          required
          sx={{ width: 0.75 }}
          size="small"
          id="outlined-required"
          onChange={handleInputTitle}
          defaultValue={bannerDetail.title}
          label="title"
        />
      </div>
      <div className="flex flex-row  space-x-4 items-center">
        <h1 className="font-semibold whitespace-nowrap ">Collection :</h1>
        <TextField
          required
          sx={{ width: 0.75 }}
          size="small"
          id="outlined-required"
          onChange={handleInputCollection}
          defaultValue={bannerDetail.collection}
          label="collection"
        />
      </div>
      <div className="flex flex-row  space-x-7 items-center">
        <h1 className="font-semibold whitespace-nowrap ">Discount:</h1>
        <TextField
          required
          sx={{ width: 0.2 }}
          size="small"
          id="outlined-required"
          onChange={handleSetDiscount}
          defaultValue={bannerDetail.discount}
          label="discount"
        />
      </div>
      <div className="flex flex-row  space-x-4 items-start">
        <div className="flex flex-row items-center">
          <h1 className="font-semibold whitespace-nowrap ">Old Image :</h1>
        </div>
        <img
          src={bannerDetail.image}
          alt="anh category"
          className="w-[150px] h-[150px]"
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
              defaultValue={convertDate(bannerDetail.endTime)}
              onChange={handleChangeDataPicker}
              sx={{ width: 1 }}
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
            Insert product in banner:
          </h1>
          <div>
            <Paper
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: 1,
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
        {listProductInUpdateBanner.length !== 0 && (
          <div className="w-full border flex flex-row justify-start flex-wrap mt-[50px]">
            {listProductInUpdateBanner.map((data) => (
              <div
                key={data.id}
                className="w-[20%] h-[300px] border my-5 mx-5 mb-10 hover:scale-105 p-2 hover:border"
                onClick={() => handleCheckProductIn(data.id)}
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
                  <h1 className="font-['Poppins_Regular'] text-gray-400 hover:text-blue-400 text-base font-bold">
                    {data.name}
                  </h1>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-col  space-x-4 items-start">
        <div className="flex flex-row items-center space-x-5">
          <h1 className="font-semibold whitespace-nowrap ">
            Remove product from banner:
          </h1>
        </div>
        {listProductOutInForm.length !== 0 && (
          <div className="w-full border flex flex-row justify-start flex-wrap mt-[50px]">
            {listProductOutInForm.map((data) => (
              <div
                key={data.id}
                className="w-[20%] h-[300px] border my-5 mx-5 mb-10 hover:scale-105 p-2 hover:border"
                onClick={() => handleCheckProductOut(data.id)}
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
                  <h1 className="font-['Poppins_Regular'] text-gray-400 hover:text-blue-400 text-base font-bold">
                    {data.name}
                  </h1>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-row-reverse">
        <Button variant="contained" onClick={handleAddBanner}>
          Update
        </Button>
      </div>
    </div>
  );
};
