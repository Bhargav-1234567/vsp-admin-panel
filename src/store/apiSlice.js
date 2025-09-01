import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout } from "./authSlice"; // optional, if you want to clear auth state

const baseQuery = fetchBaseQuery({
  baseUrl: "https://vsp-backend-q30d.onrender.com",
  prepareHeaders: (headers, { getState }) => {
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// Wrap baseQuery to catch 401
const baseQueryWithAuth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // Optional: clear token from redux
    api.dispatch(logout?.());

    // Redirect to login page
    window.location.href = "/login";
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["initialData"],
  endpoints: (builder) => ({
    getInitialJsonData: builder.query({
      query: () => "/json",
      providesTags: ["initialData"],
    }),
    updateInitialJsonData: builder.mutation({
      query: (data) => {
        return {
          url: "/json",
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["initialData"],
    }),
    uploadImage: builder.mutation({
      query: ({ file, filename }) => {
        const formData = new FormData();

        // extract extension
        const ext = file.name.split(".").pop();
        formData.append("image", file, `${filename}.png`);

        return {
          url: "/image",
          method: "POST",
          body: formData,
        };
      },
    }),
  }),
});

export const {
  useGetInitialJsonDataQuery,
  useUploadImageMutation,
  useUpdateInitialJsonDataMutation,
} = apiSlice;
