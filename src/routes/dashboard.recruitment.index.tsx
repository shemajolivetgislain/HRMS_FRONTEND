import React, { useState } from "react";
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
  JobShareIcon,
  Download01Icon,
  Search01Icon,
  FilterIcon,
  PlusSignCircleIcon,
  MoreHorizontalIcon,
  UserMultiple02Icon,
  Sorting05Icon,
  ViewIcon,
  Mail01Icon,
  Briefcase01Icon,
  Location01Icon,
  UserAdd01Icon,
} from "@hugeicons/core-free-icons";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { UserAvatar } from "@/components/dashboard/user-avatar";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
import { api } from "@/lib/mock-api";

// Sample candidates data (could be moved to mock API later)
const recentCandidates = [
  {
    id: 1,
    name: "Alice Cooper",
    role: "Senior Frontend Engineer",
    stage: "Interview",
    time: "2h ago",
    status: "info",
  },
  {
    id: 2,
    name: "Marcus Webb",
    role: "Product Designer",
    stage: "Screening",
    time: "4h ago",
    status: "warning",
  },
  {
    id: 3,
    name: "Jada Smith",
    role: "HR Specialist",
    stage: "New Applied",
    time: "5h ago",
    status: "success",
  },
  {
    id: 4,
    name: "Oliver Queen",
    role: "QA Engineer",
    stage: "Offer Sent",
    time: "1d ago",
    status: "primary",
  },
];

import { DashboardPending } from "@/components/dashboard/dashboard-pending";

export const Route = createFileRoute("/dashboard/recruitment/")({
  loader: async () => await api.getJobs(),
  pendingComponent: DashboardPending,
  component: RecruitmentPage,
});

function RecruitmentPage() {
  const jobs = Route.useLoaderData();
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.dept.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="flex flex-1 flex-col gap-0 overflow-hidden">
      <DashboardHeader
        category="Talent"
        title="Recruitment Command"
        description="Acquire and manage top-tier talent for your organization"
      >
        <Button
          variant="outline"
          size="lg"
          className="text-xs font-semibold border-border/60 shadow-none hover:bg-muted/50 gap-2 capitalize"
        >
          <HugeiconsIcon icon={Download01Icon} size={14} strokeWidth={2} />
          Report
        </Button>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger
            render={
              <Button
                size="lg"
                className="text-xs font-bold gap-2 capitalize"
              >
                <HugeiconsIcon icon={PlusSignCircleIcon} size={14} strokeWidth={2} />
                Register Candidate
              </Button>
            }
          />
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Register New Candidate</DialogTitle>
              <DialogDescription>
                Add a new applicant to the recruitment pipeline.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="Moses" className="h-9" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Mugisha" className="h-9" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="idNumber">National ID / Passport</Label>
                  <Input id="idNumber" placeholder="119..." className="h-9" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="m.mugisha@gmail.com" className="h-9" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input id="phoneNumber" placeholder="+250..." className="h-9" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="job">Target Role</Label>
                  <Select>
                    <SelectTrigger id="job" className="h-9 w-full">
                      <SelectValue placeholder="Select position" />
                    </SelectTrigger>
                    <SelectContent>
                      {jobs.map(job => (
                        <SelectItem key={job.id} value={job.id}>{job.title}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="resume">Resume / CV (PDF)</Label>
                <Input id="resume" type="file" className="h-9 pt-1.5" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button type="submit" onClick={() => setIsDialogOpen(false)}>Add to Pipeline</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DashboardHeader>

      <div className="flex flex-col xl:flex-row gap-6 pb-12 flex-1 overflow-auto no-scrollbar px-4 lg:px-6">
        <div className="flex-1 min-w-0 space-y-6">
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <RecruitmentStatCard
              label="Active Openings"
              value={jobs.length.toString()}
              change="+2"
              up={true}
              icon={JobShareIcon}
              variant="primary"
              sub="Roles currently published"
            />
            <RecruitmentStatCard
              label="Total Applicants"
              value="132"
              change="+15%"
              up={true}
              icon={UserMultiple02Icon}
              variant="info"
              sub="Across all open roles"
            />
            <RecruitmentStatCard
              label="Time to Hire"
              value="18 days"
              change="-4d"
              up={true}
              icon={Sorting05Icon}
              variant="success"
              sub="Average lifecycle duration"
            />
          </section>

          <section>
            <Frame className="group/frame">
              <FramePanel className="p-0 overflow-hidden bg-card">
                <FrameHeader className="border-b-0 pb-2">
                  <div>
                    <FrameTitle>Active Pipelines</FrameTitle>
                    <FrameDescription>
                      Monitor and manage active recruitment cycles
                    </FrameDescription>
                  </div>
                </FrameHeader>

                <div className="px-6 pb-5 pt-2 flex flex-col sm:flex-row items-center gap-3 border-b border-border/5">
                  <div className="relative flex-1 w-full">
                    <HugeiconsIcon
                      icon={Search01Icon}
                      className="absolute left-3 top-2.5 size-4 text-muted-foreground/40"
                      strokeWidth={2}
                    />
                    <Input
                      placeholder="Search roles or departments…"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9 h-9 rounded-lg border-border/40 bg-muted/5 focus:bg-background transition-all text-xs w-full max-w-sm"
                    />
                  </div>
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-9 px-4 rounded-lg border-border/40 gap-2 text-xs font-bold flex-1 sm:flex-none"
                    >
                      <HugeiconsIcon icon={FilterIcon} size={14} />
                      Filter Roles
                    </Button>
                  </div>
                </div>

                <FrameContent className="p-0">
                  <Table>
                    <TableHeader className="bg-muted/10">
                      <TableRow className="hover:bg-transparent border-border/5">
                        <TableHead className="text-xs font-bold text-muted-foreground/40 capitalize tracking-widest pl-6 w-[300px]">
                          Role Details
                        </TableHead>
                        <TableHead className="text-xs font-bold text-muted-foreground/40 capitalize tracking-widest px-2">
                          Pipeline
                        </TableHead>
                        <TableHead className="text-xs font-bold text-muted-foreground/40 capitalize tracking-widest px-2">
                          Status
                        </TableHead>
                        <TableHead className="text-xs font-bold text-muted-foreground/40 capitalize tracking-widest px-2 text-right pr-6">
                          Action
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredJobs.map((job) => (
                        <TableRow
                          key={job.id}
                          className="border-border/5 hover:bg-muted/5 transition-colors group"
                        >
                          <TableCell className="pl-6 py-4">
                            <div>
                              <p className="text-sm font-semibold text-foreground/90 leading-none">
                                {job.title}
                              </p>
                              <div className="flex items-center gap-3 mt-2 text-xs font-medium text-muted-foreground/60">
                                <span className="flex items-center gap-1">
                                  <HugeiconsIcon
                                    icon={Briefcase01Icon}
                                    size={12}
                                  />
                                  {job.dept}
                                </span>
                                <span className="flex items-center gap-1">
                                  <HugeiconsIcon
                                    icon={Location01Icon}
                                    size={12}
                                  />
                                  {job.location}
                                </span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="px-2">
                            <div className="flex items-center gap-3">
                              <div className="flex items-center justify-center h-8 w-12 rounded-lg bg-primary/5 text-primary text-sm font-bold tabular-nums border border-primary/10">
                                {job.applicants}
                              </div>
                              <span className="text-xs font-medium text-muted-foreground/50">
                                Candidates
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="px-2">
                            <Badge
                              variant={
                                job.status === "published"
                                  ? "success"
                                  : job.status === "draft"
                                    ? "muted"
                                    : "warning"
                              }
                              showDot
                            >
                              {job.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right pr-6">
                            <DropdownMenu>
                              <DropdownMenuTrigger
                                render={
                                  <Button
                                    variant="ghost"
                                    size="icon-sm"
                                    className="rounded-lg bg-muted/20 hover:bg-muted hover:text-foreground transition-all border border-border/5 shadow-xs"
                                    aria-label="Job actions"
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
                                      to="/dashboard/recruitment/$id"
                                      params={{ id: job.id }}
                                    />
                                  }
                                >
                                  <HugeiconsIcon
                                    icon={ViewIcon}
                                    className="size-4 mr-2"
                                  />
                                  <span>View Opening</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <HugeiconsIcon
                                    icon={Mail01Icon}
                                    className="size-4 mr-2"
                                  />
                                  <span>Share Role</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <HugeiconsIcon
                                    icon={PlusSignCircleIcon}
                                    className="size-4 mr-2"
                                  />
                                  <span>Add Candidate</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive focus:bg-destructive/10">
                                  <span>Close Opening</span>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </FrameContent>

                <FrameFooter className="flex items-center justify-between border-t border-border/5">
                  <p className="text-xs text-muted-foreground/40 font-bold capitalize tracking-widest">
                    Showing {filteredJobs.length} total active pipelines
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs font-bold capitalize text-primary/80 hover:text-primary h-7"
                  >
                    View Archive
                  </Button>
                </FrameFooter>
              </FramePanel>
            </Frame>
          </section>
        </div>

        <div className="w-full xl:w-[380px] space-y-6">
          <Frame>
            <FramePanel className="p-0 overflow-hidden bg-card">
              <FrameHeader>
                <div>
                  <FrameTitle>Recent Candidates</FrameTitle>
                  <FrameDescription>
                    Latest movements in your hiring pipelines
                  </FrameDescription>
                </div>
              </FrameHeader>
              <FrameContent className="p-0">
                <div className="divide-y divide-border/5">
                  {recentCandidates.map((candidate) => (
                    <div
                      key={candidate.id}
                      className="p-5 hover:bg-muted/5 transition-colors group/candidate cursor-pointer"
                    >
                      <div className="flex items-start gap-4">
                        <UserAvatar
                          name={candidate.name}
                          size="default"
                          className="shadow-sm border border-border/10 group-hover/candidate:scale-[1.02] transition-transform"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-sm font-semibold text-foreground/90 leading-tight truncate">
                              {candidate.name}
                            </p>
                            <span className="text-xs font-bold text-muted-foreground/40 uppercase tracking-widest shrink-0 whitespace-nowrap mt-0.5">
                              {candidate.time}
                            </span>
                          </div>
                          <p className="text-xs font-medium text-muted-foreground/60 mt-1 truncate">
                            {candidate.role}
                          </p>
                          <div className="mt-3">
                            <Badge
                              variant={candidate.status as any}
                              className="h-5 rounded-md px-2 text-xs"
                            >
                              {candidate.stage}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </FrameContent>
              <FrameFooter className="border-t border-border/5">
                <Button
                  variant="outline"
                  className="w-full h-8 text-xs font-bold rounded-lg border-border/40 text-muted-foreground/70 hover:text-foreground"
                >
                  View Talent Pool
                </Button>
              </FrameFooter>
            </FramePanel>
          </Frame>

          <Frame>
            <FramePanel className="p-5 flex items-center justify-between bg-primary/[0.02] border-primary/10">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shadow-sm shadow-primary/5">
                  <HugeiconsIcon icon={UserAdd01Icon} size={20} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground/90 leading-none mb-1">
                    External Agency
                  </p>
                  <p className="text-xs font-medium text-muted-foreground/50">
                    Invite recruiters to collaborate
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                size="icon-sm"
                className="rounded-lg text-primary hover:bg-primary/10"
              >
                <HugeiconsIcon icon={MoreHorizontalIcon} size={16} />
              </Button>
            </FramePanel>
          </Frame>
        </div>
      </div>
    </main>
  );
}

const RecruitmentStatCard = React.memo(function RecruitmentStatCard({
  label,
  value,
  change,
  up,
  icon: Icon,
  variant,
  sub,
}: {
  label: string;
  value: string;
  change: string;
  up: boolean;
  icon: any;
  variant:
    | "primary"
    | "success"
    | "warning"
    | "destructive"
    | "info"
    | "accent";
  sub?: string;
}) {
  return (
    <Frame className="group/stat h-full">
      <FramePanel className="p-5 flex flex-col justify-between h-full bg-card">
        <div className="flex items-center justify-between">
          <div
            className={cn(
              "h-9 w-9 rounded-xl flex items-center justify-center border border-border/10 transition-colors shadow-sm",
              variant === "primary" &&
                "bg-primary/10 text-primary border-primary/20",
              variant === "success" &&
                "bg-success/10 text-success border-success/20",
              variant === "warning" &&
                "bg-warning/10 text-warning border-warning/20",
              variant === "destructive" &&
                "bg-destructive/10 text-destructive border-destructive/20",
              variant === "info" && "bg-info/10 text-info border-info/20",
              variant === "accent" &&
                "bg-accent/10 text-accent border-accent/20",
            )}
          >
            <HugeiconsIcon icon={Icon} size={18} strokeWidth={2} />
          </div>
          <Badge
            variant="muted"
            className={cn(
              "border-none px-1.5 py-0.5 rounded-md font-bold",
              up
                ? "text-success bg-success/10"
                : "text-destructive bg-destructive/10",
            )}
          >
            <span className="text-xs">{change}</span>
          </Badge>
        </div>
        <div className="mt-6">
          <h3 className="text-2xl font-semibold tracking-tight text-foreground/90 tabular-nums leading-none mb-1.5">
            {value}
          </h3>
          <div className="text-xs font-bold text-muted-foreground/40 capitalize tracking-widest">
            {label}
          </div>
          {sub ? (
            <p className="text-xs text-muted-foreground/30 font-medium mt-1 tracking-tight">
              {sub}
            </p>
          ) : null}
        </div>
      </FramePanel>
    </Frame>
  );
});
