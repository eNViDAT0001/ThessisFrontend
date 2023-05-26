import axiosClient from "./Client";
export const ProviderApi = {
  GetAllBrand: (filter)=>{
    const url = `/providers?${filter}`;
    return axiosClient.get(url);
  },
  GetListBrand: (id,filter) => {
    const url = `/providers/user/${id}?${filter}`;
    return axiosClient.get(url);
  },
  GetSampleDetail:(providerId) =>{
    const url = `/providers/${providerId}`
    return axiosClient.get(url)
  },
  GetBrandDetail:(providerId,userId) =>{
    const url = `providers/${providerId}/user/${userId}`
    return axiosClient.get(url);
  },
  AddNewBrand:(id,body)=>{
    const url= `/providers/user/${id}`
    return axiosClient.post(url,body)
  }
};
