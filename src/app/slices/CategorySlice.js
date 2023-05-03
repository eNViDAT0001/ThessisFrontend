import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryRoot: [],
  listTreeCategory: [],
  listTreeCategoryInUpdateProduct: [],
  listCategoryInAdmin: [],
  listTreeCategoryLogic: [],
  categoryIDHandleInAddTree: null,
  categoryIDHandleInUpdateTree: null,
  categoryHandleInAdmin: {},
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
    setCategoryHandleInAdmin: (state, action) => {
      state.categoryHandleInAdmin = action.payload;
    },
    setCategoryIDHandleInUpdateTree: (state, action) => {
      state.categoryIDHandleInUpdateTree = action.payload;
    },
    setListTreeCategoryLogic: (state, action) => {
      state.listTreeCategoryLogic = action.payload;
    },
    setCategoryIDHandleInAddTree: (state, action) => {
      state.categoryIDHandleInAddTree = action.payload;
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
  setListTreeCategoryInUpdateProduct,
  setCategoryHandleInAdmin,
  setCategoryIDHandleInUpdateTree,

  setListTreeCategoryLogic,
  setCategoryIDHandleInAddTree,
} = categorySlice.actions;

export default categorySlice.reducer;
