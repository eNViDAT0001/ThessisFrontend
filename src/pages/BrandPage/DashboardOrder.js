import React from "react";
import { useLanguage } from "../../app/hook/LanguageHook";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useOrderDBInBrandDetail } from "../../app/hook/ReportHook";
import { convertDate } from "../../app/hook/CommonHook";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { DateOrderInDetailBrand } from "./DateOrderInDetailBrand";
const getDateInArray = (arr) => arr.map((item) => convertDate(item.date));
const getQuantityInOrder = (arr) => arr.map((item) => item.quantity);
const getTotalInOrder = (arr) => arr.map((item) => item.total);

export const DashboardOrder = () => {
  const language = useLanguage();
  const orders = useOrderDBInBrandDetail() || [];

  const optionOrder = {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: "Orders",
      },
    },
    scales: {
      y: {
        type: "linear",
        display: true,
        position: "left",
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  const dataOrders = {
    labels: getDateInArray(orders),
    datasets: [
      {
        label: "Quantity",
        data: getQuantityInOrder(orders),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        yAxisID: "y",
      },
      {
        label: "Total",
        data: getTotalInOrder(orders),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        yAxisID: "y1",
      },
    ],
  };
  return (
    <div>
      <div className="flex justify-center">
        <div className="w-[80%] min-h-[200px] bg-white shadow-lg rounded-2xl p-5 font-['Josefin_Sans']">
          <div className="flex flex-row items-center space-x-2">
            <DashboardIcon sx={{ width: 20, height: 20 }} />
            <h1 class="font-bold text-2xl ">
              {language ? "Thống kê đơn hàng" : "Dashboard Orders"}
            </h1>{" "}
          </div>
          <DateOrderInDetailBrand />
          <Line options={optionOrder} data={dataOrders} />
        </div>{" "}
      </div>
    </div>
  );
};
