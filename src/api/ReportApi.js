import axiosClient from "./Client";
export const ReportApi = {
  GetReportProducts: (filter) => {
    const url = `/admin/report/products?${filter}`;
    return axiosClient.get(url);
  },
  GetReportProviders: (filter) => {
    const url = `/admin/report/providers?${filter}`;
    return axiosClient.get(url);
  },
  GetReportOrders: (filter) => {
    const url = `/admin/report/orders?${filter}`;
    return axiosClient.get(url);
  },
};
