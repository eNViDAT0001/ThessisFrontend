import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    listBrand:[],
    addFormBrand:{
        name:"",
        image_path:"",
    },
    listProductInBrandDetail:[],
    filterBrand:{}
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
    }
});

export const {
    setListBrand,
    setFilterBrand,
    setNameInAddForm,
    setFileUploadInAddForm,
    setListProductInBrandDetail,
} = brandSlice.actions;

export default brandSlice.reducer;
