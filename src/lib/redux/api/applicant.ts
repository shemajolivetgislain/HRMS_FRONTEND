import type {
	ApiPaginatedResponse,
	Applicant,
	ChangeApplicantStatusRequest,
	CreateApplicantRequest,
} from "@/types";
import { hrmsApi } from "./index";

export const applicantApi = hrmsApi.injectEndpoints({
	endpoints: (builder) => ({
		getApplicants: builder.query<
			ApiPaginatedResponse<Applicant>,
			{ page?: number; limit?: number; jobPostId?: string } | undefined
		>({
			query: (params) => ({
				url: "/applicant",
				params: {
					page: params?.page ?? 1,
					limit: params?.limit ?? 100,
					jobPostId: params?.jobPostId,
				},
			}),
			providesTags: (result) =>
				result
					? [
							...result.items.map(({ id, jobPostId }) => ({
								type: "Applicant" as const,
								id,
								jobPostId,
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
				{ type: "Applicant" as const, id: "LIST" },
				...(result
					? [{ type: "Applicant" as const, jobPostId: result.jobPostId }]
					: []),
			],
		}),
		changeApplicantStatus: builder.mutation<
			Applicant,
			{ id: string } & ChangeApplicantStatusRequest
		>({
			query: ({ id, ...body }) => ({
				url: `/applicant/${id}/change-status`,
				method: "PATCH",
				body,
			}),
			invalidatesTags: (_result, _error, { id }) => [
				{ type: "Applicant", id },
				{ type: "Applicant", id: "LIST" },
			],
		}),
	}),
});

export const {
	useGetApplicantsQuery,
	useCreateApplicantMutation,
	useChangeApplicantStatusMutation,
} = applicantApi;
