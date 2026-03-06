import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
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
import { store } from "@/lib/redux/store";

import { getCookie } from "@/lib/cookies";

export const Route = createFileRoute("/admin")({
  beforeLoad: ({ location }) => {
    const state = store.getState();
    const { user, token: storeToken } = state.auth;
    
    // Check Redux, then Cookie (SSR safe), then LocalStorage (Client fallback)
    const token =
      storeToken ||
      getCookie("auth_token") ||
      (typeof window !== "undefined" ? localStorage.getItem("auth_token") : null);

    if (!token) {
      throw redirect({ to: "/auth/login", search: { redirect: location.href } });
    }

    // Note: On the server, 'user' might be null until hydration.
    // To fully fix the flash, we would need to populate the Redux store on the server.
    // For now, this cookie check at least prevents the incorrect login redirect during SSR.
    if (user) {
      const isVerified = user.status === "ACTIVE";
      const needsPasswordChange =
        (user.role === "COMPANY_ADMIN" || user.role === "EMPLOYEE") &&
        !user.passwordResetAt;

      if (!isVerified) {
        throw redirect({
          to: "/auth/verify",
          search: { email: user.email },
        });
      }

      if (needsPasswordChange) {
        throw redirect({
          to: "/auth/change-password",
          search: { email: user.email },
        });
      }

      if (user.role !== "ADMIN") {
        throw redirect({ to: "/dashboard" });
      }
    }
  },
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
    <SidebarProvider>
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
