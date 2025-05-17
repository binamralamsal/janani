import { ArrowLeftIcon } from "lucide-react";

import { useSuspenseQuery } from "@tanstack/react-query";
import { notFound } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

import { AdminPageWrapper } from "@/components/admin-page-wrapper";
import { Button } from "@/components/ui/button";

import { ProductForm } from "@/features/products/components/product-form";
import {
  allCategoriesOptions,
  productByIdOptions,
} from "@/features/products/products.queries";

export const Route = createFileRoute({
  component: RouteComponent,
  loader: async ({ context: { queryClient }, params: { id } }) => {
    queryClient.prefetchQuery(
      allCategoriesOptions({ values: { page: 1, pageSize: 1000 } }),
    );

    const data = await queryClient.ensureQueryData(
      productByIdOptions({ id: parseInt(id) }),
    );

    if (!data) throw notFound();
  },
  notFoundComponent: () => <ProductNotFound />,
});

function RouteComponent() {
  const {
    data: { categories },
  } = useSuspenseQuery(
    allCategoriesOptions({ values: { page: 1, pageSize: 1000 } }),
  );

  const params = Route.useParams();
  const id = parseInt(params.id);
  const { data: product } = useSuspenseQuery(productByIdOptions({ id }));
  if (!product) return <ProductNotFound />;

  return (
    <ProductForm
      categories={categories}
      images={product.images}
      defaultValues={{
        name: product.name,
        price: product.price,
        slug: product.slug,
        salePrice: product.salePrice,
        categoryId: product.category?.id ?? null,
        description: product.description,
        images: product.images.map((image) => image.id),
        status: product.status,
        unit: product.unit,
      }}
      id={product.id}
    />
  );
}

function ProductNotFound() {
  return (
    <AdminPageWrapper
      pageTitle="Edit Product"
      breadcrumbs={[{ label: "All Products", href: "/admin/products" }]}
    >
      <div className="grid min-h-[80vh] place-items-center px-4 text-center">
        <div className="max-w-md space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Product Not Found
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Sorry, we couldn&apos;t find the product you&apos;re looking for.
              It may have been deleted or never existed.
            </p>
          </div>
          <Button size="lg" asChild>
            <Link to="/admin/products">
              <ArrowLeftIcon size={16} />
              Back to Products
            </Link>
          </Button>
        </div>
      </div>
    </AdminPageWrapper>
  );
}
