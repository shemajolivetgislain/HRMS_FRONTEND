"use client";

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
import { FilterPopover } from "@/components/dashboard/filter-popover";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  PlusSignCircleIcon,
  ArrowUpRight01Icon,
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
      <SidebarInset className="bg-background relative">
        <SiteHeader />

        <main className="relative z-10 flex flex-1 flex-col gap-0 overflow-hidden px-4 lg:px-6">
          {/* page header */}
          <header className="flex items-end justify-between pt-10 pb-8">
            <div className="flex flex-col gap-1.5">
              <p className="text-[10px] font-bold text-muted-foreground/40 capitalize tracking-[0.2em]">
                System Overview
              </p>
              <h1 className="text-2xl font-semibold tracking-tight text-foreground/90 leading-tight">
                Morning, Mi Guy
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <FilterPopover />
              <Button
                variant="outline"
                size="sm"
                className="h-9 px-4 rounded-lg text-[12px] font-semibold border-border/60 shadow-none hover:bg-muted/50 gap-2 capitalize"
              >
                <HugeiconsIcon
                  icon={ArrowUpRight01Icon}
                  size={14}
                  strokeWidth={2}
                />
                Export
              </Button>
              <Button
                size="sm"
                className="h-9 px-4 rounded-lg text-[12px] font-bold shadow-sm gap-2 capitalize"
              >
                <HugeiconsIcon
                  icon={PlusSignCircleIcon}
                  size={14}
                  strokeWidth={2}
                />
                New Employee
              </Button>
            </div>
          </header>

          {/* dashboard body */}
          <div className="flex flex-col gap-4 pb-12 flex-1 overflow-auto no-scrollbar">
            {/* row 1 — kpi metrics */}
            <section>
              <DashboardMetrics />
            </section>

            {/* row 2 — attendance chart + today's schedule */}
            <section className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4">
              <ChartAttendanceStacked />
              <DashboardSchedule />
            </section>

            {/* row 3 — recent activity + quick actions (sidebar) */}
            <section className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-4">
              <RecentActivity />
              <QuickActions />
            </section>

            {/* row 4 — top companies + system alerts (sidebar) */}
            <section className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4">
              <TopCompanies />
              <EmployeeDistribution />
            </section>

            {/* row 5 — payroll full-width */}
            <section>
              <DashboardPayroll />
            </section>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
