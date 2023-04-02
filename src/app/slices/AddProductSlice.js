import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category_id: 0,
  name: "",
  discount: 0,
  price: 0,
  media: [],
  description_name: "",
  description_md: [],
  specification_name: "",
  options: [
    {
        id: 0,
        name: "",
        price: 0,
        quantity: 0,
    }
  ],
};

const AddProductSlice = createSlice({
  name: "addProduct",
  initialState,
  reducers: {
    resetAddProduct: () => initialState,
    setCategoryID: (state, action) => {
      state.category_id = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setDiscount: (state, action) => {
      state.discount = action.payload;
    },
    setPrice: (state, action) => {
      state.price = action.payload;
    },
    addFileInMedia: (state, action) => {
      state.media.push(action.payload);
    },
    setMedia: (state, action) => {
      state.media = action.payload;
    },
    addFileInDescription: (state, action) => {
      state.description_md.push(action.payload);
    },
    setDescriptionName: (state, action) => {
      state.description_name = action.payload;
    },
    setDescriptionMD: (state, action) => {
      state.description_md = action.payload;
    },
    setSpecificationName: (state, action) => {
      state.specification_name = action.payload;
    },
    setDataOption: (state, action) => {
      state.options = action.payload;
    },
  },
});

export const {
  resetAddProduct,
  setCategoryID,
  setName,
  setDiscount,
  setPrice,
  setMedia,
  addFileInMedia,
  setDescriptionName,
  setDescriptionMD,
  setSpecificationName,
  addFileInDescription,
  setDataOption,
} = AddProductSlice.actions;
export default AddProductSlice.reducer;
