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
  ArrowUpRight01Icon,
  PlusSignCircleIcon,
  MoreHorizontalIcon,
  AiSecurityIcon,
  File02Icon,
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
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/")({
  loader: async () => {
    const [users, companies, logs] = await Promise.all([
      api.getUsers(),
      api.getCompanies(),
      api.getSystemLogs(),
    ]);
    return { users, companies, logs };
  },
  pendingComponent: DashboardPending,
  component: AdminDashboard,
});

function AdminDashboard() {
  const { users, companies, logs } = Route.useLoaderData();

  return (
    <main className="flex flex-1 flex-col gap-0 overflow-hidden h-full">
      <DashboardHeader
        category="Platform Console"
        title="System Overview"
        description="Monitor global platform performance and tenant activity"
      >
        <Button variant="outline">
          <HugeiconsIcon icon={ArrowUpRight01Icon} />
          Reports
        </Button>
        <Button render={<Link to="/admin/companies/register" />}>
          <HugeiconsIcon icon={PlusSignCircleIcon} />
          New Company
        </Button>
      </DashboardHeader>

      <div className="flex-1 overflow-y-auto no-scrollbar px-4 lg:px-6 pb-12 pt-2">
        <div className="flex flex-col gap-8">
          {/* shared stat cards (3) */}
          <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* overview column 1 */}
            <div className="lg:col-span-8 space-y-8">
              {/* users overview */}
              <Frame>
                <FramePanel className="bg-card">
                  <FrameHeader>
                    <div>
                      <FrameTitle>Users Overview</FrameTitle>
                      <FrameDescription>
                        Recent active administrators and system users
                      </FrameDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                    >
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
                        {users.slice(0, 5).map((user) => {
                          const company = companies.find(
                            (c) => c.id === user.companyId,
                          );
                          return (
                            <TableRow key={user.id}>
                              <TableCell>
                                <div className="flex items-center gap-3">
                                  <UserAvatar
                                    src={user.image}
                                    name={user.name}
                                    size="sm"
                                  />
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

              <Frame>
                <FramePanel className="bg-card">
                  <FrameHeader>
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                        <HugeiconsIcon icon={AiSecurityIcon} size={18} />
                      </div>
                      <div>
                        <FrameTitle>Security Audit Logs</FrameTitle>
                        <FrameDescription>
                          Immutable system-level event tracking
                        </FrameDescription>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                    >
                      Audit Trail
                    </Button>
                  </FrameHeader>
                  <FrameContent className="p-0">
                    <div className="divide-y divide-border/5">
                      {logs.slice(0, 4).map((log) => (
                        <div
                          key={log.id}
                          className="flex items-center justify-between p-5 hover:bg-muted/5 transition-colors group"
                        >
                          <div className="flex items-start gap-4">
                            <div
                              className={cn(
                                "h-10 w-10 rounded-xl flex items-center justify-center border transition-all duration-300",
                                log.level === "security"
                                  ? "bg-destructive/10 text-destructive border-destructive/20"
                                  : "bg-info/10 text-info border-info/20",
                              )}
                            >
                              <HugeiconsIcon icon={File02Icon} size={20} />
                            </div>
                            <div className="space-y-1">
                              <p className="text-sm font-bold text-foreground/90 leading-tight">
                                {log.event}
                              </p>
                              <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
                                <span>{log.actor}</span>
                                <span>•</span>
                                <span>{log.timestamp}</span>
                              </div>
                            </div>
                          </div>
                          <Badge
                            variant="muted"
                            className="bg-muted/10 border-none tabular-nums text-[9px]"
                          >
                            {log.ipAddress}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </FrameContent>
                </FramePanel>
              </Frame>
            </div>

            {/* overview column 2 */}
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
