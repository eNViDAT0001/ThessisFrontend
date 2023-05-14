import React, { useCallback, useEffect, useRef, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import {
  checkObjectEmpty,
  convertVNDToUSD,
  currencyFormat,
} from "../../../app/hook/CommonHook";

import {
  useListItemInCartSelected,
  useTotalPrice,
} from "../../../app/hook/CartHook";
import { useFormAddressSelected } from "../../../app/hook/AddressHook";
import { useUserID } from "../../../app/hook/UserHook";
import {
  addNewOrder,
  afterProcessPayment,
  changePropListItem,
  getListIDCart,
} from "../../../app/hook/OrderHook";

export const Bill = () => {
  const userID = useUserID();
  const listItem = useListItemInCartSelected();
  const addressForm = useFormAddressSelected();
  const totalPrice = useTotalPrice();
  const paypalRef = useRef(null);
  const createNewOrder = async () => {
    const body = {
      user_id: userID,
      name: "LE QUOC KHANH",
      gender: true,
      phone: "0945958952",
      province: "TP HCM",
      district: "Q12",
      ward: "Chis hau",
      street: "KTX KHU A",
      total: parseInt(totalPrice),
      quantity: 30,
      status_description: "Provider Will call you soon",
      discount: 0,
      items: changePropListItem(listItem),
      cart_items_ids: getListIDCart(listItem),
    };
    console.log("body in Add order", body);
    const res = await addNewOrder(body);
    return res;
  };

  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions) => {
          return createNewOrder().then((data) => {
            return actions.order.create({
              purchase_units: [
                {
                  description: "Ahihi",
                  amount: {
                    currency_code: "USD",
                    value: convertVNDToUSD(parseInt(totalPrice)),
                  },
                },
              ],
            });
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          return createNewOrder().then((res) => {
            return afterProcessPayment(order, userID, res);
          });
        },
        onError: (err) => {
          console.log(err);
        },
      })
      .render();
  }, [totalPrice, userID]);
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
      <div className="max-w-[200px]">
        <div ref={paypalRef} />
      </div>
    </div>
  );
};
