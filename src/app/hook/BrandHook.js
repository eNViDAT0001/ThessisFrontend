import { useEffect, useLayoutEffect } from "react";
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
import { fetchOrderInProvider } from "./OrderHook";
import { setProviderIDInProductInDetailBrand } from "../slices/QuerySlice";

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

export const useFetchListBrand = async (id, filter) => {
  const dispatch = useDispatch();
  await useEffect(() => {
    dispatch(fetchListBrand(id, filter));
  }, [dispatch, id, filter]);
};

export const fetchListBrand = (id, filter) => async (dispatch) => {
  try {
    const response = await ProviderApi.GetListBrand(id, filter);
    dispatch(setListBrand(response.data.data));
    dispatch(setMetaInListBrand(response.data.meta));
  } catch (err) {
    console.log(err);
  }
};

export const useFetchFullInBrandDetailPage = async (id) => {
  const dispatch = useDispatch();
  dispatch(setProviderIDInProductInDetailBrand(id));
  const filter = useFilterInProductInBrandDetail();

  useLayoutEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(
          fetchListProductInBrandDetail(convertObjectToStringQuery(filter))
        ).then(() => {
          return dispatch(fetchOrderInProvider(id));
        });
      } catch (error) {}
    };
    fetchData();
  }, [id, dispatch, filter]);
};

export const fetchListProductInBrandDetail = (filter) => async (dispatch) => {
  try {
    const response = await ProductApi.GetProductPreview(filter);
    const listProducts =
      response.data.data &&
      response.data.data.map((data) => {
        return { ...data, isSelected: false };
      });
    dispatch(setListProductInBrandDetail(listProducts));
  } catch (err) {
    console.log(err);
  }
};

export const selectProductInBrandDetail = (arr, productID) => {
  if (!Array.isArray(arr)) return [];
  return arr.map((product) => {
    if (product.id === productID) {
      return {
        ...product,
        isSelected: !product.isSelected,
      };
    }
    return product;
  });
};

export const addNewBrand = (userId, body) => {
  return ProviderApi.AddNewBrand(userId, body).then(() => {
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
