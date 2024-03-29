import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listChannel: [],
  handleChannel: {
    to_user_id: null,
  },
  listMessage: [],
  metaInListMessage: {},
  metaInListChannel: {},
  listMessageChatbot: [],
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
    setMetaInListMessage: (state, action) => {
      state.metaInListMessage = action.payload;
    },
    setMetaInListChannel: (state, action) => {
      state.metaInListChannel = action.payload;
    },

    addBeginningInMessage: (state, action) => {
      return {
        ...state,
        listMessage: [...action.payload, ...state.listMessage],
      };
    },
    addBeginningInChannel: (state, action) => {
      return {
        ...state,
        listChannel: [...action.payload, ...state.listChannel],
      };
    },

    setListMessageChatbot: (state, action) => {
      state.listMessageChatbot = action.payload;
    },
    addEndInMessageChatBot: (state, action) => {
      state.listMessageChatbot.push(action.payload);
    },
  },
});

export const {
  setListChannel,
  setListMessage,
  addMessageSuccess,
  setHandleChannel,
  setMetaInListMessage,
  setMetaInListChannel,

  addBeginningInMessage,
  addBeginningInChannel,

  addEndInMessageChatBot,
  setListMessageChatbot,
} = chatSlice.actions;

export default chatSlice.reducer;
