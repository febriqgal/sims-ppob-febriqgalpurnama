import { appConfig } from "@/constant/appConfig";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const servicesApi = createApi({
  reducerPath: "services",
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: `${appConfig.urlApi}/information/`,
  }),
  endpoints: (builder) => ({
    getServices: builder.query({
      query: () => "services",
    }),
  }),
});

export const { useGetServicesQuery } = servicesApi;
