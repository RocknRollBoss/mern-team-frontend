import { ApiRoutes } from "./api-routes"
import { baseApi } from "./baseApi"
import { LoginValues, RegisteredUser, RegisterValues } from "./types"

export const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    register: builder.mutation<RegisteredUser, RegisterValues>({
      query: (body: RegisterValues) => ({
        url: ApiRoutes.REGISTER,
        method: "POST",
        body,
      }),
      transformResponse: (res: RegisteredUser) => {
        localStorage.setItem("token", res.token)
        localStorage.setItem("auth", "true")
        return res
      },
    }),
    login: builder.mutation<RegisteredUser, LoginValues>({
      query: (body: LoginValues) => ({
        url: ApiRoutes.LOGIN,
        method: "POST",
        body,
      }),

      transformResponse: (res: RegisteredUser) => {
        localStorage.setItem("token", res.token)
        localStorage.setItem("auth", "true")
        return res
      },
    }),
    getCurrent: builder.query<RegisteredUser, void>({
      query: () => ({
        url: ApiRoutes.CURRENT,
        method: "GET",
      }),
    }),
  }),
})

export const { useRegisterMutation, useLoginMutation, useGetCurrentQuery } =
  authApi
