import { ApiRoutes } from "./api-routes"
import { baseApi } from "./baseApi"
import { Team, Teammate } from "./types"

export const teamApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getTeam: builder.query<Team, void>({
      query: () => ({
        url: ApiRoutes.TEAM,
        method: "GET",
      }),
      providesTags: ["Team"],
    }),
    getTeammate: builder.query({
      query: (id: string) => ({
        url: `${ApiRoutes.TEAM}/${id}`,
        method: "GET",
      }),
      providesTags: ["Team"],
    }),
    addTeammate: builder.mutation<Teammate, Teammate>({
      query: body => ({
        url: ApiRoutes.TEAM,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Team"],
    }),
    deleteTeammate: builder.mutation<void, string>({
      query: (id: string) => ({
        url: `${ApiRoutes.TEAM}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Team"],
    }),
    editTeammate: builder.mutation<Teammate, Teammate>({
      query: body => ({
        url: `${ApiRoutes.TEAM}/${body._id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Team"],
    }),
  }),
})

export const {
  useGetTeamQuery,
  useGetTeammateQuery,
  useAddTeammateMutation,
  useDeleteTeammateMutation,
  useEditTeammateMutation,
} = teamApi
