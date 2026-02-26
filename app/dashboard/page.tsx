import { AppSidebar } from "@/components/app-sidebar";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { RecentAlerts } from "@/components/recent-alerts";
import { QuickActions } from "@/components/quick-actions";
import { TopCompanies } from "@/components/top-companies";
import { RecentActivity } from "@/components/recent-activity";
import { SystemHealth } from "@/components/system-health";

export default function Page() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-6 py-6 md:gap-8 md:py-8">
              <SectionCards />

              <div className="grid grid-cols-1 gap-6 px-4 lg:grid-cols-3 lg:gap-8 lg:px-6">
                <div className="min-w-0 lg:col-span-2 h-full">
                  <ChartAreaInteractive />
                </div>
                <div className="min-w-0 lg:col-span-1 h-full flex flex-col gap-6 lg:gap-8">
                  <QuickActions />
                  <RecentAlerts />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 px-4 lg:grid-cols-3 lg:gap-8 lg:px-6 mb-12">
                <div className="min-w-0 lg:col-span-1 h-full">
                  <RecentActivity />
                </div>
                <div className="min-w-0 lg:col-span-1 h-full">
                  <TopCompanies />
                </div>
                <div className="min-w-0 lg:col-span-1 h-full">
                  <SystemHealth />
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
