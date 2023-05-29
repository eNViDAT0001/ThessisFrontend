import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  adminReport: {},
};

const ReportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {
    setAdminReport: (state, action) => {
      state.adminReport = action.payload;
    },
  },
});

export const {
    setAdminReport
} = ReportSlice.actions;
export default ReportSlice.reducer;
