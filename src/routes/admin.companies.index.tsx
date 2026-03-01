import { useState } from "react";
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
  PencilEdit02Icon,
  Cancel01Icon,
  Tick01Icon,
  DashboardSquare01Icon,
} from "@hugeicons/core-free-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { api } from "@/lib/mock-api";
import { DashboardPending } from "@/components/dashboard/dashboard-pending";
import { StatCard } from "@/components/dashboard/stat-card";

export const Route = createFileRoute("/admin/companies/")({
  loader: async () => await api.getCompanies(),
  pendingComponent: DashboardPending,
  component: CompaniesManagementPage,
});

function CompaniesManagementPage() {
  const companies = Route.useLoaderData();
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filtered = companies.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.tin.includes(searchTerm)
  );

  return (
    <main className="flex flex-1 flex-col gap-0 overflow-hidden">
      <DashboardHeader
        category="Multi-Tenancy"
        title="Registered Companies"
        description="Manage organizational tenants and platform access"
      >
        <Button
          variant="outline"
          size="lg"
          className="text-xs font-semibold border-border/60 shadow-none hover:bg-muted/50 gap-2 capitalize"
        >
          <HugeiconsIcon icon={Download01Icon} size={14} strokeWidth={2} />
          Export Data
        </Button>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger
            render={
              <Button
                size="lg"
                className="text-xs font-bold gap-2 capitalize"
              >
                <HugeiconsIcon icon={PlusSignCircleIcon} size={14} strokeWidth={2} />
                Register New
              </Button>
            }
          />
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Register New Company</DialogTitle>
              <DialogDescription>
                Onboard a new organization to the HRMS platform.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Company Name</Label>
                  <Input id="name" placeholder="e.g. Igihe Logistics" className="h-9" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tin">TIN Number</Label>
                  <Input id="tin" placeholder="123456789" className="h-9" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sector">Sector</Label>
                  <Select defaultValue="Logistics">
                    <SelectTrigger id="sector" className="h-9 w-full">
                      <SelectValue placeholder="Select sector" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Logistics">Logistics</SelectItem>
                      <SelectItem value="Technology">Technology</SelectItem>
                      <SelectItem value="Finance">Finance</SelectItem>
                      <SelectItem value="Hospitality">Hospitality</SelectItem>
                      <SelectItem value="Healthcare">Healthcare</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Primary Email</Label>
                  <Input id="email" type="email" placeholder="hr@company.com" className="h-9" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tel">Telephone</Label>
                  <Input id="tel" placeholder="+250..." className="h-9" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Unique Password</Label>
                  <Input id="password" type="password" placeholder="••••••••" className="h-9" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Initial Status</Label>
                <Select defaultValue="active">
                  <SelectTrigger id="status" className="h-9 w-full">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button type="submit" onClick={() => setIsDialogOpen(false)}>Register Company</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DashboardHeader>

      <div className="flex flex-col gap-6 pb-12 flex-1 overflow-auto no-scrollbar px-4 lg:px-6">
        {/* Admin Quick Stats */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard label="Total Tenants" value={companies.length} icon={Building03Icon} variant="primary" sub="Active Organizations" />
          <StatCard label="Platform Users" value="2,840" icon={UserGroupIcon} variant="info" sub="Across all companies" />
          <StatCard label="System Health" value="99.9%" icon={Shield01Icon} variant="success" sub="Operational" />
        </section>

        <section>
          <Frame className="group/frame">
            <FramePanel className="p-0 overflow-hidden bg-card">
              <FrameHeader className="border-b-0 pb-2">
                <div>
                  <FrameTitle>Tenant Directory</FrameTitle>
                  <FrameDescription>
                    All active and pending company accounts
                  </FrameDescription>
                </div>
              </FrameHeader>

              <div className="px-6 pb-5 pt-2 flex flex-col sm:flex-row items-center gap-3 border-b border-border/5">
                <div className="relative flex-1 w-full max-w-md">
                  <HugeiconsIcon
                    icon={Search01Icon}
                    className="absolute left-3 top-2.5 size-4 text-muted-foreground/40"
                    strokeWidth={2}
                  />
                  <Input
                    placeholder="Search by name or TIN…"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 h-9 rounded-lg border-border/40 bg-muted/5 focus:bg-background transition-all text-xs"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="gap-2 font-bold text-xs">
                    <HugeiconsIcon icon={Sorting05Icon} size={14} />
                    Sector
                  </Button>
                </div>
              </div>

              <FrameContent className="p-0">
                <Table>
                  <TableHeader className="bg-muted/10">
                    <TableRow className="hover:bg-transparent border-border/5">
                      <TableHead className="text-xs font-bold text-muted-foreground/40 capitalize tracking-widest pl-6">Company</TableHead>
                      <TableHead className="text-xs font-bold text-muted-foreground/40 capitalize tracking-widest px-2">TIN Number</TableHead>
                      <TableHead className="text-xs font-bold text-muted-foreground/40 capitalize tracking-widest px-2">Sector</TableHead>
                      <TableHead className="text-xs font-bold text-muted-foreground/40 capitalize tracking-widest px-2 text-center">Employees</TableHead>
                      <TableHead className="text-xs font-bold text-muted-foreground/40 capitalize tracking-widest px-2">Status</TableHead>
                      <TableHead className="text-xs font-bold text-muted-foreground/40 capitalize tracking-widest px-2 text-right pr-6">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.map((company) => (
                      <TableRow key={company.id} className="border-border/5 hover:bg-muted/5 transition-colors group">
                        <TableCell className="pl-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                              <HugeiconsIcon icon={Building03Icon} size={20} />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-foreground/90 leading-none">{company.name}</p>
                              <p className="text-xs font-medium text-muted-foreground/40 mt-1">{company.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="px-2">
                          <span className="text-xs font-bold text-foreground/60 tabular-nums">{company.tin}</span>
                        </TableCell>
                        <TableCell className="px-2">
                          <Badge variant="muted" className="bg-muted/10 border-none font-bold text-xs uppercase tracking-wider">
                            {company.sector}
                          </Badge>
                        </TableCell>
                        <TableCell className="px-2 text-center">
                          <span className="text-sm font-bold text-foreground/80 tabular-nums">{company.employeeCount}</span>
                        </TableCell>
                        <TableCell className="px-2">
                          <Badge variant={company.status === "active" ? "success" : "destructive"} showDot>
                            {company.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right pr-6">
                          <DropdownMenu>
                            <DropdownMenuTrigger
                              render={
                                <Button variant="ghost" size="icon-sm" className="rounded-lg bg-muted/20 hover:bg-muted hover:text-foreground transition-all border border-border/5 shadow-xs">
                                  <HugeiconsIcon icon={MoreHorizontalIcon} size={16} className="text-muted-foreground/60" />
                                </Button>
                              }
                            />
                            <DropdownMenuContent align="end" className="w-52 rounded-xl border-border/40 shadow-xl">
                              <DropdownMenuItem render={<Link to="/admin/companies/$id" params={{ id: company.id }} />}>
                                <HugeiconsIcon icon={ViewIcon} className="size-4 mr-2" />
                                <span>View Details</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem render={<Link to="/dashboard" />}>
                                <HugeiconsIcon icon={DashboardSquare01Icon} className="size-4 mr-2" />
                                <span>Go to Dashboard</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <HugeiconsIcon icon={PencilEdit02Icon} className="size-4 mr-2" />
                                <span>Edit Profile</span>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator className="bg-border/5" />
                              {company.status === "active" ? (
                                <DropdownMenuItem className="text-destructive focus:bg-destructive/10">
                                  <HugeiconsIcon icon={Cancel01Icon} className="size-4 mr-2" />
                                  <span>Suspend Tenant</span>
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem className="text-success focus:bg-success/10">
                                  <HugeiconsIcon icon={Tick01Icon} className="size-4 mr-2" />
                                  <span>Activate Tenant</span>
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </FrameContent>
              <FrameFooter>
                <span className="text-xs text-muted-foreground/40 font-bold capitalize tracking-widest">
                  Showing {filtered.length} organizations
                </span>
              </FrameFooter>
            </FramePanel>
          </Frame>
        </section>
      </div>
    </main>
  );
}
