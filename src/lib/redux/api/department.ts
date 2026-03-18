import type {
	ApiPaginatedResponse,
	CreateCompanyDepartmentRequest,
	CreateDepartmentReferenceRequest,
	Department,
	DepartmentReference,
} from "@/types";
import { hrmsApi } from "./index";

export const departmentApi = hrmsApi.injectEndpoints({
	endpoints: (builder) => ({
		getDepartmentReferences: builder.query<
			ApiPaginatedResponse<DepartmentReference>,
			{ page?: number; limit?: number; name?: string; companyId?: string } | undefined
		>({
			query: (params) => ({
				url: "/department-ref",
				params: {
					page: params?.page ?? 1,
					limit: params?.limit ?? 50,
					name: params?.name,
					companyId: params?.companyId,
				},
			}),
			providesTags: (result) =>
				result
					? [
							...result.items.map(({ id }) => ({
								type: "DepartmentReference" as const,
								id,
							})),
							{ type: "DepartmentReference", id: "LIST" },
						]
					: [{ type: "DepartmentReference", id: "LIST" }],
		}),
		createDepartmentReference: builder.mutation<
			DepartmentReference,
			CreateDepartmentReferenceRequest
		>({
			query: (data) => ({
				url: "/department-ref",
				method: "POST",
				body: data,
			}),
			invalidatesTags: [{ type: "DepartmentReference", id: "LIST" }],
		}),
		getCompanyDepartments: builder.query<
			ApiPaginatedResponse<Department>,
			{ page?: number; limit?: number; name?: string; companyId?: string } | undefined
		>({
			query: (params) => ({
				url: "/company-department",
				params: {
					page: params?.page ?? 1,
					limit: params?.limit ?? 50,
					name: params?.name,
					companyId: params?.companyId,
				},
			}),
			providesTags: (result) =>
				result
					? [
							...result.items.map(({ id }) => ({
								type: "Department" as const,
								id,
							})),
							{ type: "Department", id: "LIST" },
						]
					: [{ type: "Department", id: "LIST" }],
		}),
		createCompanyDepartment: builder.mutation<
			Department,
			CreateCompanyDepartmentRequest
		>({
			query: (data) => ({
				url: "/company-department",
				method: "POST",
				body: data,
			}),
			invalidatesTags: [{ type: "Department", id: "LIST" }],
		}),
	}),
});

export const {
	useGetDepartmentReferencesQuery,
	useCreateDepartmentReferenceMutation,
	useGetCompanyDepartmentsQuery,
	useCreateCompanyDepartmentMutation,
} = departmentApi;
