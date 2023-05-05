import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listBanner: [],
  bannerDetail:{},
  listProductInAddBanner:[],
  metaInProductInAddBanner:{},
  productInBannerDetail:[],
  listBannerInAdmin:[],
};

const bannerSlice = createSlice({
    name: 'banner',
    initialState,
    reducers:{
        setListBanner:(state,action) => {
            state.listBanner = action.payload
        },
        setBannerDetail:(state,action) =>{
            state.bannerDetail = action.payload
        },
        setListBannerInAdmin:(state,action) =>{
            state.listBannerInAdmin = action.payload
        },
        setListProductInAddBanner:(state,action) =>{
            state.listProductInAddBanner = action.payload
        },
        setProductInBannerDetail:(state,action) =>{
            state.productInBannerDetail = action.payload
        },
        setMetaInProductInAddBanner:(state,action) =>{
            state.metaInProductInAddBanner = action.payload
        },
    }
});

export const {
    setListBanner,
    setBannerDetail,
    setListBannerInAdmin,
    setProductInBannerDetail,
    setListProductInAddBanner,
    setMetaInProductInAddBanner
} = bannerSlice.actions;

export default bannerSlice.reducer;
