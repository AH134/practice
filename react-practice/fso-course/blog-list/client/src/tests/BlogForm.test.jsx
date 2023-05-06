import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "../components/BlogForm";
import { expect, test, vitest } from "vitest";

test("<BlogForm/> updates with the correct information", async () => {
  const createBlog = vitest.fn();
  const user = userEvent.setup();

  render(<BlogForm addBlog={createBlog} />);

  const inputTitle = screen.getByPlaceholderText("blog title");
  const inputAuthor = screen.getByPlaceholderText("blog author");
  const inputUrl = screen.getByPlaceholderText("blog url");
  const submitButton = screen.getByText("create");

  await user.type(inputTitle, "testing title");
  await user.type(inputAuthor, "testing author");
  await user.type(inputUrl, "testing url");
  await user.click(submitButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe("testing title");
  expect(createBlog.mock.calls[0][0].author).toBe("testing author");
  expect(createBlog.mock.calls[0][0].url).toBe("testing url");
});
