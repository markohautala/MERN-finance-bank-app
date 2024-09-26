import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


// Create a new api call/object with the base query function - vite_base_url is in our .env file
export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  reducerPath: "main",  // reducer path for the api means that the api will be stored in the store under the main key
  tagTypes: ["Kpis"],
  endpoints: (build) => ({
    getKpis: build.query<void, void>({
      query: () => "Kpi/Kpis/",   // baseurl + Kpi/Kpis/ will be the endpoint (kpi means key performance indicator)
      providesTags: ["Kpis"],  // provides tags for the api call
    }),
  })
})

export const { useGetKpisQuery } = api;