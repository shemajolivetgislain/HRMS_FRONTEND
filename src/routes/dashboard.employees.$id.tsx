import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Frame,
  FramePanel,
  FrameHeader,
  FrameTitle,
  FrameDescription,
  FrameContent,
} from "@/components/ui/frame";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  PencilEdit02Icon,
  Mail01Icon,
  Briefcase01Icon,
  Download01Icon,
  MoreHorizontalIcon,
  ArrowLeft01Icon,
  Cancel01Icon,
  File02Icon,
  UserCircleIcon,
  SecurityPasswordIcon,
  Clock01Icon,
  Shield01Icon,
  Tick01Icon,
} from "@hugeicons/core-free-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserAvatar } from "@/components/dashboard/user-avatar";
import { Badge } from "@/components/ui/badge";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { cn } from "@/lib/utils";
import { api } from "@/lib/mock-api";

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
  const [isEditing, setIsEditing] = useState(false);
  const [formData] = useState(employeeData);

  const statusVariant =
    formData.status === "active"
      ? "success"
      : formData.status === "pending"
        ? "warning"
        : "destructive";

  return (
    <main className="flex flex-1 flex-col gap-0 overflow-hidden">
      <DashboardHeader
        category="Organization"
        title="Employee Details"
        description="Private records and operational history"
      >
        <Button
          variant="outline"
          size="lg"
          className="text-[12px] font-semibold border-border/60 shadow-none hover:bg-muted/50 gap-2 capitalize"
          render={<Link to="/dashboard/employees" />}
        >
          <HugeiconsIcon icon={ArrowLeft01Icon} size={14} strokeWidth={2} />
          Directory
        </Button>
        <Button
          size="lg"
          className="text-[12px] font-bold gap-2 capitalize"
          onClick={() => setIsEditing(!isEditing)}
        >
          <HugeiconsIcon
            icon={isEditing ? Cancel01Icon : PencilEdit02Icon}
            size={14}
            strokeWidth={2}
          />
          {isEditing ? "Cancel" : "Manage"}
        </Button>
      </DashboardHeader>

      <div className="flex flex-col gap-6 pb-12 flex-1 overflow-auto no-scrollbar px-4 lg:px-6">
        {formData.complianceStatus === "non-compliant" ? (
          <section className="animate-in fade-in slide-in-from-top-2 duration-500">
            <div className="p-4 rounded-2xl bg-destructive/[0.03] border border-destructive/10 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-destructive">
                <div className="size-8 rounded-lg bg-destructive/10 flex items-center justify-center">
                  <HugeiconsIcon
                    icon={Shield01Icon}
                    size={16}
                    strokeWidth={2.5}
                  />
                </div>
                <div>
                  <p className="text-[13px] font-bold leading-none mb-1">
                    Onboarding Policy Gap
                  </p>
                  <p className="text-[11px] font-medium opacity-70">
                    Mandatory identity documents (Criminal Record, Medical
                    Report) are missing from this profile.
                  </p>
                </div>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="h-8 border-destructive/20 text-destructive hover:bg-destructive/5 font-bold text-[10px] uppercase tracking-widest"
              >
                Resolve Policy
              </Button>
            </div>
          </section>
        ) : null}

        <section>
          <Frame className="group/frame border-none bg-transparent p-0">
            <FramePanel className="p-6 bg-card">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                <div className="relative group/avatar">
                  <UserAvatar
                    name={formData.name}
                    size="lg"
                    className="w-28 h-28 rounded-2xl shadow-sm border border-border/10 transition-all duration-500"
                  />
                  {isEditing && (
                    <div className="absolute inset-0 bg-black/20 rounded-2xl flex items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition-opacity cursor-pointer backdrop-blur-[2px]">
                      <HugeiconsIcon
                        icon={PencilEdit02Icon}
                        className="text-white size-5"
                      />
                    </div>
                  )}
                </div>

                <div className="flex-1 text-center md:text-left">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="space-y-1">
                      <h2 className="text-3xl font-semibold tracking-tight text-foreground/90">
                        {formData.name}
                      </h2>
                      <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-1">
                        <Badge
                          variant="accent"
                          className="h-5 px-2 rounded-md font-bold"
                        >
                          {formData.position}
                        </Badge>
                        <Badge
                          variant={statusVariant}
                          showDot
                          className="h-5 px-2 rounded-md"
                        >
                          {formData.status}
                        </Badge>
                        <span className="text-[11px] font-bold text-muted-foreground/40 capitalize tracking-widest flex items-center gap-1.5 ml-1">
                          <HugeiconsIcon
                            icon={Briefcase01Icon}
                            size={12}
                            strokeWidth={2.5}
                          />
                          {formData.department}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-center md:justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="font-bold capitalize shadow-none gap-2"
                      >
                        <HugeiconsIcon icon={Mail01Icon} className="size-4" />
                        Email
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          render={
                            <Button
                              variant="outline"
                              size="icon-sm"
                              className="border-border/40 shadow-none"
                            >
                              <HugeiconsIcon
                                icon={MoreHorizontalIcon}
                                className="size-4"
                              />
                            </Button>
                          }
                        />
                        <DropdownMenuContent
                          align="end"
                          className="w-48 rounded-xl border-border/40 shadow-xl"
                        >
                          <DropdownMenuItem>
                            <HugeiconsIcon
                              icon={SecurityPasswordIcon}
                              className="size-4 mr-2"
                            />
                            <span>Reset Credentials</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <HugeiconsIcon
                              icon={Download01Icon}
                              className="size-4 mr-2"
                            />
                            <span>Download Resume</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive focus:bg-destructive/10">
                            <span>Offboard Employee</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              </div>
            </FramePanel>
          </Frame>
        </section>

        {/* Detailed Tabs Sidebar Layout */}
        <section className="flex-1 min-h-0">
          <Tabs
            defaultValue="personal"
            className="flex flex-col lg:flex-row gap-6 h-full items-start"
          >
            <div className="w-full lg:w-[240px] flex-shrink-0">
              <TabsList className="flex flex-col h-auto w-full bg-muted/10 border border-border/5 p-1.5 rounded-2xl gap-1 items-stretch justify-start">
                <EmployeeTabTrigger value="personal" label="Information" />
                <EmployeeTabTrigger value="employment" label="Job Details" />
                <EmployeeTabTrigger value="documents" label="Documents" />
                <EmployeeTabTrigger value="activity" label="Log History" />
              </TabsList>
            </div>

            <div className="flex-1 w-full min-w-0">
              {/* Information Tab */}
              <TabsContent
                value="personal"
                className="mt-0 animate-in fade-in slide-in-from-right-1 duration-300"
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-6">
                    <Frame>
                      <FramePanel className="p-0 overflow-hidden bg-card">
                        <FrameHeader>
                          <div>
                            <FrameTitle>Personal Profile</FrameTitle>
                            <FrameDescription>
                              Basic contact and identification details
                            </FrameDescription>
                          </div>
                          {isEditing && (
                            <Button size="sm" className="font-bold shadow-sm">
                              Save Changes
                            </Button>
                          )}
                        </FrameHeader>
                        <FrameContent className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 py-8">
                          <Field
                            label="Full Name"
                            value={formData.name}
                            isEditing={isEditing}
                          />
                          <Field
                            label="Email Address"
                            value={formData.email}
                            isEditing={isEditing}
                            type="email"
                          />
                          <Field
                            label="Phone Number"
                            value={formData.phone}
                            isEditing={isEditing}
                          />
                          <Field
                            label="Birth Date"
                            value={formData.dob}
                            isEditing={isEditing}
                            type="date"
                          />
                          <Field
                            label="Home Address"
                            value={formData.address}
                            isEditing={isEditing}
                            className="md:col-span-2"
                          />
                          <Field
                            label="City"
                            value={formData.city}
                            isEditing={isEditing}
                          />
                          <Field
                            label="Country"
                            value={formData.country}
                            isEditing={isEditing}
                          />
                        </FrameContent>
                      </FramePanel>
                    </Frame>
                  </div>

                  <div className="space-y-6">
                    <Frame>
                      <FramePanel className="p-6 space-y-6 bg-card">
                        <div className="space-y-1">
                          <p className="text-[10px] font-bold text-muted-foreground/40 capitalize tracking-widest">
                            Emergency Contact
                          </p>
                          <p className="text-[13px] font-semibold text-foreground/80">
                            Jane Doe (Spouse)
                          </p>
                          <p className="text-[11px] font-medium text-muted-foreground/60">
                            +1 (555) 987-6543
                          </p>
                        </div>
                        <div className="pt-4 border-t border-border/5 space-y-1">
                          <p className="text-[10px] font-bold text-muted-foreground/40 capitalize tracking-widest">
                            Timezone
                          </p>
                          <p className="text-[13px] font-semibold text-foreground/80">
                            Pacific Standard Time (PST)
                          </p>
                        </div>
                      </FramePanel>
                    </Frame>
                  </div>
                </div>
              </TabsContent>

              {/* Job Details Tab */}
              <TabsContent
                value="employment"
                className="mt-0 animate-in fade-in slide-in-from-right-1 duration-300"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Frame>
                    <FramePanel className="p-0 overflow-hidden bg-card">
                      <FrameHeader>
                        <div>
                          <FrameTitle>Current Position</FrameTitle>
                          <FrameDescription>
                            Employment status and role hierarchy
                          </FrameDescription>
                        </div>
                      </FrameHeader>
                      <FrameContent className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 py-8">
                        <Field label="Job Position" value={formData.position} />
                        <Field label="Department" value={formData.department} />
                        <Field label="Line Manager" value={formData.manager} />
                        <Field
                          label="Employment Status"
                          value={
                            <Badge variant={statusVariant} showDot>
                              {formData.status}
                            </Badge>
                          }
                        />
                        <Field
                          label="Hire Date"
                          value={
                            formData.hireDate
                              ? new Date(formData.hireDate).toLocaleDateString(
                                  undefined,
                                  {
                                    day: "2-digit",
                                    month: "long",
                                    year: "numeric",
                                  },
                                )
                              : ""
                          }
                        />
                        <Field label="Tenure" value="3 Years, 2 Months" />
                      </FrameContent>
                    </FramePanel>
                  </Frame>

                  <Frame>
                    <FramePanel className="p-0 overflow-hidden bg-card">
                      <FrameHeader>
                        <div>
                          <FrameTitle>Work Arrangement</FrameTitle>
                          <FrameDescription>
                            Schedule and location settings
                          </FrameDescription>
                        </div>
                      </FrameHeader>
                      <FrameContent className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 py-8">
                        <Field label="Work Type" value="Full-time" />
                        <Field
                          label="Location"
                          value="Remote (San Francisco)"
                        />
                        <Field label="Working Days" value="Mon - Fri" />
                        <Field label="Typical Hours" value="09:00 - 18:00" />
                      </FrameContent>
                    </FramePanel>
                  </Frame>
                </div>
              </TabsContent>

              {/* Documents Tab */}
              <TabsContent
                value="documents"
                className="mt-0 animate-in fade-in slide-in-from-right-1 duration-300"
              >
                <Frame>
                  <FramePanel className="p-0 overflow-hidden bg-card">
                    <FrameHeader>
                      <div>
                        <FrameTitle>Employee Files</FrameTitle>
                        <FrameDescription>
                          Secure document storage and legal paperwork
                        </FrameDescription>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="font-bold capitalize"
                      >
                        Upload New
                      </Button>
                    </FrameHeader>
                    <FrameContent className="p-0">
                      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border/5">
                        {[
                          {
                            name: "Employment Contract",
                            date: "Mar 15, 2021",
                            type: "PDF",
                            size: "1.2 MB",
                          },
                          {
                            name: "Offer Letter",
                            date: "Feb 28, 2021",
                            type: "PDF",
                            size: "840 KB",
                          },
                          {
                            name: "Policy Agreement",
                            date: "Mar 15, 2021",
                            type: "PDF",
                            size: "2.1 MB",
                          },
                          {
                            name: "Identity Records",
                            date: "Jan 10, 2021",
                            type: "JPG",
                            size: "4.5 MB",
                          },
                        ].map((doc, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between px-6 py-5 hover:bg-muted/5 transition-all group/doc"
                          >
                            <div className="flex items-center gap-4">
                              <div className="h-10 w-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary group-hover/doc:bg-primary group-hover/doc:text-white transition-all">
                                <HugeiconsIcon icon={File02Icon} size={18} />
                              </div>
                              <div>
                                <p className="text-[13px] font-semibold text-foreground/80">
                                  {doc.name}
                                </p>
                                <p className="text-[11px] font-bold text-muted-foreground/40 capitalize tracking-widest mt-0.5">
                                  {doc.date} • {doc.size}
                                </p>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon-sm"
                              className="rounded-lg opacity-0 group-hover/doc:opacity-100 transition-opacity"
                            >
                              <HugeiconsIcon
                                icon={Download01Icon}
                                className="size-4"
                              />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </FrameContent>
                  </FramePanel>
                </Frame>
              </TabsContent>

              {/* History Tab */}
              <TabsContent
                value="activity"
                className="mt-0 animate-in fade-in slide-in-from-right-1 duration-300"
              >
                <Frame>
                  <FramePanel className="p-0 overflow-hidden bg-card">
                    <FrameHeader>
                      <div>
                        <FrameTitle>Activity Log</FrameTitle>
                        <FrameDescription>
                          Complete audit trail of profile changes
                        </FrameDescription>
                      </div>
                    </FrameHeader>
                    <FrameContent className="p-8">
                      <div className="space-y-0">
                        {[
                          {
                            action: "Updated banking details",
                            date: "Today at 4:12 PM",
                            user: "Self",
                            icon: Clock01Icon,
                          },
                          {
                            action: "Salary tier adjustment",
                            date: "Oct 12, 2023",
                            user: "Admin (Sarah)",
                            icon: Tick01Icon,
                          },
                          {
                            action: "Promoted to Senior Role",
                            date: "Aug 05, 2023",
                            user: "Manager (Alice)",
                            icon: UserCircleIcon,
                          },
                          {
                            action: "Account initialized",
                            date: "Mar 15, 2021",
                            user: "System",
                            icon: Clock01Icon,
                          },
                        ].map((log, idx) => (
                          <div
                            key={idx}
                            className="relative pl-10 pb-10 last:pb-0 group/log"
                          >
                            <div className="absolute left-[15px] top-6 bottom-0 w-px bg-border/10 group-last/log:hidden" />
                            <div className="absolute left-0 top-1 size-8 rounded-full bg-background border border-border/40 flex items-center justify-center z-10 group-hover/log:border-primary/40 transition-colors shadow-xs">
                              <HugeiconsIcon
                                icon={log.icon}
                                size={14}
                                className="text-muted-foreground/40 group-hover/log:text-primary transition-colors"
                              />
                            </div>
                            <div className="space-y-1 pt-0.5">
                              <p className="text-[13px] font-semibold text-foreground/80 leading-none">
                                {log.action}
                              </p>
                              <p className="text-[11px] font-medium text-muted-foreground/50">
                                {log.date} by{" "}
                                <span className="text-foreground/60">
                                  {log.user}
                                </span>
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </FrameContent>
                  </FramePanel>
                </Frame>
              </TabsContent>
            </div>
          </Tabs>
        </section>
      </div>
    </main>
  );
}

function EmployeeTabTrigger({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <TabsTrigger
      value={value}
      className="relative flex items-center px-4 py-2.5 rounded-xl transition-all text-left data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm text-muted-foreground/50 hover:text-foreground/80 group overflow-hidden border border-transparent data-[state=active]:border-border/5"
    >
      <span className="text-[12px] font-semibold tracking-tight">{label}</span>
    </TabsTrigger>
  );
}

function Field({
  label,
  value,
  isEditing,
  type = "text",
  className,
}: {
  label: string;
  value: string | React.ReactNode;
  isEditing?: boolean;
  type?: string;
  className?: string;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      <Label className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground/40">
        {label}
      </Label>
      {isEditing && typeof value === "string" ? (
        <Input
          type={type}
          defaultValue={value}
          className="h-9 rounded-lg border-border/40 bg-muted/5 focus:bg-background transition-all text-[13px]"
        />
      ) : (
        <div className="text-[13px] font-semibold text-foreground/80 leading-snug min-h-[20px]">
          {value}
        </div>
      )}
    </div>
  );
}
