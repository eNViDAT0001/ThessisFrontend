import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryRoot: [],
  listTreeCategory: [],
  listTreeCategoryInUpdateProduct: [],
  listCategoryInAdmin: [],
  categoryHandleInAdmin:{},
  categoryHover: {},
  categoryHandle: {},
  listProductInCategory: [],
  metaProductInCategory: {},
  listBrandInFilterCategory: [],
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategoryRoot: (state, action) => {
      state.categoryRoot = action.payload;
    },
    setListProductInCategory: (state, action) => {
      state.listProductInCategory = action.payload;
    },
    setMetaProductInCategory: (state, action) => {
      state.metaProductInCategory = action.payload;
    },
    setListTreeCategoryInUpdateProduct: (state, action) => {
      state.listTreeCategoryInUpdateProduct = action.payload;
    },
    setListTreeCategory: (state, action) => {
      state.listTreeCategory = action.payload;
    },
    setListCategoryInAdmin: (state, action) => {
      state.listCategoryInAdmin = action.payload;
    },
    setCategoryHandle: (state, action) => {
      state.categoryHandle = action.payload;
    },
    setListBrandInFilterCategory: (state, action) => {
      state.listBrandInFilterCategory = action.payload;
    },
  },
});

export const {
  setCategoryRoot,
  setListProductInCategory,
  setListCategoryInAdmin,
  setMetaProductInCategory,
  setListTreeCategory,
  setCategoryHandle,
  setListBrandInFilterCategory,
  setListTreeCategoryInUpdateProduct
} = categorySlice.actions;

export default categorySlice.reducer;
