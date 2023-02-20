import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductApi } from "../../api/ProductApi";
import { setListBanner } from "../slice/BannerSlice";
import { setCategoryRoot } from "../slice/CategorySlice";
import { setProductInHome } from "../slice/ProductSlice";

export const useProductInHome = () => useSelector(state=>state.product.productInHome)

export const useFetchInHomePage = ()  => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchInHomePage());
  }, []);
};

export const fetchInHomePage = () => async (dispatch) => {
  try {
    const promises = [
      ProductApi.GetBanners(),
      ProductApi.GetCategoriesRoof(),
      ProductApi.GetProductPreview(),
    ];
    await Promise.all(promises).then((res) => {
        dispatch(setListBanner(res?.[0].data.data))
        dispatch(setCategoryRoot(res?.[1].data.data))
        dispatch(setProductInHome(res?.[2].data.data))

    });
  } catch (err) {}
};


