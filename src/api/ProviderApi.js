import axiosClient from "./Client";
export const ProviderApi = {
  GetAllBrand: ()=>{
    const url = `/providers`;
    return axiosClient.get(url);
  },
  GetListBrand: (id,filters) => {
    const url = `/providers/user/${id}?${filters}`;
    return axiosClient.get(url);
  },
  AddNewBrand:(id,body)=>{
    const url= `/providers/user/${id}`
    return axiosClient.post(url,body)
  }
};
