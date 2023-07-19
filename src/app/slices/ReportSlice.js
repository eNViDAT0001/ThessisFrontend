import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  adminReport: {},
  productReport: [],
  providerReport: [],
  orderReport: [],
};

const ReportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {
    setAdminReport: (state, action) => {
      state.adminReport = action.payload;
    },
    setProductReport: (state, action) => {
      state.productReport = action.payload;
    },
    setProviderReport: (state, action) => {
      state.providerReport = action.payload;
    },
    setOrderReport: (state, action) => {
      state.orderReport = action.payload;
    },
  },
});

export const {
  setAdminReport,
  setProductReport,
  setProviderReport,
  setOrderReport,
} = ReportSlice.actions;
export default ReportSlice.reducer;
