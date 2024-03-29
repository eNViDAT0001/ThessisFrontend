import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInformation: {},
  listUserInAdmin: [],
  metaUserInAdmin: {},
  tabInLayout: {},
  searchInAdmin: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInformation: (state, action) => {
      state.userInformation = action.payload;
    },
    setListUserInAdmin: (state, action) => {
      state.listUserInAdmin = action.payload;
    },
    setMetaUserInAdmin: (state, action) => {
      state.metaUserInAdmin = action.payload;
    },
    setTabInLayout: (state, action) => {
      state.tabInLayout = action.payload;
    },
    setSearchInAdmin: (state, action) => {
      state.searchInAdmin = action.payload;
    },
  },
});

export const {
  setUserInformation,
  setListUserInAdmin,
  setMetaUserInAdmin,
  setTabInLayout,
  setSearchInAdmin,
} = userSlice.actions;

export default userSlice.reducer;
