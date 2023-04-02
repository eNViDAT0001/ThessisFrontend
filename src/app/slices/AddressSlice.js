import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    userAddress:[],
    province:[],
    ward:[],
    district:[],
    //phục vu cho address trong shopping order
    nameInFormCreate:"",
    phoneInFormCreate:"",
    provinceInFormCreate:"",
    districtInFormCreate:"",
    wardInFormCreate:"",
    streetInFormCreate:"",
    formAddressSelected:{},
}

const AddressSlice = createSlice({
    name:'address',
    initialState,

    reducers:
    {
        setFormAddressSelected: (state,action)=>{
            state.formAddressSelected = action.payload
        },
        setNameInFormCreate:(state,action)=>{
            state.nameInFormCreate = action.payload
        },
        setPhoneInFormCreate:(state,action)=>{
            state.phoneInFormCreate = action.payload
        },
        setProvinceInFormCreate:(state,action)=>{
            state.provinceInFormCreate = action.payload
        },
        setDistrictInFormCreate:(state,action)=>{
            state.districtInFormCreate = action.payload
        },
        setWardInFormCreate:(state,action)=>{
            state.wardInFormCreate = action.payload
        },
        setStreetInFormCreate:(state,action)=>{
            state.streetInFormCreate = action.payload
        },
        setUserAddress: (state,action) =>{
            state.userAddress = action.payload
        },
        setProvince: (state,action) =>{
            state.province = action.payload
        },
        setWard: (state,action) =>{
            state.ward = action.payload
        },
        setDistrict: (state,action) =>{
            state.district = action.payload
        },
    },
})

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