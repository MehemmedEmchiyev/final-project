import { configureStore } from '@reduxjs/toolkit'
import { epicApi } from './services/epicApi'
import hamMenuSlice  from './hamMenuSlice'

export const store = configureStore({
  reducer: {
    bars : hamMenuSlice,
    [epicApi.reducerPath]: epicApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(epicApi.middleware),
})