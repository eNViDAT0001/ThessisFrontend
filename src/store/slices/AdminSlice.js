import { createSlice } from '@reduxjs/toolkit'
import { AdminApi } from '../../api/AdminApi'

const initialState = {
    ListUser:{},
}

const AdminSlice = createSlice({
    name:'address',
    initialState,

    reducers:
    {
        setListUser: (state,action) =>{
            state.ListUser = action.payload
        },
    },
})

export const GetListUser = () => async(dispatch) =>{
    try{
        const response = await AdminApi.ListUser()
        dispatch(setListUser(response))
    }catch(err){
        console.log(err)
    }
}
export const {
    setListUser,
 
} = AdminSlice.actions
export default AdminSlice.reducer