import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  userAddress: [],
  addressDetail: {},
  province: [],
  ward: [],
  district: [],

  //phục vu cho address trong shopping order
  addressInOrder: {
    name: "",
    phone: "",
    gender: false,
    province: "",
    district: "",
    ward: "",
    provinceId: null,
    districtId: null,
    wardId: null,
    street: "",
  },
  formAddressSelected: {},
  isCheckSelected: false,
};

const AddressSlice = createSlice({
  name: "address",
  initialState,

  reducers: {
    setAddressDetail: (state, action) => {
      state.addressDetail = action.payload;
    },
    setFormAddressSelected: (state, action) => {
      state.formAddressSelected = action.payload;
    },
    setNameInFormCreate: (state, action) => {
      state.addressInOrder.name = action.payload;
    },
    setPhoneInFormCreate: (state, action) => {
      state.addressInOrder.phone = action.payload;
    },
    setGenderInFormCreate: (state, action) => {
      state.addressInOrder.gender = action.payload;
    },
    setProvinceInFormCreate: (state, action) => {
      state.addressInOrder.province = action.payload;
    },
    setDistrictInFormCreate: (state, action) => {
      state.addressInOrder.district = action.payload;
    },
    setWardInFormCreate: (state, action) => {
      state.addressInOrder.ward = action.payload;
    },
    setProvinceIdInFormCreate: (state, action) => {
      state.addressInOrder.provinceId = action.payload;
    },
    setDistrictIdInFormCreate: (state, action) => {
      state.addressInOrder.districtId = action.payload;
    },
    setWardIdInFormCreate: (state, action) => {
      state.addressInOrder.wardId = action.payload;
    },
    setStreetInFormCreate: (state, action) => {
      state.addressInOrder.street = action.payload;
    },
    setUserAddress: (state, action) => {
      state.userAddress = action.payload;
    },
    setProvince: (state, action) => {
      state.province = action.payload;
    },
    setWard: (state, action) => {
      state.ward = action.payload;
    },
    setDistrict: (state, action) => {
      state.district = action.payload;
    },
    resetFormAddressInOrder: (state) => {
      state.addressInOrder = {
        name: "",
        phone: "",
        gender: false,
        province: "",
        district: "",
        ward: "",
        provinceId: null,
        districtId: null,
        wardId: null,
        street: "",
      };
    },
    setIsCheckSelected: (state, action) => {
      state.isCheckSelected = action.payload;
    },
  },
});

export const {
  setAddressDetail,
  setFormAddressSelected,
  setNameInFormCreate,
  setPhoneInFormCreate,
  setGenderInFormCreate,
  setProvinceInFormCreate,
  setDistrictInFormCreate,
  setWardInFormCreate,
  setStreetInFormCreate,
  setProvinceIdInFormCreate,
  setDistrictIdInFormCreate,
  setWardIdInFormCreate,
  setProvince,
  setDistrict,
  setWard,
  setUserAddress,
  resetFormAddressInOrder,
  setIsCheckSelected,
} = AddressSlice.actions;
export default AddressSlice.reducer;
