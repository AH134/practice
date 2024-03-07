import { createFileRoute, notFound } from "@tanstack/react-router";

export const Route = createFileRoute("/product/$productId")({
  loader: async ({ params }) => {
    if (params.productId === "1") {
    }
    return { params };
  },
  errorComponent: ({ error }) => {
    if (error instanceof Error) {
      return <div>{error.message}</div>;
    }
  },
  // notFoundComponent: ({ data }) => {
  //   const { productId } = Route.useParams();
  //   console.log(data);

  //   return <div>{productId}</div>;
  // },
  component: Product,
});

function Product() {
  const { productId } = Route.useParams();

  return (
    <div className="flex flex-col">
      <div>
        <h2>Product ID: {productId}</h2>
        <p>This is the dynamic route for this particular product</p>
      </div>
    </div>
  );
}
