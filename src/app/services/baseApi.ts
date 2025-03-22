import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const baseApi = createApi({
  reducerPath: "baseApi",
  tagTypes: ["Team"],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_API_URL,
    prepareHeaders: headers => {
      const token = localStorage.getItem("token")
      if (token) {
        headers.set("Authorization", token)
      }
    },
  }),
  endpoints: () => ({}),
})
