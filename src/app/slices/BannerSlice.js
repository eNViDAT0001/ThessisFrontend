import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listBanner: [],
  bannerDetail:{},
  bannerDetailInUpdate:{},
  listProductInAddBanner:[],
  listProductInUpdateBanner:[],
  metaInProductInAddBanner:{},
  metaInProductInUpdateBanner:{},
  productInBannerDetail:[],
  listBannerInAdmin:[],

  listProductOutInUpdateBanner:[],
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
        setBannerDetailInUpdate:(state,action) =>{
            state.bannerDetailInUpdate = action.payload
        },
        setListBannerInAdmin:(state,action) =>{
            state.listBannerInAdmin = action.payload
        },
        setListProductInAddBanner:(state,action) =>{
            state.listProductInAddBanner = action.payload
        },
        setListProductInUpdateBanner:(state,action) =>{
            state.listProductInUpdateBanner = action.payload
        },
        setProductInBannerDetail:(state,action) =>{
            state.productInBannerDetail = action.payload
        },
        setMetaInProductInAddBanner:(state,action) =>{
            state.metaInProductInAddBanner = action.payload
        },
        setMetaInProductInUpdateBanner:(state,action) =>{
            state.metaInProductInUpdateBanner = action.payload
        },
        setListProductOutInUpdateBanner:(state,action) =>{
            state.listProductOutInUpdateBanner = action.payload
        }
    }
});

export const {
    setListBanner,
    setBannerDetail,
    setListBannerInAdmin,
    setProductInBannerDetail,
    setListProductInAddBanner,
    setMetaInProductInAddBanner,

    setMetaInProductInUpdateBanner,
    setListProductInUpdateBanner,
    setBannerDetailInUpdate,
    setListProductOutInUpdateBanner 
} = bannerSlice.actions;

export default bannerSlice.reducer;
