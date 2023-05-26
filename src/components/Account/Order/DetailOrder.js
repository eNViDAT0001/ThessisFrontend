import React from "react";
import { useOrderHandleDetail, verifyOrder } from "../../../app/hook/OrderHook";
import { checkObjectEmpty, currencyFormat } from "../../../app/hook/CommonHook";
import { Button } from "@mui/material";
import { useUserID } from "../../../app/hook/UserHook";

export const DetailOrder = ({ id }) => {
  const orderHandleDetail = useOrderHandleDetail();
  const orderID = id;
  const userID = useUserID();
  const handleButtonConfirm = (e) => {
    verifyOrder(orderID, userID);
  };
  return (
    <div className="flex flex-row flex-1 space-x-5 w-full">
      {!checkObjectEmpty(orderHandleDetail) && (
        <div className="flex flex-row space-x-5">
          <div className="p-5 border rounded-md shadow-md">
            <h1 className=" font-semibold text-lg">Customer information :</h1>
            <h1>{orderHandleDetail.name}</h1>
            <h1 className=" text-slate-600">{orderHandleDetail.phone}</h1>
            <h1 className=" text-slate-500">{`${orderHandleDetail.street}, ${orderHandleDetail.ward}, ${orderHandleDetail.district}, ${orderHandleDetail.province}`}</h1>
          </div>
          <div className=" p-5 border rounded-md shadow-md">
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
                {orderHandleDetail.payment_id ? (
                  <h1>You have already paid</h1>
                ) : (
                  <h1>You have not pay yet</h1>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
