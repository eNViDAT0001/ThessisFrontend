import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryRoot: [],
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
    }
});

export const {
    setCategoryRoot,
    setListProductInCategory,
    setMetaProductInCategory
} = categorySlice.actions;

export default categorySlice.reducer;
