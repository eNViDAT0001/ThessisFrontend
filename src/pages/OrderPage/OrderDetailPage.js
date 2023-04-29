import React from "react";
import { useParams } from "react-router-dom";
import HeaderBar from "../../components/Common/HeaderBar";
import { OrderItems } from "../../components/Account/Order/OrderItems";
import { useFetchItemInOrder } from "../../app/hook/OrderHook";

export const OrderDetailPage = () => {
  const { id } = useParams();

  useFetchItemInOrder(id);
  return (
    <div>
      <HeaderBar name1="Home . Order" name2=" . Detail" />
      <div className="flex flex-col justify-center px-[15%] space-y-4 mt-4 mb-10">
        <h1 className="text-xl text-[#1D3178] font-semibold">{`Order: #${id}`}</h1>
        <OrderItems />{" "}
      </div>
    </div>
  );
};
