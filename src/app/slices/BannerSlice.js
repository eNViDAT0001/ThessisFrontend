import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listBanner: [],
  bannerDetail:[],
  
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
