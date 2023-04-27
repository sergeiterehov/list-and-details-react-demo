import { screen, waitFor } from "@testing-library/react";
import Films from "./Films";
import { renderWithContext } from "../utilsTests";

test("skeleton", async () => {
  const { container } = renderWithContext(<Films />);

  expect(container.getElementsByClassName("MuiSkeleton-root").item(0)).toBeInTheDocument();

  await waitFor(() => {
    const film = screen.getByText(/A New Hope/i);

    expect(film).toBeInTheDocument();
  });

  expect(container.getElementsByClassName("MuiSkeleton-root").item(0)).not.toBeInTheDocument();
});

test("films list", async () => {
  renderWithContext(<Films />);

  await waitFor(() => {
    const firstFilm = screen.getByText(/A New Hope/i);
    const secondFilm = screen.getByText(/The Empire Strikes Back/i);

    expect(firstFilm).toBeInTheDocument();
    expect(secondFilm).toBeInTheDocument();
  });
});

test("a link to details list", async () => {
  renderWithContext(<Films />);

  await waitFor(() => {
    const film = screen.getByText(/The Empire Strikes Back/i);

    expect(film.closest("a")).toHaveAttribute("href", "/film/2");
  });
});
