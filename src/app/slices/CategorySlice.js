import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryRoot: [],
  listTreeCategory: [],
  categoryHover:{},
  categoryHandle:{},
  listProductInCategory: [],
  metaProductInCategory: {},
};

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers:{
        setCategoryRoot:(state,action) => {
            state.categoryRoot = action.payload
        },
        setListProductInCategory:(state,action) => {
            state.listProductInCategory = action.payload
        },
        setMetaProductInCategory:(state,action) => {
            state.metaProductInCategory = action.payload
        },
        setListTreeCategory: (state,action) =>{
            state.listTreeCategory = action.payload
        },
        setCategoryHandle: (state,action) =>{
            state.categoryHandle = action.payload
        },
    }
});

export const {
    setCategoryRoot,
    setListProductInCategory,
    setMetaProductInCategory,
    setListTreeCategory,
    setCategoryHandle
    
} = categorySlice.actions;

export default categorySlice.reducer;
