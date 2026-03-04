import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { api } from "@/lib/mock-api";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import {
  Frame,
  FramePanel,
  FrameHeader,
  FrameTitle,
  FrameContent,
} from "@/components/ui/frame";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  UserGroupIcon,
  Building03Icon,
  Calendar01Icon,
  Mail01Icon,
  SmartPhone01Icon,
  Shield01Icon,
  JobShareIcon,
  Coins01Icon,
  File02Icon,
  UserEdit01Icon,
  ArrowLeft01Icon,
  Settings02Icon,
} from "@hugeicons/core-free-icons";
import { UserAvatar } from "@/components/dashboard/user-avatar";
import { DashboardPending } from "@/components/dashboard/dashboard-pending";
import { ErrorComponent } from "@/components/error-component";

export const Route = createFileRoute("/dashboard/employees/$id")({
  loader: async ({ params }) => await api.getEmployee(params.id),
  errorComponent: ErrorComponent,
  pendingComponent: DashboardPending,
  component: EmployeeProfilePage,
});

function EmployeeProfilePage() {
  const employee = Route.useLoaderData();
  const navigate = useNavigate();

  if (!employee) return null;

  return (
    <main className="flex flex-1 flex-col gap-0 overflow-hidden h-full">
      <DashboardHeader
        category="directory"
        title={employee.name}
        description={`Member of ${employee.department} team`}
      >
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate({ to: "/dashboard/employees" })}
            className="text-xs font-bold gap-2"
          >
            <HugeiconsIcon icon={ArrowLeft01Icon} size={14} />
            Back
          </Button>
          <Button size="sm" className="text-xs font-bold gap-2">
            <HugeiconsIcon icon={UserEdit01Icon} size={14} />
            Edit Profile
          </Button>
        </div>
      </DashboardHeader>

      <div className="flex-1 overflow-y-auto no-scrollbar px-4 lg:px-6 pb-12">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <Frame className="w-full md:w-[300px] shrink-0">
              <FramePanel className="bg-card p-8 flex flex-col items-center text-center">
                <UserAvatar name={employee.name} size="lg" className="mb-6 h-24 w-24" />
                <h2 className="text-xl font-bold text-foreground/90">{employee.name}</h2>
                <p className="text-sm font-semibold text-primary mt-1">{employee.position}</p>
                <div className="mt-6 w-full pt-6 border-t border-border/5 space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground font-bold uppercase tracking-widest">status</span>
                    <Badge variant={employee.status === "active" ? "success" : "warning"} showDot>{employee.status}</Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground font-bold uppercase tracking-widest">compliance</span>
                    <Badge variant={employee.complianceStatus === "compliant" ? "success" : "destructive"}>{employee.complianceStatus}</Badge>
                  </div>
                </div>
              </FramePanel>
            </Frame>

            <div className="flex-1 w-full min-w-0">
              <Tabs defaultValue="general" className="w-full">
                <TabsList className="mb-6 bg-muted/5 border border-border/5 p-1">
                  <TabsTrigger value="general" className="px-6">Overview</TabsTrigger>
                  <TabsTrigger value="payroll" className="px-6">Payroll</TabsTrigger>
                  <TabsTrigger value="documents" className="px-6">Documents</TabsTrigger>
                  <TabsTrigger value="settings" className="px-6">Settings</TabsTrigger>
                </TabsList>

                <TabsContent value="general" className="m-0 mt-2 space-y-8 animate-in fade-in slide-in-from-right-1 duration-300">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Frame>
                      <FramePanel className="bg-card">
                        <FrameHeader>
                          <FrameTitle>General Information</FrameTitle>
                        </FrameHeader>
                        <FrameContent className="space-y-6">
                          <InfoRow label="Employee ID" value={employee.id} icon={UserGroupIcon} />
                          <InfoRow label="Full Name" value={employee.name} icon={UserEdit01Icon} />
                          <InfoRow label="National ID" value={employee.idNumber} icon={Shield01Icon} />
                          <InfoRow label="Email" value={employee.email} icon={Mail01Icon} />
                          <InfoRow label="Phone" value={employee.phone || "N/A"} icon={SmartPhone01Icon} />
                        </FrameContent>
                      </FramePanel>
                    </Frame>

                    <Frame>
                      <FramePanel className="bg-card">
                        <FrameHeader>
                          <FrameTitle>Job Information</FrameTitle>
                        </FrameHeader>
                        <FrameContent className="space-y-6">
                          <InfoRow label="Department" value={employee.department} icon={Building03Icon} />
                          <InfoRow label="Position" value={employee.position} icon={JobShareIcon} />
                          <InfoRow label="Manager" value={employee.manager || "N/A"} icon={UserGroupIcon} />
                          <InfoRow label="Hire Date" value={employee.hireDate} icon={Calendar01Icon} />
                          <div className="flex items-center justify-between pt-2">
                            <p className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest">employment status</p>
                            <Badge variant={employee.status === "active" ? "success" : "warning"} showDot>{employee.status}</Badge>
                          </div>
                        </FrameContent>
                      </FramePanel>
                    </Frame>
                  </div>
                </TabsContent>

                <TabsContent value="payroll" className="m-0 mt-2 space-y-8 animate-in fade-in slide-in-from-right-1 duration-300">
                  <Frame>
                    <FramePanel className="bg-card">
                      <FrameHeader>
                        <FrameTitle>Payroll History</FrameTitle>
                      </FrameHeader>
                      <FrameContent className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                        <div className="h-16 w-16 bg-muted/5 flex items-center justify-center rounded-2xl text-muted-foreground/20">
                          <HugeiconsIcon icon={Coins01Icon} size={32} />
                        </div>
                        <div className="space-y-1">
                          <p className="font-bold text-foreground/80">No payroll records</p>
                          <p className="text-sm text-muted-foreground font-medium max-w-xs">Recent earnings and statutory deductions will appear here once payroll is processed.</p>
                        </div>
                      </FrameContent>
                    </FramePanel>
                  </Frame>
                </TabsContent>

                <TabsContent value="documents" className="m-0 mt-2 space-y-8 animate-in fade-in slide-in-from-right-1 duration-300">
                  <Frame>
                    <FramePanel className="bg-card">
                      <FrameHeader>
                        <FrameTitle>Employee Vault</FrameTitle>
                      </FrameHeader>
                      <FrameContent className="p-0">
                        <div className="divide-y divide-border/5">
                          {["Contract", "CV", "National ID", "Insurance Card"].map((doc) => (
                            <div key={doc} className="flex items-center justify-between p-6 hover:bg-muted/5 transition-colors group">
                              <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-xl bg-muted/10 flex items-center justify-center text-muted-foreground/40 group-hover:text-primary transition-colors">
                                  <HugeiconsIcon icon={File02Icon} size={20} />
                                </div>
                                <div>
                                  <p className="font-bold text-sm text-foreground/90">{doc}</p>
                                  <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">pdf • uploaded feb 2024</p>
                                </div>
                              </div>
                              <Button variant="ghost" size="sm" className="font-bold text-xs">Download</Button>
                            </div>
                          ))}
                        </div>
                      </FrameContent>
                    </FramePanel>
                  </Frame>
                </TabsContent>

                <TabsContent value="settings" className="m-0 mt-2 space-y-8 animate-in fade-in slide-in-from-right-1 duration-300">
                  <Frame>
                    <FramePanel className="bg-card p-10 flex flex-col items-center justify-center text-center space-y-6">
                      <div className="h-16 w-16 bg-muted/5 flex items-center justify-center rounded-2xl text-muted-foreground/20">
                        <HugeiconsIcon icon={Settings02Icon} size={32} />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold text-foreground/90">Profile Management</h3>
                        <p className="text-sm text-muted-foreground font-medium max-w-sm">Manage system permissions, account access, and advanced lifecycle states for this employee.</p>
                      </div>
                      <div className="flex flex-wrap items-center justify-center gap-3">
                        <Button variant="outline" className="font-bold text-xs uppercase tracking-widest">reset password</Button>
                        <Button variant="outline" className="font-bold text-xs uppercase tracking-widest text-destructive hover:bg-destructive/5 border-destructive/20">deactivate account</Button>
                      </div>
                    </FramePanel>
                  </Frame>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function InfoRow({ label, value, icon: Icon }: { label: string; value: string; icon: any }) {
  return (
    <div className="flex items-center justify-between group">
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-lg bg-muted/5 flex items-center justify-center text-muted-foreground/30 group-hover:text-primary transition-colors">
          <HugeiconsIcon icon={Icon} size={16} />
        </div>
        <p className="text-xs font-bold text-muted-foreground/40 uppercase tracking-widest">{label}</p>
      </div>
      <p className="text-sm font-semibold text-foreground/80">{value}</p>
    </div>
  );
}
