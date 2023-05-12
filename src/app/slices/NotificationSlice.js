import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    listNotification:[],
    metaInNotification:{},
}

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
      setListNotification: (state, action) => {
        state.listNotification = action.payload;
      },
      setMetaInNotification:(state,action) =>{
        state.metaInNotification = action.payload
      }
    },
})

export const {
    setListNotification,
    setMetaInNotification
} = notificationSlice.actions

export default notificationSlice.reducer