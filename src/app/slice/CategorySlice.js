import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryRoot: [],
};

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers:{
        setCategoryRoot:(state,action) => {
            state.categoryRoot = action.payload
        },

    }
});

export const {
    setCategoryRoot,
} = categorySlice.actions;

export default categorySlice.reducer;
