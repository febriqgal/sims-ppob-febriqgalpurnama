import { appConfig } from "@/constant/appConfig";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const historyApi = createApi({
  reducerPath: "history",
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    baseUrl: `${appConfig.urlApi}/transaction/`,
  }),
  endpoints: (builder) => ({
    getHistory: builder.query({
      query: () => "history",
    }),
  }),
});

export const { useGetHistoryQuery } = historyApi;
