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
  useDataShippingCost,
} from "../../../app/hook/OrderHook";
import { Button } from "@mui/material";

export const Bill = () => {
  const userID = useUserID();
  const listItem = useListItemInCartSelected();
  const addressForm = useFormAddressSelected();
  const totalPrice = useTotalPrice();
  const paypalRef = useRef(null);
  const [totalShippingCost, setTotalShippingCost] = useState(0);
  const dataShippingCost = useDataShippingCost();
  const createNewOrder = async () => {
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
      await addNewOrder(body).then((res) => {
        return res;
      });
    }
  };

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
  useEffect(() => {
    if (window.myButton) window.myButton.close();
    window.myButton = window.paypal.Buttons({
      createOrder: (data, actions) => {
        return createNewOrder().then((data) => {
          return actions.order.create({
            purchase_units: [
              {
                description: "Ahihi",
                amount: {
                  currency_code: "USD",
                  value: convertVNDToUSD(
                    parseInt(totalPrice) + totalShippingCost
                  ),
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
    });
    window.myButton.render(paypalRef.current);
  }, [userID]);

  useEffect(() => {
    if (dataShippingCost) {
      const totalSum = dataShippingCost.reduce(
        (sum, obj) => sum + obj.total,
        0
      );
      setTotalShippingCost(totalSum);
    }
  }, [dataShippingCost]);
  return (
    <div className=" bg-[#F4F4FC] p-6 space-y-10">
      <ToastContainer position="top-right" newestOnTop />
      <div className=" border-b-2 border-[#E8E6F1] flex justify-between">
        <h1 className=" text-[#1D3178] text-lg">Subtotal :</h1>
        <h1 className=" text-[#1D3178] text-lg">
          {currencyFormat(totalShippingCost)}Đ
        </h1>
      </div>
      <div className=" border-b-2 border-[#E8E6F1] flex justify-between">
        <h1 className=" text-[#1D3178] text-lg">Total :</h1>
        <h1 className=" text-[#1D3178] text-lg">
          {currencyFormat(parseInt(totalPrice) + totalShippingCost)} Đ
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
      <div className="max-w-[200px]">
        <div ref={paypalRef} />
      </div>
    </div>
  );
};
