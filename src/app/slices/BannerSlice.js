import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listBanner: [],
  bannerDetail:{},
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
        setProductInBannerDetail:(state,action) =>{
            state.productInBannerDetail = action.payload
        }
    }
});

export const {
    setListBanner,
    setBannerDetail,
    setListBannerInAdmin,
    setProductInBannerDetail
} = bannerSlice.actions;

export default bannerSlice.reducer;
