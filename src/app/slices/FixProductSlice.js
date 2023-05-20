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
  height: 0,
  weight: 0,
  length: 0,
  width: 0,
  listMediaOld: [],
  descriptionOld: [],
  short_descriptions:"",
  descriptions_ids: [],
  images_ids: [],
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
    setDescriptionsFix: (state, action) => {
      state.descriptions = action.payload;
    },
    setHeightFix: (state, action) => {
      state.height = action.payload;
    },
    setWeightFix: (state, action) => {
      state.weight = action.payload;
    },
    setLengthFix: (state, action) => {
      state.length = action.payload;
    },
    setWidthFix: (state, action) => {
      state.width = action.payload;
    },
    setListMediaOld: (state, action) => {
      state.listMediaOld = action.payload;
    },
    setDescriptionOld: (state, action) => {
      state.descriptionOld = action.payload;
    },
    setDescriptionsIds: (state, action) => {
      state.descriptions_ids = action.payload;
    },
    addDescriptionsIds: (state, action) => {
      state.descriptions_ids.push(action.payload);
    },
    setImagesIds: (state, action) => {
      state.images_ids = action.payload;
    },
    addImagesIds: (state, action) => {
      state.images_ids.push(action.payload);
    },
    setShortDescriptionsFix:(state,action) =>{
      state.short_descriptions = action.payload
    }
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

  setHeightFix,
  setWeightFix,
  setLengthFix,
  setWidthFix,

  setListMediaOld,
  setDescriptionOld,

  setDescriptionsIds,
  addDescriptionsIds,
  setImagesIds,
  addImagesIds,

  setShortDescriptionsFix
} = FixProductSlice.actions;
export default FixProductSlice.reducer;
