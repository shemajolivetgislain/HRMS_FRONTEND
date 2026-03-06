import { hrmsApi } from "./index";
import type { User, ApiPaginatedResponse } from "@/types";

export const userApi = hrmsApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<
      ApiPaginatedResponse<User>,
      { page?: number; limit?: number; searchTerm?: string; role?: string; companyId?: string; status?: string } | undefined
    >({
      query: (params) => {
        const queryParams: Record<string, any> = {
          page: params?.page ?? 1,
          limit: params?.limit ?? 20,
        };

        if (params?.searchTerm) queryParams.searchTerm = params.searchTerm;
        if (params?.role) queryParams.role = params.role;
        if (params?.companyId) queryParams.companyId = params.companyId;
        if (params?.status) queryParams.status = params.status;

        return {
          url: "/users",
          params: queryParams,
        };
      },
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
