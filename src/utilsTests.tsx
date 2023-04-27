import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import store from "./store";

export function renderWithContext(jsx: React.ReactNode, path = "/", init = "/") {
  return render(
    <Provider store={store}>
      <RouterProvider router={
        createMemoryRouter([{ path, element: jsx }, { path: "/", element: null }], { initialEntries: [init] })}
      />
    </Provider>,
  );
}
