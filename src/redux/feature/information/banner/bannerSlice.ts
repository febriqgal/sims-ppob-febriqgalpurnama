import { appConfig } from "@/constant/appConfig";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bannerApi = createApi({
  reducerPath: "banner",
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: `${appConfig.urlApi}/information/`,
  }),
  endpoints: (builder) => ({
    getBanners: builder.query<any, null>({
      query: (data) => "banner",
    }),
  }),
});

export const { useGetBannersQuery } = bannerApi;
