import type { Company } from "@/types";
import { hrmsApi } from "./index";

export const companyApi = hrmsApi.injectEndpoints({
	endpoints: (builder) => ({
		getCompanies: builder.query<
			{ items: Company[]; meta: { totalItems: number } },
			| {
					page?: number;
					limit?: number;
					searchTerm?: string;
					ownershipType?: string;
					type?: string;
					status?: string;
			  }
			| undefined
		>({
			query: (params) => {
				const queryParams: Record<string, any> = {
					page: params?.page ?? 1,
					limit: params?.limit ?? 50,
				};

				if (params?.searchTerm) queryParams.searchTerm = params.searchTerm;
				if (params?.ownershipType)
					queryParams.ownershipType = params.ownershipType;
				if (params?.type) queryParams.type = params.type;
				if (params?.status) queryParams.status = params.status;

				return {
					url: "/company",
					params: queryParams,
				};
			},
			providesTags: (result) =>
				result
					? [
							...result.items.map(({ id }) => ({
								type: "Company" as const,
								id,
							})),
							{ type: "Company", id: "LIST" },
						]
					: [{ type: "Company", id: "LIST" }],
		}),
		getCompany: builder.query<Company, string>({
			query: (id) => `/company/${id}`,
			providesTags: (_result, _error, id) => [{ type: "Company", id }],
		}),
		getCompanyStats: builder.query<
			{
				activeEmployees: number;
				departments: number;
				openPositions: number;
				pendingApplicants: number;
			},
			string
		>({
			query: (id) => `/company/${id}/stats`,
			providesTags: (_result, _error, id) => [
				{ type: "Company", id: `STATS-${id}` },
			],
		}),
		createCompany: builder.mutation({
			query: (data) => ({
				url: "/company",
				method: "POST",
				body: data,
			}),
			invalidatesTags: [{ type: "Company", id: "LIST" }],
		}),
	}),
});

export const {
	useGetCompaniesQuery,
	useGetCompanyQuery,
	useGetCompanyStatsQuery,
	useCreateCompanyMutation,
} = companyApi;
