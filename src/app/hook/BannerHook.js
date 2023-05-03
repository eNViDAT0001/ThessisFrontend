import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BannerApi } from "../../api/BannerApi";
import {
  setBannerDetail,
  setListBannerInAdmin,
  setProductInBannerDetail,
} from "../slices/BannerSlice";
import { toast } from "react-toastify";

export const useListBanner = () =>
  useSelector((state) => state.banner.listBanner);
export const useBannerDetail = () =>
  useSelector((state) => state.banner.bannerDetail);
export const useBannerInAdmin = () =>
  useSelector((state) => state.banner.listBannerInAdmin);
export const useProductInBannerDetail = () =>
  useSelector((state) => state.banner.productInBannerDetail);

export const useFetchBannerDetail = async (bannerID) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBannerDetail(bannerID)).then(() =>
      dispatch(fetchProductInBannerDetail(bannerID))
    );
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

export const fetchProductInBannerDetail = (bannerID) => async (dispatch) => {
  try {
    const response = await BannerApi.GetProductPreview(bannerID);
    dispatch(setProductInBannerDetail(response.data.data));
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
    const listBanners =
      response.data.data &&
      response.data.data.map((data) => {
        return { ...data, isSelected: false };
      });
    dispatch(setListBannerInAdmin(listBanners));
  } catch (error) {
    console.log(error);
  }
};


export const selectBanner = (arr, bannerID) => {
  if (!Array.isArray(arr)) return [];
  return arr.map((banner) => {
    if (banner.id === bannerID) {
      return {
        ...banner,
        isSelected: !banner.isSelected,
      };
    }
    return banner;
  });
};

export const deleteListBanner = async(body) => {
  await BannerApi.DeleteListBanner(body).then(() => {
    toast("Delete list banner successfully", {
      type: "success",
      autoClose: 1000,
      Close: setTimeout(() => window.location.reload(), 1000),
    });
  });
};
