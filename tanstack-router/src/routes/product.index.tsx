import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/product/")({
  component: Product,
});
function Product() {
  return <div>Product selected goes her</div>;
}
