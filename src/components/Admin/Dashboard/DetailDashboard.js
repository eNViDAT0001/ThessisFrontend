import { Divider } from "@mui/material";
import React from "react";
import {
  useOrderReport,
  useProductReport,
  useProviderReport,
} from "../../../app/hook/ReportHook";

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
import { Line } from "react-chartjs-2";
import { convertDate } from "../../../app/hook/CommonHook";
import { DateProduct } from "./DateProduct";
import { DateProvider } from "./DateProvider";
import { DateOrder } from "./DateOrder";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const getDateInArray = (arr) => arr.map((item) => convertDate(item.date));
const getDataInProduct = (arr) => arr.map((item) => item.quantity);

const getQuantityInOrder = (arr) => arr.map((item) => item.quantity);
const getTotalInOrder = (arr) => arr.map((item) => item.total);

const getQuantityInProviders = (arr) => arr.map((item) => item.quantity);

export const DetailDashboard = () => {
  const products = useProductReport() || [];
  const orders = useOrderReport() || [];
  const providers = useProviderReport() || [];

  const optionsProduct = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Products",
      },
    },
  };

  const optionsProvider = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Providers",
      },
    },
  };

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

  const dataProducts = {
    labels: getDateInArray(products),
    datasets: [
      {
        label: "Quantity",
        data: getDataInProduct(products),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const dataProviders = {
    labels: getDateInArray(providers),
    datasets: [
      {
        label: "Quantity",
        data: getQuantityInProviders(providers),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
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
    <div className="p-10">
      <div className="space-y-[50px]">
        <div className="flex flex-col">
          <div className="flex flex-col">
            <h1 className="font-bold">Product</h1>
            <DateProduct />
            <Line options={optionsProduct} data={dataProducts} />
          </div>
          <div className="flex flex-col space-y-[50px]">
            <h1 className="font-bold">Provider</h1>
            <DateProvider />
            <Line options={optionsProvider} data={dataProviders} />
          </div>
        </div>
        <div className="flex flex-col">
          <h1 className="font-bold">Order</h1>
          <DateOrder />
          <Line options={optionOrder} data={dataOrders} />
        </div>
      </div>
    </div>
  );
};
