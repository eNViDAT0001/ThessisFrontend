import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    listNotification:[],
}

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
      setListNotification: (state, action) => {
        state.listNotification = action.payload;
      },

    },
})

export const {
    setListNotification
} = notificationSlice.actions

export default notificationSlice.reducer