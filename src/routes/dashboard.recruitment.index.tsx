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
  JobShareIcon,
  Download01Icon,
  Search01Icon,
  FilterIcon,
  PlusSignCircleIcon,
  MoreHorizontalIcon,
  UserMultiple02Icon,
  Sorting05Icon,
  Mail01Icon,
  Briefcase01Icon,
  Location01Icon,
  UserAdd01Icon,
  Delete02Icon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { UserAvatar } from "@/components/dashboard/user-avatar";
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
import { api } from "@/lib/mock-api";
import { toast } from "sonner";
import { DashboardPending } from "@/components/dashboard/dashboard-pending";
import { StatCard } from "@/components/dashboard/stat-card";
import { Textarea } from "@/components/ui/textarea";

// sample candidates data
const recentCandidates = [
  {
    id: 1,
    name: "Alice Cooper",
    role: "Senior Frontend Engineer",
    stage: "Interview",
    time: "2h ago",
    status: "info" as const,
  },
  {
    id: 2,
    name: "Marcus Webb",
    role: "Product Designer",
    stage: "Screening",
    time: "4h ago",
    status: "warning" as const,
  },
  {
    id: 3,
    name: "Jada Smith",
    role: "HR Specialist",
    stage: "New Applied",
    time: "5h ago",
    status: "success" as const,
  },
];

export const Route = createFileRoute("/dashboard/recruitment/")({
  loader: async () => await api.getJobs(),
  pendingComponent: DashboardPending,
  component: RecruitmentPage,
});

function RecruitmentPage() {
  const jobs = Route.useLoaderData();
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newJob, setNewJob] = useState({
    title: "",
    dept: "",
    type: "",
    location: "",
    description: "",
  });

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.dept.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handlePublishJob = async () => {
    if (!newJob.title || !newJob.dept) {
      toast.error("provide role title and department");
      return;
    }
    try {
      await api.addJobOpening({
        title: newJob.title,
        dept: newJob.dept,
        type: newJob.type || "Full-time",
        location: newJob.location || "On-site",
        description: newJob.description,
        status: "published",
      });
      toast.success("job position published");
      setIsDialogOpen(false);
      setNewJob({ title: "", dept: "", type: "", location: "", description: "" });
      window.location.reload();
    } catch (err) {
      toast.error("failed to publish job opening");
    }
  };

  return (
    <main className="flex flex-1 flex-col gap-0 overflow-hidden bg-muted/20">
      <DashboardHeader
        category="talent"
        title="Recruitment"
        description="source and manage hiring pipelines"
      >
        <Button
          variant="outline"
          size="sm"
          className="text-xs font-bold border-border/40 hover:bg-muted/50 gap-2 uppercase tracking-widest"
        >
          <HugeiconsIcon icon={Download01Icon} size={14} strokeWidth={2} />
          Report
        </Button>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger
            render={
              <Button size="sm" className="text-xs font-bold gap-2 uppercase tracking-widest">
                <HugeiconsIcon
                  icon={PlusSignCircleIcon}
                  size={14}
                  strokeWidth={2}
                />
                Create
              </Button>
            }
          />
          <DialogContent className="sm:max-w-[600px] rounded-2xl">
            <DialogHeader>
              <DialogTitle>publish new role</DialogTitle>
              <DialogDescription>
                define a new job opening for the global recruitment portal.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 ml-1">title</Label>
                  <Input
                    id="title"
                    placeholder="e.g. Product Manager"
                    className="h-10 bg-muted/5 border-border/40 focus:bg-background"
                    value={newJob.title}
                    onChange={(e) =>
                      setNewJob({ ...newJob, title: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dept" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 ml-1">department</Label>
                  <Select
                    value={newJob.dept}
                    onValueChange={(val) =>
                      setNewJob({ ...newJob, dept: val || "" })
                    }
                  >
                    <SelectTrigger id="dept" className="h-10 bg-muted/5 border-border/40 focus:bg-background">
                      <SelectValue placeholder="select unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Engineering">Engineering</SelectItem>
                      <SelectItem value="Design">Design</SelectItem>
                      <SelectItem value="Operations">Operations</SelectItem>
                      <SelectItem value="Sales">Sales</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 ml-1">description</Label>
                <Textarea
                  id="description"
                  placeholder="responsibilities and requirements..."
                  className="min-h-[120px] bg-muted/5 border-border/40 focus:bg-background resize-none"
                  value={newJob.description}
                  onChange={(e) =>
                    setNewJob({ ...newJob, description: e.target.value })
                  }
                />
              </div>
            </div>
            <DialogFooter className="bg-muted/5 -mx-6 -mb-6 p-6 rounded-b-2xl border-t border-border/5">
              <Button variant="ghost" onClick={() => setIsDialogOpen(false)} className="font-bold text-xs uppercase tracking-widest">
                cancel
              </Button>
              <Button
                type="submit"
                onClick={handlePublishJob}
                className="font-bold px-8 h-10 rounded-xl"
              >
                Publish Role
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DashboardHeader>

      <div className="flex flex-col xl:flex-row gap-8 pb-12 flex-1 overflow-auto no-scrollbar px-4 lg:px-6">
        <div className="flex-1 min-w-0 space-y-8">
          <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatCard
              label="Active Openings"
              value={jobs.length}
              icon={JobShareIcon}
              variant="primary"
              sub="Roles published"
            />
            <StatCard
              label="Total Applicants"
              value="132"
              icon={UserMultiple02Icon}
              variant="info"
              sub="Pipeline across roles"
            />
            <StatCard
              label="Time to Hire"
              value="18d"
              icon={Sorting05Icon}
              variant="success"
              sub="Average duration"
            />
          </section>

          <section>
            <Frame className="group/frame">
              <FramePanel className="p-0 overflow-hidden bg-card border-border/40">
                <FrameHeader className="border-b-0 pb-2 px-8 pt-8">
                  <div>
                    <FrameTitle className="text-lg font-bold">Active Pipelines</FrameTitle>
                    <FrameDescription className="text-xs font-medium">
                      Monitor and manage active hiring cycles
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
                      placeholder="Search roles or units…"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9 h-10 rounded-xl border-border/40 bg-muted/5 focus:bg-background transition-all text-sm"
                    />
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-10 px-4 rounded-xl border-border/40 gap-2 text-[10px] font-black uppercase tracking-widest"
                  >
                    <HugeiconsIcon icon={FilterIcon} size={14} />
                    Refine
                  </Button>
                </div>

                <FrameContent className="p-0">
                  <Table>
                    <TableHeader className="bg-muted/5">
                      <TableRow className="hover:bg-transparent border-border/5">
                        <TableHead className="text-[10px] font-bold text-muted-foreground/40 capitalize tracking-widest pl-8 py-4 w-[300px]">
                          Specification
                        </TableHead>
                        <TableHead className="text-[10px] font-bold text-muted-foreground/40 capitalize tracking-widest px-4 py-4">
                          Density
                        </TableHead>
                        <TableHead className="text-[10px] font-bold text-muted-foreground/40 capitalize tracking-widest px-4 py-4">
                          Status
                        </TableHead>
                        <TableHead className="text-[10px] font-bold text-muted-foreground/40 capitalize tracking-widest px-4 py-4 text-right pr-8">
                          Management
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredJobs.map((job) => (
                        <TableRow
                          key={job.id}
                          className="border-border/5 hover:bg-muted/5 transition-colors group"
                        >
                          <TableCell className="pl-8 py-5">
                            <div>
                              <p className="text-sm font-bold text-foreground/90 group-hover:text-primary transition-colors leading-none">
                                {job.title}
                              </p>
                              <div className="flex items-center gap-3 mt-2 text-xs font-semibold text-muted-foreground/40 uppercase tracking-widest">
                                <span className="flex items-center gap-1.5">
                                  <HugeiconsIcon
                                    icon={Briefcase01Icon}
                                    size={12}
                                  />
                                  {job.dept}
                                </span>
                                <span>•</span>
                                <span className="flex items-center gap-1.5">
                                  <HugeiconsIcon
                                    icon={Location01Icon}
                                    size={12}
                                  />
                                  {job.location}
                                </span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="px-4">
                            <div className="flex items-center gap-3">
                              <div className="flex items-center justify-center h-8 w-12 rounded-lg bg-primary/5 text-primary text-sm font-black tabular-nums border border-primary/10">
                                {job.applicants}
                              </div>
                              <span className="text-[10px] font-black text-muted-foreground/30 uppercase tracking-widest">
                                in queue
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="px-4">
                            <Badge
                              variant={
                                job.status === "published"
                                  ? "success"
                                  : job.status === "draft"
                                    ? "muted"
                                    : "warning"
                              }
                              showDot
                              className="font-bold text-[10px] uppercase tracking-widest h-6"
                            >
                              {job.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right pr-8">
                            <div className="flex items-center justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                render={
                                  <Link
                                    to="/dashboard/recruitment/$id"
                                    params={{ id: job.id }}
                                  />
                                }
                                className="h-9 px-3 text-[10px] font-bold uppercase tracking-widest rounded-lg"
                              >
                                Details
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger
                                  render={
                                    <Button
                                      variant="ghost"
                                      size="icon-sm"
                                      className="rounded-lg bg-muted/20 hover:bg-muted hover:text-foreground transition-all border border-border/5"
                                    >
                                      <HugeiconsIcon
                                        icon={MoreHorizontalIcon}
                                        size={16}
                                        className="text-muted-foreground/60"
                                      />
                                    </Button>
                                  }
                                />
                                <DropdownMenuContent
                                  align="end"
                                  className="w-52 rounded-2xl border-border/40 shadow-2xl p-2"
                                >
                                  <DropdownMenuItem className="rounded-xl py-2.5 font-semibold text-sm">
                                    <HugeiconsIcon icon={UserAdd01Icon} className="size-4 mr-3 text-muted-foreground/60" />
                                    <span>Add Candidate</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="rounded-xl py-2.5 font-semibold text-sm">
                                    <HugeiconsIcon icon={Mail01Icon} className="size-4 mr-3 text-muted-foreground/60" />
                                    <span>Broadcast</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator className="bg-border/5 my-1" />
                                  <AlertDialog>
                                    <AlertDialogTrigger render={
                                      <DropdownMenuItem onSelect={e => e.preventDefault()} className="rounded-xl py-2.5 font-semibold text-sm text-destructive focus:bg-destructive/5">
                                        <HugeiconsIcon icon={Delete02Icon} className="size-4 mr-3" />
                                        <span>Close Opening</span>
                                      </DropdownMenuItem>
                                    } />
                                    <AlertDialogContent>
                                      <AlertDialogHeader>
                                        <AlertDialogTitle>close job opening?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                          this will archive the role and notify pending candidates. this action is recorded for metrics.
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel>keep open</AlertDialogCancel>
                                        <AlertDialogAction className="bg-destructive hover:bg-destructive/90">
                                          Archive Role
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
                  <p className="text-[10px] text-muted-foreground/40 font-bold uppercase tracking-[0.2em]">
                    Registry Ledger: {filteredJobs.length} active requisitions
                  </p>
                </FrameFooter>
              </FramePanel>
            </Frame>
          </section>
        </div>

        <div className="w-full xl:w-[400px] space-y-8">
          <Frame>
            <FramePanel className="p-0 overflow-hidden bg-card border-border/40 shadow-sm">
              <FrameHeader className="px-8 pt-8 border-b-0 pb-2">
                <div>
                  <FrameTitle className="text-base font-bold">Recent Candidates</FrameTitle>
                  <FrameDescription className="text-xs font-medium uppercase tracking-widest opacity-60">Latest movements</FrameDescription>
                </div>
              </FrameHeader>
              <FrameContent className="p-0 pt-4">
                <div className="divide-y divide-border/5">
                  {recentCandidates.map((candidate) => (
                    <div
                      key={candidate.id}
                      className="p-6 hover:bg-muted/5 transition-all group/candidate cursor-pointer"
                    >
                      <div className="flex items-start gap-4">
                        <UserAvatar
                          name={candidate.name}
                          size="lg"
                          className="rounded-xl ring-2 ring-background shadow-sm"
                        />
                        <div className="flex-1 min-w-0 pt-0.5">
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-sm font-bold text-foreground/90 leading-tight truncate group-hover/candidate:text-primary transition-colors">
                              {candidate.name}
                            </p>
                            <span className="text-[9px] font-black text-muted-foreground/30 uppercase tracking-widest shrink-0 mt-0.5 tabular-nums">
                              {candidate.time}
                            </span>
                          </div>
                          <p className="text-[10px] font-semibold text-muted-foreground/60 mt-1 truncate uppercase tracking-wider">
                            {candidate.role}
                          </p>
                          <div className="mt-4">
                            <Badge
                              variant={candidate.status}
                              className="h-5 rounded-lg px-2 text-[9px] font-black uppercase tracking-widest"
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
              <FrameFooter className="border-t border-border/5 px-8 py-6">
                <Button
                  variant="outline"
                  className="w-full h-10 text-[10px] font-black uppercase tracking-widest rounded-xl border-border/40 text-muted-foreground/70 hover:text-foreground transition-all"
                >
                  View Global Talent Pool
                </Button>
              </FrameFooter>
            </FramePanel>
          </Frame>

          <Frame>
            <FramePanel className="p-8 flex flex-col gap-6 bg-primary/[0.02] border-primary/10 rounded-[2rem] relative overflow-hidden group">
              <div className="flex items-center gap-4 relative z-10">
                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-sm shadow-primary/5">
                  <HugeiconsIcon icon={UserAdd01Icon} size={24} />
                </div>
                <div>
                  <p className="text-base font-bold text-foreground/90 leading-none mb-1.5">
                    External Agencies
                  </p>
                  <p className="text-xs font-semibold text-muted-foreground/50 tracking-tight">
                    Invite recruiters to collaborate
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full h-10 rounded-xl font-bold text-xs uppercase tracking-widest border-primary/20 text-primary hover:bg-primary/5 relative z-10"
              >
                Provision Access
                <HugeiconsIcon icon={ArrowRight01Icon} size={14} className="ml-2" />
              </Button>
            </FramePanel>
          </Frame>
        </div>
      </div>
    </main>
  );
}
