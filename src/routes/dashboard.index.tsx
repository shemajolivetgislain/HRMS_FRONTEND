import { createFileRoute } from "@tanstack/react-router";
import { ChartAttendanceStacked } from "@/components/dashboard/chart-attendance-stacked";
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
  UserGroupIcon,
  Coins01Icon,
  Calendar01Icon,
  Task01Icon,
} from "@hugeicons/core-free-icons";
import { StatCard } from "@/components/dashboard/stat-card";

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
          className="text-[12px] font-bold gap-2 capitalize"
        >
          <HugeiconsIcon icon={PlusSignCircleIcon} size={14} strokeWidth={2} />
          New Employee
        </Button>
      </DashboardHeader>

      <div className="flex flex-col gap-4 pb-12 flex-1 overflow-auto no-scrollbar px-4 lg:px-6">
        {/* Unified Stat Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total Employees" value="143" change="+4" up icon={UserGroupIcon} variant="primary" sub="Active headcount" />
          <StatCard label="Monthly Payroll" value="RWF 12.5M" change="+2.4%" up icon={Coins01Icon} variant="success" sub="Disbursement" />
          <StatCard label="On Leave Today" value="8" change="-2" up={false} icon={Calendar01Icon} variant="warning" sub="Staff availability" />
          <StatCard label="Pending Tasks" value="14" change="+5" up icon={Task01Icon} variant="info" sub="Requiring action" />
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4">
          <ChartAttendanceStacked />
          <div className="space-y-4">
            <QuickActions />
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-4">
          <RecentActivity />
          <EmployeeDistribution />
        </section>

        <section className="grid grid-cols-1 gap-4">
          <TopCompanies />
        </section>
      </div>
    </main>
  );
}
