import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "../components/Blog";
import { expect, test, vitest } from "vitest";
const blog = {
  author: "bob",
  title: "testing",
  url: "hehexd.com",
  likes: 12,
  user: {
    username: "bob jones",
    name: "bob",
  },
};

test("blog only renders title and author", () => {
  const { container } = render(<Blog blog={blog} />);
  const blogHeader = container.querySelector(".blog-header");
  const blogBody =
    container.querySelector(".blog-body").style["_values"].display;

  expect(blogHeader).toHaveTextContent("testing bob");
  expect(blogBody).toBe("none");
});

test("shows blog body when button is clicked", async () => {
  const { container } = render(<Blog blog={blog} />);
  const button = screen.getByText("view");

  const user = userEvent.setup();
  await user.click(button);

  const blogBodyHidden =
    container.querySelector(".blog-body").style["_values"].display;

  expect(blogBodyHidden).toBeUndefined();
});

test("the like button has been clicked twice", async () => {
  const mockHandler = vitest.fn();

  render(<Blog blog={blog} updateLikes={mockHandler} />);
  const button = screen.getByText("like");

  const user = userEvent.setup();
  await user.click(button);
  await user.click(button);

  expect(mockHandler.mock.calls).toHaveLength(2);
});
