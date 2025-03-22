import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const baseApi = createApi({
  reducerPath: "baseApi",
  tagTypes: ["Team"],
  baseQuery: fetchBaseQuery({
    baseUrl:
      "https://mern-team-backend-pdayzbf2a-rocknrolls-projects.vercel.app",
    credentials: "same-origin",
    prepareHeaders: headers => {
      const token = localStorage.getItem("token")
      if (token) {
        headers.set("Authorization", `Bearer ${token}`)
      }
      return headers
    },
  }),
  endpoints: () => ({}),
})

/* 
baseQuery: fetchBaseQuery({
  baseUrl: "https://mern-team-backend-pdayzbf2a-rocknrolls-projects.vercel.app",
  credentials: "same-origin", // Или временно 'omit'
  prepareHeaders: headers => {
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
}) */
