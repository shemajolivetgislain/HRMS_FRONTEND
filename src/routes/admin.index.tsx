import { createFileRoute, Link } from "@tanstack/react-router";
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
  MoreHorizontalIcon,
} from "@hugeicons/core-free-icons";
import { StatCard } from "@/components/dashboard/stat-card";
import { api } from "@/lib/mock-api";
import { DashboardPending } from "@/components/dashboard/dashboard-pending";
import {
  Frame,
  FramePanel,
  FrameHeader,
  FrameTitle,
  FrameDescription,
  FrameContent,
} from "@/components/ui/frame";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { UserAvatar } from "@/components/dashboard/user-avatar";

export const Route = createFileRoute("/admin/")({
  loader: async () => {
    const [users, companies] = await Promise.all([
      api.getUsers(),
      api.getCompanies(),
    ]);
    return { users, companies };
  },
  pendingComponent: DashboardPending,
  component: AdminDashboard,
});

function AdminDashboard() {
  const { users, companies } = Route.useLoaderData();

  return (
    <main className="flex flex-1 flex-col gap-0 overflow-hidden h-full">
      <DashboardHeader
        category="Platform Console"
        title="System Overview"
        description="Monitor global platform performance and tenant activity"
      >
        <Button
          variant="outline"
          size="sm"
          className="text-xs font-bold border-border/40 shadow-none hover:bg-muted/50 gap-2 uppercase tracking-widest"
        >
          <HugeiconsIcon icon={ArrowUpRight01Icon} size={14} strokeWidth={2} />
          Reports
        </Button>
        <Button
          size="sm"
          render={<Link to="/admin/companies/register" />}
          className="text-xs font-bold gap-2 uppercase tracking-widest"
        >
          <HugeiconsIcon icon={PlusSignCircleIcon} size={14} strokeWidth={2} />
          New Company
        </Button>
      </DashboardHeader>

      <div className="flex-1 overflow-y-auto no-scrollbar px-4 lg:px-6 pb-12 pt-2">
        <div className="flex flex-col gap-8">
          {/* Shared Stat Cards */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              label="Total Companies"
              value={companies.length}
              change="+3"
              up
              icon={Building03Icon}
              variant="primary"
              sub="Active on platform"
            />
            <StatCard
              label="Total Users"
              value="2,840"
              change="+124"
              up
              icon={UserGroupIcon}
              variant="info"
              sub="Across all tenants"
            />
            <StatCard
              label="System Health"
              value="99.9%"
              icon={Shield01Icon}
              variant="success"
              sub="No active incidents"
            />
            <StatCard
              label="API Requests"
              value="1.2M"
              change="+15%"
              up
              icon={ActivityIcon}
              variant="accent"
              sub="Last 24 hours"
            />
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Users Overview */}
            <div className="lg:col-span-8 space-y-8">
              <Frame>
                <FramePanel className="bg-card">
                  <FrameHeader>
                    <div>
                      <FrameTitle>Users Overview</FrameTitle>
                      <FrameDescription>
                        Recent active administrators and system users
                      </FrameDescription>
                    </div>
                    <Button variant="ghost" size="sm" className="text-xs font-bold">
                      View All
                    </Button>
                  </FrameHeader>
                  <FrameContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>User</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead>Organization</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="w-[50px]"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {users.map((user) => {
                          const company = companies.find(
                            (c) => c.id === user.companyId,
                          );
                          return (
                            <TableRow key={user.id}>
                              <TableCell>
                                <div className="flex items-center gap-3">
                                  <UserAvatar name={user.name} size="sm" />
                                  <div className="flex flex-col">
                                    <span className="font-bold text-foreground/90">
                                      {user.name}
                                    </span>
                                    <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
                                      {user.email}
                                    </span>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge
                                  variant={
                                    user.role === "SYSTEM_ADMIN"
                                      ? "accent"
                                      : "outline"
                                  }
                                  className="font-bold text-[9px]"
                                >
                                  {user.role.replace("_", " ")}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <span className="text-sm font-semibold text-muted-foreground">
                                  {company?.name || "System"}
                                </span>
                              </TableCell>
                              <TableCell>
                                <Badge
                                  variant={
                                    user.status === "online"
                                      ? "success"
                                      : user.status === "away"
                                        ? "warning"
                                        : "muted"
                                  }
                                  showDot
                                  className="font-bold text-[9px]"
                                >
                                  {user.status}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Button
                                  variant="ghost"
                                  size="icon-sm"
                                  className="text-muted-foreground/40"
                                >
                                  <HugeiconsIcon
                                    icon={MoreHorizontalIcon}
                                    size={16}
                                  />
                                </Button>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </FrameContent>
                </FramePanel>
              </Frame>
            </div>

            {/* Right Column: Actions & Activity */}
            <div className="lg:col-span-4 space-y-8">
              <QuickActions />
              <RecentActivity />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
