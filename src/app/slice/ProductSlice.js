import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productInHome: [],
  productInCategory:[],
  productDetail:{},
  imageProduct:[],
  descriptionProduct:[],
  specificationProduct:[],
  optionHandle:{
    id:0,
    name:"",
    price:0,
    quantity:0,
  },
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers:{
        reset: () => initialState,
        setProductInHome:(state,action) => {
            state.productInHome = action.payload
        },
        setProductInCategory:(state,action) =>{
            state.productInCategory = action.payload
        },
        setProductDetail: (state,action) => {
            state.productDetail = action.payload
        },
        setImageProduct:(state,action)=>{
            state.imageProduct = action.payload
        },
        setDescriptionProduct:(state,action)=>{
            state.descriptionProduct = action.payload
        },
        setSpecificationProduct:(state,action)=>{
            state.specificationProduct = action.payload
        },
        setOptionHandle:(state,action) =>{
            state.optionHandle = action.payload
        },
        setQuantityHandle:(state,action)=>{
            state.quantityHandle = action.payload
        },
    }
});

export const {
    setProductInHome,
    setProductInCategory,
    setProductDetail,
    setImageProduct,
    setDescriptionProduct,
    setSpecificationProduct,
    reset,
    setOptionHandle,
} = productSlice.actions;

export default productSlice.reducer;
