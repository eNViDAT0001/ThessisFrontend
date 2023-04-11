import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProviderApi } from "../../api/ProviderApi";
import {
  setListBrand,
  setListProductInBrandDetail,
} from "../slices/BrandSlice";
import { convertObjectToStringQuery, transformFilters } from "./CommonHook";
import { toast } from "react-toastify";
import { ProductApi } from "../../api/ProductApi";

export const useListBrand = () => useSelector((state) => state.brand.listBrand);
export const useFilterBrand = () =>
  useSelector((state) => state.brand.filterBrand);
export const useAddFormBrand = () =>
  useSelector((state) => state.brand.addFormBrand);
export const useListProductInBrandDetail = () =>
  useSelector((state) => state.brand.listProductInBrandDetail);
export const useFilterInProductInBrandDetail = () =>
  useSelector((state) => state.query.productInDetailBrand);

export const useFetchListBrand = async (id) => {
  const dispatch = useDispatch();
  const filter = transformFilters(useFilterBrand());
  await useEffect(() => {
    dispatch(fetchListBrand(id, filter));
  }, []);
};

export const fetchListBrand = (id, filter) => async (dispatch) => {
  try {
    const response = await ProviderApi.GetListBrand(id, filter);
    dispatch(setListBrand(response.data.data));
  } catch (err) {
    console.log(err);
  }
};

export const useFetchListProductInBrandDetail = async (filter) => {
  const dispatch = useDispatch();
  
  const loadDataListProductInBrandDetail = useCallback(async () => {
    dispatch(fetchListProductInBrandDetail(filter));
  }, [filter, dispatch]);
  await useEffect(() => {
    loadDataListProductInBrandDetail();
  }, [loadDataListProductInBrandDetail]);
};

export const fetchListProductInBrandDetail =
  (filterRow) => async (dispatch) => {
    try {
      const filter = convertObjectToStringQuery(filterRow);
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
