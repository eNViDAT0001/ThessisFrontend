import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productInHome: [],
  metaInProductInHome: {},
  listProductInAdmin: [],
  metaInProductInAdmin: {},
  listProductRecommend: [],
  metaInProductInRecommend: {},
  productDetail: {},
  productForyou: [],
  imageProduct: [],
  descriptionProduct: [],
  specificationProduct: [],
  optionHandle: {},
  brandInProductDetail: {},
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    reset: () => initialState,
    setProductInHome: (state, action) => {
      state.productInHome = action.payload;
    },
    setMetaInProductInHome: (state, action) => {
      state.metaInProductInHome = action.payload;
    },

    setProductDetail: (state, action) => {
      state.productDetail = action.payload;
    },
    setImageProduct: (state, action) => {
      state.imageProduct = action.payload;
    },
    setDescriptionProduct: (state, action) => {
      state.descriptionProduct = action.payload;
    },
    setSpecificationProduct: (state, action) => {
      state.specificationProduct = action.payload;
    },
    setOptionHandle: (state, action) => {
      state.optionHandle = action.payload;
    },
    setQuantityHandle: (state, action) => {
      state.quantityHandle = action.payload;
    },
    setProductForYou: (state, action) => {
      state.productForyou = action.payload;
    },
    setListProductInAdmin: (state, action) => {
      state.listProductInAdmin = action.payload;
    },
    setMetaInProductInAdmin: (state, action) => {
      state.metaInProductInAdmin = action.payload;
    },
    setBrandInProductDetail: (state, action) => {
      state.brandInProductDetail = action.payload;
    },
    setListProductRecommend: (state, action) => {
      state.listProductRecommend = action.payload;
    },
    setMetaInProductInRecommend: (state, action) => {
      state.metaInProductInRecommend = action.payload;
    },
  },
});

export const {
  setProductInHome,
  setMetaInProductInHome,
  setProductDetail,
  setImageProduct,
  setDescriptionProduct,
  setSpecificationProduct,
  reset,
  setOptionHandle,
  setProductForYou,
  setListProductInAdmin,
  setMetaInProductInAdmin,
  setBrandInProductDetail,
  setListProductRecommend,
  setMetaInProductInRecommend,
} = productSlice.actions;

export default productSlice.reducer;
