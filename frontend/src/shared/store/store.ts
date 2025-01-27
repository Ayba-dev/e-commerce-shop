import { configureStore } from '@reduxjs/toolkit'
import userSlice from '../../features/userSlice/userSlice'
import { apiBase } from '../../services/api'
import cartSlice from '../../features/cartSlice/cartSlice'


export const store = configureStore({
  reducer: {
    user: userSlice,
    cart: cartSlice,
    [apiBase.reducerPath]: apiBase.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiBase.middleware),
})

export type RootState = ReturnType<typeof store.getState>
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = typeof store.dispatch