import { Outlet } from "@tanstack/react-router";

import { NotFound } from "@/components/not-found";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const Route = createFileRoute({
  component: RouteComponent,
  notFoundComponent: () => <NotFound />,
});

function RouteComponent() {
  return (
    <>
      <SiteHeader />
      <Outlet />
      <SiteFooter />
    </>
  );
}
