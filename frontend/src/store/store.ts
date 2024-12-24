import {configureStore} from "@reduxjs/toolkit"
import {api} from "./api.ts";
import auth from "./slices/userSlice/userSlice.ts";


export const store = configureStore({
    reducer: {
        auth,
        [api.reducerPath]: api.reducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(api.middleware),
})


export type RootState = ReturnType<typeof store.getState>
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = typeof store.dispatch