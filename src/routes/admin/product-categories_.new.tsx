import { CategoryForm } from "@/features/products/components/category-form";

export const Route = createFileRoute({
  component: RouteComponent,
});

function RouteComponent() {
  return <CategoryForm />;
}
