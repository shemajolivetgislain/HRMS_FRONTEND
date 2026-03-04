import { createFileRoute, Link } from "@tanstack/react-router";
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
    <main className="flex flex-1 flex-col gap-0 overflow-hidden bg-muted/20">
      <DashboardHeader
        category="Operational Overview"
        title="Admin Dashboard"
        description="Monitor workforce operations, recruitment velocity, and organizational compliance"
      >
        <Button
          variant="outline"
          size="sm"
          className="text-xs font-bold border-border/40 shadow-none hover:bg-muted/50 gap-2 uppercase tracking-widest h-10 rounded-xl"
        >
          <HugeiconsIcon icon={ArrowUpRight01Icon} size={14} strokeWidth={2} />
          Export
        </Button>
        <Button 
          size="sm" 
          render={<Link to="/dashboard/employees/onboard" />}
          className="text-xs font-bold gap-2 uppercase tracking-widest h-10 rounded-xl"
        >
          <HugeiconsIcon icon={PlusSignCircleIcon} size={14} strokeWidth={2} />
          Induct
        </Button>
      </DashboardHeader>

      <div className="flex flex-col gap-8 pb-12 flex-1 overflow-auto no-scrollbar px-4 lg:px-6">
        {/* Row 1: Key Stat Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Active Employees"
            value="138"
            change="4"
            up={true}
            icon={UserGroupIcon}
            variant="success"
            sub="Current headcount"
          />
          <StatCard
            label="Departments"
            value="5"
            change="Stable"
            up={true}
            icon={Building03Icon}
            variant="primary"
            sub="Org units"
          />
          <StatCard
            label="Open Positions"
            value="1"
            change="2"
            up={false}
            icon={Briefcase02Icon}
            variant="warning"
            sub="Active requisitions"
          />
          <StatCard
            label="Pending applicants"
            value="145"
            change="12"
            up={true}
            icon={UserAdd01Icon}
            variant="info"
            sub="Needs review"
          />
        </section>

        {/* Row 2: Primary Operations */}
        <section className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <RecruitmentPipeline />
          <EmploymentStatusChart />
        </section>

        {/* Row 3: Compliance & Departments */}
        <section className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <DepartmentOverview />
          <PolicyComplianceCard />
        </section>

        {/* Row 4: Actions & Vault */}
        <section className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          <div className="xl:col-span-6">
            <RecentActivity />
          </div>
          <div className="xl:col-span-3">
            <QuickActions />
          </div>
          <div className="xl:col-span-3">
            <DocumentCompliance />
          </div>
        </section>
      </div>
    </main>
  );
}
