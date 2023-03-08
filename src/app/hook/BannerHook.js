import { useSelector } from "react-redux";

export const useListBanner = () => useSelector((state) => state.banner.listBanner);
export const useBannerDetail = () => useSelector((state) => state.banner.bannerDetail);



