import React, { useRef } from "react";
import {
  afterProcessPayment,
  useOrderHandleDetail,
  verifyOrder,
} from "../../../app/hook/OrderHook";
import {
  checkObjectEmpty,
  convertVNDToUSD,
  currencyFormat,
} from "../../../app/hook/CommonHook";
import { Button, Divider } from "@mui/material";
import { useUserID } from "../../../app/hook/UserHook";
import { useEffect } from "react";

export const DetailOrder = ({ id }) => {
  const orderHandleDetail = useOrderHandleDetail();
  const orderID = id;
  const userID = useUserID();
  const paypalRef = useRef(null);
  const handleButtonConfirm = (e) => {
    verifyOrder(orderID, userID);
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
                value: convertVNDToUSD(parseInt(orderHandleDetail.total)),
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
        return afterProcessPayment(order, userID, orderID);
      },
      onError: (err) => {
        console.log(err);
      },
    });
    window.myButton.render(paypalRef.current);
  }, [userID]);

  return (
    <div className="flex flex-row-reserve flex-1 space-x-5 w-full ">
      {!checkObjectEmpty(orderHandleDetail) && (
        <div className="flex flex-row border rounded-md shadow-md ">
          <div className="p-5 ">
            <h1 className=" font-semibold text-lg">Customer information :</h1>
            <h1>{orderHandleDetail.name}</h1>
            <h1 className=" text-slate-600">{orderHandleDetail.phone}</h1>
            <h1 className=" text-slate-500">{`${orderHandleDetail.street}, ${orderHandleDetail.ward}, ${orderHandleDetail.district}, ${orderHandleDetail.province}`}</h1>
          </div>
          <Divider orientation="vertical" flexItem />
          <div className=" p-5 ">
            <div className="flex justify-between">
              <h1 className=" font-semibold text-lg">Information line:</h1>
              {orderHandleDetail.status === "DELIVERED" && (
                <Button
                  variant="contained"
                  onClick={handleButtonConfirm}
                  disabled={orderHandleDetail.verify_delivered}
                >
                  Confirm
                </Button>
              )}
            </div>
            <div className="flex flex-col">
              <div className="flex flex-row space-x-9">
                <h1 className=" font-semibold">Status:</h1>
                <h1>{orderHandleDetail.status}</h1>
              </div>
              <div className="flex flex-row space-x-5">
                <h1 className=" font-semibold">Quantity:</h1>
                <h1>{orderHandleDetail.quantity}</h1>
              </div>
              <div className="flex flex-row space-x-12">
                <h1 className=" font-semibold">Total:</h1>
                <h1>{currencyFormat(orderHandleDetail.total)}đ</h1>
              </div>
              <div>
                {orderHandleDetail.cod ? (
                  <div className="space-x-6 flex flex-row">
                    <h1>Payment: </h1>
                    <h1>COD</h1>
                  </div>
                ) : (
                  <div>
                    {orderHandleDetail.payment_id ? (
                      <div className="space-x-6 flex flex-row">
                        <h1>Payment: </h1>
                        <h1>Success</h1>
                      </div>
                    ) : (
                      <div className="space-y-5">
                        <div className="space-x-6 flex flex-row">
                          <h1>Payment: </h1>
                          <h1>Failed</h1>
                        </div>
                        <div ref={paypalRef}></div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
