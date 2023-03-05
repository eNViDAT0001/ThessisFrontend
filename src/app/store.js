import { configureStore } from '@reduxjs/toolkit'
import bannerReducer from './slice/BannerSlice'
import productReducer from './slice/ProductSlice'
import categoryReducer from './slice/CategorySlice'
import brandReducer from './slice/BrandSlice'

export const store = configureStore({
    reducer: {
      banner: bannerReducer,
      product: productReducer,
      category: categoryReducer,
      brand: brandReducer,
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  })