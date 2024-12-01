import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GetKpisResponse, GetProductsResponse } from './types';

// Create a new api call/object with the base query function - vite_base_url is in our .env file
export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  reducerPath: "main",  // reducer path for the api means that the api will be stored in the store under the main key
  tagTypes: ["Kpis", "Products"],  // tag types for the api call
  endpoints: (build) => ({
    getKpis: build.query<Array<GetKpisResponse>, void>({
      query: () => "kpi/kpis/",   // baseurl + Kpi/Kpis/ will be the endpoint (kpi means key performance indicator)
      providesTags: ["Kpis"],  // provides tags for the api call
    }),
    getProducts: build.query<Array<GetProductsResponse>, void>({
      query: () => "product/products/",
      providesTags: ["Products"],
    }),
  }),
})

export const { useGetKpisQuery, useGetProductsQuery } = api;