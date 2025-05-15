import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "@/store.ts";
import { SERVER_URL } from "@/constants.ts";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    // base url of backend API
    baseUrl: SERVER_URL,
    // prepareHeaders is used to configure the header of every request and gives access to getState which we use to include the token from the store
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state.auth.userToken;
      if (token) {
        // include token in req header - using "Authorization" to match backend
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
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
