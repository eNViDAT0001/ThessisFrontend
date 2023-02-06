import { createSlice } from '@reduxjs/toolkit'
import { ProviderApi } from '../../api/ProviderApi'

const initialState = {
    ListBrand:{},
    ProductInBrand:[],
}

const ProviderSlice = createSlice({
    name:'provider',
    initialState,

    reducers:
    {
        setListBrand: (state,action) =>{
            state.ListBrand = action.payload
        },
        setProductInBrand: (state,action) =>{
            state.ProductInBrand = action.payload
        }

    },
})



export const FetchGetListBrand = (id,filter) => async(dispatch) =>{
    try{
        const response = await ProviderApi.GetListBrand(id,filter)
        dispatch(setListBrand(response))
    }catch(err){
        console.log(err)
    }
}


export const {
    setListBrand,
    setProductInBrand,
} = ProviderSlice.actions
export default ProviderSlice.reducer