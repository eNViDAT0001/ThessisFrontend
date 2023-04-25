import { useCallback, useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProviderApi } from "../../api/ProviderApi";
import {
  setListBrand,
  setListProductInBrandDetail,
  setMetaInListBrand,
} from "../slices/BrandSlice";
import { convertObjectToStringQuery } from "./CommonHook";
import { toast } from "react-toastify";
import { ProductApi } from "../../api/ProductApi";

export const useListBrand = () => useSelector((state) => state.brand.listBrand);
export const useAddFormBrand = () =>
  useSelector((state) => state.brand.addFormBrand);
export const useListProductInBrandDetail = () =>
  useSelector((state) => state.brand.listProductInBrandDetail);
  export const useMetaInListBrand = () =>
  useSelector((state) => state.brand.metaInListBrand);
export const useFilterInProductInBrandDetail = () =>
  useSelector((state) => state.query.productInDetailBrand);
export const useFilterInListBrand = () =>
  useSelector((state) => state.query.filterBrand);

export const useFetchListBrand = async (id,filter) => {
  const dispatch = useDispatch();
  await useEffect(() => {
    dispatch(fetchListBrand(id, filter));
  }, [dispatch,id,filter]);
};

export const fetchListBrand = (id, filter) => async (dispatch) => {
  try {
    const response = await ProviderApi.GetListBrand(id, filter);
    dispatch(setListBrand(response.data.data));
    dispatch(setMetaInListBrand(response.data.meta))
  } catch (err) {
    console.log(err);
  }
};

export const useFetchListProductInBrandDetail = async (filter) => {
  const dispatch = useDispatch();

  const loadDataListProductInBrandDetail = useCallback(async () => {
    dispatch(fetchListProductInBrandDetail(filter));
  }, [filter, dispatch]);
  await useLayoutEffect(() => {
    loadDataListProductInBrandDetail();
  }, [loadDataListProductInBrandDetail]);
};

export const fetchListProductInBrandDetail = (filter)=> async (dispatch) => {
    try {
      const response = await ProductApi.GetProductPreview(filter);
      dispatch(setListProductInBrandDetail(response.data.data));
    } catch (err) {
      console.log(err);
    }
  };

export const addNewBrand = (userId, body) => {
  return ProviderApi.AddNewBrand(userId, body).then((res) => {
    console.log("Status add new brand");
    toast("Add new Brand Success", {
      type: "success",
      autoClose: 1000,
      onClose: setTimeout(() => {
        window.location.reload();
      }, 2000),
    });
  });
};
