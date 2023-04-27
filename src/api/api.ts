import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

declare global {
  namespace Api {
    type Film = {
      title: string;
      episode_id: number;
      opening_crawl: string;
      director: string;
      producer: string;
      release_date: string;
      url: string;
    };

    type FilmsResponse = {
      count: number;
      next?: number;
      previous?: number;
      results: Film[];
    };

    type FilmDetailsResponse = Film;
  }
}

const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://swapi.dev/api/",
  }),
  endpoints: (build) => ({
    getFilms: build.query<Api.FilmsResponse, {
      /** @todo Добавить поддержку пагинации. */
      page?: number;
      search?: string;
    } | void>({
      query: ({ ...params } = {}) => `/films?${new URLSearchParams(params as Record<string, string>)}`,
    }),
    getFilm: build.query<Api.FilmDetailsResponse, { id: number }>({
      query: ({ id }) => `/films/${id}`,
    }),
  }),
});

export default api;

export const { useGetFilmsQuery, useGetFilmQuery } = api;
