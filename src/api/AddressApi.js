import axiosClient from "./Client";
import axiosAddressClient from "./ClientAddress";
export const AddressApi = {
  ReadAllProvince: () => {
    const url = "/master-data/province";
    return axiosAddressClient.get(url);
  },
  ReadAllDistrict: (provinceId) => {
    const url = `/master-data/district`;
    const body = {
      province_id: provinceId,
    };
    return axiosAddressClient.get(url, { params: body });
  },
  ReadAllWard: (districtId) => {
    const url = `/master-data/ward`;
    const body = {
      district_id: districtId,
    };
    return axiosAddressClient.get(url, { params: body });
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
