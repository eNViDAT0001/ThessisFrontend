import { toast } from "react-toastify";
import { ProductApi } from "../../api/ProductApi";
import { checkObjectEmpty } from "./CommonHook";
import { CouponApi } from "../../api/CouponApi";
import { setListCoupon, setMetaInListCoupon } from "../slices/CouponSlice";
import { useSelector } from "react-redux";

export const useListCouponInBrand = () =>
  useSelector((state) => state.coupon.listCoupon);
export const useFilterCouponInBrand = () =>
  useSelector((state) => state.query.filterCouponInBrand);
export const useMetaCouponInBrand = () =>
  useSelector((state) => state.coupon.metaInListCoupon);

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
