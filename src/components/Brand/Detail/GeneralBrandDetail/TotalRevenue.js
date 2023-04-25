import React from "react";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import { currencyFormat } from "../../../../app/hook/CommonHook";
import { useListOrderInProvider } from "../../../../app/hook/OrderHook";

export const TotalRevenue = (props) => {
  const listOrder = useListOrderInProvider() || [];

  const calculateDeliveredTotal = (data) => {
    const deliveredOrders = data.filter(
      (order) => order.status === "DELIVERED"
    );
    const deliveredTotals = deliveredOrders.map((order) => order.total);
    const deliveredTotal = deliveredTotals.reduce((acc, curr) => acc + curr, 0);
    return deliveredTotal;
  };
  return (
    <div className="flex flex-row">
      <div className="flex flex-row items-center space-x-6">
        <CreditScoreIcon sx={{ width: 40, height: 40 }} />
        <div className="flex flex-col justify-between">
          <h1 className=" text-base text-[#B1B5B5]">Revenue</h1>
          <h1 className=" text-3xl font-[Verdana]">
            {currencyFormat(calculateDeliveredTotal(listOrder)) + "$"}
          </h1>
        </div>
      </div>
    </div>
  );
};
