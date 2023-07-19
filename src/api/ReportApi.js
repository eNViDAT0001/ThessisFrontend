import axiosClient from "./Client";
export const ReportApi = {
  GetReportProducts: () => {
    const url = "/admin/report/products";
    return axiosClient.get(url);
  },
  GetReportProviders: () => {
    const url = "/admin/report/providers";
    return axiosClient.get(url);
  },
  GetReportOrders: () => {
    const url = "/admin/report/orders";
    return axiosClient.get(url);
  },
};
