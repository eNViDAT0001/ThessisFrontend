import { configureStore } from "@reduxjs/toolkit";
import bannerReducer from "./slice/BannerSlice";
import productReducer from "./slice/ProductSlice";
import categoryReducer from "./slice/CategorySlice";
import brandReducer from "./slice/BrandSlice";
import orderReducer from "./slice/OrderSlice";
import AddProductReducer from './slice/AddProductSlice'

export const store = configureStore({
  reducer: {
    banner: bannerReducer,
    product: productReducer,
    category: categoryReducer,
    brand: brandReducer,
    order: orderReducer,
    addProduct: AddProductReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
