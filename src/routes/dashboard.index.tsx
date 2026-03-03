import { createFileRoute } from "@tanstack/react-router";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  PlusSignCircleIcon,
  ArrowUpRight01Icon,
  UserGroupIcon,
  Building03Icon,
  Briefcase02Icon,
  UserAdd01Icon,
} from "@hugeicons/core-free-icons";
import { StatCard } from "@/components/dashboard/stat-card";

import { RecruitmentPipeline } from "@/components/dashboard/recruitment-pipeline";
import { DepartmentOverview } from "@/components/dashboard/department-overview";
import { PolicyComplianceCard } from "@/components/dashboard/policy-compliance";
import { EmploymentStatusChart } from "@/components/dashboard/employment-status-chart";
import { DocumentCompliance } from "@/components/dashboard/document-compliance";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <main className="flex flex-1 flex-col gap-0 overflow-hidden">
      <DashboardHeader
        category="Company Overview"
        title="Admin Dashboard"
        description="Monitor workforce operations and compliance metrics"
      >
        <Button
          variant="outline"
          size="lg"
          className="text-xs font-semibold border-border/60 shadow-none hover:bg-muted/50 gap-2 capitalize"
        >
          <HugeiconsIcon icon={ArrowUpRight01Icon} size={14} strokeWidth={2} />
          Export Report
        </Button>
        <Button size="lg" className="text-xs font-bold gap-2 capitalize">
          <HugeiconsIcon icon={PlusSignCircleIcon} size={14} strokeWidth={2} />
          Hire Employee
        </Button>
      </DashboardHeader>

      <div className="flex flex-col gap-4 pb-12 flex-1 overflow-auto no-scrollbar px-4 lg:px-6">
        {/* Row 1: Key Stat Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Active Employees"
            value="138"
            change="+4"
            up
            icon={UserGroupIcon}
            variant="success"
            sub="Current headcount"
          />
          <StatCard
            label="Departments"
            value="5"
            change="Stable"
            up
            icon={Building03Icon}
            variant="primary"
            sub="Organizational units"
          />
          <StatCard
            label="Open Positions"
            value="1"
            change="-2"
            up={false}
            icon={Briefcase02Icon}
            variant="warning"
            sub="Active requisitions"
          />
          <StatCard
            label="Pending Applicants"
            value="145"
            change="+12"
            up
            icon={UserAdd01Icon}
            variant="info"
            sub="Needs review"
          />
        </section>

        {/* Row 2: Primary Operations */}
        <section className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <RecruitmentPipeline />
          <EmploymentStatusChart />
        </section>

        {/* Row 3: Compliance & Departments */}
        <section className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <DepartmentOverview />
          <PolicyComplianceCard />
        </section>

        {/* Row 4: Actions & Vault */}
        <section className="grid grid-cols-1 xl:grid-cols-[2fr_1fr_1fr] gap-4">
          <RecentActivity />
          <QuickActions />
          <DocumentCompliance />
        </section>
      </div>
    </main>
  );
}
