import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listOrderInProvider: [],
  listOrderInAccount: [],
  listOrderInAdmin: [],
  listItemsInOrder: [],
  metaInOrderInAccount: {},
  orderHandleDetail: {},
  dataShippingCost: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setListOrderInProvider: (state, action) => {
      state.listOrderInProvider = action.payload;
    },
    setListOrderInAccount: (state, action) => {
      state.listOrderInAccount = action.payload;
    },
    setListOrderInAdmin: (state, action) => {
      state.listOrderInAdmin = action.payload;
    },
    setMetaInOrderInAccount: (state, action) => {
      state.metaInOrderInAccount = action.payload;
    },
    setListItemsInOrder: (state, action) => {
      state.listItemsInOrder = action.payload;
    },
    setOrderHandleDetail: (state, action) => {
      state.orderHandleDetail = action.payload;
    },
    setDataShippingCost: (state, action) => {
      state.dataShippingCost = action.payload;
    },
    addDataToShippingCost: (state, action) => {
      state.dataShippingCost.push(action.payload)
    },
  },
});

export const {
  setListOrderInProvider,
  setListOrderInAccount,
  setListOrderInAdmin,
  setMetaInOrderInAccount,
  setListItemsInOrder,
  setOrderHandleDetail,

  setDataShippingCost,
  addDataToShippingCost
} = orderSlice.actions;

export default orderSlice.reducer;
