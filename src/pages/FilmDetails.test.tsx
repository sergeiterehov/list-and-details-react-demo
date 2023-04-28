import { act, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import api from "../api/api";
import store from "../store";
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


test("editing name in redux", async () => {
  renderWithContext(<FilmDetails />, "/film/:id", "/film/2");

  await waitFor(async () => {
    const title = screen.getByText(/The Empire Strikes Back/i);

    title.click();
  });

  await act(() => {
    const input = screen.getByDisplayValue("The Empire Strikes Back");

    userEvent.type(input, "New Name");
    input.blur();
  });

  expect(api.endpoints.getFilm.select({ id: 2 })(store.getState()).data?.title).toBe("New Name");
});
