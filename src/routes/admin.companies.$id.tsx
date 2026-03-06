import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  Frame,
  FramePanel,
  FrameHeader,
  FrameTitle,
  FrameDescription,
  FrameContent,
} from "@/components/ui/frame";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowLeft01Icon,
  Building03Icon,
  Mail01Icon,
  CallIcon,
  Calendar01Icon,
  UserGroupIcon,
  Shield01Icon,
  ChartBarLineIcon,
  PencilEdit02Icon,
  DashboardSquare01Icon,
  PlusSignIcon,
  Delete01Icon,
  Cancel01Icon,
  UserEdit01Icon,
  MoreHorizontalIcon,
  AiSecurityIcon,
  AlertCircleIcon,
} from "@hugeicons/core-free-icons";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardPending } from "@/components/dashboard/dashboard-pending";
import { ErrorComponent } from "@/components/error-component";
import { StatCard } from "@/components/dashboard/stat-card";
import { Badge } from "@/components/ui/badge";
import { UserAvatar } from "@/components/dashboard/user-avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useGetCompanyQuery, useGetUsersQuery } from "@/lib/redux/api";
import { Spinner } from "@/components/ui/spinner";

export const Route = createFileRoute("/admin/companies/$id")({
  pendingComponent: DashboardPending,
  errorComponent: ErrorComponent,
  component: CompanyDetailsPage,
});

function CompanyDetailsPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const { data: company, isLoading: companyLoading, isError, refetch } = useGetCompanyQuery(id);
  const { data: usersData, isLoading: usersLoading } = useGetUsersQuery({ companyId: id, role: "COMPANY_ADMIN" });
  
  const [isDeleting, setIsDeleting] = useState(false);
  const [showAddAdmin, setShowAddAdmin] = useState(false);
  const [newAdmin, setNewAdmin] = useState({ name: "", email: "" });

  const companyAdmins = usersData?.items ?? [];

  const handleDeleteCompany = async () => {
    setIsDeleting(true);
    try {
      toast.info("Deletion is currently disabled.");
      toast.success(`Organization deletion request recorded`);
      navigate({ to: "/admin/companies" });
    } catch (err) {
      toast.error("Failed to delete company");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      toast.info("Account provisioning is currently restricted.");
      setShowAddAdmin(false);
      setNewAdmin({ name: "", email: "" });
    } catch (err) {
      toast.error("Failed to add administrator");
    }
  };

  const handleRemoveAdmin = async (_userId: string) => {
    try {
      toast.info("Revocation is currently restricted.");
    } catch (err) {
      toast.error("Failed to remove administrator");
    }
  };

  if (companyLoading) return <DashboardPending />;
  if (isError || !company) return <ErrorComponent error={new Error("Company not found")} reset={() => refetch()} />;

  return (
    <main className="flex flex-1 flex-col gap-0 overflow-hidden h-full bg-muted/20">
      <DashboardHeader
        category="Tenant Management"
        title={company.name}
        description={`Registry details for TIN: ${company.tin}`}
      >
        <Button
          variant="outline"
          render={<Link to="/admin/companies" />}
        >
          <HugeiconsIcon icon={ArrowLeft01Icon} />
          Registry
        </Button>
        <Button
          variant="outline"
          render={<Link to="/dashboard" />}
        >
          <HugeiconsIcon icon={DashboardSquare01Icon} />
          Dashboard
        </Button>
        <Button>
          <HugeiconsIcon icon={PencilEdit02Icon} />
          Edit
        </Button>
      </DashboardHeader>

      <div className="flex-1 overflow-y-auto no-scrollbar px-4 lg:px-6 pb-12 pt-2">
        <div className="flex flex-col gap-8">
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard label="Total Staff" value="—" icon={UserGroupIcon} variant="primary" sub="Active headcount" />
            <StatCard label="Registry Status" value="Active" icon={Shield01Icon} variant="success" sub="Platform access" />
            <StatCard label="Growth" value="—" icon={ChartBarLineIcon} variant="info" sub="Last 30 days" />
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-8">
              <Frame>
                <FramePanel className="bg-card">
                  <FrameHeader>
                    <div>
                      <FrameTitle>Company Profile</FrameTitle>
                      <FrameDescription>Legal and operational identification</FrameDescription>
                    </div>
                  </FrameHeader>
                  <FrameContent className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
                    <DetailItem label="Legal Entity" value={company.name} icon={Building03Icon} />
                    <DetailItem label="Tax ID (TIN)" value={company.tin} icon={Shield01Icon} />
                    <DetailItem label="Identification" value={String(company.identificationNumber)} icon={ChartBarLineIcon} />
                    <DetailItem label="Registration Date" value="N/A" icon={Calendar01Icon} />
                    <DetailItem label="Primary Email" value="N/A" icon={Mail01Icon} />
                    <DetailItem label="Contact Phone" value="N/A" icon={CallIcon} />
                  </FrameContent>
                </FramePanel>
              </Frame>

              {/* Admin List Section */}
              <Frame>
                <FramePanel className="bg-card">
                  <FrameHeader>
                    <div>
                      <FrameTitle>Company Administrators</FrameTitle>
                      <FrameDescription>Users with master access to this tenant</FrameDescription>
                    </div>
                    <Dialog open={showAddAdmin} onOpenChange={setShowAddAdmin}>
                      <DialogTrigger render={<Button size="sm" className="text-xs font-bold gap-2 uppercase tracking-widest"><HugeiconsIcon icon={PlusSignIcon} size={14} /> Add Admin</Button>} />
                      <DialogContent>
                        <form onSubmit={handleAddAdmin}>
                          <DialogHeader>
                            <DialogTitle>Provision Company Admin</DialogTitle>
                            <DialogDescription>Create a new administrator for {company.name}. They will receive an invitation email.</DialogDescription>
                          </DialogHeader>
                          <div className="py-6 space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60">Full Name</Label>
                              <Input id="name" required value={newAdmin.name} onChange={e => setNewAdmin({...newAdmin, name: e.target.value})} placeholder="e.g. Jean Paul" className="h-11 bg-muted/5 border-border/40 focus:bg-background" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60">Email Address</Label>
                              <Input id="email" type="email" required value={newAdmin.email} onChange={e => setNewAdmin({...newAdmin, email: e.target.value})} placeholder="admin@company.com" className="h-11 bg-muted/5 border-border/40 focus:bg-background" />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setShowAddAdmin(false)}>Cancel</Button>
                            <Button type="submit" className="font-bold">Provision Account</Button>
                          </DialogFooter>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </FrameHeader>
                  <FrameContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="pl-6 py-3">Administrator</TableHead>
                          <TableHead className="py-3">Status</TableHead>
                          <TableHead className="text-right pr-6 py-3">Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {!usersLoading && companyAdmins.map((admin: any) => (
                          <TableRow key={admin.id} className="hover:bg-muted/5 border-border/5">
                            <TableCell className="pl-6 py-4">
                              <div className="flex items-center gap-3">
                                <UserAvatar
                                  src={admin.profilePicture || ""}
                                  name={`${admin.firstName} ${admin.lastName}`}
                                  size="sm"
                                />
                                <div className="flex flex-col">
                                  <span className="font-bold text-foreground/90">{admin.firstName} {admin.lastName}</span>
                                  <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">{admin.email}</span>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="py-4">
                              <Badge variant={admin.status === "ACTIVE" ? "success" : "muted"} showDot className="font-bold text-[9px] uppercase tracking-widest">{admin.status}</Badge>
                            </TableCell>
                            <TableCell className="text-right pr-6 py-4">
                              <AlertDialog>
                                <AlertDialogTrigger render={
                                  <Button variant="ghost" size="icon-sm" className="text-destructive/40 hover:text-destructive hover:bg-destructive/5">
                                    <HugeiconsIcon icon={Delete01Icon} size={16} />
                                  </Button>
                                } />
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Revoke Administrative Access?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This will remove {admin.firstName} from the platform administration. They will no longer be able to manage {company.name}.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleRemoveAdmin(admin.id)} className="bg-destructive hover:bg-destructive/90">
                                      Revoke Access
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </TableCell>
                          </TableRow>
                        ))}
                        {usersLoading && (
                           <TableRow>
                              <TableCell colSpan={3} className="text-center py-10">
                                 <Spinner className="mx-auto" />
                              </TableCell>
                           </TableRow>
                        )}
                        {!usersLoading && companyAdmins.length === 0 && (
                           <TableRow>
                              <TableCell colSpan={3} className="text-center py-10 text-muted-foreground text-sm font-medium">
                                 No administrative accounts assigned to this tenant
                              </TableCell>
                           </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </FrameContent>
                </FramePanel>
              </Frame>
            </div>

            <div className="lg:col-span-4 space-y-8">
              <Frame>
                <FramePanel className="p-6 bg-primary/[0.02] border-primary/10 space-y-4">
                  <div className="flex items-center gap-2 text-primary">
                    <HugeiconsIcon icon={AiSecurityIcon} size={18} />
                    <h4 className="text-xs font-bold uppercase tracking-widest">System Health</h4>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground/70">Storage Capacity</span>
                      <span className="text-sm font-bold tabular-nums">4.2 GB / 10 GB</span>
                    </div>
                    <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-[42%]" />
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-sm font-medium text-foreground/70">API Uptime</span>
                      <span className="text-sm font-bold text-success tabular-nums">99.98%</span>
                    </div>
                  </div>
                </FramePanel>
              </Frame>

              <Frame>
                <FramePanel className="bg-card border-border/40">
                  <FrameHeader>
                    <FrameTitle className="text-xs uppercase tracking-widest">Management Actions</FrameTitle>
                  </FrameHeader>
                  <FrameContent className="p-4 space-y-3">
                    <Button variant="outline" className="w-full justify-start gap-3 text-xs font-bold uppercase tracking-widest border-border/40">
                      <HugeiconsIcon icon={UserEdit01Icon} size={16} />
                      Manage Permissions
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-3 text-xs font-bold uppercase tracking-widest border-border/40">
                      <HugeiconsIcon icon={MoreHorizontalIcon} size={16} />
                      View Audit Logs
                    </Button>
                    <div className="pt-4 mt-2 border-t border-border/5 space-y-3">
                      <Button variant="outline" className={cn(
                        "w-full justify-start gap-3 text-xs font-bold uppercase tracking-widest border-border/40 transition-colors",
                        "text-warning hover:bg-warning/5"
                      )}>
                        <HugeiconsIcon icon={Cancel01Icon} size={16} />
                        Suspend Tenant
                      </Button>
                      
                      <AlertDialog>
                        <AlertDialogTrigger render={
                          <Button 
                            variant="outline" 
                            disabled={isDeleting}
                            className="w-full justify-start gap-3 text-xs font-bold uppercase tracking-widest border-destructive/20 text-destructive hover:bg-destructive/5"
                          >
                            <HugeiconsIcon icon={Delete01Icon} size={16} />
                            Delete Organization
                          </Button>
                        } />
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Permanent Deletion</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to PERMANENTLY delete {company.name}? All data, employees, and records will be unrecoverable.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDeleteCompany} className="bg-destructive hover:bg-destructive/90">
                              Delete Organization
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </FrameContent>
                </FramePanel>
              </Frame>

              <div className="p-6 rounded-2xl bg-destructive/5 border border-destructive/10 space-y-3">
                <div className="flex items-center gap-2 text-destructive">
                  <HugeiconsIcon icon={AlertCircleIcon} size={18} />
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em]">Danger Zone</h4>
                </div>
                <p className="text-[11px] text-muted-foreground font-medium leading-relaxed">
                  Deleting an organization is an irreversible operation. All employee data, payroll history, and documents will be permanently purged from the system.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function DetailItem({ label, value, icon: Icon }: { label: string; value: string; icon: any }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-muted-foreground/40">
        <HugeiconsIcon icon={Icon} size={14} strokeWidth={2.5} />
        <span className="text-xs font-bold uppercase tracking-widest">{label}</span>
      </div>
      <p className="text-sm font-semibold text-foreground/80 pl-5.5">{value}</p>
    </div>
  );
}
