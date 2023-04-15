import { configureStore } from "@reduxjs/toolkit";
import bannerReducer from "./slices/BannerSlice";
import productReducer from "./slices/ProductSlice";
import categoryReducer from "./slices/CategorySlice";
import brandReducer from "./slices/BrandSlice";
import orderReducer from "./slices/OrderSlice";
import AddProductReducer from './slices/AddProductSlice'
import AddressReducer from './slices/AddressSlice'
import CartReducer from './slices/CartSlice'
import QueryReducer from './slices/QuerySlice'
import CommentReducer from './slices/CommentSlice'


export const store = configureStore({
  reducer: {
    banner: bannerReducer,
    product: productReducer,
    category: categoryReducer,
    brand: brandReducer,
    order: orderReducer,
    addProduct: AddProductReducer,
    address: AddressReducer,
    cart: CartReducer,
    query: QueryReducer,
    comment: CommentReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
