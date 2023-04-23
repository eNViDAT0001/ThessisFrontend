import axiosClient from "./Client";

export const AddressApi = {
  ReadAllProvince: () => {
    const url = "/provinces";
    return axiosClient.get(url);
  },
  ReadAllDistrict: (id) => {
    const url = `/districts/province/${id}`;
    return axiosClient.get(url);
  },
  ReadAllWard: (id) => {
    const url = `/wards/district/${id}`;
    return axiosClient.get(url);
  },
  AddressById: (id) => {
    const url = `/user/${id}`;
    return axiosClient.get(url);
  },
  AddressList: () => {
    const url = "/addresses";
    return axiosClient.get(url);
  },
  DetailByUserID: (idAddress, idUser) => {
    const url = `/addresses/${idAddress}/user/${idUser}`;
    return axiosClient.get(url);
  },
  GetListAddressByUserID: (id) => {
    const url = `/addresses/user/${id}`;
    return axiosClient.get(url);
  },
  AddSaveAddress: (id, body) => {
    const url = `/addresses/user/${id}`;
    return axiosClient.post(url, { ...body });
  },
  UpdateAddress: (idAddress, idUser, body) => {
    const url = `/addresses/${idAddress}/user/${idUser}`;
    return axiosClient.patch(url, { ...body });
  },
  DeleteAddress: (idUser, body) => {
    const url = `/addresses/user/${idUser}`;
    return axiosClient.delete(url, { data: body });
  },
};
