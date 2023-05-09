import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    listChannel:[],
    listMessage:[],
}

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
    },
})

export const {
    setListChannel,
    setListMessage
} = chatSlice.actions

export default chatSlice.reducer