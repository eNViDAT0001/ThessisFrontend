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
      value: 16,
    },
  },

  filterBrand: {
    name: {
      type: "search[]",
      value: null,
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

  filterCommentInProductDetail: {
    name: {
      type: "search[]",
      value: "",
    },
    rating: {
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
    id: {
      type: "sorts[]",
      value: "DESC",
    },
  },

  filterInCategoryPage: {
    name: {
      type: "search[]",
      value: null,
    },
    provider_id: {
      type: "fields[]",
      value: null,
    },
    rating: {
      type: "fields[]",
      value: null,
    },
    marker: {
      type: null,
      value: null,
    },
    limit: {
      type: null,
      value: null,
    },
  },

  sortInCategoryPage: {
    name: {
      type: "sorts[]",
      value: null,
    },
    price: {
      type: "sorts[]",
      value: null,
    },
  },

  filterBrandInCategoryPage: {
    name: {
      type: "search[]",
      value: null,
    },
    limit: {
      type: null,
      value: 5,
    },
    type: {
      type: null,
      value: "cursor",
    },
    marker: {
      type: null,
      value: null,
    },
  },

  filterOrderInAccountPage: {
    status: {
      type: "fields[]",
      value: null,
    },
    limit: {
      type: null,
      value: 4,
    },
    marker: {
      type: null,
      value: 1,
    },
    id: {
      type: "sorts[]",
      value: "DESC",
    },
  },

  productInAddBanner: {
    name: {
      type: "search[]",
      value: null,
    },
    limit: {
      type: null,
      value: 8,
    },
    marker: {
      type: null,
      value: 1,
    },
  },

  productInUpdateBanner: {
    name: {
      type: "search[]",
      value: null,
    },
    limit: {
      type: null,
      value: 8,
    },
    marker: {
      type: null,
      value: 1,
    },
  },

  productOutUpdateBanner: {
    name: {
      type: "search[]",
      value: null,
    },
    limit: {
      type: null,
      value: 8,
    },
    marker: {
      type: null,
      value: 1,
    },
  },

  filterChannel: {
    type: {
      type: null,
      value: "cursor",
    },
    marker: {
      type: null,
      value: null,
    },
    limit: {
      type: null,
      value: null,
    },
    name: {
      type: "search[]",
      value: null,
    },
  },

  filterMessage: {
    type: {
      type: null,
      value: "cursor",
    },
    marker: {
      type: null,
      value: null,
    },
    limit: {
      type: null,
      value: null,
    },
    id: {
      type: "sorts[]",
      value: "DESC",
    },
  },

  filterNotify: {
    type: {
      type: null,
      value: "cursor",
    },
    marker: {
      type: null,
      value: null,
    },
    limit: {
      type: null,
      value: 6,
    },
    id: {
      type: "sorts[]",
      value: "DESC",
    },
  },

  //admin
  filterUserTabAdmin: {
    name: {
      type: "search[]",
      value: null,
    },
    limit: {
      type: null,
      value: 4,
    },
    marker: {
      type: null,
      value: 1,
    },
  },

  filterOrderTabAdmin: {
    name: {
      type: "search[]",
      value: null,
    },
    limit: {
      type: null,
      value: 4,
    },
    marker: {
      type: null,
      value: 1,
    },
  },

  filterProductTabAdmin: {
    name: {
      type: "search[]",
      value: null,
    },
    limit: {
      type: null,
      value: 4,
    },
    marker: {
      type: null,
      value: 1,
    },
  },

  filterShopTabAdmin: {
    name: {
      type: "search[]",
      value: null,
    },
    limit: {
      type: null,
      value: 4,
    },
    marker: {
      type: null,
      value: 1,
    },
  },

  filterBannerTabAdmin: {
    name: {
      type: "search[]",
      value: null,
    },
    limit: {
      type: null,
      value: 4,
    },
    marker: {
      type: null,
      value: 1,
    },
  },

  filterRequestTabAdmin: {
    name: {
      type: "search[]",
      value: null,
    },
    limit: {
      type: null,
      value: 4,
    },
    marker: {
      type: null,
      value: 1,
    },
    type: {
      type: "fields[]",
      value: null,
    },
  },

  //bannerDetail

  productInDetailBrand: {
    name: {
      type: "search[]",
      value: null,
    },
    limit: {
      type: null,
      value: 4,
    },
    provider_id: {
      type: "fields[]",
      value: null,
    },
    marker: {
      type: null,
      value: 1,
    },
    id: {
      type: "sorts[]",
      value: "DESC",
    },
  },

  filterOrderInBannerDetail: {
    name: {
      type: "search[]",
      value: null,
    },
    limit: {
      type: null,
      value: 4,
    },
    marker: {
      type: null,
      value: 1,
    },
    id: {
      type: "sorts[]",
      value: "DESC",
    },
  },

  filterRecommendProduct: {
    limit: {
      type: null,
      value: 8,
    },
    marker: {
      type: null,
      value: 1,
    },
  },
};

const querySlice = createSlice({
  name: "query",
  initialState,
  reducers: {
    resetFilterInCategory: () => initialState,
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
      state.filterBrand.marker.value = action.payload;
    },
    setLimitInFilterBrand: (state, action) => {
      state.filterBrand.limit.value = action.payload;
    },

    //comment
    setNameSearchInComment: (state, action) => {
      state.filterCommentInProductDetail.name.value = action.payload;
    },
    setRatingInComment: (state, action) => {
      state.filterCommentInProductDetail.rating.value = action.payload;
    },
    setPageInComment: (state, action) => {
      state.filterCommentInProductDetail.marker.value = action.payload;
    },
    setLimitInComment: (state, action) => {
      state.filterCommentInProductDetail.limit.value = action.payload;
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
    setRatingInFilterCategory: (state, action) => {
      state.filterInCategoryPage.rating.value = action.payload;
    },
    setNameInFilterCategory: (state, action) => {
      state.filterInCategoryPage.name.value = action.payload;
    },

    //sort in category
    setSortPriceInSortCategory: (state, action) => {
      state.sortInCategoryPage.price.value = action.payload;
    },
    setSortNameInSortCategory: (state, action) => {
      state.sortInCategoryPage.name.value = action.payload;
    },

    //filter brand in category
    setSearchInBrandInFilterCategory: (state, action) => {
      state.filterBrandInCategoryPage.name.value = action.payload;
    },
    setMarkerInBrandInFilterCategory: (state, action) => {
      state.filterBrandInCategoryPage.marker.value = action.payload;
    },

    //filter order in account
    setStatusInOrderInAccount: (state, action) => {
      state.filterOrderInAccountPage.status.value = action.payload;
    },
    setLimitInOrderInAccount: (state, action) => {
      state.filterOrderInAccountPage.limit.value = action.payload;
    },
    setPageInOrderInAccount: (state, action) => {
      state.filterOrderInAccountPage.marker.value = action.payload;
    },

    //productInAddBanner
    setNameInProductInAddBanner: (state, action) => {
      state.productInAddBanner.name.value = action.payload;
    },
    setLimitInProductInAddBanner: (state, action) => {
      state.productInAddBanner.limit.value = action.payload;
    },
    setPageInProductInAddBanner: (state, action) => {
      state.productInAddBanner.marker.value = action.payload;
    },

    //productInUpdateBanner
    setNameInProductInUpdateBanner: (state, action) => {
      state.productInUpdateBanner.name.value = action.payload;
    },
    setLimitInProductInUpdateBanner: (state, action) => {
      state.productInUpdateBanner.limit.value = action.payload;
    },
    setPageInProductInUpdateBanner: (state, action) => {
      state.productInUpdateBanner.marker.value = action.payload;
    },

    setNameInProductOutUpdateBanner: (state, action) => {
      state.productOutUpdateBanner.name.value = action.payload;
    },
    setLimitInProductOutUpdateBanner: (state, action) => {
      state.productOutUpdateBanner.limit.value = action.payload;
    },
    setPageInProductOutUpdateBanner: (state, action) => {
      state.productOutUpdateBanner.marker.value = action.payload;
    },
    //Websocket
    setMarkerInFilterChannel: (state, action) => {
      state.filterChannel.marker.value = action.payload;
    },
    setNameSearchInFilterChannel: (state, action) => {
      state.filterChannel.name.value = action.payload;
    },
    setMarkerInFilterMessage: (state, action) => {
      state.filterMessage.marker.value = action.payload;
    },
    setMarkerInFilterNotify: (state, action) => {
      state.filterNotify.marker.value = action.payload;
    },

    //adminTab
    setLimitInFilterUserTabAdmin: (state, action) => {
      state.filterUserTabAdmin.limit.value = action.payload;
    },
    setPageInFilterUserTabAdmin: (state, action) => {
      state.filterUserTabAdmin.marker.value = action.payload;
    },
    setNameInFilterUserTabAdmin: (state, action) => {
      state.filterUserTabAdmin.name.value = action.payload;
    },

    setLimitInFilterProductTabAdmin: (state, action) => {
      state.filterProductTabAdmin.limit.value = action.payload;
    },
    setPageInFilterProductTabAdmin: (state, action) => {
      state.filterProductTabAdmin.marker.value = action.payload;
    },
    setNameInFilterProductTabAdmin: (state, action) => {
      state.filterProductTabAdmin.name.value = action.payload;
    },

    setLimitInFilterOrderTabAdmin: (state, action) => {
      state.filterOrderTabAdmin.limit.value = action.payload;
    },
    setPageInFilterOrderTabAdmin: (state, action) => {
      state.filterOrderTabAdmin.marker.value = action.payload;
    },
    setNameInFilterOrderTabAdmin: (state, action) => {
      state.filterOrderTabAdmin.name.value = action.payload;
    },

    setLimitInFilterShopTabAdmin: (state, action) => {
      state.filterShopTabAdmin.limit.value = action.payload;
    },
    setPageInFilterShopTabAdmin: (state, action) => {
      state.filterShopTabAdmin.marker.value = action.payload;
    },
    setNameInFilterShopTabAdmin: (state, action) => {
      state.filterShopTabAdmin.name.value = action.payload;
    },

    setLimitInFilterBannerTabAdmin: (state, action) => {
      state.filterBannerTabAdmin.limit.value = action.payload;
    },
    setPageInFilterBannerTabAdmin: (state, action) => {
      state.filterBannerTabAdmin.marker.value = action.payload;
    },
    setNameInFilterBannerTabAdmin: (state, action) => {
      state.filterBannerTabAdmin.name.value = action.payload;
    },

    setLimitInFilterRequestTabAdmin: (state, action) => {
      state.filterRequestTabAdmin.limit.value = action.payload;
    },
    setPageInFilterRequestTabAdmin: (state, action) => {
      state.filterRequestTabAdmin.marker.value = action.payload;
    },
    setNameInFilterRequestTabAdmin: (state, action) => {
      state.filterRequestTabAdmin.name.value = action.payload;
    },
    setTypeInFilterRequestTabAdmin: (state, action) => {
      state.filterRequestTabAdmin.type.value = action.payload;
    },
    //bannerDetail
    setNameSearchInProductInDetailBrand: (state, action) => {
      state.productInDetailBrand.name.value = action.payload;
    },
    setPageInProductInDetailBrand: (state, action) => {
      state.productInDetailBrand.marker.value = action.payload;
    },
    setLimitInProductInDetailBrand: (state, action) => {
      state.productInDetailBrand.limit.value = action.payload;
    },
    setProviderIDInProductInDetailBrand: (state, action) => {
      state.productInDetailBrand.provider_id.value = action.payload;
    },

    setLimitInFilterOrderInBrandDetail: (state, action) => {
      state.filterOrderInBannerDetail.limit.value = action.payload;
    },
    setPageInFilterOrderInBrandDetail: (state, action) => {
      state.filterOrderInBannerDetail.marker.value = action.payload;
    },
    setNameInFilterOrderInBrandDetail: (state, action) => {
      state.filterOrderInBannerDetail.name.value = action.payload;
    },

    setMarkerInFilterRecommendProduct: (state, action) => {
      state.filterRecommendProduct.marker.value = action.payload;
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
  setRatingInComment,
  setPageInComment,
  setLimitInComment,

  resetFilterInCategory,
  setNameInFilterCategory,
  setProviderIDInFilterCategory,
  setMarkerInFilterCategory,
  setLimitInFilterCategory,
  setRatingInFilterCategory,

  setSortPriceInSortCategory,
  setSortNameInSortCategory,

  setSearchInBrandInFilterCategory,
  setMarkerInBrandInFilterCategory,

  setStatusInOrderInAccount,
  setPageInOrderInAccount,
  setLimitInOrderInAccount,

  setNameInProductInAddBanner,
  setLimitInProductInAddBanner,
  setPageInProductInAddBanner,

  setNameInProductInUpdateBanner,
  setLimitInProductInUpdateBanner,
  setPageInProductInUpdateBanner,
  setNameInProductOutUpdateBanner,
  setLimitInProductOutUpdateBanner,
  setPageInProductOutUpdateBanner,

  setMarkerInFilterChannel,
  setNameSearchInFilterChannel,
  setMarkerInFilterMessage,
  setMarkerInFilterNotify,

  setLimitInFilterUserTabAdmin,
  setPageInFilterUserTabAdmin,
  setNameInFilterUserTabAdmin,
  setLimitInFilterOrderTabAdmin,
  setPageInFilterOrderTabAdmin,
  setNameInFilterOrderTabAdmin,
  setLimitInFilterProductTabAdmin,
  setPageInFilterProductTabAdmin,
  setNameInFilterProductTabAdmin,
  setLimitInFilterShopTabAdmin,
  setPageInFilterShopTabAdmin,
  setNameInFilterShopTabAdmin,
  setLimitInFilterBannerTabAdmin,
  setPageInFilterBannerTabAdmin,
  setLimitInFilterRequestTabAdmin,
  setPageInFilterRequestTabAdmin,
  setNameInFilterRequestTabAdmin,
  setTypeInFilterRequestTabAdmin,

  setLimitInFilterProductInBannerDetail,
  setPageInFilterProductInBannerDetail,

  setNameSearchInProductInDetailBrand,
  setPageInProductInDetailBrand,
  setLimitInProductInDetailBrand,
  setProviderIDInProductInDetailBrand,

  setLimitInFilterOrderInBrandDetail,
  setPageInFilterOrderInBrandDetail,
  setNameInFilterOrderInBrandDetail,

  setMarkerInFilterRecommendProduct,
} = querySlice.actions;

export default querySlice.reducer;
