import React, { useEffect, useRef, useState } from "react";
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
import {
  useAddressInFormCreate,
  useFormAddressSelected,
  useIsCheckSelected,
} from "../../../app/hook/AddressHook";
import { useUserID } from "../../../app/hook/UserHook";
import {
  addNewOrder,
  addNewOrderCOD,
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
  const addressFormCreated = useAddressInFormCreate();
  const totalPrice = useTotalPrice();
  const paypalRef = useRef(null);
  const [totalShippingCost, setTotalShippingCost] = useState(0);
  const dataShippingCost = useDataShippingCost();
  const isCheckSelected = useIsCheckSelected();

  const createNewOrder = async () => {
    const addressFormPayment = JSON.parse(
      localStorage.getItem("addressInOrder")
    );
    if (!checkObjectEmpty(addressFormPayment)) {
      const body = {
        user_id: userID,
        name: addressFormPayment.name && "Đạt",
        gender: addressFormPayment.gender && false,
        phone: addressFormPayment.phone && "0945958952",
        province: addressFormPayment.province,
        district: addressFormPayment.district,
        ward: addressFormPayment.ward,
        street: addressFormPayment.street,
        total: parseInt(totalPrice),
        quantity: 30,
        status_description: "Provider Will call you soon",
        discount: 0,
        items: changePropListItem(listItem),
        cart_items_ids: getListIDCart(listItem),
      };
      try {
        const res = await addNewOrder(body);
        return res;
      } catch (err) {
        console.log(err);
        return null;
      }
    }
  };

  useEffect(() => {
    if (isCheckSelected) {
      localStorage.removeItem("addressInOrder");
      localStorage.setItem("addressInOrder", JSON.stringify(addressForm));
    } else {
      localStorage.removeItem("addressInOrder");
      localStorage.setItem(
        "addressInOrder",
        JSON.stringify(addressFormCreated)
      );
    }
  }, [addressForm, isCheckSelected, addressFormCreated]);

  const handleButtonPaymentCOD = (e) => {
    if (isCheckSelected) {
      if (!checkObjectEmpty(addressForm)) {
        const body = {
          user_id: userID,
          name: addressForm.name,
          gender: addressForm.gender,
          phone: addressForm.phone,
          province: addressForm.province,
          district: addressForm.district,
          cod: true,
          ward: addressForm.ward,
          street: addressForm.street,
          total: parseInt(totalPrice),
          quantity: 30,
          status_description: "Provider Will call you soon",
          discount: 0,
          items: changePropListItem(listItem),
          cart_items_ids: getListIDCart(listItem),
        };
        addNewOrderCOD(body, userID);
      }
    } else {
      const body = {
        user_id: userID,
        name: addressFormCreated.name,
        gender: addressFormCreated.gender,
        cod: true,
        phone: addressFormCreated.phone,
        province: addressFormCreated.province,
        district: addressFormCreated.district,
        ward: addressFormCreated.ward,
        street: addressFormCreated.street,
        total: parseInt(totalPrice),
        quantity: 30,
        status_description: "Provider Will call you soon",
        discount: 0,
        items: changePropListItem(listItem),
        cart_items_ids: getListIDCart(listItem),
      };
      addNewOrderCOD(body, userID);
    }
  };

  useEffect(() => {
    if (window.myButton) window.myButton.close();
    window.myButton = window.paypal.Buttons({
      createOrder: (data, actions) => {
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
      },
      style: {
        layout: "horizontal",
        fundingicons: false,
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
        <div className="flex flex-col">
          <h1 className=" text-[#1D3178] text-lg">Shipping :</h1>
          <h1 className=" text-[#1D3178] text-xs italic">
            (Shipping is for reference only)
          </h1>
        </div>

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
        onClick={handleButtonPaymentCOD}
        variant="contained"
        color="success"
        className="w-full"
      >
        COD
      </Button>
      <div className="">
        <div ref={paypalRef} />
      </div>
    </div>
  );
};
