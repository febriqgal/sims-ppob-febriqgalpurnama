import { appConfig } from "@/constant/appConfig";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const balanceApi = createApi({
  reducerPath: "balance",
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    baseUrl: `${appConfig.urlApi}/transaction/`,
  }),
  endpoints: (builder) => ({
    getBalance: builder.query({
      query: () => "balance",
    }),
  }),
});

export const { useGetBalanceQuery } = balanceApi;
