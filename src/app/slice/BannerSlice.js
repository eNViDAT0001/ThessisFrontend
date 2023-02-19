import { createSlice } from "@reduxjs/toolkit";
import BannerDetailModel from "../models/Read/Banner/BannerDetailModel";
import BannerModel from "../models/Read/Banner/BannerModel";

const initialState = {
  listBanner: [],
  bannerDetail: new BannerDetailModel(),
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
        }
    }
});

export const {
    setListBanner,
    setBannerDetail,
} = bannerSlice.actions;

export default bannerSlice.reducer;
