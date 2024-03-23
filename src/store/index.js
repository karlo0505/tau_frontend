import { configureStore } from "@reduxjs/toolkit";
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from "@reduxjs/toolkit/query";
import { exodusApiSlice } from "./api.slice";
import uploadReducer from './upload.slice'
import appReducer from './app.slice'
import userReducer from "./auth.slice"
import applicationReducers from './application.slice'

export const store = configureStore({
  reducer: {
    upload: uploadReducer,
    app: appReducer,
    user: userReducer,
    applications: applicationReducers,
    // Add the generated reducer as a specific top-level slice
    [exodusApiSlice.reducerPath]: exodusApiSlice.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(exodusApiSlice.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);