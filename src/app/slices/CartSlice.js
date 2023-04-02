import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    listCart: {},
    selectedCart:{},
}
const CartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        resetCart:()=>initialState,
        setListCart : (state,action) =>
        {
            state.listCart = action.payload
        },
        setSelectedCart: (state,action)=>{
            state.selectedCart = action.payload
        },
    }
})

export const {
    resetCart,
    setListCart,
    setSelectedCart,
} = CartSlice.actions
export default CartSlice.reducer