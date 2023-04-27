import axiosClient from "./Client";


export const UserApi = {
  GetListUser: (filter) =>{
    const url = `users?${filter}`
    return axiosClient.get(url)
  },
  DetailUser: (id) => {
    const url = `users/${id}`;
    return axiosClient.get(url);
  },
  UpdateUser: (id, body) => {
    const url = `users/${id}/info`;
    return axiosClient.patch(url, { ...body });
  },
  UpdateNewPassword: (id, body) => {
    const url = `users/${id}`;
    return axiosClient.put(url, { ...body });
  },
  BanListUser: (body) =>{
    const url = `users`;
    return axiosClient.delete(url,{ data: body })
  }
};
