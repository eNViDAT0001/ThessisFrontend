import React from "react";
import { Bill } from "../../components/ShoppingOrder/Bill/Bill";
import { OrderTabPage } from "../../components/ShoppingOrder/OrderTabPage/OrderTabPage";
import {
  useFetchListAddress,
} from "../../app/hook/AddressHook";
import { useParams } from "react-router-dom";
import HeaderBarBig from "../../components/Common/HeaderBarBig";

const ShoppingOrderPage = () => {
  const { id } = useParams();
  useFetchListAddress(id);
  
  return (
    <div>
      <HeaderBarBig
        nameTitle="Payment"
        name1="Home . Pages"
        name2=" . Payment"
      />
      <div className="mt-20 mb-20 flex justify-center">
        <div className="w-[70%] flex justify-between flex-row flex-wrap">
          <OrderTabPage />
          <Bill />
        </div>
      </div>
    </div>
  );
};

export default ShoppingOrderPage;
