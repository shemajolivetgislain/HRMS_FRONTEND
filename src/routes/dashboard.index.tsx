import { createFileRoute } from "@tanstack/react-router";
import { DashboardMetrics } from "@/components/dashboard/dashboard-metrics";
import { ChartAttendanceStacked } from "@/components/dashboard/chart-attendance-stacked";
import { DashboardSchedule } from "@/components/dashboard/dashboard-schedule";
import { DashboardPayroll } from "@/components/dashboard/dashboard-payroll";
import { EmployeeDistribution } from "@/components/dashboard/employee-distribution";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { TopCompanies } from "@/components/dashboard/top-companies";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  PlusSignCircleIcon,
  ArrowUpRight01Icon,
} from "@hugeicons/core-free-icons";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <main className="flex flex-1 flex-col gap-0 overflow-hidden">
      <DashboardHeader
        category="System Overview"
        title="Morning, Mi Guy"
        description="Monitor key HR metrics and system performance"
      >
        <Button
          variant="outline"
          size="lg"
          className="text-[12px] font-semibold border-border/60 shadow-none hover:bg-muted/50 gap-2 capitalize"
        >
          <HugeiconsIcon icon={ArrowUpRight01Icon} size={14} strokeWidth={2} />
          Export
        </Button>
        <Button
          size="lg"
          className="text-[12px] font-bold shadow-sm gap-2 capitalize"
        >
          <HugeiconsIcon icon={PlusSignCircleIcon} size={14} strokeWidth={2} />
          New Employee
        </Button>
      </DashboardHeader>

      <div className="flex flex-col gap-4 pb-12 flex-1 overflow-auto no-scrollbar px-4 lg:px-6">
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

        {/* row 4 — top companies + employee distribution */}
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
  );
}
