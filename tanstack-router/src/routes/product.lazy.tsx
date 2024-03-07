import { Link, Outlet, createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/product")({
  component: Product,
  notFoundComponent: ProductNotFound,
});

function ProductNotFound() {
  return <div>custom error for notFoundComponent</div>;
}

function Product() {
  return (
    <div className="flex flex-row gap-2">
      <div>
        List of products available:
        <br />
        <ol>
          <li>
            <Link
              to="/product/$productId"
              params={{ productId: "1" }}
              className="text-yellow-200"
            >
              Product 1
            </Link>
          </li>
        </ol>
      </div>

      {/* if no specific productid/subroute is specified */}
      {/* then it will render product.index.tsx */}
      <Outlet></Outlet>
    </div>
  );
}
