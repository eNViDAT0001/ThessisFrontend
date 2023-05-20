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
    },
  ],
  descriptions: [
    {
      id: 0,
      description_name: "",
      description_md: "",
    },
  ],
  treeCategoryInAddProduct: [],
  height: 0,
  weight: 0,
  length: 0,
  width: 0,
  short_descriptions: "",
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
    setSpecificationName: (state, action) => {
      state.specification_name = action.payload;
    },
    setDataOption: (state, action) => {
      state.options = action.payload;
    },
    setDescriptions: (state, action) => {
      state.descriptions = action.payload;
    },
    setTreeCategoryInAddProduct: (state, action) => {
      state.treeCategoryInAddProduct = action.payload;
    },
    setHeight: (state, action) => {
      state.height = action.payload;
    },
    setWeight: (state, action) => {
      state.weight = action.payload;
    },
    setLength: (state, action) => {
      state.length = action.payload;
    },
    setWidth: (state, action) => {
      state.width = action.payload;
    },
    setShortDescriptions: (state, action) => {
      state.short_descriptions = action.payload;
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
  setSpecificationName,
  addFileInDescription,
  setDataOption,
  setDescriptions,
  addDescriptionResponse,
  setTreeCategoryInAddProduct,

  setHeight,
  setWeight,
  setLength,
  setWidth,
  setShortDescriptions,
} = AddProductSlice.actions;
export default AddProductSlice.reducer;
