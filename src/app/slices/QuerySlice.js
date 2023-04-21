import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productInHome: {
    name: {
      type: "search[]",
      value: "",
    },
    marker: {
      type: null,
      value: 1,
    },
    limit: {
      type: null,
      value: 8,
    },
  },

  productInDetailBrand: {
    name: {
      type: "search[]",
      value: "",
    },
    limit: {
      type: null,
      value: 8,
    },
    provider_id: {
      type: "fields[]",
      value: null,
    },
    marker: {
      type: null,
      value: 6,
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
      type: null,
      value: 8,
    },
  },

  filterCommentInProductDetail: {
    name: {
      type: "search[]",
      value: "",
    },
    star: {
      type: "fields[]",
      value: null,
    },
    marker: {
      type: null,
      value: 1,
    },
    limit: {
      type: null,
      value: 6,
    },
  },

  filterInCategoryPage: {
    provider_id: {
      type: "fields[]",
      value: 1,
    },
    rating: {
      type: "fields[]",
      value: [],
    },
    marker: {
      type: null,
      value: null,
    },
    type:{
      type: null,
      value: "cursor"
    },
    limit: {
      type: null,
      value: null,
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
      state.productInHome.marker.value = action.payload;
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
      state.filterCommentInProductDetail.name.value = action.payload;
    },
    setStarInComment: (state, action) => {
      state.filterCommentInProductDetail.star.value = action.payload;
    },
    setPageInComment: (state, action) => {
      state.filterCommentInProductDetail.marker.value = action.payload;
    },
    setLimitInComment: (state, action) => {
      state.filterCommentInProductDetail.limit.value = action.payload;
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

    //filter category
    setProviderIDInFilterCategory: (state, action) => {
      state.filterInCategoryPage.provider_id.value = action.payload;
    },
    setMarkerInFilterCategory: (state, action) => {
      state.filterInCategoryPage.marker.value = action.payload;
    },
    setLimitInFilterCategory: (state, action) => {
      state.filterInCategoryPage.limit.value = action.payload;
    },
    addRatingFilterCategory: (state, action) => {
      state.filterInCategoryPage.rating.value.push(action.payload);
    },
    removeRatingFilterCategory: (state, action) => {
      const indexToRemove = state.filterInCategoryPage.rating.value.indexOf(
        action.payload
      ); // Find index of element to remove
      if (indexToRemove !== -1) {
        state.filterInCategoryPage.rating.value.splice(indexToRemove, 1); // Remove element at specified index
      }
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
  setProviderIDInProductInDetailBrand,

  setProviderIDInFilterCategory,
  setMarkerInFilterCategory,
  setLimitInFilterCategory,
  addRatingFilterCategory,
  removeRatingFilterCategory
} = querySlice.actions;

export default querySlice.reducer;
