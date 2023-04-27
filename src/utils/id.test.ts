import "@testing-library/react";
import { getFilmIdByUrl } from "./id";

test("id from empty url", () => {
  const id = getFilmIdByUrl("");

  expect(id).toBe("");
});

test("trailing slash", () => {
  const id = getFilmIdByUrl("https://swapi.dev/api/films/123/");

  expect(id).toBe("123");
});

test("no trailing slash", () => {
  const id = getFilmIdByUrl("https://swapi.dev/api/films/123");

  expect(id).toBe("123");
});

test("not a number", () => {
  const id = getFilmIdByUrl("https://swapi.dev/api/films/text");

  expect(id).toBe("text");
});
