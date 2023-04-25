import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    userInformation:{},
    listUserInAdmin:[],
}

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
    },
})

export const {
    setUserInformation,
    setListUserInAdmin
} = userSlice.actions

export default userSlice.reducer