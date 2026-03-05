import { useState } from "react";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Search01Icon,
  PlusSignCircleIcon,
  Download01Icon,
  MoreHorizontalIcon,
  Building03Icon,
  ViewIcon,
  Sorting05Icon,
  UserGroupIcon,
  Shield01Icon,
  ActivityIcon,
  Cancel01Icon,
  Tick01Icon,
  DashboardSquare01Icon,
  Delete01Icon,
} from "@hugeicons/core-free-icons";
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
import { DashboardPending } from "@/components/dashboard/dashboard-pending";
import { StatCard } from "@/components/dashboard/stat-card";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/companies/")({
  loader: async () => await api.getCompanies(),
  pendingComponent: DashboardPending,
  component: CompaniesManagementPage,
});

function CompaniesManagementPage() {
  const companies = Route.useLoaderData();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = companies.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.tin.includes(searchTerm),
  );

  const handleDeleteCompany = async (id: string, name: string) => {
    try {
      await api.deleteCompany(id);
      toast.success(`Organization ${name} has been purged from system records`);
      window.location.reload();
    } catch (err) {
      toast.error("Critical failure during record deletion");
    }
  };

  return (
    <main className="flex flex-1 flex-col gap-0 overflow-hidden bg-muted/20">
      <DashboardHeader
        category="Multi-Tenancy"
        title="Organization Registry"
        description="Manage secure organizational tenants and managed platform access"
      >
        <Button variant="outline">
          <HugeiconsIcon icon={Download01Icon} />
          Export
        </Button>

        <Button
          onClick={() => navigate({ to: "/admin/companies/register" })}
        >
          <HugeiconsIcon icon={PlusSignCircleIcon} />
          Provision New
        </Button>
      </DashboardHeader>

      <div className="flex flex-col gap-6 pb-12 flex-1 overflow-auto no-scrollbar px-4 lg:px-6">
        {/* Admin Quick Stats */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Total Tenants"
            value={companies.length}
            icon={Building03Icon}
            variant="primary"
            sub="Active Organizations"
          />
          <StatCard
            label="Platform Users"
            value="2,840"
            icon={UserGroupIcon}
            variant="info"
            sub="Across all companies"
          />
          <StatCard
            label="System Health"
            value="99.9%"
            icon={Shield01Icon}
            variant="success"
            sub="Operational"
          />
          <StatCard
            label="API Traffic"
            value="1.2M"
            change="12%"
            up
            icon={ActivityIcon}
            variant="accent"
            sub="Last 24 hours"
          />
        </section>

        <section>
          <Frame className="group/frame">
            <FramePanel className="p-0 overflow-hidden bg-card">
              <FrameHeader className="border-b-0 pb-2 px-8 pt-8">
                <div>
                  <FrameTitle className="text-xl font-bold">Tenant Directory</FrameTitle>
                  <FrameDescription className="text-sm font-medium">
                    All active and pending company accounts
                  </FrameDescription>
                </div>
              </FrameHeader>

              <div className="px-8 pb-6 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-border/5">
                <div className="relative flex-1 w-full max-w-md">
                  <HugeiconsIcon
                    icon={Search01Icon}
                    className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/40"
                    strokeWidth={2}
                  />
                  <Input
                    placeholder="Search by name or TIN…"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 h-10 rounded-xl border-border/40 bg-muted/5 focus:bg-background transition-all text-sm"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <HugeiconsIcon icon={Sorting05Icon} />
                    Filter by Sector
                  </Button>
                </div>
              </div>

              <FrameContent className="p-0">
                <Table>
                  <TableHeader className="bg-muted/5">
                    <TableRow className="hover:bg-transparent border-border/5">
                      <TableHead className="text-[10px] font-bold text-muted-foreground/40 capitalize tracking-widest pl-8 py-3">
                        Organization
                      </TableHead>
                      <TableHead className="text-[10px] font-bold text-muted-foreground/40 capitalize tracking-widest px-4 py-3">
                        Registry (TIN)
                      </TableHead>
                      <TableHead className="text-[10px] font-bold text-muted-foreground/40 capitalize tracking-widest px-4 py-3">
                        Vertical
                      </TableHead>
                      <TableHead className="text-[10px] font-bold text-muted-foreground/40 capitalize tracking-widest px-4 py-3 text-center">
                        Headcount
                      </TableHead>
                      <TableHead className="text-[10px] font-bold text-muted-foreground/40 capitalize tracking-widest px-4 py-3">
                        Security Status
                      </TableHead>
                      <TableHead className="text-[10px] font-bold text-muted-foreground/40 capitalize tracking-widest px-4 py-3 text-right pr-8">
                        Management
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.map((company) => (
                      <TableRow
                        key={company.id}
                        className="border-border/5 hover:bg-muted/5 transition-colors group"
                      >
                        <TableCell className="pl-8 py-5">
                          <div className="flex items-center gap-4">
                            <div className="h-11 w-11 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-center text-primary group-hover:scale-105 transition-all duration-500">
                              <HugeiconsIcon icon={Building03Icon} size={22} />
                            </div>
                            <div>
                              <p className="text-base font-bold text-foreground/90 leading-none">
                                {company.name}
                              </p>
                              <p className="text-xs font-semibold text-muted-foreground/40 mt-1.5">
                                {company.email}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="px-4">
                          <span className="text-sm font-bold text-foreground/60 tabular-nums">
                            {company.tin}
                          </span>
                        </TableCell>
                        <TableCell className="px-4">
                          <Badge
                            variant="muted"
                            className="bg-muted/10 border-none font-bold text-[10px] uppercase tracking-widest"
                          >
                            {company.sector}
                          </Badge>
                        </TableCell>
                        <TableCell className="px-4 text-center">
                          <span className="text-sm font-bold text-foreground/80 tabular-nums">
                            {company.employeeCount}
                          </span>
                        </TableCell>
                        <TableCell className="px-4">
                          <Badge
                            variant={
                              company.status === "active"
                                ? "success"
                                : "destructive"
                            }
                            showDot
                            className="font-bold text-[10px] uppercase tracking-widest"
                          >
                            {company.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right pr-8">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              render={
                                <Link
                                  to="/admin/companies/$id"
                                  params={{ id: company.id }}
                                />
                              }
                            >
                              Details
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger
                                render={
                                  <Button
                                    variant="ghost"
                                    size="icon-sm"
                                  >
                                    <HugeiconsIcon
                                      icon={MoreHorizontalIcon}
                                    />
                                  </Button>
                                }
                              />
                              <DropdownMenuContent
                                align="end"
                                className="w-56 rounded-2xl border-border/40 shadow-2xl p-2"
                              >
                                <DropdownMenuItem
                                  render={
                                    <Link
                                      to="/admin/companies/$id"
                                      params={{ id: company.id }}
                                    />
                                  }
                                  className="rounded-xl py-1.5 font-semibold text-sm"
                                >
                                  <HugeiconsIcon
                                    icon={ViewIcon}
                                    className="size-4 mr-3 text-muted-foreground/60"
                                  />
                                  <span>Registry Profile</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  render={<Link to="/dashboard" />}
                                  className="rounded-xl py-1.5 font-semibold text-sm"
                                >
                                  <HugeiconsIcon
                                    icon={DashboardSquare01Icon}
                                    className="size-4 mr-3 text-muted-foreground/60"
                                  />
                                  <span>Operations Board</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className="bg-border/5 my-1" />
                                {company.status === "active" ? (
                                  <DropdownMenuItem className="rounded-xl py-1.5 font-semibold text-sm text-warning focus:bg-warning/5">
                                    <HugeiconsIcon
                                      icon={Cancel01Icon}
                                      className="size-4 mr-3"
                                    />
                                    <span>Suspend Tenant</span>
                                  </DropdownMenuItem>
                                ) : (
                                  <DropdownMenuItem className="rounded-xl py-1.5 font-semibold text-sm text-success focus:bg-success/5">
                                    <HugeiconsIcon
                                      icon={Tick01Icon}
                                      className="size-4 mr-3"
                                    />
                                    <span>Restore Tenant</span>
                                  </DropdownMenuItem>
                                )}
                                <AlertDialog>
                                  <AlertDialogTrigger render={
                                    <DropdownMenuItem onSelect={e => e.preventDefault()} className="rounded-xl py-1.5 font-semibold text-sm text-destructive focus:bg-destructive/5">
                                      <HugeiconsIcon
                                        icon={Delete01Icon}
                                        className="size-4 mr-3"
                                      />
                                      <span>Purge Organization</span>
                                    </DropdownMenuItem>
                                  } />
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Critical Action: Purge Record</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        You are about to permanently delete {company.name} and all associated metadata. This operation is recorded in the immutable security audit log.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction onClick={() => handleDeleteCompany(company.id, company.name)} className="bg-destructive hover:bg-destructive/90">
                                        Confirm Purge
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </FrameContent>
              <FrameFooter className="px-8 py-5 border-t border-border/5">
                <span className="text-[10px] text-muted-foreground/40 font-bold uppercase tracking-[0.2em]">
                  Registry Ledger: {filtered.length} active organizational units
                </span>
              </FrameFooter>
            </FramePanel>
          </Frame>
        </section>
      </div>
    </main>
  );
}
