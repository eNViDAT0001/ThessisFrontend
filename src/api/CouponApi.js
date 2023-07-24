import axiosClient from "./Client";
export const CouponApi = {
  ListCoupon: (filter) => {
    const url = `/coupons?${filter}`;
    return axiosClient.get(url);
  },
  GetCouponDetail: (couponId) => {
    const url = `/coupons/${couponId}`;
    return axiosClient.post(url);
  },
  GetPreviewProduct: (couponId, filter) => {
    const url = `/coupons/${couponId}/products/preview?${filter}`;
    return axiosClient.get(url);
  },
  GetPreviewProductNotExist: (couponId, filter) => {
    const url = `/coupons/${couponId}/products/preview/no?${filter}`;
    return axiosClient.get(url);
  },
  AddNewCoupon: (userId, body) => {
    const url = `/coupons/user/${userId}`;
    return axiosClient.post(url, body);
  },
  UpdateCoupon: (couponId, userID, body) => {
    const url = `/coupons/${couponId}/user/${userID}`;
    return axiosClient.patch(url, body);
  },
  DeleteCoupon: (userId, body) => {
    const url = `/coupons/user/${userId}`;
    return axiosClient.delete(url, { data: body });
  },
  TestValidCoupon: (body) => {
    const url = `/coupons/validate`;
    return axiosClient.post(url, body);
  },
};
