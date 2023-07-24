import { useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProviderApi } from "../../api/ProviderApi";
import {
  setBrandDetail,
  setBrandDetailInUpdate,
  setListBrand,
  setListProductInBrandDetail,
  setListShopInAdmin,
  setMetaInListBrand,
  setMetaInShopInAdmin,
  setMetaProductInBrandDetail,
} from "../slices/BrandSlice";
import { convertObjectToStringQuery } from "./CommonHook";
import { toast } from "react-toastify";
import { ProductApi } from "../../api/ProductApi";
import { fetchOrderInProvider } from "./OrderHook";
import { setProviderIDInProductInDetailBrand } from "../slices/QuerySlice";
import { fetchListCouponInBrand } from "./CouponHook";

export const useListBrand = () => useSelector((state) => state.brand.listBrand);
export const useAddFormBrand = () =>
  useSelector((state) => state.brand.addFormBrand);
export const useListProductInBrandDetail = () =>
  useSelector((state) => state.brand.listProductInBrandDetail);
export const useMetaInListBrand = () =>
  useSelector((state) => state.brand.metaInListBrand);
export const useListBrandInAdmin = () =>
  useSelector((state) => state.brand.listShopInAdmin);
export const useMetaInShopInAdmin = () =>
  useSelector((state) => state.brand.metaInShopInAdmin);
export const useBrandDetail = () =>
  useSelector((state) => state.brand.brandDetail);
export const useFilterInShopInAdmin = () =>
  useSelector((state) => state.query.filterShopTabAdmin);
export const useFilterInProductInBrandDetail = () =>
  useSelector((state) => state.query.productInDetailBrand);
export const useFilterInOrderInBrandDetail = () =>
  useSelector((state) => state.query.filterOrderInBannerDetail);
export const useFilterInListBrand = () =>
  useSelector((state) => state.query.filterBrand);
export const useMetaProductInBrandDetail = () =>
  useSelector((state) => state.brand.metaProductInBrandDetail);
export const useMetaOrderInBrandDetail = () =>
  useSelector((state) => state.brand.metaOrderInBrandDetail);
export const useBrandDetailInUpdate = () =>
  useSelector((state) => state.brand.brandDetailInUpdate);

export const updateBrand = async (providerId, userId, body) => {
  await ProviderApi.UpdateBrand(providerId, userId, body).then(() => {
    toast("Update Brand Success", {
      type: "success",
      autoClose: 1000,
      onClose: setTimeout(() => {
        window.location.replace(`/brand-detail/${providerId}`);
      }, 2000),
    });
  });
};
export const useFetchBrandDetailInUpdate = async (providerId, userId) => {
  const dispatch = useDispatch();
  await useEffect(() => {
    dispatch(fetchBrandDetailForUpdate(providerId, userId));
  }, [dispatch, providerId, userId]);
};

const fetchBrandDetailForUpdate = (providerId, userId) => async (dispatch) => {
  try {
    const response = await ProviderApi.GetBrandDetail(providerId, userId);
    dispatch(setBrandDetailInUpdate(response.data.data.provider));
  } catch (error) {
    console.log(error);
  }
};

export const useFetchListBrand = async (id, filter, filterCoupon) => {
  const dispatch = useDispatch();
  await useEffect(() => {
    dispatch(fetchListBrand(id, filter)).then(() => {
      return dispatch(fetchListCouponInBrand(filterCoupon, id));
    });
  }, [dispatch, id, filter, filterCoupon]);
};

export const useFetchListBrandInAdmin = async (filter) => {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchListBrandFromAdmin(filter));
      } catch (error) {}
    };
    fetchData();
  }, [dispatch, filter]);
};

export const fetchListBrandFromAdmin = (filter) => async (dispatch) => {
  try {
    const response = await ProviderApi.GetAllBrand(filter);
    dispatch(setListShopInAdmin(response.data.data));
    dispatch(setMetaInShopInAdmin(response.data.meta));
  } catch (error) {
    console.log(error);
  }
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

export const useFetchFullInBrandDetailPage = async (id, userId) => {
  const dispatch = useDispatch();
  dispatch(setProviderIDInProductInDetailBrand(id));
  const filterProduct = useFilterInProductInBrandDetail();
  const filterOrder = useFilterInOrderInBrandDetail();
  useLayoutEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(
          fetchListProductInBrandDetail(
            convertObjectToStringQuery(filterProduct)
          )
        )
          .then(() => {
            return dispatch(
              fetchOrderInProvider(id, convertObjectToStringQuery(filterOrder))
            );
          })
          .then(() => {
            return dispatch(fetchBrandDetail(id, userId));
          });
      } catch (error) {}
    };
    fetchData();
  }, [id, dispatch, userId, filterProduct, filterOrder]);
};
const fetchBrandDetail = (providerId, userId) => async (dispatch) => {
  const response = await ProviderApi.GetBrandDetail(providerId, userId);
  dispatch(setBrandDetail(response.data.data));
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
    dispatch(setMetaProductInBrandDetail(response.data.meta));
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
    toast("Add new Brand Success", {
      type: "success",
      autoClose: 1000,
      onClose: setTimeout(() => {
        window.location.reload();
      }, 2000),
    });
  });
};
