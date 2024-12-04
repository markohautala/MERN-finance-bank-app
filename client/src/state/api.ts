import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GetKpisResponse, GetProductsResponse, GetTransactionsResponse } from './types';

// Create a new api call/object with the base query function - vite_base_url is in our .env file
export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  reducerPath: "main",  // reducer path for the api means that the api will be stored in the store under the main key
  tagTypes: ["Kpis", "Products", "Transactions"],  // tag types for the api call
  endpoints: (build) => ({
    getKpis: build.query<Array<GetKpisResponse>, void>({
      query: () => "kpi/kpis/",   // baseurl + Kpi/Kpis/ will be the endpoint (kpi means key performance indicator)
      providesTags: ["Kpis"],  // provides tags for the api call
    }),
    getProducts: build.query<Array<GetProductsResponse>, void>({
      query: () => "product/products/",
      providesTags: ["Products"],
    }),
    getTransactions: build.query<Array<GetTransactionsResponse>, void>({
      query: () => "transaction/transactions/",
      providesTags: ["Transactions"],
    }),
  }),
})

export const { useGetKpisQuery, useGetProductsQuery, useGetTransactionsQuery } = api;