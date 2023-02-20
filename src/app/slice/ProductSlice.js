import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productInHome: [],
  productInCategory:[],
  productDetail:{}
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers:{
        setProductInHome:(state,action) => {
            state.productInHome = action.payload
        },
        setProductInCategory:(state,action) =>{
            state.productInCategory = action.payload
        },
        setProductDetail: (state,action) => {
            state.productDetail = action.payload
        }
    }
});

export const {
    setProductInHome,
    setProductInCategory,
    setProductDetail,
} = productSlice.actions;

export default productSlice.reducer;
