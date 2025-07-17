import { configureStore } from '@reduxjs/toolkit'
import { epicApi } from './services/epicApi'
import hamMenuSlice  from './hamMenuSlice'
import blackUiSlice  from './blackUiSlice'
import searchSlice from './searchSlice'

export const store = configureStore({
  reducer: {
    bars : hamMenuSlice,
    search : searchSlice,
    black : blackUiSlice,
    [epicApi.reducerPath]: epicApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(epicApi.middleware),
})