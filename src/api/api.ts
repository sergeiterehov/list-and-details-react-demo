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
    patchFilm: build.mutation<void, { id: number; data: Partial<Api.Film> }>({
      queryFn: ({ id, data }, baseApi) => {
        baseApi.dispatch(
          api.util.updateQueryData("getFilm", { id }, (draft: Api.FilmDetailsResponse | undefined) => {
            if (!draft) return;

            Object.assign(draft, data);
          }),
        );

        // Список не будем обновлять

        return { data: undefined };
      },
    }),
  }),
});

export default api;

export const { useGetFilmsQuery, useGetFilmQuery, usePatchFilmMutation } = api;
