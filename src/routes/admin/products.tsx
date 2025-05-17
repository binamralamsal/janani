import { ArchiveIcon, CircleCheckIcon, FileIcon } from "lucide-react";

import { ComponentType } from "react";

import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";

import { AdminPageWrapper } from "@/components/admin-page-wrapper";
import { DataTable } from "@/components/data-table/data-table";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { productsTableColumns } from "@/features/products/components/products-table-columns";
import {
  allCategoriesOptions,
  allProductsOptions,
} from "@/features/products/products.queries";
import { getAllProductsSchema } from "@/features/products/products.schema";

export const Route = createFileRoute({
  component: RouteComponent,
  validateSearch: getAllProductsSchema,
  loaderDeps: ({ search }) => ({ search }),
  loader: async ({ context, deps: { search } }) => {
    context.queryClient.prefetchQuery(allProductsOptions({ values: search }));
    context.queryClient.prefetchQuery(
      allCategoriesOptions({ values: { page: 1, pageSize: 1000 } }),
    );
  },
});

function RouteComponent() {
  const searchParams = Route.useSearch();
  const { data, isPending } = useQuery(
    allProductsOptions({ values: searchParams }),
  );

  const { data: categoriesData } = useQuery(
    allCategoriesOptions({ values: { page: 1, pageSize: 1000 } }),
  );

  return (
    <AdminPageWrapper pageTitle="All Products">
      <Card className="container px-0">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="space-y-2">
            <CardTitle className="text-xl">Products</CardTitle>
            <CardDescription>
              <p>Here are the list of products</p>
            </CardDescription>
          </div>
          <Button asChild>
            <Link to="/admin/products/new">Add new</Link>
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={productsTableColumns}
            data={data?.products || []}
            isLoading={isPending}
            filters={[
              {
                accessorKey: "status",
                queryKey: "status",
                title: "Status",
                options: statuses,
              },
              {
                accessorKey: "category",
                queryKey: "categories",
                title: "Category",
                options: (categoriesData?.categories || []).map((c) => ({
                  value: c.slug,
                  label: c.name,
                })),
              },
            ]}
            options={{
              pageCount: data?.pagination.totalPages,
              initialState: {
                columnVisibility: { updatedAt: false, slug: false },
                sorting: Object.entries(searchParams.sort).map(
                  ([key, value]) => ({
                    desc: value === "desc",
                    id: key,
                  }),
                ),
              },
            }}
          />
        </CardContent>
      </Card>
    </AdminPageWrapper>
  );
}

const productStatus = ["published", "archived", "draft"];

const productStatusIcons: Record<
  (typeof productStatus)[number],
  ComponentType<{ className?: string }>
> = {
  draft: FileIcon,
  published: CircleCheckIcon,
  archived: ArchiveIcon,
};

const statuses = productStatus.map((status) => ({
  value: status,
  label: status.charAt(0).toUpperCase() + status.slice(1),
  icon: productStatusIcons[status],
}));
