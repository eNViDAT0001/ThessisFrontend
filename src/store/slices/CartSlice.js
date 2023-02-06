import { createSlice } from '@reduxjs/toolkit'
import { CartShoppingApi } from '../../api/CartShopping'



const initialState = {
    listCart: {},
    selectedCart:{},
}
const CartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        resetCart:()=>initialState,
        setCart : (state,action) =>
        {
            state.listCart = action.payload
        },
        setSelectedCart: (state,action)=>{
            state.selectedCart = action.payload
        },
    }
})

export const FetchAllCartShopping = (id) => async(dispatch) =>{
    try {
        const response = await CartShoppingApi.GetCartFromUser(id)
        dispatch(setCart(response))
    } catch (error) {
        
    }
}
export const {
    resetCart,
    setCart,
    setSelectedCart,
} = CartSlice.actions
export default CartSlice.reducer

