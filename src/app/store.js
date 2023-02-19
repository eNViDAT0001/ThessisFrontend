import { configureStore } from '@reduxjs/toolkit'
import bannerReducer from './slice/BannerSlice'
export const store = configureStore({
    reducer: {
      banner: bannerReducer,
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  })