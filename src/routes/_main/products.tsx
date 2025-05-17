import { z } from "zod";

import { useSuspenseQuery } from "@tanstack/react-query";

import { ProductCard } from "@/features/products/components/product-card";
import { ProductsFilters } from "@/features/products/components/product-filters";
import { ProductsFiltersHeader } from "@/features/products/components/products-filters-header";
import { ProductsPagination } from "@/features/products/components/products-pagination";
import {
  allCategoriesOptions,
  allProductsOptions,
} from "@/features/products/products.queries";

export const Route = createFileRoute({
  component: RouteComponent,
  validateSearch: z.object({
    page: z.number().int().min(1).optional().default(1).catch(1),
    categories: z.array(z.string()).optional().default([]).catch([]),
    accordion: z
      .array(z.enum(["category", "price"]))
      .optional()
      .default(["category", "price"])
      .catch(["category", "price"]),
    priceRange: z
      .array(z.number())
      .min(2)
      .max(2)
      .nonempty()
      .optional()
      .refine((val) => (val ? val.length === 2 && val[0] < val[1] : true), {
        message: "priceRange must be a tuple [number, number] with min < max",
      })
      .catch(undefined),
  }),
  loaderDeps: ({ search }) => ({
    page: search.page,
    categories: search.categories,
    priceRange: search.priceRange,
  }),
  loader: async ({ context: { queryClient }, deps }) => {
    await queryClient.ensureQueryData(
      allProductsOptions({
        values: {
          categories: deps.categories,
          priceRange: deps.priceRange,
          status: ["published"],
        },
      }),
    );

    await queryClient.ensureQueryData(
      allCategoriesOptions({ values: { page: 1, pageSize: 20 } }),
    );
  },
});

function RouteComponent() {
  const searchParams = Route.useSearch();
  const {
    data: { products },
  } = useSuspenseQuery(
    allProductsOptions({
      values: {
        categories: searchParams.categories,
        priceRange: searchParams.priceRange,
        status: ["published"],
      },
    }),
  );

  return (
    <main>
      <section className="bg-primary/5 relative overflow-hidden">
        <div className="bg-grid-white/10 dark:bg-grid-black/10 absolute inset-0 [mask-image:linear-gradient(0deg,transparent,black)]"></div>
        <div className="relative container py-8 md:py-10 lg:py-12">
          <div className="space-y-4">
            <div className="bg-background/95 inline-flex items-center rounded-lg px-3 py-1 text-sm font-medium">
              🛒 Our Products
            </div>
            <h1 className="text-3xl font-bold tracking-tighter text-balance md:text-4xl lg:text-5xl">
              Fresh Groceries & Daily Essentials
            </h1>
            <p className="text-muted-foreground max-w-[600px] text-lg">
              Explore our wide range of fresh fruits, vegetables, and household
              essentials – all delivered with care and quality you can trust.
            </p>
          </div>
        </div>
      </section>

      <section className="container my-8 grid gap-6 md:my-12 md:grid-cols-2 lg:my-16 lg:grid-cols-[300px_1fr] lg:gap-12">
        <aside>
          <div className="lg:sticky lg:top-20">
            <ProductsFilters />
          </div>
        </aside>
        <div className="space-y-8">
          <ProductsFiltersHeader />

          <div className="grid gap-6 md:grid-cols-1 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                name={product.name}
                category={product.category?.name ?? null}
                slug={product.slug}
                price={product.price}
                salePrice={product.salePrice}
                images={product.images}
              />
            ))}
          </div>

          <ProductsPagination />
        </div>
      </section>
    </main>
  );
}
