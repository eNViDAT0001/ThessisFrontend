import { createSlice } from "@reduxjs/toolkit";


const initialState = {

};

const brandSlice = createSlice({
    name: 'brand',
    initialState,
    reducers:{
  
    }
});

export const {
    setListBanner,
    setBannerDetail,
} = brandSlice.actions;

export default brandSlice.reducer;
