import { useSuspenseQuery } from "@tanstack/react-query";

import { ProductForm } from "@/features/products/components/product-form";
import { allCategoriesOptions } from "@/features/products/products.queries";

export const Route = createFileRoute({
  component: RouteComponent,
  loader: ({ context: { queryClient } }) => {
    queryClient.prefetchQuery(
      allCategoriesOptions({ values: { page: 1, pageSize: 1000 } }),
    );
  },
});

function RouteComponent() {
  const {
    data: { categories },
  } = useSuspenseQuery(
    allCategoriesOptions({ values: { page: 1, pageSize: 1000 } }),
  );

  return <ProductForm categories={categories} />;
}
