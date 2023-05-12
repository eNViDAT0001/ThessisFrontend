import React from "react";
import { useOrderHandleDetail } from "../../../app/hook/OrderHook";
import { currencyFormat } from "../../../app/hook/CommonHook";

export const DetailOrder = () => {
  const orderHandleDetail = useOrderHandleDetail();
  return (
    <div className="flex flex-row flex-1 space-x-5 w-full">
      <div className="p-5 border rounded-md shadow-md">
        <h1 className=" font-semibold text-lg">Thông tin khách hàng:</h1>
        <h1>{orderHandleDetail.name}</h1>
        <h1 className=" text-slate-300">{orderHandleDetail.phone}</h1>
        <h1 className=" text-slate-400">{`${orderHandleDetail.street}, ${orderHandleDetail.ward}, ${orderHandleDetail.district}, ${orderHandleDetail.province}`}</h1>
      </div>
      <div className="w-full p-5 border rounded-md shadow-md">
        <h1 className=" font-semibold text-lg">Thông tin đơn hàng:</h1>
        <div className="flex flex-col">
          <div className="flex flex-row space-x-5">
            <h1 className=" font-semibold">Status:</h1>
            <h1>{orderHandleDetail.status}</h1>
          </div>
          <div className="flex flex-row space-x-5">
            <h1 className=" font-semibold">Quantity:</h1>
            <h1>{orderHandleDetail.quantity}</h1>
          </div>
          <div className="flex flex-row space-x-5">
            <h1 className=" font-semibold">Total:</h1>
            <h1>{currencyFormat(orderHandleDetail.total)}đ</h1>
          </div>
        </div>
      </div>
    </div>
  );
};