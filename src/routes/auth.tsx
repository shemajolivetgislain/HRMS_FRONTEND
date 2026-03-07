import {
  createFileRoute,
  Link,
  Outlet,
  redirect,
} from "@tanstack/react-router";
import { getCookie } from "@/lib/cookies";
import { store } from "@/lib/redux/store";

export const Route = createFileRoute("/auth")({
  beforeLoad: ({ location }) => {
    if (typeof window === "undefined") return;

    const token = getCookie("auth_token");
    const state = store.getState();
    const { user } = state.auth;

    if (token && user) {
      const isVerified = !!user.isEmailVerified;
      const needsPasswordChange =
        (user.role === "COMPANY_ADMIN" || user.role === "EMPLOYEE") &&
        !user.passwordResetAt;

      const path = location.pathname.replace(/\/$/, "");

      if (isVerified && !needsPasswordChange) {
        if (user.role === "ADMIN") {
          throw redirect({ to: "/admin" });
        }
        throw redirect({ to: "/dashboard" });
      }

      if (!isVerified && path !== "/auth/verify") {
        throw redirect({
          to: "/auth/verify",
          search: { email: user.email },
        });
      }

      if (
        isVerified &&
        needsPasswordChange &&
        path !== "/auth/change-password"
      ) {
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
    <div className="fixed inset-0 grid lg:grid-cols-[1fr_1.1fr] bg-background selection:bg-primary/10 selection:text-primary overflow-hidden">
      <div className="flex flex-col p-8 md:p-12 lg:p-20 justify-between h-full overflow-y-auto no-scrollbar">
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

      <div className="relative hidden lg:flex flex-col h-full overflow-hidden border-l border-border/10 bg-muted">
        <img
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2000&auto=format&fit=crop"
          alt="Modern team collaboration"
          className="absolute inset-0 object-cover w-full h-full select-none pointer-events-none"
        />

        <div className="relative z-30 flex flex-col h-full p-20 justify-center bg-black/30 backdrop-blur-[2px]">
          <div className="max-w-md space-y-8">
            <div className="space-y-3">
              <span className="text-primary font-black text-[10px] uppercase tracking-[0.5em] drop-shadow-sm">
                Enterprise HRMS
              </span>
              <h2 className="text-6xl font-bold leading-[1.05] tracking-tight text-white drop-shadow-2xl">
                Empowering
                <br />
                your workforce.
              </h2>
            </div>

            <div className="h-1.5 w-16 bg-primary rounded-full shadow-lg shadow-primary/20" />

            <p className="text-xl font-medium text-white/90 leading-relaxed max-w-[360px] drop-shadow-lg">
              The unified platform for human capital, automated payroll, and
              strategic workforce planning.
            </p>
          </div>
        </div>

        <div className="absolute bottom-12 left-20 right-20 z-30 flex items-center justify-between">
          <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em] drop-shadow-md">
            System
          </p>
        </div>
      </div>
    </div>
  );
}
