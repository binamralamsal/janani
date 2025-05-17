import { AdminPageWrapper } from "@/components/admin-page-wrapper";

export const Route = createFileRoute({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AdminPageWrapper pageTitle="All Blogs">
      <div></div>
    </AdminPageWrapper>
  );
}
