import axiosClient from "./Client";
export const AdminApi = {
  ListUser: () => {
    const url = `users`;
    return axiosClient.get(url);
  },
  GetReport: () => {
    const url = `/admin/report`;
    return axiosClient.get(url);
  },
  GetRequest: (filter) => {
    const url = `/admin/requests?${filter}`;
    return axiosClient.get(url);
  },
  DeleteUser: (userID) => {
    const url = `users/${userID}`;
    return axiosClient.delete(url);
  },
};
