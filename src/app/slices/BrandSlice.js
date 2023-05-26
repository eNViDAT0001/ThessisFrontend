import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    listBrand:[],
    addFormBrand:{
        name:"",
        image_path:"",
    },
    listProductInBrandDetail:[],
    listShopInAdmin:[],
    metaInShopInAdmin:{},
    metaInListBrand:{},
    isPopUpFormUpdate:false,
    brandDetail:{}
};

const brandSlice = createSlice({
    name: 'brand',
    initialState,
    reducers:{
        setListBrand:(state,action) => {
            state.listBrand = action.payload
        },
        setFilterBrand:(state,action)=>{
            state.filterBrand = action.payload
        },
        setNameInAddForm:(state,action)=>{
            state.addFormBrand.name = action.payload
        },
        setFileUploadInAddForm:(state,action)=>{
            state.addFormBrand.image_path = action.payload
        },
        setListProductInBrandDetail:(state,action)=>{
            state.listProductInBrandDetail = action.payload
        },
        setMetaInListBrand:(state,action)=>{
            state.metaInListBrand = action.payload
        },
        setListShopInAdmin:(state,action) =>{
            state.listShopInAdmin = action.payload
        },
        setMetaInShopInAdmin: (state,action) =>{
            state.metaInShopInAdmin = action.payload
        },
        setIsPopUpFormUpdate:(state,action) =>{
            state.isPopUpFormUpdate = action.payload
        },
        setBrandDetail:(state,action)=>{
            state.brandDetail = action.payload
        }
    }
});

export const {
    setListBrand,
    setFilterBrand,
    setNameInAddForm,
    setFileUploadInAddForm,
    setListProductInBrandDetail,
    setMetaInListBrand,
    setListShopInAdmin,
    setIsPopUpFormUpdate,
    setMetaInShopInAdmin,
    setBrandDetail
} = brandSlice.actions;

export default brandSlice.reducer;
