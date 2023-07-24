import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  WSEvent: {},
  isOpenButtonChat: false,
  language: false,
};

const WSSlice = createSlice({
  name: "webSocket",
  initialState,
  reducers: {
    setWSEvent: (state, action) => {
      state.WSEvent = action.payload;
    },
    setIsOpenButtonChat: (state, action) => {
      state.isOpenButtonChat = action.payload;
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});

export const { setWSEvent, setIsOpenButtonChat, setLanguage } = WSSlice.actions;

export default WSSlice.reducer;
