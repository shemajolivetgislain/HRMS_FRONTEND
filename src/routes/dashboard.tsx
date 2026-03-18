import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { ErrorComponent } from "@/components/error-component";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getCookie } from "@/lib/cookies";
import { store } from "@/lib/redux/store";

export const Route = createFileRoute("/dashboard")({
	beforeLoad: ({ location }) => {
		if (typeof window === "undefined") return;

		const token = getCookie("auth_token");
		const state = store.getState();
		const { user } = state.auth;
		console.log(user);
		if (!token) {
			throw redirect({
				to: "/auth/login",
				search: { redirect: location.href },
			});
		}

		if (user) {
			const isVerified = !!user.isEmailVerified;
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
		}
	},
	errorComponent: ErrorComponent,
	component: DashboardLayout,
});

function DashboardLayout() {
	return (
		<SidebarProvider>
			<AppSidebar variant="inset" />
			<SidebarInset className="bg-background relative overflow-hidden">
				<SiteHeader />

				<div className="relative z-10 flex flex-1 flex-col overflow-hidden">
					<Outlet />
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
