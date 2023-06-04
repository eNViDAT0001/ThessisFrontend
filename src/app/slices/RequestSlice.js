import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listRequestInAdmin: [],
  metaRequestInAdmin: {},
};

const RequestSlice = createSlice({
  name: "request",
  initialState,
  reducers: {
    setListRequestInAdmin: (state, action) => {
      state.listRequestInAdmin = action.payload;
    },
    setMetaRequestInAdmin: (state, action) => {
      state.metaRequestInAdmin = action.payload;
    },
  },
});

export const { setListRequestInAdmin, setMetaRequestInAdmin } = RequestSlice.actions;

export default RequestSlice.reducer;
