import { createLazyFileRoute } from "@tanstack/react-router";

console.log("heavy dependencies");

export const Route = createLazyFileRoute("/about")({
  component: About,
});

function About() {
  return <div className="p-2">Hello from About!</div>;
}
