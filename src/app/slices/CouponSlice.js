import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listCoupon: [],
  metaInListCoupon:{},
  couponDetail: {},
  couponDetailInUpdate: {},
  listProductInAddCoupon: [],
  listProductInUpdateCoupon: [],
  metaInProductInAddCoupon: {},
  metaInProductInUpdateCoupon: {},

  productInCouponDetail: [],
  metaInProductInCouponDetail: {},
  listCouponInAdmin: [],

  listProductOutInUpdateCoupon: [],
  metaInProductOutUpdateCoupon: {},
};

const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {
    setListCoupon: (state, action) => {
      state.listCoupon = action.payload;
    },
    setMetaInListCoupon:(state,action) =>{
        state.metaInListCoupon = action.payload
    },
    setCouponDetail: (state, action) => {
      state.couponDetail = action.payload;
    },
    setCouponDetailInUpdate: (state, action) => {
      state.couponDetailInUpdate = action.payload;
    },
    setListCouponInAdmin: (state, action) => {
      state.listCouponInAdmin = action.payload;
    },
    setListProductInAddCoupon: (state, action) => {
      state.listProductInAddCoupon = action.payload;
    },
    setListProductInUpdateCoupon: (state, action) => {
      state.listProductInUpdateCoupon = action.payload;
    },
    setProductInCouponDetail: (state, action) => {
      state.productInCouponDetail = action.payload;
    },
    setMetaInProductInAddCoupon: (state, action) => {
      state.metaInProductInAddCoupon = action.payload;
    },
    setMetaInProductInUpdateCoupon: (state, action) => {
      state.metaInProductInUpdateCoupon = action.payload;
    },
    setListProductOutInUpdateCoupon: (state, action) => {
      state.listProductOutInUpdateCoupon = action.payload;
    },
    setMetaInProductOutUpdateCoupon: (state, action) => {
      state.metaInProductOutUpdateCoupon = action.payload;
    },
    setMetaInProductInCouponDetail: (state, action) => {
      state.metaInProductInCouponDetail = action.payload;
    },
  },
});

export const {
  setListCoupon,
  setMetaInListCoupon,
  setCouponDetail,
  setCouponDetailInUpdate,
  setListCouponInAdmin,
  setListProductInAddCoupon,
  setListProductInUpdateCoupon,
  setProductInCouponDetail,
  setMetaInProductInAddCoupon,
  setMetaInProductInUpdateCoupon,
  setListProductOutInUpdateCoupon,
  setMetaInProductOutUpdateCoupon,
  setMetaInProductInCouponDetail,
} = couponSlice.actions;

export default couponSlice.reducer;