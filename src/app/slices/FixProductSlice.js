import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category_id: 0,
  name: "",
  discount: 0,
  price: 0,
  media: [],
  specification_name: "",
  options: [
    {
        id: 0,
        name: "",
        price: 0,
        quantity: 0,
    }
  ],
  descriptions:[
    {
      id: 0,
      description_name:"",
      description_md: ""
    }
  ],
};

const FixProductSlice = createSlice({
  name: "fixProduct",
  initialState,
  reducers: {
    resetFixProduct: () => initialState,
    setCategoryIDFix: (state, action) => {
      state.category_id = action.payload;
    },
    setNameFix: (state, action) => {
      state.name = action.payload;
    },
    setDiscountFix: (state, action) => {
      state.discount = action.payload;
    },
    setPriceFix: (state, action) => {
      state.price = action.payload;
    },
    addFileInMediaFix: (state, action) => {
      state.media.push(action.payload);
    },

    setMediaFix: (state, action) => {
      state.media = action.payload;
    },

    setSpecificationNameFix: (state, action) => {
      state.specification_name = action.payload;
    },
    setDataOptionFix: (state, action) => {
      state.options = action.payload;
    },
    setDescriptionsFix:(state, action) => {
      state.descriptions = action.payload;
    },
  },
});

export const {
  resetFixProduct,
  setCategoryIDFix,
  setNameFix,
  setDiscountFix,
  setPriceFix,
  setMediaFix,
  addFileInMediaFix,
  setSpecificationNameFix,
  addFileInDescriptionFix,
  setDataOptionFix,
  setDescriptionsFix,
} = FixProductSlice.actions;
export default FixProductSlice.reducer;
