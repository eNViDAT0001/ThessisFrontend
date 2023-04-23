import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    listOrderInProvider:[],
    listOrderInAccount:[],
    metaInOrderInAccount:{},
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setListOrderInProvider: (state, action) => {
      state.listOrderInProvider = action.payload;
    },
    setListOrderInAccount: (state,action) =>{
      state.listOrderInAccount = action.payload;
    },
    setMetaInOrderInAccount: (state,action) =>{
      state.metaInOrderInAccount= action.payload
    }
  },
});

export const {
    setListOrderInProvider,
    setListOrderInAccount,
    setMetaInOrderInAccount
} = orderSlice.actions;

export default orderSlice.reducer;
