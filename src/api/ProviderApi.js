import axiosClient from "./Client";
export const ProviderApi = {
  GetListBrand: (id,filters) => {
    const url = `/providers/user/${id}?${filters}`;
    return axiosClient.get(url);
  },
  AddNewBrand:(id,body)=>{
    const url= `/providers/user/${id}`
    return axiosClient.post(url,body)
  }

};
