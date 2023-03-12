import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    listOrderInProvider:[],
    listOrderInAccountDetail:[]
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setListOrderInProvider: (state, action) => {
      state.listOrderInProvider = action.payload;
    },
  },
});

export const {
    setListOrderInProvider
} = orderSlice.actions;

export default orderSlice.reducer;
