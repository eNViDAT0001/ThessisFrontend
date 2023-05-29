import { configureStore } from "@reduxjs/toolkit";
import bannerReducer from "./slices/BannerSlice";
import productReducer from "./slices/ProductSlice";
import categoryReducer from "./slices/CategorySlice";
import brandReducer from "./slices/BrandSlice";
import orderReducer from "./slices/OrderSlice";
import AddProductReducer from "./slices/AddProductSlice";
import FixProductReducer from "./slices/FixProductSlice";
import NotificationReducer from "./slices/NotificationSlice";
import ChatReducer from "./slices/ChatSlice";
import AddressReducer from "./slices/AddressSlice";
import CartReducer from "./slices/CartSlice";
import QueryReducer from "./slices/QuerySlice";
import CommentReducer from "./slices/CommentSlice";
import UserReducer from "./slices/UserSlice";
import WSReducer from "./slices/WSSlice";
import ReportReducer from "./slices/ReportSlice";
export const store = configureStore({
  reducer: {
    banner: bannerReducer,
    product: productReducer,
    category: categoryReducer,
    brand: brandReducer,
    order: orderReducer,
    addProduct: AddProductReducer,
    fixProduct: FixProductReducer,
    address: AddressReducer,
    cart: CartReducer,
    query: QueryReducer,
    comment: CommentReducer,
    user: UserReducer,
    notification: NotificationReducer,
    chat: ChatReducer,
    webSocket: WSReducer,
    report: ReportReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
