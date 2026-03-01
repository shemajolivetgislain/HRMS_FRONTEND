import React, { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Frame,
  FramePanel,
  FrameHeader,
  FrameTitle,
  FrameDescription,
  FrameContent,
  FrameFooter,
} from "@/components/ui/frame";
import { Badge } from "@/components/ui/badge";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowLeft01Icon,
  Download01Icon,
  MoreHorizontalIcon,
  Calendar01Icon,
  UserMultiple02Icon,
  Briefcase01Icon,
  Location01Icon,
  Mail01Icon,
  UserAdd01Icon,
  Sorting05Icon,
  ViewIcon,
  PlusSignCircleIcon,
  Tick01Icon,
} from "@hugeicons/core-free-icons";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { UserAvatar } from "@/components/dashboard/user-avatar";
import { cn } from "@/lib/utils";
import { api } from "@/lib/mock-api";
import { DashboardPending } from "@/components/dashboard/dashboard-pending";
import { ErrorComponent } from "@/components/error-component";

export const Route = createFileRoute("/dashboard/recruitment/$id")({
  loader: async ({ params }) => {
    const [job, candidates] = await Promise.all([
      api.getJob(params.id),
      api.getApplicants(params.id)
    ]);
    if (!job) throw new Error("Job opening not found");
    return { job, candidates };
  },
  pendingComponent: DashboardPending,
  errorComponent: ErrorComponent,
  component: RecruitmentDetailsPage,
});

function RecruitmentDetailsPage() {
  const { job: role, candidates } = Route.useLoaderData();

  return (
    <main className="flex flex-1 flex-col gap-0 overflow-hidden">
      <DashboardHeader
        category="Talent"
        title={role.title}
        description={`Management console for opening ${role.id}`}
      >
        <Button
          variant="outline"
          size="lg"
          className="text-[12px] font-semibold border-border/60 shadow-none hover:bg-muted/50 gap-2 capitalize"
          render={<Link to="/dashboard/recruitment" />}
        >
          <HugeiconsIcon icon={ArrowLeft01Icon} size={14} strokeWidth={2} />
          Back
        </Button>
        <Button
          size="lg"
          className="h-9 px-4 rounded-lg text-[12px] font-bold shadow-sm gap-2 capitalize"
        >
          <HugeiconsIcon icon={UserAdd01Icon} size={14} strokeWidth={2} />
          Add Candidate
        </Button>
      </DashboardHeader>

      <div className="flex flex-col xl:flex-row gap-4 pb-12 flex-1 overflow-auto no-scrollbar px-4 lg:px-6">
        {/* Left: Candidates Table */}
        <div className="flex-1 min-w-0">
          <Frame className="group/frame">
            <FramePanel className="p-0 overflow-hidden bg-card">
              <FrameHeader>
                <div>
                  <FrameTitle>Active Applications</FrameTitle>
                  <FrameDescription>
                    Candidates currently in the hiring pipeline
                  </FrameDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="font-bold text-xs uppercase tracking-widest gap-2"
                >
                  <HugeiconsIcon icon={Sorting05Icon} size={14} />
                  Ranking
                </Button>
              </FrameHeader>
              <FrameContent className="p-0">
                <div className="divide-y divide-border/5">
                  {candidates.map((can) => (
                    <div
                      key={can.id}
                      className="p-5 hover:bg-muted/5 transition-all group/can cursor-pointer"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                        <div className="flex items-center gap-4 min-w-0">
                          <UserAvatar
                            name={`${can.firstName} ${can.lastName}`}
                            size="default"
                            className="shadow-sm border border-border/10"
                          />
                          <div className="min-w-0">
                            <p className="text-[14px] font-semibold text-foreground/90 leading-tight">
                              {can.firstName} {can.lastName}
                            </p>
                            <p className="text-xs font-medium text-muted-foreground/50 mt-1.5">
                              Applied {can.appliedAt}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-8 shrink-0">
                          <div className="flex flex-col items-end gap-1">
                            <p className="text-[9px] font-bold text-muted-foreground/30 uppercase tracking-widest">
                              Score
                            </p>
                            <p className="text-sm font-bold text-foreground/80 tabular-nums">
                              {can.score.toFixed(1)}
                            </p>
                          </div>
                          <div className="flex flex-col gap-1 w-28">
                            <p className="text-[9px] font-bold text-muted-foreground/30 uppercase tracking-widest">
                              Stage
                            </p>
                            <Badge
                              variant="muted"
                              className="h-5 px-2 rounded-md font-bold text-[9px] uppercase tracking-widest border-none bg-primary/5 text-primary whitespace-nowrap"
                            >
                              {can.stage}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center gap-2 pl-4 border-l border-border/5">
                            {can.stage === "Offer Sent" ? (
                              <Button
                                size="sm"
                                className="bg-success hover:bg-success/90 text-white font-bold text-xs uppercase gap-1.5 h-8 px-3"
                              >
                                <HugeiconsIcon icon={Tick01Icon} size={12} strokeWidth={3} />
                                Hire
                              </Button>
                            ) : (
                              <Button
                                variant="outline"
                                size="sm"
                                className="font-bold text-xs uppercase h-8 px-3"
                              >
                                Review
                              </Button>
                            )}
                            
                            <Button
                              variant="ghost"
                              size="icon-sm"
                              className="rounded-lg opacity-40 group-hover/can:opacity-100 transition-opacity"
                              aria-label="Candidate actions"
                            >
                              <HugeiconsIcon
                                icon={MoreHorizontalIcon}
                                className="size-4"
                              />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </FrameContent>
              <FrameFooter className="flex items-center justify-between py-4">
                <span className="text-xs text-muted-foreground/40 font-bold capitalize tracking-widest">
                  Showing {candidates.length} of {role.applicants} applicants
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 text-xs font-bold text-primary/60 hover:text-primary capitalize"
                >
                  Download Resumes
                </Button>
              </FrameFooter>
            </FramePanel>
          </Frame>
        </div>

        {/* Right: Role Metadata */}
        <div className="w-full xl:w-[320px] space-y-4">
          <Frame>
            <FramePanel className="p-0 overflow-hidden bg-card">
              <FrameHeader>
                <FrameTitle>Role Details</FrameTitle>
              </FrameHeader>
              <FrameContent className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-muted-foreground/40 capitalize tracking-widest">
                      Status
                    </p>
                    <Badge
                      variant="success"
                      showDot
                      className="h-5 rounded-md text-[9px] uppercase tracking-widest px-1.5"
                    >
                      {role.status}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-muted-foreground/40 capitalize tracking-widest">
                      Dept
                    </p>
                    <p className="text-sm font-semibold text-foreground/80">
                      {role.dept}
                    </p>
                  </div>
                </div>
                <div className="space-y-4 pt-4 border-t border-border/5">
                  <MetaItem
                    icon={Briefcase01Icon}
                    label="Employment"
                    value={role.type}
                  />
                  <MetaItem
                    icon={Location01Icon}
                    label="Location"
                    value={role.location}
                  />
                  <MetaItem
                    icon={Calendar01Icon}
                    label="Posted"
                    value={role.date}
                  />
                </div>
              </FrameContent>
              <FrameFooter>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full font-bold capitalize gap-2 text-xs hover:bg-muted/50"
                >
                  <HugeiconsIcon icon={Download01Icon} size={14} />
                  Job Description
                </Button>
              </FrameFooter>
            </FramePanel>
          </Frame>

          <Frame>
            <FramePanel className="p-5 bg-card">
              <p className="text-xs font-bold text-muted-foreground/40 capitalize tracking-widest mb-4">
                Hiring Team
              </p>
              <div className="flex items-center gap-3">
                <UserAvatar
                  name="Sarah"
                  size="sm"
                  className="border border-border/10"
                />
                <UserAvatar
                  name="Michael"
                  size="sm"
                  className="border border-border/10"
                />
                <div className="size-8 rounded-full border border-dashed border-border/40 flex items-center justify-center text-muted-foreground/30 hover:border-primary/20 hover:text-primary transition-colors cursor-pointer">
                  <HugeiconsIcon icon={PlusSignCircleIcon} size={14} />
                </div>
              </div>
            </FramePanel>
          </Frame>
        </div>
      </div>
    </main>
  );
}

function MetaItem({
  icon: Icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="text-muted-foreground/30 mt-0.5">
        <HugeiconsIcon icon={Icon} size={14} strokeWidth={2.5} />
      </div>
      <div>
        <p className="text-xs font-bold text-muted-foreground/40 capitalize tracking-widest leading-none mb-1.5">
          {label}
        </p>
        <p className="text-sm font-semibold text-foreground/80">{value}</p>
      </div>
    </div>
  );
}
