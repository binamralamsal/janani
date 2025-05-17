import { createFileRoute } from "@tanstack/react-router";

import { CategoryForm } from "@/features/products/components/category-form";

export const Route = createFileRoute("/admin/product-categories_/new")({
  component: RouteComponent,
});

function RouteComponent() {
  return <CategoryForm />;
}
