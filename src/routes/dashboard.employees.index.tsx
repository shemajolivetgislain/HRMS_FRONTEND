import React from "react";
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
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Search01Icon,
  PlusSignCircleIcon,
  Download01Icon,
  MoreHorizontalIcon,
  Mail01Icon,
  LockPasswordIcon,
  Delete02Icon,
  ViewIcon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  UserGroupIcon,
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
    rowsPerPage,
    setRowsPerPage,
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
          className="text-[12px] font-bold shadow-sm gap-2 capitalize"
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
                  <p className="text-[11px] font-bold text-muted-foreground/30 capitalize tracking-widest mr-2">
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
                      <span className="text-muted-foreground/40 text-[10px] font-bold uppercase tracking-wider">
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
                      <span className="text-muted-foreground/40 text-[10px] font-bold uppercase tracking-wider">
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

              {selectedIds.size > 0 ? (
                <div className="px-6 py-3 bg-primary/[0.02] border-b border-primary/10 flex items-center justify-between animate-in fade-in slide-in-from-top-1 duration-200">
                  <div className="flex items-center gap-3">
                    <Badge variant="accent" className="h-6 px-2.5 rounded-md">
                      {selectedIds.size} Selected
                    </Badge>
                    <p className="text-[11px] font-medium text-primary/60">
                      Bulk actions available for selected records
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 px-3 rounded-lg border-primary/20 text-primary text-[11px] font-bold hover:bg-primary/5"
                    >
                      <HugeiconsIcon
                        icon={Mail01Icon}
                        className="size-3.5 mr-1.5"
                      />
                      Email
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 px-3 rounded-lg border-destructive/20 text-destructive hover:text-destructive hover:bg-destructive/5 text-[11px] font-bold"
                    >
                      <HugeiconsIcon
                        icon={Delete02Icon}
                        className="size-3.5 mr-1.5"
                      />
                      Deactivate
                    </Button>
                  </div>
                </div>
              ) : null}

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
                      <TableHead className="text-[11px] font-bold text-muted-foreground/40 capitalize tracking-widest px-2">
                        Employee
                      </TableHead>
                      <TableHead className="text-[11px] font-bold text-muted-foreground/40 capitalize tracking-widest px-2">
                        Department
                      </TableHead>
                      <TableHead className="text-[11px] font-bold text-muted-foreground/40 capitalize tracking-widest px-2">
                        Position
                      </TableHead>
                      <TableHead className="text-[11px] font-bold text-muted-foreground/40 capitalize tracking-widest px-2">
                        Status
                      </TableHead>
                      <TableHead className="text-[11px] font-bold text-muted-foreground/40 capitalize tracking-widest px-2 text-right pr-6">
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
                            <UserAvatar
                              name={user.name}
                              email={user.email}
                              size="sm"
                            />
                          </TableCell>
                          <TableCell className="px-2">
                            <span className="text-[13px] font-medium text-foreground/70">
                              {user.department}
                            </span>
                          </TableCell>
                          <TableCell className="px-2">
                            <span className="text-[13px] font-medium text-muted-foreground/70">
                              {user.position}
                            </span>
                          </TableCell>
                          <TableCell className="px-2">
                            <Badge
                              variant={
                                user.status === "active"
                                  ? "success"
                                  : user.status === "pending"
                                    ? "warning"
                                    : "destructive"
                              }
                              showDot
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
                                    className="rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
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
                                <DropdownMenuItem>
                                  <HugeiconsIcon
                                    icon={LockPasswordIcon}
                                    className="size-4 mr-2"
                                  />
                                  <span>Reset Access</span>
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
                        <TableCell
                          colSpan={6}
                          className="h-[300px] text-center"
                        >
                          <div className="flex flex-col items-center justify-center gap-3">
                            <div className="h-12 w-12 rounded-2xl bg-muted/10 flex items-center justify-center">
                              <HugeiconsIcon
                                icon={UserGroupIcon}
                                className="size-6 text-muted-foreground/20"
                                strokeWidth={1.5}
                              />
                            </div>
                            <div className="space-y-1">
                              <p className="text-[13px] font-semibold text-foreground/70">
                                No employees found
                              </p>
                              <p className="text-[11px] text-muted-foreground/50 max-w-[200px] mx-auto">
                                We couldn't find any records matching your
                                current search or filters.
                              </p>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSearchTerm("");
                                setFilterDept("all");
                                setFilterStatus("all");
                              }}
                              className="h-8 px-3 rounded-lg border-border/40 text-[11px] font-bold mt-2"
                            >
                              Reset Filters
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </FrameContent>

              <FrameFooter className="flex items-center justify-between border-t border-border/5">
                <div className="flex items-center gap-6">
                  <span className="text-[10px] text-muted-foreground/40 font-bold capitalize tracking-widest">
                    {filteredEmployees.length} Employees Total
                  </span>

                  <div className="flex items-center gap-2 border-l border-border/5 pl-6">
                    <span className="text-[10px] text-muted-foreground/40 font-bold capitalize tracking-widest">
                      Rows:
                    </span>
                    <Select
                      value={rowsPerPage}
                      onValueChange={(val) => val && setRowsPerPage(val)}
                    >
                      <SelectTrigger className="h-7 w-[70px] rounded-md border-border/40 bg-transparent text-[10px] font-bold shadow-none">
                        <SelectValue placeholder="10" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="20">20</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <div className="text-[10px] text-muted-foreground/40 font-bold capitalize tracking-widest mr-4">
                    Page {currentPage} of 1
                  </div>
                  <button 
                    className="h-7 w-7 flex items-center justify-center rounded-md text-muted-foreground/40 hover:bg-muted/50 hover:text-foreground transition-colors border border-transparent hover:border-border/40"
                    aria-label="Previous page"
                  >
                    <HugeiconsIcon
                      icon={ArrowLeft01Icon}
                      size={12}
                      strokeWidth={2.5}
                    />
                  </button>
                  {[1].map((p) => (
                    <button
                      key={p}
                      className={`h-7 w-7 flex items-center justify-center rounded-md text-[10px] font-bold transition-all
                        ${
                          p === currentPage
                            ? "bg-primary/10 text-primary border border-primary/20"
                            : "text-muted-foreground/40 hover:bg-muted/50 hover:text-foreground border border-transparent hover:border-border/40"
                        }`}
                      aria-label={`Page ${p}`}
                      aria-current={p === currentPage ? "page" : undefined}
                    >
                      {p}
                    </button>
                  ))}
                  <button 
                    className="h-7 w-7 flex items-center justify-center rounded-md text-muted-foreground/40 hover:bg-muted/50 hover:text-foreground transition-colors border border-transparent hover:border-border/40"
                    aria-label="Next page"
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
