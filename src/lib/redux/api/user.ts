import { hrmsApi } from "./index";
import type { User, ApiPaginatedResponse } from "@/types";

export const userApi = hrmsApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<
      ApiPaginatedResponse<User>,
      { page?: number; limit?: number; searchTerm?: string; role?: string; companyId?: string; status?: string } | undefined
    >({
      query: (params) => ({
        url: "/users",
        params,
      }),
      providesTags: ["User"],
    }),
    createUser: builder.mutation({
      query: (data) => ({
        url: "/user",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useGetUsersQuery, useCreateUserMutation } = userApi;
