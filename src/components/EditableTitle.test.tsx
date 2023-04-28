import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import EditableTitle from "./EditableTitle";


test("h1 view", async () => {
  const { container } = render(<EditableTitle title="Title" />);

  const h1 = container.querySelector("h1")!;

  expect(h1).toBeInTheDocument();
  expect(h1.textContent).toBe("Title");
});


test("editing on click", async () => {
  const { container } = render(<EditableTitle title="Title" />);

  const title = screen.getByText("Title");

  await act(() => {
    title.click();
  });

  const input = container.querySelector("input")!;

  expect(input).toBeInTheDocument();
  expect(input.value).toBe("Title");

  await act(() => {
    userEvent.type(input, "New title");
  });

  expect(input.value).toBe("New title");
});

test("keyboard control enter", async () => {
  const renameHandler = jest.fn();

  const { container } = render(<EditableTitle title="Title" onRename={renameHandler} />);

  await act(() => {
    screen.getByText("Title").click();
  });

  const input = container.querySelector("input")!;

  await act(() => {
    userEvent.type(input, "New title{enter}");
  });

  expect(renameHandler).toBeCalled();
});

test("keyboard control esc", async () => {
  const renameHandler = jest.fn();

  const { container } = render(<EditableTitle title="Title" onRename={renameHandler} />);

  await act(() => {
    screen.getByText("Title").click();
  });

  const input = container.querySelector("input")!;

  await act(() => {
    userEvent.type(input, "New title{escape}");
  });

  expect(renameHandler).not.toBeCalled();
});
