import { configureStore } from '@reduxjs/toolkit'
import bannerReducer from './slice/BannerSlice'
import productReducer from './slice/ProductSlice'
import categoryReducer from './slice/CategorySlice'
export const store = configureStore({
    reducer: {
      banner: bannerReducer,
      product: productReducer,
      category: categoryReducer,
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  })