import axiosClient from "./Client";
export const BannerApi = {
  GetAllFromAdmin: (filter) => {
    const url = `banners?${filter}`;
    return axiosClient.get(url);
  },
  AddNewBanner:(userID, body) =>{
    const url = `banners/user/${userID}`
    return axiosClient.post(url,body);
  },
  GetBannerDetail: (bannerID) =>{
    const url = `banners/${bannerID}`
    return axiosClient.get(url)
  }
};
