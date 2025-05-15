import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "@/store.ts";
import { SERVER_URL } from "@/constants.ts";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    // base url of backend API
    baseUrl: SERVER_URL,
    // We don't need to set the Authorization header anymore because we're using cookies
    credentials: 'include', // This allows sending cookies with requests
  }),
  endpoints: (builder) => ({
    getUserDetails: builder.query({
      query: () => ({
        url: "api/user/profile",
        method: "GET",
      }),
      transformErrorResponse: (response) => {
        return {
          status: response.status,
          message: 'Failed to fetch user details'
        };
      },
    }),
  }),
});

// export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetUserDetailsQuery } = authApi;
