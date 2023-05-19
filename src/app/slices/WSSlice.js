import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    WSEvent:{},
    isOpenButtonChat: false,
}

const WSSlice = createSlice({
    name: "webSocket",
    initialState,
    reducers: {
      setWSEvent: (state, action) => {
        state.WSEvent = action.payload;
      },
      setIsOpenButtonChat: (state,action) => {
        state.isOpenButtonChat = action.payload;
      },  

    },
})

export const {
    setWSEvent,
    setIsOpenButtonChat
} = WSSlice.actions

export default WSSlice.reducer