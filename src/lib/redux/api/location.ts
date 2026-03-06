import { hrmsApi } from "./index";

export interface Location {
  id: string;
  name: string;
  type: string; // PROVINCE, DISTRICT, SECTOR, CELL, VILLAGE
  parentId: string | null;
}

export const locationApi = hrmsApi.injectEndpoints({
  endpoints: (builder) => ({
    getLocations: builder.query<
      { items: Location[]; meta: { totalItems: number } },
      { parentId?: string; type?: string; page?: number; limit?: number } | undefined
    >({
      query: (params) => ({
        url: "/locations",
        params: {
          ...params,
          page: params?.page ?? 1,
          limit: params?.limit ?? 100,
        },
      }),
    }),
    getLocation: builder.query<Location, string>({
      query: (id) => `/locations/${id}`,
    }),
  }),
});

export const { useGetLocationsQuery, useGetLocationQuery } = locationApi;
