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
import { useDispatch } from "react-redux";

import Pagination from "@mui/material/Pagination";

import {
  addNewCoupon,
  changeQuantityInProductInAddCoupon,
  selectProductInAddCoupon,
  useFetchAllProductInFormAddCoupon,
  useFilterProductInAddCoupon,
  useListProductInAddCoupon,
  useMetaProductInAddCoupon,
} from "../../../../app/hook/CouponHook";
import { useUserID } from "../../../../app/hook/UserHook";
import {
  checkObjectEmpty,
  convertObjectToStringQuery,
  getSelectedIds,
  getSelectedIdsAndQuantity,
} from "../../../../app/hook/CommonHook";
import { setListProductInAddCoupon } from "../../../../app/slices/CouponSlice";
import {
  setMarkerInProductInAddCoupon,
  setNameInProductInAddCoupon,
} from "../../../../app/slices/QuerySlice";
import { Slider } from "@mui/material";

export const FormAddCoupon = () => {
  const dispatch = useDispatch();

  let timeoutId;
  const [code, setCode] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [fixed, setFixed] = useState(0);

  const filterInProductAdd = useFilterProductInAddCoupon() || {};
  const listProductInForm = useListProductInAddCoupon() || [];
  const metaInProductInAddBanner = useMetaProductInAddCoupon() || {};
  const userID = useUserID();

  const handleInputCode = (e) => {
    setCode(e.target.value);
  };

  const handleSetDiscount = (e) => {
    setDiscount(e.target.value);
  };

  const handleSetFixed = (e) => {
    setFixed(e.target.value);
  };

  useFetchAllProductInFormAddCoupon(
    userID,
    convertObjectToStringQuery(filterInProductAdd)
  );

  const handleCheckProduct = (productID) => {
    const newProduct = selectProductInAddCoupon(listProductInForm, productID);
    dispatch(setListProductInAddCoupon(newProduct));
  };

  const handleChangePage = (e, value) => {
    dispatch(setMarkerInProductInAddCoupon(value));
  };

  const handleChangeSearchText = (event) => {
    clearTimeout(timeoutId);
    const textEvent = event.target.value;
    setTimeout(() => {
      dispatch(setNameInProductInAddCoupon(textEvent));
    }, 200);
  };

  const handleChangeSlider = (value, Id) => {
    const newProduct = changeQuantityInProductInAddCoupon(
      listProductInForm,
      Id,
      value
    );
    dispatch(setListProductInAddCoupon(newProduct));
  };
  const handleAddBanner = (e) => {
    const body = {
      user_id: userID,
      code: code,
      percent: parseInt(discount),
      fixed: parseInt(fixed),
      products: getSelectedIdsAndQuantity(listProductInForm),
    };
    addNewCoupon(userID, body);
  };

  return (
    <div className="w-full p-10 border space-y-5">
      <ToastContainer position="top-right" newestOnTop />

      <div className="flex flex-row  space-x-11 items-center">
        <h1 className="font-semibold whitespace-nowrap ">Code :</h1>
        <TextField
          required
          sx={{ width: 0.75 }}
          size="small"
          id="outlined-required"
          onChange={handleInputCode}
          label="Code"
        />
      </div>

      <div className="flex flex-row  space-x-8 items-center">
        <h1 className="font-semibold whitespace-nowrap ">Percent:</h1>
        <TextField
          required
          sx={{ width: 0.2 }}
          size="small"
          id="outlined-required"
          onChange={handleSetDiscount}
          label="Percent"
        />
      </div>

      <div className="flex flex-row  space-x-11 items-center">
        <h1 className="font-semibold whitespace-nowrap ">Fixed:</h1>
        <TextField
          required
          sx={{ width: 0.2 }}
          size="small"
          id="outlined-required"
          onChange={handleSetFixed}
          label="Fixed"
        />
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
              >
                <div>
                  <div className="flex flex-row items-center">
                    <Checkbox
                      id={data.id}
                      checked={data.isSelected}
                      onClick={() => handleCheckProduct(data.id)}
                    />
                    <Slider
                      size="small"
                      onChange={(newValue) =>
                        handleChangeSlider(newValue.target.value, data.id)
                      }
                      defaultValue={data.quantity}
                      aria-label="Small"
                      valueLabelDisplay="auto"
                    />
                  </div>
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
