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

import { categoriesTableColumns } from "@/features/products/components/categories-table-columns";
import { allCategoriesOptions } from "@/features/products/products.queries";
import { getAllCategoriesSchema } from "@/features/products/products.schema";

export const Route = createFileRoute({
  component: RouteComponent,
  validateSearch: getAllCategoriesSchema,
  loaderDeps: ({ search }) => ({ search }),
  loader: async ({ context, deps: { search } }) => {
    context.queryClient.prefetchQuery(allCategoriesOptions({ values: search }));
  },
});

function RouteComponent() {
  const searchParams = Route.useSearch();
  const { data, isPending } = useQuery(
    allCategoriesOptions({ values: searchParams }),
  );

  return (
    <AdminPageWrapper pageTitle="All Categories">
      <Card className="container px-0">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="space-y-2">
            <CardTitle>Users</CardTitle>
            <CardDescription>
              <p>Here are the list of product categories</p>
            </CardDescription>
          </div>
          <Button asChild>
            <Link to="/admin/product-categories/new">Add new</Link>
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={categoriesTableColumns}
            data={data?.categories || []}
            isLoading={isPending}
            options={{
              pageCount: data?.pagination.totalPages,
              initialState: {
                columnVisibility: { updatedAt: false },
                sorting: Object.entries(searchParams.sort).map(
                  ([key, value]) => ({
                    desc: value === "desc",
                    id: key,
                  }),
                ),
              },
            }}
            skeletonColumnWidths={["9%", "30%", "30%", "20%"]}
          />
        </CardContent>
      </Card>
    </AdminPageWrapper>
  );
}
