import { hrmsApi } from "./index";

export const categoryApi = hrmsApi.injectEndpoints({
  endpoints: (builder) => ({
    getCompanyCategories: builder.query<
      {
        items: { id: string; name: string; description: string }[];
        meta: { totalItems: number };
      },
      { page?: number; limit?: number } | undefined
    >({
      query: (params) => ({
        url: "/company-category",
        params: { page: params?.page ?? 1, limit: params?.limit ?? 50 },
      }),
      providesTags: ["Category"],
    }),
    createCompanyCategory: builder.mutation({
      query: (data) => ({
        url: "/company-category",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useGetCompanyCategoriesQuery,
  useCreateCompanyCategoryMutation,
} = categoryApi;
