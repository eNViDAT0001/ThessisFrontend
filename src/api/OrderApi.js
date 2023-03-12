import { transformFilters } from "../app/hook/CommonHook";
import axiosClient from "./Client";
export const OrderApi = {
  AddNewOrder: (body) => {
    const url = `/orders`;
    console.log(body)
    return axiosClient.post(url,body);
  },
  GetFullOrder: () => {
    const url = ``;
    return axiosClient.get(url);
  },
  GetOrderFromUser: (id,filter) =>{
    const url = `/orders/user/${id}?${transformFilters(filter)}`
    return axiosClient.get(url)
  },
  GetOrderFromProvider:(id,filter)=>{
    const url = `/orders/provider/${id}?${transformFilters(filter)}`
    return axiosClient.get(url)
  },
  UpdateStatus:(id,body)=>{
    const url = `/orders/${id}`
    console.log(body)
    return axiosClient.patch(url,body)
  },
  GetOrderItems:(id)=>{
    const url = `/orders/${id}/items`
    return axiosClient.get(url)
  }
};
