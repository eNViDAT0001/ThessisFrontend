import { createSlice } from '@reduxjs/toolkit'
import { OrderApi } from '../../api/OrderApi'

const initialState = {
    OrderAccount:{},
    nameSearch:"",
    ListOrderInProvider:{},
    OrderDetail:{}

}


const OrderSlice = createSlice({
    name:'order',
    initialState,
    reducers:
    {
        setNameSearch:(state,action)=>{
            state.nameSearch=action.payload
        },
        setListOrderInProvider:(state,action)=>{
            state.ListOrderInProvider = action.payload
        },
        setOrderInAccount: (state,action) =>{
            state.OrderAccount = action.payload
        },
        setListOrderDetail: (state,action)=>{
            state.OrderDetail = action.payload
        }
    }
})
export const resetOrder=()=>(dispatch)=>{
    dispatch(setListOrderDetail({}))
    dispatch(setListOrderInProvider({}))
    dispatch(setOrderInAccount({}))
}

export const FetchOrderInUser = (id,filter) => async(dispatch) =>{
    try {
        const response = await OrderApi.GetOrderFromUser(id,filter)
        dispatch(setOrderInAccount(response))
    } catch (error) {
        console.log(error)
    }
}

export const FetchOrderInProvider = (id,filter) => async(dispatch)=>{
    try{
        const response = await OrderApi.GetOrderFromProvider(id,filter)
        dispatch(setListOrderInProvider(response))
    }catch(err){
        console.log(err)
    }
}
export const FetchOrderDetail = (id)=>async(dispatch)=>{
    try {
        const response = await OrderApi.GetOrderItems(id)
        dispatch(setListOrderDetail(response))
    } catch (error) {
        
    }
}

export const {
    setListOrderDetail,
    setOrderInAccount,
    setListOrderInProvider,
    setNameSearch,
} = OrderSlice.actions
export default OrderSlice.reducer