import { screen, waitFor } from "@testing-library/react";
import { renderWithContext } from "../utilsTests";
import FilmDetails from "./FilmDetails";

test("film details starts with skeleton", async () => {
  const { container } = renderWithContext(<FilmDetails />, "/film/:id", "/film/2");

  expect(container.getElementsByClassName("MuiSkeleton-root").item(0)).toBeInTheDocument();

  await waitFor(() => {
    const secondFilm = screen.getByText(/The Empire Strikes Back/i);

    expect(secondFilm).toBeInTheDocument();
  });

  expect(container.getElementsByClassName("MuiSkeleton-root").item(0)).not.toBeInTheDocument();
});
