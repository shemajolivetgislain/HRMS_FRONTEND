import { createFileRoute, Link } from "@tanstack/react-router";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { UserAvatar } from "@/components/dashboard/user-avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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
  const {
    searchTerm,
    setSearchTerm,
    filterDept,
    setFilterDept,
    filterStatus,
    setFilterStatus,
    selectedIds,
    currentPage,
    filteredEmployees,
    departments,
    statuses,
    toggleSelectAll,
    toggleSelect,
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
          className="text-[12px] font-semibold border-border/60 shadow-none hover:bg-muted/50 gap-2 capitalize"
        >
          <HugeiconsIcon icon={Download01Icon} size={14} strokeWidth={2} />
          Export List
        </Button>
        <Button
          size="lg"
          className="text-[12px] font-bold gap-2 capitalize"
        >
          <HugeiconsIcon icon={PlusSignCircleIcon} size={14} strokeWidth={2} />
          Add Employee
        </Button>
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

              <FrameContent className="p-0">
                <Table>
                  <TableHeader className="bg-muted/10">
                    <TableRow className="hover:bg-transparent border-border/5">
                      <TableHead className="w-[48px] px-6">
                        <Checkbox
                          checked={
                            selectedIds.size === filteredEmployees.length &&
                            filteredEmployees.length > 0
                          }
                          onCheckedChange={toggleSelectAll}
                          className="size-4 rounded-sm border-border/60"
                        />
                      </TableHead>
                      <TableHead className="text-xs font-bold text-muted-foreground/40 capitalize tracking-widest px-2">
                        Employee
                      </TableHead>
                      <TableHead className="text-xs font-bold text-muted-foreground/40 capitalize tracking-widest px-2">
                        Compliance
                      </TableHead>
                      <TableHead className="text-xs font-bold text-muted-foreground/40 capitalize tracking-widest px-2">
                        Onboarding
                      </TableHead>
                      <TableHead className="text-xs font-bold text-muted-foreground/40 capitalize tracking-widest px-2">
                        Status
                      </TableHead>
                      <TableHead className="text-xs font-bold text-muted-foreground/40 capitalize tracking-widest px-2 text-right pr-6">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEmployees.length > 0 ? (
                      filteredEmployees.map((user) => (
                        <TableRow
                          key={user.id}
                          className="border-border/5 hover:bg-muted/5 transition-colors group"
                        >
                          <TableCell className="px-6">
                            <Checkbox
                              checked={selectedIds.has(user.id)}
                              onCheckedChange={() => toggleSelect(user.id)}
                              className="size-4 rounded-sm border-border/60"
                            />
                          </TableCell>
                          <TableCell className="px-2 py-4">
                            <div className="flex items-center gap-3">
                              <UserAvatar
                                name={user.name}
                                size="sm"
                              />
                              <div className="hidden sm:block">
                                <p className="text-sm font-semibold text-foreground/90">{user.name}</p>
                                <p className="text-xs text-muted-foreground/50">{user.department}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="px-2">
                            <Badge
                              variant={user.complianceStatus === "compliant" ? "success" : "destructive"}
                              showDot
                              className="h-5 rounded-md"
                            >
                              {user.complianceStatus}
                            </Badge>
                          </TableCell>
                          <TableCell className="px-2">
                            <div className="w-24 space-y-1.5">
                              <div className="flex items-center justify-between text-[9px] font-bold text-muted-foreground/40 uppercase">
                                <span>Track</span>
                                <span>{user.onboardingProgress}%</span>
                              </div>
                              <Progress value={user.onboardingProgress} className="h-1" />
                            </div>
                          </TableCell>
                          <TableCell className="px-2">
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
                              className="capitalize"
                            >
                              {user.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right pr-6">
                            <DropdownMenu>
                              <DropdownMenuTrigger
                                render={
                                  <Button
                                    variant="ghost"
                                    size="icon-sm"
                                    className="rounded-lg   transition-opacity"
                                    aria-label="Employee actions"
                                  >
                                    <HugeiconsIcon
                                      icon={MoreHorizontalIcon}
                                      className="size-4 opacity-50"
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
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="h-[300px] text-center">
                          <p className="text-sm text-muted-foreground">No employees found</p>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </FrameContent>

              <FrameFooter className="flex items-center justify-between border-t border-border/5">
                <span className="text-xs text-muted-foreground/40 font-bold capitalize tracking-widest">
                  {filteredEmployees.length} Records Total
                </span>
                <div className="flex items-center gap-1.5">
                  <button className="h-7 w-7 flex items-center justify-center rounded-md text-muted-foreground/40 hover:bg-muted/50 transition-colors border border-transparent hover:border-border/40" aria-label="Previous">
                    <HugeiconsIcon icon={ArrowLeft01Icon} size={12} strokeWidth={2.5} />
                  </button>
                  <button className="h-7 w-7 flex items-center justify-center rounded-md bg-primary/10 text-primary border border-primary/20 text-xs font-bold">1</button>
                  <button className="h-7 w-7 flex items-center justify-center rounded-md text-muted-foreground/40 hover:bg-muted/50 transition-colors border border-transparent hover:border-border/40" aria-label="Next">
                    <HugeiconsIcon icon={ArrowRight01Icon} size={12} strokeWidth={2.5} />
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
