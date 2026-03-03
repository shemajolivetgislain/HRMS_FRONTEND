import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Frame,
  FramePanel,
  FrameHeader,
  FrameTitle,
  FrameDescription,
  FrameContent,
  FrameFooter,
} from "@/components/ui/frame";
import { UserAvatar } from "@/components/dashboard/user-avatar";
import { Badge } from "@/components/ui/badge";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Search01Icon,
  PlusSignCircleIcon,
  Download01Icon,
  MoreHorizontalIcon,
  Mail01Icon,
  Delete02Icon,
  ViewIcon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  UserMinus01Icon,
} from "@hugeicons/core-free-icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { api } from "@/lib/mock-api";
import { useEmployees } from "@/hooks/use-employees";

import { DashboardPending } from "@/components/dashboard/dashboard-pending";

export const Route = createFileRoute("/dashboard/employees/")({
  loader: async () => await api.getEmployees(),
  pendingComponent: DashboardPending,
  component: EmployeesPage,
});

function EmployeesPage() {
  const initialEmployees = Route.useLoaderData();
  const navigate = useNavigate();
  const {
    searchTerm,
    setSearchTerm,
    filterDept,
    setFilterDept,
    filterStatus,
    setFilterStatus,
    filteredEmployees,
    departments,
    statuses,
  } = useEmployees(initialEmployees);

  return (
    <main className="flex flex-1 flex-col gap-0 overflow-hidden">
      <DashboardHeader
        category="Organization"
        title="Employees"
        description="Manage and monitor your global workforce"
      >
        <Button
          variant="outline"
          size="lg"
          className="text-xs font-semibold border-border/60 shadow-none hover:bg-muted/50 gap-2 capitalize"
        >
          <HugeiconsIcon icon={Download01Icon} size={14} strokeWidth={2} />
          Export List
        </Button>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="lg"
            className="text-xs font-bold gap-2 capitalize shadow-none hover:bg-secondary/80"
            onClick={() => navigate({ to: "/dashboard/employees/resign" })}
          >
            <HugeiconsIcon icon={UserMinus01Icon} size={14} strokeWidth={2} />
            Resign
          </Button>
          <Button
            size="lg"
            className="text-xs font-bold gap-2 capitalize"
            onClick={() => navigate({ to: "/dashboard/employees/onboard" })}
          >
            <HugeiconsIcon
              icon={PlusSignCircleIcon}
              size={14}
              strokeWidth={2}
            />
            Onboard Employee
          </Button>
        </div>
      </DashboardHeader>

      <div className="flex flex-col gap-4 pb-12 flex-1 overflow-auto no-scrollbar px-4 lg:px-6">
        <section>
          <Frame className="group/frame">
            <FramePanel className="p-0 overflow-hidden bg-card">
              <FrameHeader className="border-b-0 pb-2">
                <div>
                  <FrameTitle>Employee Directory</FrameTitle>
                  <FrameDescription>
                    Manage and view all employee profiles
                  </FrameDescription>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-xs font-bold text-muted-foreground/30 capitalize tracking-widest mr-2">
                    {filteredEmployees.length} Records
                  </p>
                </div>
              </FrameHeader>

              <div className="px-6 pb-5 pt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 border-b border-border/5">
                <div className="relative">
                  <HugeiconsIcon
                    icon={Search01Icon}
                    className="absolute left-3 top-2.5 size-4 text-muted-foreground/40"
                    strokeWidth={2}
                  />
                  <Input
                    placeholder="Search employees…"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 h-9 rounded-lg border-border/40 bg-muted/5 focus:bg-background transition-all text-xs"
                  />
                </div>

                <Select
                  value={filterDept}
                  onValueChange={(val) => setFilterDept(val || "all")}
                >
                  <SelectTrigger className="h-9 rounded-lg border-border/40 bg-muted/5">
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground/40 text-xs font-bold uppercase tracking-wider">
                        Dept:
                      </span>
                      <SelectValue
                        placeholder="All Departments"
                        className="text-xs"
                      />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept} className="text-xs">
                        {dept === "all" ? "All Departments" : dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={filterStatus}
                  onValueChange={(val) => setFilterStatus(val || "all")}
                >
                  <SelectTrigger className="h-9 rounded-lg border-border/40 bg-muted/5">
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground/40 text-xs font-bold uppercase tracking-wider">
                        Status:
                      </span>
                      <SelectValue
                        placeholder="All Status"
                        className="text-xs"
                      />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map((status) => (
                      <SelectItem
                        key={status}
                        value={status}
                        className="capitalize text-xs"
                      >
                        {status === "all" ? "All Status" : status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <FrameContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredEmployees.length > 0 ? (
                    filteredEmployees.map((user) => (
                      <div
                        key={user.id}
                        className="group relative flex flex-col p-5 rounded-2xl border border-border/40 bg-muted/5 hover:bg-background hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 animate-in fade-in zoom-in-95"
                      >
                        <div className="absolute top-4 right-4">
                          <DropdownMenu>
                            <DropdownMenuTrigger
                              render={
                                <Button
                                  variant="ghost"
                                  size="icon-sm"
                                  className="rounded-lg bg-muted/20 hover:bg-muted hover:text-foreground transition-all border border-border/5 shadow-xs"
                                  aria-label="Employee actions"
                                >
                                  <HugeiconsIcon
                                    icon={MoreHorizontalIcon}
                                    className="size-4 text-muted-foreground/60"
                                  />
                                </Button>
                              }
                            />
                            <DropdownMenuContent
                              align="end"
                              className="w-48 rounded-xl border-border/40 shadow-xl"
                            >
                              <DropdownMenuItem
                                render={
                                  <Link
                                    to="/dashboard/employees/$id"
                                    params={{ id: user.id }}
                                  />
                                }
                              >
                                <HugeiconsIcon
                                  icon={ViewIcon}
                                  className="size-4 mr-2"
                                />
                                <span>View Profile</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <HugeiconsIcon
                                  icon={Mail01Icon}
                                  className="size-4 mr-2"
                                />
                                <span>Send Message</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive focus:bg-destructive/10">
                                <HugeiconsIcon
                                  icon={Delete02Icon}
                                  className="size-4 mr-2"
                                />
                                <span>Terminate</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        <div className="flex items-start gap-4 mb-6">
                          <UserAvatar name={user.name} size="default" />
                          <div className="space-y-1">
                            <h4 className="text-base font-bold text-foreground/90 group-hover:text-primary transition-colors">
                              {user.name}
                            </h4>
                            <p className="text-xs font-medium text-muted-foreground/60">
                              {user.position}
                            </p>
                            <Badge
                              variant={
                                user.status === "active"
                                  ? "success"
                                  : user.status === "probation"
                                    ? "warning"
                                    : user.status === "resigned"
                                      ? "muted"
                                      : "destructive"
                              }
                              className="capitalize h-5 text-[10px] font-bold"
                            >
                              {user.status}
                            </Badge>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 gap-3 mb-6">
                          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-background/50 border border-border/20">
                            <div className="text-[10px] font-bold text-muted-foreground/30 uppercase tracking-widest w-16">
                              Staff ID
                            </div>
                            <span className="text-xs font-bold text-muted-foreground/80">
                              {user.idNumber}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-background/50 border border-border/20">
                            <div className="text-[10px] font-bold text-muted-foreground/30 uppercase tracking-widest w-16">
                              Dept
                            </div>
                            <span className="text-xs font-bold text-muted-foreground/80">
                              {user.department}
                            </span>
                          </div>
                        </div>

                        <div className="mt-auto pt-4 border-t border-border/5 space-y-2">
                          <div className="flex items-center gap-2 text-[11px] font-medium text-muted-foreground/60">
                            <HugeiconsIcon
                              icon={Mail01Icon}
                              size={14}
                              className="text-primary/40"
                            />
                            {user.email}
                          </div>
                          <div className="flex items-center gap-2 text-[11px] font-medium text-muted-foreground/60">
                            <HugeiconsIcon
                              icon={Download01Icon}
                              size={14}
                              className="text-primary/40 rotate-180"
                            />
                            {user.phone}
                          </div>
                        </div>

                        {user.onboardingProgress < 100 && (
                          <div className="mt-4 pt-4 border-t border-border/5">
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest">
                                Setup Progress
                              </span>
                              <span className="text-[10px] font-bold text-primary">
                                {user.onboardingProgress}%
                              </span>
                            </div>
                            <div className="h-1 w-full bg-muted/20 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-primary transition-all duration-500"
                                style={{ width: `${user.onboardingProgress}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full h-64 flex flex-col items-center justify-center text-center space-y-3">
                      <div className="size-12 rounded-2xl bg-muted/5 flex items-center justify-center text-muted-foreground/20">
                        <HugeiconsIcon icon={Search01Icon} size={24} />
                      </div>
                      <p className="text-sm font-medium text-muted-foreground/40">
                        No employees found matching your filters
                      </p>
                    </div>
                  )}
                </div>
              </FrameContent>

              <FrameFooter className="flex items-center justify-between border-t border-border/5">
                <span className="text-xs text-muted-foreground/40 font-bold capitalize tracking-widest">
                  {filteredEmployees.length} Records Total
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    className="h-7 w-7 flex items-center justify-center rounded-md text-muted-foreground/40 hover:bg-muted/50 transition-colors border border-transparent hover:border-border/40"
                    aria-label="Previous"
                  >
                    <HugeiconsIcon
                      icon={ArrowLeft01Icon}
                      size={12}
                      strokeWidth={2.5}
                    />
                  </button>
                  <button
                    type="button"
                    className="h-7 w-7 flex items-center justify-center rounded-md bg-primary/10 text-primary border border-primary/20 text-xs font-bold"
                  >
                    1
                  </button>
                  <button
                    type="button"
                    className="h-7 w-7 flex items-center justify-center rounded-md text-muted-foreground/40 hover:bg-muted/50 transition-colors border border-transparent hover:border-border/40"
                    aria-label="Next"
                  >
                    <HugeiconsIcon
                      icon={ArrowRight01Icon}
                      size={12}
                      strokeWidth={2.5}
                    />
                  </button>
                </div>
              </FrameFooter>
            </FramePanel>
          </Frame>
        </section>
      </div>
    </main>
  );
}
