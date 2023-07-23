import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  adminReport: {},
  productReport: [],
  providerReport: [],
  orderReport: [],
  orderReportInBrandDetail: [],
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
    setOrderDBInBrandDetail: (state, action) => {
      state.orderReportInBrandDetail = action.payload;
    },
  },
});

export const {
  setAdminReport,
  setProductReport,
  setProviderReport,
  setOrderReport,
  setOrderDBInBrandDetail,
} = ReportSlice.actions;
export default ReportSlice.reducer;
