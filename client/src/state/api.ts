import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GetKpisResponse, GetProductsResponse, GetTransactionsResponse } from './types';

// Create an API object with a base query function
export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }), // Base URL from .env
  reducerPath: "main",  // Store the API data under the "main" key
  tagTypes: ["Kpis", "Products", "Transactions"],  // Define tag types for cache management
  endpoints: (build) => ({
    getKpis: build.query<Array<GetKpisResponse>, void>({
      query: () => "kpi/kpis/",   // Endpoint for getting KPIs
      providesTags: ["Kpis"],  // Cache this endpoint under "Kpis"
    }),
    getProducts: build.query<Array<GetProductsResponse>, void>({
      query: () => "product/products/",  // Endpoint for getting products
      providesTags: ["Products"],  // Cache this endpoint under "Products"
    }),
    getTransactions: build.query<Array<GetTransactionsResponse>, void>({
      query: () => "transaction/transactions/",  // Endpoint for getting transactions
      providesTags: ["Transactions"],  // Cache this endpoint under "Transactions"
    }),
  }),
});

// Export hooks to use in components
export const { useGetKpisQuery, useGetProductsQuery, useGetTransactionsQuery } = api;
