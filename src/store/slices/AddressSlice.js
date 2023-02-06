import { createSlice } from '@reduxjs/toolkit'
import { AddressApi } from '../../api/AddressApi'
const initialState = {
    UserAddress:[],
    Province:[],
    Ward:[],
    District:[],
    //phục vu cho address trong shopping order
    NameInFormCreate:"",
    PhoneInFormCreate:"",
    ProvinceInFormCreate:"",
    DistrictInFormCreate:"",
    WardInFormCreate:"",
    StreetInFormCreate:"",
    FormAddressSelected:{},
}

const AddressSlice = createSlice({
    name:'address',
    initialState,

    reducers:
    {
        setFormAddressSelected: (state,action)=>{
            state.FormAddressSelected = action.payload
        },
        setNameInFormCreate:(state,action)=>{
            state.NameInFormCreate = action.payload
        },
        setPhoneInFormCreate:(state,action)=>{
            state.PhoneInFormCreate = action.payload
        },
        setProvinceInFormCreate:(state,action)=>{
            state.ProvinceInFormCreate = action.payload
        },
        setDistrictInFormCreate:(state,action)=>{
            state.DistrictInFormCreate = action.payload
        },
        setWardInFormCreate:(state,action)=>{
            state.WardInFormCreate = action.payload
        },
        setStreetInFormCreate:(state,action)=>{
            state.StreetInFormCreate = action.payload
        },
        setUserAddress: (state,action) =>{
            state.UserAddress = action.payload
        },
        setProvince: (state,action) =>{
            state.Province = action.payload
        },
        setWard: (state,action) =>{
            state.Ward = action.payload
        },
        setDistrict: (state,action) =>{
            state.District = action.payload
        },
    },

})
export const resetForm = () => (dispatch) =>{
    dispatch(setNameInFormCreate(""))
    dispatch(setPhoneInFormCreate(""))
    dispatch(setProvinceInFormCreate(""))
    dispatch(setDistrictInFormCreate(""))
    dispatch(setWardInFormCreate(""))
    dispatch(setStreetInFormCreate(""))
}
export const resetAddressSelected = () => (dispatch)=>{
    dispatch(setFormAddressSelected({}))
}
export const fetchAllProvince = () => async(dispatch) =>{
    try{
        const response = await AddressApi.ReadAllProvince()
        dispatch(setProvince(response.data.data))
    }catch(err){
        console.log(err)
    }
}



export const fetchDistrictFromProvince = (idProvince) => async (dispatch) => {
    try {
        if(idProvince!==""){
            const response = await AddressApi.ReadAllDistrict(idProvince)
            dispatch(setDistrict(response.data.data))
        }
    } catch (error) {
        console.log(error)
    }
} 



export const GetListAddress = (id)=>async(dispatch)=>{
    try {
        const response = await AddressApi.GetListAddressByUserID(id)
        dispatch(setUserAddress(response.data.data))
    } catch (error) {
        console.log(error)
    }
}

export const AddSaveAddress= (userID,body)=>async(dispatch)=>{
    try {
        const response = await AddressApi.AddSaveAddress(userID,body)
        dispatch(setUserAddress(response.data.data))
    } catch (error) {
        console.log(error)
    }
}
export const fetchWardFromDistrict = (idDistrict) => async (dispatch) => {
    try {
        if(idDistrict!==""){
            const response = await AddressApi.ReadAllWard(idDistrict)
            dispatch(setWard(response.data.data))
        }
    } catch (error) {
        console.log(error)
    }
} 


export const {
    setFormAddressSelected,
    setNameInFormCreate,
    setPhoneInFormCreate,
    setProvinceInFormCreate,
    setDistrictInFormCreate,
    setWardInFormCreate,
    setStreetInFormCreate,
    setProvince,
    setDistrict,
    setWard,
    setUserAddress
} = AddressSlice.actions
export default AddressSlice.reducer