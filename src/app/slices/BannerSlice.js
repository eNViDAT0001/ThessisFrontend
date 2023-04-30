import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listBanner: [],
  bannerDetail:{},
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
        }
    }
});

export const {
    setListBanner,
    setBannerDetail,
    setListBannerInAdmin
} = bannerSlice.actions;

export default bannerSlice.reducer;
