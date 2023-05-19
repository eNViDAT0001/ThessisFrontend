import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInformation: {},
  listUserInAdmin: [],
  metaUserInAdmin: {},
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
  },
});

export const { setUserInformation, setListUserInAdmin, setMetaUserInAdmin } =
  userSlice.actions;

export default userSlice.reducer;
