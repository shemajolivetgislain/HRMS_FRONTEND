import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  PencilEdit02Icon,
  Mail01Icon,
  MoreHorizontalIcon,
  ArrowLeft01Icon,
  Tick01Icon,
  CallIcon,
  Location01Icon,
  UserCircleIcon,
  File02Icon,
  Coins01Icon,
  Settings02Icon,
  Briefcase01Icon,
} from "@hugeicons/core-free-icons";
import { UserAvatar } from "@/components/dashboard/user-avatar";
import { Badge } from "@/components/ui/badge";
import { api } from "@/lib/mock-api";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";

export const Route = createFileRoute("/dashboard/employees/$id")({
  loader: async ({ params }) => {
    const employee = await api.getEmployee(params.id);
    if (!employee) throw new Error("Employee not found");
    return employee;
  },
  component: EmployeeProfilePage,
});

function EmployeeProfilePage() {
  const employeeData = Route.useLoaderData();
  const [formData] = useState(employeeData);

  return (
    <main className="flex flex-1 flex-col gap-0 overflow-hidden bg-muted/20">
      <DashboardHeader
        category="Directory"
        title={formData.name}
        description={`Employee ID: ${formData.id} • ${formData.position}`}
      >
        <Button
          variant="outline"
          size="lg"
          className="text-xs font-semibold border-border/60 shadow-none hover:bg-muted/50 gap-2 capitalize"
          render={<Link to="/dashboard/employees" />}
        >
          <HugeiconsIcon icon={ArrowLeft01Icon} size={14} strokeWidth={2} />
          Directory
        </Button>
        <Button size="lg" className="font-bold gap-2">
          <HugeiconsIcon icon={PencilEdit02Icon} size={14} strokeWidth={2} />
          Edit Profile
        </Button>
      </DashboardHeader>

      <div className="flex flex-col lg:flex-row gap-6 px-4 lg:px-6 pb-6 flex-1 overflow-auto no-scrollbar">
        <div className="w-full lg:w-80 flex-shrink-0 space-y-4">
          <div className="bg-card rounded-[24px] p-8 border border-border/40 shadow-xs flex flex-col items-center text-center">
            <div className="relative mb-4">
              <UserAvatar
                name={formData.name}
                size="lg"
                className="w-24 h-24 rounded-full border-4 border-background shadow-md"
              />
            </div>
            <h2 className="text-xl font-bold text-foreground mb-1">
              {formData.name}
            </h2>
            <p className="text-sm font-medium text-muted-foreground/60 mb-4">
              {formData.position}
            </p>

            <Badge
              variant={
                formData.status === "active"
                  ? "success"
                  : formData.status === "probation"
                    ? "warning"
                    : formData.status === "resigned"
                      ? "muted"
                      : "destructive"
              }
              showDot
              className="px-4 py-1 rounded-lg text-xs font-bold mb-8 uppercase tracking-wider"
            >
              {formData.status}
            </Badge>

            <div className="w-full space-y-4 text-left">
              <div className="flex items-center gap-3 text-sm">
                <div className="size-8 rounded-lg bg-muted/5 flex items-center justify-center text-muted-foreground/40 border border-border/5">
                  <HugeiconsIcon icon={Mail01Icon} size={16} />
                </div>
                <span className="text-muted-foreground/70 font-medium truncate flex-1">
                  {formData.email}
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="size-8 rounded-lg bg-muted/5 flex items-center justify-center text-muted-foreground/40 border border-border/5">
                  <HugeiconsIcon icon={CallIcon} size={16} />
                </div>
                <span className="text-muted-foreground/70 font-medium">
                  {formData.phone || "Not provided"}
                </span>
              </div>
            </div>

            <div className="w-full mt-8 pt-8 border-t border-border/5 space-y-6">
              <div className="flex items-center justify-between">
                <div className="text-left space-y-1">
                  <p className="text-xs font-bold text-muted-foreground/30 uppercase tracking-widest">
                    Department
                  </p>
                  <p className="text-sm font-bold text-foreground/80">
                    {formData.department}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-left space-y-1">
                  <p className="text-xs font-bold text-muted-foreground/30 uppercase tracking-widest">
                    Line Manager
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <UserAvatar
                      name={formData.manager || "System Admin"}
                      size="sm"
                      className="size-6"
                    />
                    <p className="text-sm font-bold text-foreground/80">
                      {formData.manager || "System Admin"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Button className="w-full mt-8 bg-primary text-primary-foreground font-bold rounded-xl h-12 flex items-center justify-center gap-2 shadow-sm">
              Quick Actions
              <HugeiconsIcon icon={MoreHorizontalIcon} size={14} />
            </Button>
          </div>
        </div>

        {/* main content area */}
        <div className="flex-1 min-w-0">
          <Tabs defaultValue="job" className="w-full h-full flex flex-col">
            <div className="bg-card rounded-[24px] border border-border/40 shadow-xs overflow-hidden flex flex-1 flex-col">
              <div className="px-8 pt-4 bg-muted/5 border-b border-border/5">
                <TabsList
                  variant="line"
                  className="bg-transparent w-full justify-start rounded-none h-auto p-0 gap-8"
                >
                  <TabsTrigger
                    value="general"
                    className="gap-2 px-0 py-4 text-sm font-bold"
                  >
                    <HugeiconsIcon icon={UserCircleIcon} size={16} />
                    General
                  </TabsTrigger>
                  <TabsTrigger
                    value="job"
                    className="gap-2 px-0 py-4 text-sm font-bold"
                  >
                    <HugeiconsIcon icon={Briefcase01Icon} size={16} />
                    Job Details
                  </TabsTrigger>
                  <TabsTrigger
                    value="payroll"
                    className="gap-2 px-0 py-4 text-sm font-bold"
                  >
                    <HugeiconsIcon icon={Coins01Icon} size={16} />
                    Payroll
                  </TabsTrigger>
                  <TabsTrigger
                    value="documents"
                    className="gap-2 px-0 py-4 text-sm font-bold"
                  >
                    <HugeiconsIcon icon={File02Icon} size={16} />
                    Documents
                  </TabsTrigger>
                  <TabsTrigger
                    value="setting"
                    className="gap-2 px-0 py-4 text-sm font-bold"
                  >
                    <HugeiconsIcon icon={Settings02Icon} size={16} />
                    Settings
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="p-8 flex-1 overflow-auto no-scrollbar bg-background/40">
                {/* General Information */}
                <TabsContent
                  value="general"
                  className="mt-0 space-y-8 outline-none animate-in fade-in slide-in-from-right-1"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <h3 className="text-base font-bold text-foreground/90 flex items-center gap-2">
                        <HugeiconsIcon
                          icon={UserCircleIcon}
                          className="size-4 text-primary"
                        />
                        Personal Information
                      </h3>
                      <div className="grid grid-cols-1 gap-6 p-6 rounded-2xl border border-border/5 bg-muted/5">
                        <DetailItem label="Full Name" value={formData.name} />
                        <DetailItem
                          label="Email Address"
                          value={formData.email}
                        />
                        <DetailItem
                          label="Phone Number"
                          value={formData.phone || "N/A"}
                        />
                        <DetailItem
                          label="Date of Birth"
                          value={formData.dob || "N/A"}
                        />
                      </div>
                    </div>
                    <div className="space-y-6">
                      <h3 className="text-base font-bold text-foreground/90 flex items-center gap-2">
                        <HugeiconsIcon
                          icon={Location01Icon}
                          className="size-4 text-primary"
                        />
                        Contact & Location
                      </h3>
                      <div className="grid grid-cols-1 gap-6 p-6 rounded-2xl border border-border/5 bg-muted/5">
                        <DetailItem
                          label="Residential Address"
                          value={formData.address || "N/A"}
                        />
                        <DetailItem
                          label="City"
                          value={formData.city || "N/A"}
                        />
                        <DetailItem
                          label="Country"
                          value={formData.country || "N/A"}
                        />
                        <DetailItem
                          label="Emergency Contact"
                          value="+250 788 000 000"
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Job Information */}
                <TabsContent
                  value="job"
                  className="mt-0 space-y-8 outline-none animate-in fade-in slide-in-from-right-1"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <h3 className="text-base font-bold text-foreground/90 flex items-center gap-2">
                        <HugeiconsIcon
                          icon={Briefcase01Icon}
                          className="size-4 text-primary"
                        />
                        Employment Details
                      </h3>
                      <div className="grid grid-cols-1 gap-6 p-6 rounded-2xl border border-border/5 bg-muted/5">
                        <DetailItem
                          label="Position"
                          value={formData.position}
                        />
                        <DetailItem
                          label="Department"
                          value={formData.department}
                        />
                        <DetailItem
                          label="Join Date"
                          value={formData.hireDate}
                        />
                        <DetailItem label="Employment Type" value="Full-time" />
                      </div>
                    </div>
                    <div className="space-y-6">
                      <h3 className="text-base font-bold text-foreground/90 flex items-center gap-2">
                        <HugeiconsIcon
                          icon={Tick01Icon}
                          className="size-4 text-primary"
                        />
                        Compliance & Status
                      </h3>
                      <div className="grid grid-cols-1 gap-6 p-6 rounded-2xl border border-border/5 bg-muted/5">
                        <div className="space-y-2">
                          <p className="text-xs font-bold text-muted-foreground/40 uppercase tracking-widest">
                            Compliance Status
                          </p>
                          <Badge
                            variant={
                              formData.complianceStatus === "compliant"
                                ? "success"
                                : "destructive"
                            }
                          >
                            {formData.complianceStatus}
                          </Badge>
                        </div>
                        <DetailItem
                          label="Onboarding Progress"
                          value={`${formData.onboardingProgress}%`}
                        />
                        <DetailItem label="Last Review" value="Q4 2025" />
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Payroll Placeholder */}
                <TabsContent
                  value="payroll"
                  className="mt-0 space-y-8 outline-none animate-in fade-in slide-in-from-right-1"
                >
                  <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                    <div className="size-16 rounded-full bg-primary/5 flex items-center justify-center text-primary">
                      <HugeiconsIcon icon={Coins01Icon} className="size-8" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold">
                        Payroll Configuration
                      </h3>
                      <p className="text-sm text-muted-foreground max-w-xs">
                        Financial details and statutory deductions are managed
                        here.
                      </p>
                    </div>
                    <Button variant="outline" className="font-bold">
                      View Recent Payslips
                    </Button>
                  </div>
                </TabsContent>

                {/* Documents Placeholder */}
                <TabsContent
                  value="documents"
                  className="mt-0 space-y-8 outline-none animate-in fade-in slide-in-from-right-1"
                >
                  <div className="grid grid-cols-1 gap-4">
                    {[
                      "Employment_Contract.pdf",
                      "National_ID.pdf",
                      "CV_Jean_Paul.pdf",
                    ].map((doc) => (
                      <div
                        key={doc}
                        className="flex items-center justify-between p-4 rounded-xl border border-border/5 bg-muted/5 hover:bg-muted/10 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                            <HugeiconsIcon
                              icon={File02Icon}
                              className="size-5"
                            />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-foreground/80">
                              {doc}
                            </p>
                            <p className="text-xs text-muted-foreground/50">
                              Uploaded on Jan 12, 2026
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="font-bold text-xs text-primary"
                        >
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </div>
            </div>
          </Tabs>
        </div>
      </div>
    </main>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1.5">
      <p className="text-xs font-bold text-muted-foreground/40 uppercase tracking-widest">
        {label}
      </p>
      <p className="text-sm font-bold text-foreground/80">{value}</p>
    </div>
  );
}
