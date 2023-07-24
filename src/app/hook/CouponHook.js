import { toast } from "react-toastify";
import { CouponApi } from "../../api/CouponApi";
import {
  setListCoupon,
  setListProductInAddCoupon,
  setMetaInListCoupon,
  setMetaInProductInAddCoupon,
} from "../slices/CouponSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { ProductApi } from "../../api/ProductApi";

export const useListCouponInBrand = () =>
  useSelector((state) => state.coupon.listCoupon);
export const useFilterCouponInBrand = () =>
  useSelector((state) => state.query.filterCouponInBrand);
export const useMetaCouponInBrand = () =>
  useSelector((state) => state.coupon.metaInListCoupon);
export const useListProductInAddCoupon = () =>
  useSelector((state) => state.coupon.listProductInAddCoupon);
export const useMetaProductInAddCoupon = () =>
  useSelector((state) => state.coupon.metaInProductInAddCoupon);
export const useFilterProductInAddCoupon = () =>
  useSelector((state) => state.query.filterProductInAddCoupon);

export const useFetchAllProductInFormAddCoupon = async (userId, filter) => {
  const dispatch = useDispatch();
  await useEffect(() => {
    dispatch(fetchAllProductInAddCoupon(userId, filter));
  }, [dispatch, userId, filter]);
};

const fetchAllProductInAddCoupon = (userId, filter) => async (dispatch) => {
  const res = await ProductApi.GetProductPreview(
    filter + `&fields[]=user_id_${userId}`
  );
  const listProduct =
    res.data.data &&
    res.data.data.map((data) => {
      return { ...data, isSelected: false, quantity: 1 };
    });
  dispatch(setListProductInAddCoupon(listProduct));
  dispatch(setMetaInProductInAddCoupon(res.data.meta));
};

export const selectProductInAddCoupon = (arr, couponId) => {
  if (!Array.isArray(arr)) return [];
  return arr.map((coupon) => {
    if (coupon.id === couponId) {
      return {
        ...coupon,
        isSelected: !coupon.isSelected,
      };
    }
    return coupon;
  });
};

export const changeQuantityInProductInAddCoupon = (
  arr,
  productId,
  quantity
) => {
  if (!Array.isArray(arr)) return [];
  return arr.map((product) => {
    if (product.id === productId) {
      return {
        ...product,
        quantity: quantity,
      };
    }
    return product;
  });
};

export const selectCoupon = (arr, couponId) => {
  if (!Array.isArray(arr)) return [];
  return arr.map((coupon) => {
    if (coupon.id === couponId) {
      return {
        ...coupon,
        isSelected: !coupon.isSelected,
      };
    }
    return coupon;
  });
};

export const fetchListCouponInBrand = (filter, userId) => async (dispatch) => {
  const res = await CouponApi.ListCoupon(
    filter + `&fields[]=user_id_${userId}`
  );
  const listCoupon =
    res.data.data &&
    res.data.data.map((data) => {
      return { ...data, isSelected: false };
    });
  dispatch(setListCoupon(listCoupon));
  dispatch(setMetaInListCoupon(res.data.meta));
};

export const deleteListCoupon = (userId, body) => async (dispatch) => {
  await CouponApi.DeleteCoupon(userId, body).then(() => {
    toast("Ban list coupon successfully", {
      type: "success",
      autoClose: 1000,
      Close: setTimeout(() => window.location.reload(), 1000),
    });
  });
};

export const addNewCoupon = async (userId,body) => {
  await CouponApi.AddNewCoupon(userId,body).then(() => {
    toast("Add new coupon successfully", {
      type: "success",
      autoClose: 1000,
      Close: setTimeout(() => window.location.reload(), 1000),
    });
  });
};
