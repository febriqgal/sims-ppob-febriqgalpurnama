import { appConfig } from "@/constant/appConfig";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const profileApi = createApi({
  reducerPath: "profile",
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    baseUrl: `${appConfig.urlApi}/membership/`,
  }),
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => "profile",
    }),
  }),
});

export const { useGetProfileQuery } = profileApi;
