import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductApi } from "../../api/ProductApi";
import BannerModel from "../models/Read/Banner/BannerModel";
import { setListBanner } from "../slice/BannerSlice";

export const useListBanner = () => useSelector((state) => state.banner.listBanner);
export const useBannerDetail = () => useSelector((state) => state.banner.bannerDetail);

export const fetchListBanner = () => async (dispatch) => {
  try {
    const response = await ProductApi.GetBanners();
    //logic transform
    const res = []
    response.data.data.map(data =>{
        const transform = new BannerModel()
        transform.transformToModel(data)
        res.push(transform)
    })
    dispatch(
      setListBanner(res)
    );
  } catch (error) {}
};

export const useFetchListBanner = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchListBanner());
  }, []);
};
