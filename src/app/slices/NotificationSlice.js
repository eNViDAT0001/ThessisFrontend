import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listNotification: [],
  metaInNotification: {},
  listNotificationSmall: [],
  c: 0,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setListNotification: (state, action) => {
      state.listNotification = action.payload;
    },
    setMetaInNotification: (state, action) => {
      state.metaInNotification = action.payload;
    },
    setListNotificationSmall: (state, action) => {
      state.listNotificationSmall = action.payload;
    },
    addNotification: (state, action) => {
      return {
        ...state,
        listNotification: [...state.listNotification, ...action.payload],
      };
    },
    addBeginningInNotifySmall: (state, action) => {
      return {
        ...state,
        listNotificationSmall: [
          ...action.payload,
          ...state.listNotificationSmall,
        ],
      };
    },
    setUnseen: (state, action) => {
      state.totalUnseen = action.payload;
    },
    decreaseUnseen: (state, action) => {
      state.totalUnseen -= 1;
    },
    increaseUnseen: (state, action) => {
      state.totalUnseen += 1;
    },
  },
});

export const {
  setListNotification,
  setMetaInNotification,
  setListNotificationSmall,
  addNotification,
  addBeginningInNotifySmall,
  setUnseen,
  decreaseUnseen,
  increaseUnseen,
} = notificationSlice.actions;

export default notificationSlice.reducer;
