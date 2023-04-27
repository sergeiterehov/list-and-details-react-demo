import "@testing-library/jest-dom";
import { fetch, Headers, Request, Response } from "cross-fetch";
import { rest } from "msw";
import { setupServer } from "msw/node";
import filmsDummy from "./__dummy__/films.json";
import film2Dummy from "./__dummy__/film_2.json";

global.fetch = fetch;
global.Headers = Headers;
global.Request = Request;
global.Response = Response;

export const handlers = [
  rest.get("https://swapi.dev/api/films", (_req, res, ctx) => {
    return res(ctx.json(filmsDummy));
  }),
  rest.get("https://swapi.dev/api/films/2", (_req, res, ctx) => {
    return res(ctx.json(film2Dummy));
  }),
];

export const server = setupServer(...handlers);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
