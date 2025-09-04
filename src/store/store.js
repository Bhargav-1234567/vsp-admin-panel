// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import sidebarReducer from "./sidebarSlice";
import authReducer from "./authSlice";
import formJsonReducer from "./formJsonSlice";
import { authApiSlice } from "./authApi";
import { inquiryApiSlice } from "./inquiryApiSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    sidebar: sidebarReducer,
    auth: authReducer,
    formJson: formJsonReducer,
    [inquiryApiSlice.reducerPath]: inquiryApiSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiSlice.middleware)
      .concat(authApiSlice.middleware)
      .concat(inquiryApiSlice.middleware),
});

export default store;
