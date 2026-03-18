import type {
	ApiPaginatedResponse,
	Applicant,
	CreateApplicantRequest,
} from "@/types";
import { hrmsApi } from "./index";

export const applicantApi = hrmsApi.injectEndpoints({
	endpoints: (builder) => ({
		getApplicants: builder.query<
			ApiPaginatedResponse<Applicant>,
			{ page?: number; limit?: number; jobTitleId?: string } | undefined
		>({
			query: (params) => ({
				url: "/applicant",
				params: {
					page: params?.page ?? 1,
					limit: params?.limit ?? 100,
					jobTitleId: params?.jobTitleId,
				},
			}),
			providesTags: (result) =>
				result
					? [
							...result.items.map(({ id, jobTitleId }) => ({
								type: "Applicant" as const,
								id,
								jobTitleId,
							})),
							{ type: "Applicant", id: "LIST" },
						]
					: [{ type: "Applicant", id: "LIST" }],
		}),
		createApplicant: builder.mutation<Applicant, CreateApplicantRequest>({
			query: (data) => ({
				url: "/applicant",
				method: "POST",
				body: data,
			}),
			invalidatesTags: (result) => [
				{ type: "Applicant", id: "LIST" },
				...(result ? [{ type: "Applicant", jobTitleId: result.jobTitleId }] : []),
			],
		}),
	}),
});

export const { useGetApplicantsQuery, useCreateApplicantMutation } =
	applicantApi;
