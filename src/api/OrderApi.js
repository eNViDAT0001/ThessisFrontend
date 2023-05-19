import axiosClient from "./Client";
export const OrderApi = {
  AddNewOrder: (body) => {
    const url = `/orders`;
    return axiosClient.post(url, body);
  },
  GetFullOrder: (userID, filter) => {
    const url = `/orders/admin/${userID}?${filter}`;
    return axiosClient.get(url);
  },
  GetOrderFromUser: (id, filter) => {
    const url = `/orders/user/${id}?${filter}`;
    return axiosClient.get(url);
  },
  GetOrderFromProvider: (id, filter) => {
    const url = `/orders/provider/${id}?${filter}`;
    return axiosClient.get(url);
  },
  UpdateStatus: (id, body) => {
    const url = `/orders/${id}`;
    return axiosClient.patch(url, body);
  },
  GetOrderItems: (id) => {
    const url = `/orders/${id}/items`;
    return axiosClient.get(url);
  },
  AddNewPayment: (body) => {
    const url = `/payments`;
    return axiosClient.post(url, body);
  },
  UpdateOrder: (body) => {
    const url = `/orders/payment`;
    return axiosClient.patch(url, body);
  },
  VerifyOrder: (orderID, userID) => {
    const url = `/orders/${orderID}/user/${userID}/verify`;
    return axiosClient.patch(url);
  },
};
