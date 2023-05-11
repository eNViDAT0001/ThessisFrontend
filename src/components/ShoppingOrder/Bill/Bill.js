import React, { useEffect, useRef, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import { checkObjectEmpty, currencyFormat } from "../../../app/hook/CommonHook";
import { Button } from "@mui/material";

import {
  useListItemInCartSelected,
  useTotalPrice,
} from "../../../app/hook/CartHook";
import { useFormAddressSelected } from "../../../app/hook/AddressHook";
import { useUserID } from "../../../app/hook/UserHook";
import {
  addNewOrder,
  changePropListItem,
  getListIDCart,
} from "../../../app/hook/OrderHook";
export const Bill = () => {
  const userID = useUserID();
  const listItem = useListItemInCartSelected();
  const addressForm = useFormAddressSelected();
  const totalPrice = useTotalPrice();

  const [error, setError] = useState(null);
  const paypalRef = useRef();

  const handleButtonPayment = (e) => {
    if (!checkObjectEmpty(addressForm)) {
      const body = {
        user_id: userID,
        name: addressForm.name,
        gender: addressForm.gender,
        phone: addressForm.phone,
        province: addressForm.province,
        district: addressForm.district,
        ward: addressForm.ward,
        street: addressForm.street,
        total: parseInt(totalPrice),
        quantity: 30,
        status_description: "Provider Will call you soon",
        discount: 0,
        items: changePropListItem(listItem),
        cart_items_ids: getListIDCart(listItem),
      };
      addNewOrder(body);
    }
  };

  return (
    <div className=" bg-[#F4F4FC] p-6 space-y-10">
      <ToastContainer position="top-right" newestOnTop />
      <div className=" border-b-2 border-[#E8E6F1] flex justify-between">
        <h1 className=" text-[#1D3178] text-lg">Subtotal :</h1>
        <h1 className=" text-[#1D3178] text-lg">0 Đ</h1>
      </div>
      <div className=" border-b-2 border-[#E8E6F1] flex justify-between">
        <h1 className=" text-[#1D3178] text-lg">Total :</h1>
        <h1 className=" text-[#1D3178] text-lg">
          {currencyFormat(parseInt(totalPrice))} Đ
        </h1>
      </div>
      <Button
        onClick={handleButtonPayment}
        variant="contained"
        color="success"
        className="w-full"
      >
        Process To Checkout
      </Button>
    </div>
  );
};
