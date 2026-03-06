import { hrmsApi } from "./index";

export interface Location {
  id: string;
  name: string;
  type: string; // PROVINCE, DISTRICT, SECTOR, CELL, VILLAGE
  parentId: string | null;
}

export const locationApi = hrmsApi.injectEndpoints({
  endpoints: (builder) => ({
    getLocations: builder.query<Location[], { parentId?: string; type?: string } | undefined>({
      query: (params) => ({
        url: "/locations",
        params,
      }),
    }),
    getLocation: builder.query<Location, string>({
      query: (id) => `/locations/${id}`,
    }),
  }),
});

export const { useGetLocationsQuery, useGetLocationQuery } = locationApi;
