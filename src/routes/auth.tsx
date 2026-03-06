import { createFileRoute, Link, Outlet, redirect } from "@tanstack/react-router";
import { store } from "@/lib/redux/store";

import { getCookie } from "@/lib/cookies";

export const Route = createFileRoute("/auth")({
  beforeLoad: ({ location }) => {
    const state = store.getState();
    const { user, token: storeToken } = state.auth;

    // Check Redux, then Cookie (SSR safe), then LocalStorage (Client fallback)
    const token =
      storeToken ||
      getCookie("auth_token") ||
      (typeof window !== "undefined" ? localStorage.getItem("auth_token") : null);

    if (token && user) {
      const isVerified = user.status === "ACTIVE";
      const needsPasswordChange =
        (user.role === "COMPANY_ADMIN" || user.role === "EMPLOYEE") &&
        !user.passwordResetAt;

      // Current normalized path
      const path = location.pathname.replace(/\/$/, "");

      // Fully set up users: go to their dashboard
      if (isVerified && !needsPasswordChange) {
        // If they are ALREADY heading to a dashboard, let them through (although they shouldn't be under /auth)
        // This is mainly to prevent loops if /auth is a parent of everything (which it isn't here)
        if (user.role === "ADMIN") {
          throw redirect({ to: "/admin" });
        }
        throw redirect({ to: "/dashboard" });
      }

      // Not verified: can only be on /auth/verify
      if (!isVerified && path !== "/auth/verify") {
        throw redirect({
          to: "/auth/verify",
          search: { email: user.email },
        });
      }

      // Needs password change: can only be on /auth/change-password
      if (isVerified && needsPasswordChange && path !== "/auth/change-password") {
        throw redirect({
          to: "/auth/change-password",
          search: { email: user.email },
        });
      }
    }
  },
  component: AuthLayout,
});

function AuthLayout() {
  return (
    <div className="grid min-h-svh lg:grid-cols-[1fr_1.1fr] bg-background selection:bg-primary/10 selection:text-primary">
      <div className="flex flex-col p-8 md:p-12 lg:p-20 justify-between">
        <div className="flex justify-start">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="h-9 w-9 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shadow-sm shadow-primary/10 transition-transform duration-500">
              <span className="text-base font-bold tracking-tighter">HR</span>
            </div>
            <span className="text-lg font-semibold tracking-tight text-foreground/90">
              HRMS
            </span>
          </Link>
        </div>

        <div className="w-full max-w-[340px] mx-auto py-12">
          <Outlet />
        </div>

        <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground/20 uppercase tracking-widest">
          <p>© 2026 HRMS</p>
          <div className="flex items-center gap-4">
            <Link to="/" className="hover:text-primary transition-colors">
              Help
            </Link>
            <Link to="/" className="hover:text-primary transition-colors">
              Privacy
            </Link>
          </div>
        </div>
      </div>

      <div className="relative hidden lg:flex flex-col bg-muted/10 overflow-hidden border-l border-border/5">
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          <div className="absolute top-0 right-0 h-[1000px] w-[1000px] bg-primary/[0.03] blur-[160px] rounded-full translate-x-1/4 -translate-y-1/4" />
          <div className="absolute bottom-0 left-0 h-[600px] w-[600px] bg-primary/[0.01] blur-[120px] rounded-full -translate-x-1/4 translate-y-1/4" />

          <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </div>

        <div className="relative z-10 flex flex-col h-full p-20 justify-center">
          <div className="max-w-md space-y-6">
            <h2 className="text-5xl font-semibold leading-[1.1] tracking-tight text-foreground/90">
              Work better,
              <br />
              together.
            </h2>
            <div className="h-px w-12 bg-primary/20" />
            <p className="text-xl font-medium text-muted-foreground/50 leading-relaxed">
              The modern standard for high-performance organizations to manage
              their global workforce.
            </p>
          </div>
        </div>

        <div className="absolute bottom-12 left-20 right-20 flex items-center justify-between">
          <p className="text-xs font-bold text-muted-foreground/20 uppercase tracking-[0.3em]">
            Precision Interface v4.2
          </p>
        </div>
      </div>
    </div>
  );
}
