import axiosClient from "./Client";
export const BannerApi = {
  GetAllFromAdmin: (filter) => {
    const url = `banners?${filter}`;
    return axiosClient.get(url);
  },
  AddNewBanner: (body) => {
    const url = `banners`;
    return axiosClient.post(url, body);
  },
  GetBannerDetail: (bannerID) => {
    const url = `banners/${bannerID}/detail`;
    return axiosClient.get(url);
  },
  GetProductPreview: (bannerID,filter) => {
    const url = `products/banner/${bannerID}/preview?${filter}`;
    return axiosClient.get(url);
  },
  GetProductPreviewNotExist: (bannerID,filter) => {
    const url = `products/banner/${bannerID}/preview/no?${filter}`;
    return axiosClient.get(url);
  },
  UpdateBanner: (bannerID,userID, body) => {
    const url = `/banners/${bannerID}/user/${userID}`;
    return axiosClient.patch(url, body);
  },
  DeleteListBanner: (body) => {
    const url = `/banners`;
    return axiosClient.delete(url, { data: body });
  },
};
