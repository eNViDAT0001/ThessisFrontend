import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    listOrderInProvider:[],
    listOrderInAccount:[],
    listOrderInAdmin:[],
    listItemsInOrder:[],
    metaInOrderInAccount:{},
    orderHandleDetail:{}
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
    setListOrderInAdmin: (state,action) =>{
      state.listOrderInAdmin = action.payload;
    },
    setMetaInOrderInAccount: (state,action) =>{
      state.metaInOrderInAccount= action.payload
    },
    setListItemsInOrder:(state,action)=>{
      state.listItemsInOrder = action.payload
    },
    setOrderHandleDetail:(state,action)=>{
      state.orderHandleDetail = action.payload
    }
  },
});

export const {
    setListOrderInProvider,
    setListOrderInAccount,
    setListOrderInAdmin,
    setMetaInOrderInAccount,
    setListItemsInOrder,
    setOrderHandleDetail
} = orderSlice.actions;

export default orderSlice.reducer;
