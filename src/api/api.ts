import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://swapi.dev/api/",
  }),
  endpoints: (build) => ({
    getFilms: build.query<any, void>({
      query: () => "/films",
    }),
  }),
});

export default api;

export const { useGetFilmsQuery } = api;
