import { AppSidebar } from "@/components/sidebar/app-sidebar";
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
        <div className="flex flex-1 flex-col relative overflow-hidden">
          {/* <div className="absolute top-[-20%] right-[-10%] w-[70%] h-[70%] rounded-full bg-success/5 blur-[120px] pointer-events-none mix-blend-screen animate-pulse duration-10000" /> */}

          <div className="@container/main flex flex-1 flex-col gap-2 relative z-10">
            <div className="flex flex-col gap-6 py-6 md:gap-8 md:py-8">
              <div className="px-4 lg:px-6 flex items-end justify-between">
                <div>
                  <h1 className="text-2xl font-semibold tracking-tight text-foreground/90">
                    System Overview
                  </h1>
                  <p className="text-sm text-muted-foreground mt-1">
                    Live operational metrics and tenant activity.
                  </p>
                </div>
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/50 border border-border/40 backdrop-blur-md">
                  <span className="relative flex size-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success/80 opacity-75"></span>
                    <span className="relative inline-flex rounded-full size-2 bg-success"></span>
                  </span>
                  <span className="text-[10px] font-mono tracking-widest text-success uppercase font-medium">
                    Active
                  </span>
                </div>
              </div>

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
