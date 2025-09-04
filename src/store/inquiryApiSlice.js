// inquiryApiSlice.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout } from "./authSlice";
import { toast } from "sonner";

const apiBase = process.env.REACT_APP_API_URL;

const baseQuery = fetchBaseQuery({
  baseUrl: apiBase || "https://vsp-backend-q30d.onrender.com",
  prepareHeaders: (headers, { getState }) => {
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithAuth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (
    result.error &&
    (result.error.status === 401 || result.error.status === 403)
  ) {
    toast.error("Token Expired!");
    api.dispatch(logout?.());
    window.location.href = "/login";
  }

  return result;
};

export const inquiryApiSlice = createApi({
  reducerPath: "inquiryApi",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["Inquiry"],
  endpoints: (builder) => ({
    getInquiries: builder.query({
      query: (filters) => {
        const params = new URLSearchParams();
        Object.keys(filters).forEach((key) => {
          if (filters[key]) params.append(key, filters[key]);
        });
        return `/get-all-inquiry?${params.toString()}`;
      },
      providesTags: ["Inquiry"],
    }),
    updateInquiry: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/update-inquiry?id=${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Inquiry"],
    }),
    softDeleteInquiry: builder.mutation({
      query: (id) => ({
        url: `/delete-inquiry?id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Inquiry"],
    }),
    restoreInquiry: builder.mutation({
      query: (id) => ({
        url: `/restore-inquiry?id=${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["Inquiry"],
    }),
    permanentDeleteInquiry: builder.mutation({
      query: (id) => ({
        url: `/delete-permanent?id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Inquiry"],
    }),
  }),
});

export const {
  useGetInquiriesQuery,
  useUpdateInquiryMutation,
  useSoftDeleteInquiryMutation,
  useRestoreInquiryMutation,
  usePermanentDeleteInquiryMutation,
} = inquiryApiSlice;
