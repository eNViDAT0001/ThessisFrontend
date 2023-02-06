import { configureStore } from '@reduxjs/toolkit'
import TestApiReducer from './slices/TestApiSlice'
import ProductReducer from './slices/ProductSlice'
import OrderReducer from './slices/OrderSlice'
import AddressReducer from './slices/AddressSlice'
import AdminReducer from './slices/AdminSlice'
import CommentReducer from './slices/CommentSlice'
import ProviderReducer from './slices/ProviderSlice'
import CartReducer from './slices/CartSlice'
import AddProductReducer from './slices/AddProductSlice'
export const store = configureStore({
  reducer: {
    test: TestApiReducer,
    product: ProductReducer,
    order: OrderReducer,
    address: AddressReducer,
    admin: AdminReducer,
    comment: CommentReducer,
    provider: ProviderReducer,
    cart: CartReducer,
    addProduct: AddProductReducer,
  },
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
})