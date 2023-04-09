import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productInHome: {
    name: {
      type: "search[]",
      value: "",
    },
    page: {
      type: "fields[]",
      value: 1,
    },
    limit: {
      type: "limit",
      value: 8,
    },
  },


  productInDetailBrand: {
    name: {
      type: "search[]",
      value: "",
    },
    page: {
      type: "fields[]",
      value: 1,
    },
    limit: {
      type: "limit",
      value: 8,
    },
    provider_id: {
      type: "fields[]",
      value: null,
    },
  },


  filterBrand: {
    name: {
      type: "search[]",
      value: "",
    },
    page: {
      type: "fields[]",
      value: 1,
    },
    limit: {
      type: "fields[]",
      value: 8,
    },
  },


  filterComment: {
    name: {
      type: "search[]",
      value: "",
    },
    star: {
      type: "fields[]",
      value: null,
    },
    page: {
      type: "fields[]",
      value: 1,
    },
    limit: {
      type: "limit",
      value: 6,
    },
  },
};

const querySlice = createSlice({
  name: "query",
  initialState,
  reducers: {
    //product
    setNameSearchInProductInHome: (state, action) => {
      state.productInHome.name.value = action.payload;
    },
    setPageInProductInHome: (state, action) => {
      state.productInHome.page.value = action.payload;
    },
    setLimitInProductInHome: (state, action) => {
      state.productInHome.limit.value = action.payload;
    },

    //brand
    setNameSearchInBrand: (state, action) => {
      state.filterBrand.name.value = action.payload;
    },
    setPageInFilterBrand: (state, action) => {
      state.filterBrand.page.value = action.payload;
    },
    setLimitInFilterBrand: (state, action) => {
      state.filterBrand.limit.value = action.payload;
    },

    //comment
    setNameSearchInComment: (state, action) => {
      state.productInHome.name.value = action.payload;
    },
    setStarInComment: (state, action) => {
      state.filterComment.star.value = action.payload;
    },
    setPageInComment: (state, action) => {
      state.filterComment.page.value = action.payload;
    },
    setLimitInComment: (state, action) => {
      state.filterComment.limit.value = action.payload;
    },

    //productInDetailBrand
    setNameSearchInProductInDetailBrand: (state, action) => {
      state.productInDetailBrand.name.value = action.payload;
    },
    setPageInProductInDetailBrand: (state, action) => {
      state.productInDetailBrand.page.value = action.payload;
    },
    setLimitInProductInDetailBrand: (state, action) => {
      state.productInDetailBrand.limit.value = action.payload;
    },
    setProviderIDInProductInDetailBrand: (state, action) => {
      state.productInDetailBrand.provider_id.value = action.payload;
    },
  },
});

export const {
  setNameSearchInProductInHome,
  setPageInProductInHome,

  setNameSearchInBrand,
  setPageInFilterBrand,
  setLimitInFilterBrand,

  setNameSearchInComment,
  setStarInComment,
  setPageInComment,
  setLimitInComment,

  setNameSearchInProductInDetailBrand,
  setPageInProductInDetailBrand,
  setLimitInProductInDetailBrand,
  setProviderIDInProductInDetailBrand
} = querySlice.actions;

export default querySlice.reducer;
