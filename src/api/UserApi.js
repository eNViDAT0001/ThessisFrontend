import axiosClient from "./Client";
export const UserApi = {
  DetailUser: (id) => {
    const url = `users/${id}`;
    return axiosClient.get(url);
  },
  UpdateUser: (id, body) => {
    const url = `users/${id}`;
    return axiosClient.patch(url, { ...body });
  },
  UpdateNewPassword: (id, body) => {
    const url = `users/${id}`;
    return axiosClient.put(url, { ...body });
  },
};
