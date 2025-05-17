import { AdminPageWrapper } from "@/components/admin-page-wrapper";

export const Route = createFileRoute({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AdminPageWrapper
      pageTitle="Add New Blog"
      breadcrumbs={[{ href: "/admin/blogs", label: "All Blogs" }]}
    >
      <div></div>
    </AdminPageWrapper>
  );
}
