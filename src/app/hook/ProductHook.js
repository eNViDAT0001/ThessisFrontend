import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductApi } from "../../api/ProductApi";
import { setListBanner } from "../slice/BannerSlice";
import { setCategoryRoot } from "../slice/CategorySlice";
import {
  setDescriptionProduct,
  setImageProduct,
  setProductDetail,
  setProductInHome,
  setSpecificationProduct,
} from "../slice/ProductSlice";

export const useProductInHome = () =>
  useSelector((state) => state.product.productInHome);
export const useImageProduct = () =>
  useSelector((state) => state.product.imageProduct);
export const useProductDetail = () =>
  useSelector((state) => state.product.productDetail);
export const useDescriptionProduct = () =>
  useSelector((state) => state.product.descriptionProduct);
export const useSpecificaionProduct = () =>
  useSelector((state) => state.product.specificationProduct);
export const useOptionHandle = () =>
  useSelector((state) => state.product.optionHandle);
export const useQuantityHandle = () =>
  useSelector((state) => state.product.quantityHandle);

export const useFetchInHomePage = async () => {
  const dispatch = useDispatch();
  const loadDataHome = useCallback(async () => {
    dispatch(fetchInHomePage());
  });
  useEffect(() => {
    loadDataHome();
  }, [loadDataHome]);
};

const fetchInHomePage = () => async (dispatch) => {
  try {
    await Promise.all([
      ProductApi.GetBanners(),
      ProductApi.GetCategoriesRoof(),
      ProductApi.GetProductPreview(),
    ]).then((res) => {
      dispatch(setListBanner(res[0].data.data));
      dispatch(setCategoryRoot(res[1].data.data));
      dispatch(setProductInHome(res[2].data.data));
    });
  } catch (err) {}
};

export const useFetchInProductDetail = async (id) => {
  const dispatch = useDispatch();
  const loadDataProduct = useCallback(async () => {
    dispatch(fetchInProductDetailPage(id));
  });
  await useEffect(() => {
    loadDataProduct();
  }, [loadDataProduct]);
};

const fetchInProductDetailPage = (id) => async (dispatch) => {
  try {
    await Promise.all([
      ProductApi.GetDetailProduct(id),
      ProductApi.GetMedia(id),
      ProductApi.GetDescriptionFromProduct(id),
      ProductApi.GetSpecification(id),
    ]).then((res) => {
      dispatch(setProductDetail(res[0].data.data));
      dispatch(setImageProduct(res?.[1].data.data));
      dispatch(setDescriptionProduct(res?.[2].data.data));
      dispatch(setSpecificationProduct(res[3].data.data));
    });
  } catch (error) {}
};

//add Product
