import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/product-categories_/$id/edit")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/admin/product-categories_/$id/edit"!</div>;
}
