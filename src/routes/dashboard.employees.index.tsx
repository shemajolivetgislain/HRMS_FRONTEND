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
  CallIcon,
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { api } from "@/lib/mock-api";
import { useEmployees } from "@/hooks/use-employees";
import { toast } from "sonner";
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

  const handleTerminate = async (id: string, name: string) => {
    try {
      await api.deleteEmployee(id);
      toast.success(`Contract for ${name} has been formally terminated`);
      window.location.reload();
    } catch (err) {
      toast.error("Failed to process termination");
    }
  };

  return (
    <main className="flex flex-1 flex-col gap-0 overflow-hidden bg-muted/20">
      <DashboardHeader
        category="Organization"
        title="Employees"
        description="Manage and monitor your global workforce directory"
      >
        <Button variant="outline">
          <HugeiconsIcon icon={Download01Icon} />
          Export
        </Button>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            onClick={() => navigate({ to: "/dashboard/employees/resign" })}
          >
            <HugeiconsIcon icon={UserMinus01Icon} />
            Resign
          </Button>
          <Button
            onClick={() => navigate({ to: "/dashboard/employees/onboard" })}
          >
            <HugeiconsIcon
              icon={PlusSignCircleIcon}
            />
            Onboard
          </Button>
        </div>
      </DashboardHeader>

      <div className="flex flex-col gap-6 pb-12 flex-1 overflow-auto no-scrollbar px-4 lg:px-6">
        <section>
          <Frame className="group/frame">
            <FramePanel className="p-0 overflow-hidden bg-card shadow-sm border-border/40">
              <FrameHeader className="border-b-0 pb-2 px-8 pt-8">
                <div>
                  <FrameTitle className="text-xl font-bold">Employee Directory</FrameTitle>
                  <FrameDescription className="text-sm font-medium">
                    Centralized management of workforce profiles and lifecycles
                  </FrameDescription>
                </div>
              </FrameHeader>

              <div className="px-8 pb-6 pt-4 flex flex-col xl:flex-row items-center justify-between gap-4 border-b border-border/5">
                <div className="relative flex-1 w-full max-w-xl">
                  <HugeiconsIcon
                    icon={Search01Icon}
                    className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/40"
                    strokeWidth={2}
                  />
                  <Input
                    placeholder="Search by name, ID or position…"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 h-10 rounded-xl border-border/40 bg-muted/5 focus:bg-background transition-all text-sm"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
                  <Select
                    value={filterDept}
                    onValueChange={(val) => setFilterDept(val || "all")}
                  >
                    <SelectTrigger className="h-10 rounded-xl border-border/40 bg-muted/5 w-full sm:w-48">
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground/40 text-[10px] font-black uppercase tracking-widest">
                          Dept:
                        </span>
                        <SelectValue
                          placeholder="All Units"
                          className="text-sm font-semibold"
                        />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept} className="text-sm font-medium">
                          {dept === "all" ? "All Departments" : dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select
                    value={filterStatus}
                    onValueChange={(val) => setFilterStatus(val || "all")}
                  >
                    <SelectTrigger className="h-10 rounded-xl border-border/40 bg-muted/5 w-full sm:w-40">
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground/40 text-[10px] font-black uppercase tracking-widest">
                          Status:
                        </span>
                        <SelectValue
                          placeholder="State"
                          className="text-sm font-semibold"
                        />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      {statuses.map((status) => (
                        <SelectItem
                          key={status}
                          value={status}
                          className="capitalize text-sm font-medium"
                        >
                          {status === "all" ? "All States" : status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <FrameContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredEmployees.length > 0 ? (
                    filteredEmployees.map((user) => (
                      <div
                        key={user.id}
                        className="group relative flex flex-col p-6 rounded-2xl border border-border/40 bg-muted/5 hover:bg-background hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 animate-in fade-in zoom-in-95"
                      >
                        <div className="absolute top-5 right-5">
                          <DropdownMenu>
                            <DropdownMenuTrigger
                              render={
                                <Button
                                  variant="ghost"
                                  size="icon-sm"
                                  aria-label="Employee actions"
                                >
                                  <HugeiconsIcon
                                    icon={MoreHorizontalIcon}
                                  />
                                </Button>
                              }
                            />
                            <DropdownMenuContent
                              align="end"
                              className="w-52 rounded-2xl border-border/40 shadow-2xl p-2"
                            >
                              <DropdownMenuItem
                                render={
                                  <Link
                                    to="/dashboard/employees/$id"
                                    params={{ id: user.id }}
                                  />
                                }
                                className="rounded-xl py-2.5 font-semibold text-sm"
                              >
                                <HugeiconsIcon
                                  icon={ViewIcon}
                                  className="size-4 mr-3 text-muted-foreground/60"
                                />
                                <span>Profile Details</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="rounded-xl py-2.5 font-semibold text-sm">
                                <HugeiconsIcon
                                  icon={Mail01Icon}
                                  className="size-4 mr-3 text-muted-foreground/60"
                                />
                                <span>Messaging</span>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator className="bg-border/5 my-1" />
                              <AlertDialog>
                                <AlertDialogTrigger render={
                                  <DropdownMenuItem 
                                    onSelect={e => e.preventDefault()} 
                                    className="rounded-xl py-2.5 font-semibold text-sm text-destructive focus:bg-destructive/5"
                                  >
                                    <HugeiconsIcon
                                      icon={Delete02Icon}
                                      className="size-4 mr-3"
                                    />
                                    <span>Terminate</span>
                                  </DropdownMenuItem>
                                } />
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Permanent Termination</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to terminate {user.name}'s employment? This will immediately halt payroll and revoke all system access.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Abort</AlertDialogCancel>
                                    <AlertDialogAction 
                                      onClick={() => handleTerminate(user.id, user.name)} 
                                      className="bg-destructive hover:bg-destructive/90"
                                    >
                                      Finalize Termination
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        <div className="flex items-start gap-4 mb-8">
                          <UserAvatar name={user.name} size="lg" className="h-12 w-12 rounded-xl" />
                          <div className="space-y-1">
                            <h4 className="text-[15px] font-bold text-foreground/90 group-hover:text-primary transition-colors leading-none">
                              {user.name}
                            </h4>
                            <p className="text-xs font-semibold text-muted-foreground/60">
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
                              className="h-5 text-[9px] font-black uppercase tracking-widest mt-1"
                            >
                              {user.status}
                            </Badge>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 gap-2.5 mb-8">
                          <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-muted/5 border border-border/10 group-hover:border-primary/10 transition-colors">
                            <span className="text-[10px] font-black text-muted-foreground/30 uppercase tracking-[0.2em]">ID CODE</span>
                            <span className="text-xs font-bold text-foreground/70 tabular-nums">
                              {user.idNumber.slice(-8)}
                            </span>
                          </div>
                          <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-muted/5 border border-border/10 group-hover:border-primary/10 transition-colors">
                            <span className="text-[10px] font-black text-muted-foreground/30 uppercase tracking-[0.2em]">ORG UNIT</span>
                            <span className="text-xs font-bold text-foreground/70">
                              {user.department}
                            </span>
                          </div>
                        </div>

                        <div className="mt-auto space-y-2">
                          <div className="flex items-center gap-3 text-xs font-semibold text-muted-foreground/60 group-hover:text-foreground/80 transition-colors">
                            <div className="size-6 rounded-lg bg-muted/10 flex items-center justify-center border border-border/5">
                              <HugeiconsIcon icon={Mail01Icon} size={12} />
                            </div>
                            <span className="truncate">{user.email}</span>
                          </div>
                          <div className="flex items-center gap-3 text-xs font-semibold text-muted-foreground/60 group-hover:text-foreground/80 transition-colors">
                            <div className="size-6 rounded-lg bg-muted/10 flex items-center justify-center border border-border/5">
                              <HugeiconsIcon icon={CallIcon} size={12} />
                            </div>
                            <span>{user.phone}</span>
                          </div>
                        </div>

                        {user.onboardingProgress < 100 && (
                          <div className="mt-6 pt-6 border-t border-border/5">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-[10px] font-black text-muted-foreground/40 uppercase tracking-widest">
                                Provisioning
                              </span>
                              <span className="text-[10px] font-bold text-primary tabular-nums">
                                {user.onboardingProgress}%
                              </span>
                            </div>
                            <div className="h-1.5 w-full bg-muted/20 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-primary transition-all duration-1000 ease-out shadow-[0_0_8px_rgba(var(--primary),0.4)]"
                                style={{ width: `${user.onboardingProgress}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full h-80 flex flex-col items-center justify-center text-center space-y-4">
                      <div className="size-16 rounded-3xl bg-muted/5 flex items-center justify-center text-muted-foreground/20 border border-border/5">
                        <HugeiconsIcon icon={Search01Icon} size={32} />
                      </div>
                      <div className="space-y-1">
                        <p className="text-base font-bold text-foreground/80">No results matched</p>
                        <p className="text-sm font-medium text-muted-foreground/40 max-w-xs">
                          Adjust your filters or search term to find what you're looking for.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </FrameContent>

              <FrameFooter className="px-8 py-6 border-t border-border/5 flex items-center justify-between">
                <span className="text-[10px] text-muted-foreground/40 font-black uppercase tracking-[0.25em]">
                  Registry Ledger: {filteredEmployees.length} active records
                </span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="size-8 rounded-lg text-muted-foreground/40 hover:text-primary transition-colors"
                  >
                    <HugeiconsIcon icon={ArrowLeft01Icon} size={14} strokeWidth={2.5} />
                  </Button>
                  <div className="h-8 px-3 rounded-lg bg-primary/10 text-primary border border-primary/20 text-xs font-black flex items-center justify-center">
                    1
                  </div>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="size-8 rounded-lg text-muted-foreground/40 hover:text-primary transition-colors"
                  >
                    <HugeiconsIcon icon={ArrowRight01Icon} size={14} strokeWidth={2.5} />
                  </Button>
                </div>
              </FrameFooter>
            </FramePanel>
          </Frame>
        </section>
      </div>
    </main>
  );
}
