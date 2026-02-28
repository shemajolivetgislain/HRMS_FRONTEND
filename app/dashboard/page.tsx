import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { DashboardMetrics } from "@/components/dashboard-metrics";
import { ChartAttendanceStacked } from "@/components/chart-attendance-stacked";
import { DashboardSchedule } from "@/components/dashboard-schedule";
import { DashboardPayroll } from "@/components/dashboard-payroll";
import { EmployeeDistribution } from "@/components/employee-distribution";
import { QuickActions } from "@/components/quick-actions";
import { TopCompanies } from "@/components/top-companies";
import { RecentActivity } from "@/components/recent-activity";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  PlusSignCircleIcon,
  ArrowUpRight01Icon,
  FilterIcon,
} from "@hugeicons/core-free-icons";

export default function Page() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 60)",
          "--header-height": "calc(var(--spacing) * 13)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset className="bg-background">
        <SiteHeader />

        <div className="fixed top-0 right-0 h-[60vh] w-[40vw] bg-primary/[0.03] blur-[100px] pointer-events-none rounded-full translate-x-1/4 -translate-y-1/4" />

        <main className="relative z-10 flex flex-1 flex-col gap-0 overflow-hidden">
          {/* page header */}
          <div className="flex items-end justify-between px-5 pt-7 pb-5 border-b border-border/10">
            <div className="flex flex-col gap-0.5">
              <p className="text-[11px] font-medium text-muted-foreground/60 tracking-widest uppercase">
                Overview · HR Dashboard
              </p>
              <h1 className="text-xl font-semibold tracking-tight text-foreground/90 leading-tight">
                morning, mi guy
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="h-8 px-3 rounded-lg text-[12px] font-medium border-border/60 shadow-none hover:bg-muted/50 gap-1.5"
              >
                <HugeiconsIcon icon={FilterIcon} size={13} strokeWidth={2} />
                Filter
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-8 px-3 rounded-lg text-[12px] font-medium border-border/60 shadow-none hover:bg-muted/50 gap-1.5"
              >
                <HugeiconsIcon
                  icon={ArrowUpRight01Icon}
                  size={13}
                  strokeWidth={2}
                />
                Export
              </Button>
              <Button
                size="sm"
                className="h-8 px-3 rounded-lg text-[12px] font-semibold shadow-none gap-1.5"
              >
                <HugeiconsIcon
                  icon={PlusSignCircleIcon}
                  size={13}
                  strokeWidth={2}
                />
                New Employee
              </Button>
            </div>
          </div>

          {/* dashboard body */}
          <div className="flex flex-col gap-4 px-5 pt-5 pb-8 flex-1 overflow-auto">
            {/* row 1 — kpi metrics */}
            <DashboardMetrics />

            {/* row 2 — attendance chart + today's schedule */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-4">
              <ChartAttendanceStacked />
              <DashboardSchedule />
            </div>

            {/* row 3 — recent activity + quick actions (sidebar) */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-4">
              <RecentActivity />
              <QuickActions />
            </div>

            {/* row 4 — top companies + system alerts (sidebar) */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-4">
              <TopCompanies />
              <EmployeeDistribution />
            </div>

            {/* row 5 — payroll full-width */}
            <DashboardPayroll />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
