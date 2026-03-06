import { hrmsApi } from "./index";

export interface Location {
	id: string;
	name: string;
	type: string; // PROVINCE, DISTRICT, SECTOR, CELL, VILLAGE
	code: string;
}

export const locationApi = hrmsApi.injectEndpoints({
	endpoints: (builder) => ({
		getLocations: builder.query<
			{ items: Location[]; meta: { totalItems: number } },
			{ type?: string; page?: number; limit?: number } | undefined
		>({
			query: (params) => ({
				url: "/locations",
				params: {
					type: params?.type || "PROVINCE",
					page: params?.page ?? 1,
					limit: params?.limit ?? 5000,
				},
			}),
		}),
		getLocation: builder.query<Location, string>({
			query: (id) => `/locations/${id}`,
		}),
	}),
});

export const { useGetLocationsQuery, useGetLocationQuery } = locationApi;
