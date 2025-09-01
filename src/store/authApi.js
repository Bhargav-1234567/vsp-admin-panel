// src/store/apiSlice.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApiSlice = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://vsp-backend-q30d.onrender.com",
  }),
  endpoints: (builder) => ({
    // Company endpoints

    login: builder.mutation({
      query: (data) => {
        return {
          url: "/login",
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});

export const { useLoginMutation } = authApiSlice;
