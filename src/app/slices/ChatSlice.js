import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listChannel: [],
  handleChannel: {
    to_user_id: null,
  },
  listMessage: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setListChannel: (state, action) => {
      state.listChannel = action.payload;
    },
    setListMessage: (state, action) => {
      state.listMessage = action.payload;
    },
    setHandleChannel: (state, action) => {
      state.handleChannel = action.payload;
    },
    addMessageSuccess: (state, action) => {
      state.listMessage.push(action.payload);
    },
  },
});

export const {
  setListChannel,
  setListMessage,
  addMessageSuccess,
  setHandleChannel,
} = chatSlice.actions;

export default chatSlice.reducer;
