// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import sidebarReducer from "./sidebarSlice";
import authReducer from "./authSlice";
import formJsonReducer from "./formJsonSlice";
import { authApiSlice } from "./authApi";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    sidebar: sidebarReducer,
    auth: authReducer,
    formJson: formJsonReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiSlice.middleware)
      .concat(authApiSlice.middleware),
});

export default store;
