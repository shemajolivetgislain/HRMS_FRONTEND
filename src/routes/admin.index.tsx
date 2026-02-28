import { createFileRoute } from "@tanstack/react-router";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Building03Icon,
  UserGroupIcon,
  Shield01Icon,
  ActivityIcon,
  ArrowUpRight01Icon,
  PlusSignCircleIcon,
} from "@hugeicons/core-free-icons";
import { StatCard } from "@/components/dashboard/stat-card";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  return (
    <main className="flex flex-1 flex-col gap-0 overflow-hidden">
      <DashboardHeader
        category="Platform Console"
        title="System Overview"
        description="Monitor global platform performance and tenant activity"
      >
        <Button
          variant="outline"
          size="lg"
          className="text-[12px] font-semibold border-border/60 shadow-none hover:bg-muted/50 gap-2 capitalize"
        >
          <HugeiconsIcon icon={ArrowUpRight01Icon} size={14} strokeWidth={2} />
          Reports
        </Button>
        <Button
          size="lg"
          className="text-[12px] font-bold gap-2 capitalize"
        >
          <HugeiconsIcon icon={PlusSignCircleIcon} size={14} strokeWidth={2} />
          New Company
        </Button>
      </DashboardHeader>

      <div className="flex flex-col gap-4 pb-12 flex-1 overflow-auto no-scrollbar px-4 lg:px-6">
        {/* Shared Stat Cards */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total Companies" value="42" change="+3" up icon={Building03Icon} variant="primary" sub="Active on platform" />
          <StatCard label="Total Users" value="2,840" change="+124" up icon={UserGroupIcon} variant="info" sub="Across all tenants" />
          <StatCard label="System Health" value="99.9%" icon={Shield01Icon} variant="success" sub="No active incidents" />
          <StatCard label="API Requests" value="1.2M" change="+15%" up icon={ActivityIcon} variant="accent" sub="Last 24 hours" />
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-4">
          <RecentActivity />
          <QuickActions />
        </section>
      </div>
    </main>
  );
}
