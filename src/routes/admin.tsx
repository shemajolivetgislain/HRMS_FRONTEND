import React from "react";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ErrorComponent } from "@/components/error-component";
import {
  DashboardSquare01Icon,
  Building03Icon,
  Settings02Icon,
  Shield01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export const Route = createFileRoute("/admin")({
  errorComponent: ErrorComponent,
  component: AdminLayout,
});

const adminNav = [
  {
    title: "Overview",
    url: "/admin",
    icon: <HugeiconsIcon icon={DashboardSquare01Icon} strokeWidth={2} />,
  },
  {
    title: "Companies",
    url: "/admin/companies",
    icon: <HugeiconsIcon icon={Building03Icon} strokeWidth={2} />,
  },
  {
    title: "System Logs",
    url: "/admin/logs",
    icon: <HugeiconsIcon icon={Shield01Icon} strokeWidth={2} />,
  },
  {
    title: "Global Settings",
    url: "/admin/settings",
    icon: <HugeiconsIcon icon={Settings02Icon} strokeWidth={2} />,
  },
];

function AdminLayout() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 60)",
          "--header-height": "calc(var(--spacing) * 13)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" customNav={adminNav} />
      <SidebarInset className="bg-background relative overflow-hidden">
        <SiteHeader />
        <div className="relative z-10 flex flex-1 flex-col overflow-hidden">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
