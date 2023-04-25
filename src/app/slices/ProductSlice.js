import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productInHome: [],
  metaInProductInHome:{},
  listProductInAdmin:[],
  productInCategory:[],
  productDetail:{},
  productForyou:[],
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
        setMetaInProductInHome:(state,action) => {
            state.metaInProductInHome = action.payload
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
        setProductForYou:(state,action)=>{
            state.productForyou = action.payload
        },
        setListProductInAdmin:(state,action)=>{
            state.listProductInAdmin = action.payload
        },
    }
});

export const {
    setProductInHome,
    setMetaInProductInHome,
    setProductInCategory,
    setProductDetail,
    setImageProduct,
    setDescriptionProduct,
    setSpecificationProduct,
    reset,
    setOptionHandle,
    setProductForYou,
    setListProductInAdmin
} = productSlice.actions;

export default productSlice.reducer;
