import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BannerApi } from "../../api/BannerApi";
import { setBannerDetail, setListBannerInAdmin } from "../slices/BannerSlice";

export const useListBanner = () =>
  useSelector((state) => state.banner.listBanner);
export const useBannerDetail = () =>
  useSelector((state) => state.banner.bannerDetail);
export const useBannerInAdmin = () =>
  useSelector((state) => state.banner.listBannerInAdmin);

export const useFetchBannerDetail = async (bannerID) => {
  const dispatch = useDispatch();
  await useEffect(() => {
    dispatch(fetchBannerDetail(bannerID));
  }, [dispatch, bannerID]);
};

export const fetchBannerDetail = (bannerID) => async (dispatch) => {
  try {
    const response = await BannerApi.GetBannerDetail(bannerID);
    dispatch(setBannerDetail(response.data.data));
  } catch (error) {
    console.log(error);
  }
};

export const useFetchListBannerInAdmin = async (filter) => {
  const dispatch = useDispatch();
  await useEffect(() => {
    dispatch(fetchListBannerFromAdmin(filter));
  }, [dispatch, filter]);
};

export const fetchListBannerFromAdmin = (filter) => async (dispatch) => {
  try {
    const response = await BannerApi.GetAllFromAdmin(filter);
    dispatch(setListBannerInAdmin(response.data.data));
  } catch (error) {
    console.log(error);
  }
};
