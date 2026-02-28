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
  Clock01Icon,
  Mail01Icon,
  UserAdd01Icon,
  Sorting05Icon,
  ViewIcon,
  PlusSignCircleIcon,
} from "@hugeicons/core-free-icons";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { UserAvatar } from "@/components/dashboard/user-avatar";
import { cn } from "@/lib/utils";

const candidates = [
  {
    id: "CAN-001",
    name: "Benjamin Rush",
    stage: "Interview",
    score: "4.8",
    applied: "3 days ago",
  },
  {
    id: "CAN-002",
    name: "Elena Gilbert",
    stage: "Screening",
    score: "4.2",
    applied: "5 days ago",
  },
  {
    id: "CAN-003",
    name: "Stefan Salvatore",
    stage: "Assessment",
    score: "3.9",
    applied: "12 hours ago",
  },
  {
    id: "CAN-004",
    name: "Bonnie Bennett",
    stage: "Technical Test",
    score: "4.5",
    applied: "1 week ago",
  },
];

export const Route = createFileRoute("/dashboard/recruitment/$id")({
  component: RecruitmentDetailsPage,
});

function RecruitmentDetailsPage() {
  const role = {
    id: "JOB-101",
    title: "Senior Frontend Engineer",
    dept: "Engineering",
    location: "Remote",
    type: "Full-time",
    posted: "Oct 12, 2023",
    status: "published",
    applicants: 132,
  };

  return (
    <main className="flex flex-1 flex-col gap-0 overflow-hidden">
      <DashboardHeader
        category="Talent"
        title={role.title}
        description={`Management console for opening ${role.id}`}
      >
        <Link to="/dashboard/recruitment">
          <Button
            variant="outline"
            size="sm"
            className="h-9 px-4 rounded-lg text-[12px] font-semibold border-border/60 shadow-none hover:bg-muted/50 gap-2 capitalize"
          >
            <HugeiconsIcon icon={ArrowLeft01Icon} size={14} strokeWidth={2} />
            Back
          </Button>
        </Link>
        <Button
          size="sm"
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
                  className="h-8 rounded-lg font-bold text-[10px] uppercase tracking-widest gap-2"
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
                      <div className="flex items-center justify-between gap-6">
                        <div className="flex items-center gap-4 min-w-0">
                          <UserAvatar
                            name={can.name}
                            size="default"
                            className="shadow-sm border border-border/10"
                          />
                          <div className="min-w-0">
                            <p className="text-[14px] font-semibold text-foreground/90 leading-tight">
                              {can.name}
                            </p>
                            <p className="text-[11px] font-medium text-muted-foreground/50 mt-1.5">
                              Applied {can.applied}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-8 shrink-0">
                          <div className="flex flex-col items-end gap-1">
                            <p className="text-[9px] font-bold text-muted-foreground/30 uppercase tracking-widest">
                              Score
                            </p>
                            <p className="text-[13px] font-bold text-foreground/80 tabular-nums">
                              {can.score}
                            </p>
                          </div>
                          <div className="flex flex-col gap-1 w-24">
                            <p className="text-[9px] font-bold text-muted-foreground/30 uppercase tracking-widest">
                              Stage
                            </p>
                            <Badge
                              variant="muted"
                              className="h-5 px-2 rounded-md font-bold text-[9px] uppercase tracking-widest border-none bg-primary/5 text-primary"
                            >
                              {can.stage}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-1 pl-4 border-l border-border/5">
                            <Button
                              variant="ghost"
                              size="icon-sm"
                              className="rounded-lg opacity-0 group-hover/can:opacity-100 transition-opacity"
                            >
                              <HugeiconsIcon
                                icon={Mail01Icon}
                                className="size-4 opacity-40"
                              />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon-sm"
                              className="rounded-lg opacity-0 group-hover/can:opacity-100 transition-opacity"
                            >
                              <HugeiconsIcon
                                icon={MoreHorizontalIcon}
                                className="size-4 opacity-40"
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
                <span className="text-[10px] text-muted-foreground/40 font-bold capitalize tracking-widest">
                  Showing {candidates.length} of {role.applicants} applicants
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 text-[10px] font-bold text-primary/60 hover:text-primary capitalize"
                >
                  Download All Resumes
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
                    <p className="text-[10px] font-bold text-muted-foreground/40 capitalize tracking-widest">
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
                    <p className="text-[10px] font-bold text-muted-foreground/40 capitalize tracking-widest">
                      Dept
                    </p>
                    <p className="text-[13px] font-semibold text-foreground/80">
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
                    value={role.posted}
                  />
                </div>
              </FrameContent>
              <FrameFooter>
                <Button
                  variant="outline"
                  className="w-full h-9 rounded-lg border-border/40 font-bold capitalize gap-2 text-[11px] hover:bg-muted/50"
                >
                  <HugeiconsIcon icon={Download01Icon} size={14} />
                  Job Description
                </Button>
              </FrameFooter>
            </FramePanel>
          </Frame>

          <Frame>
            <FramePanel className="p-5 bg-card">
              <p className="text-[10px] font-bold text-muted-foreground/40 capitalize tracking-widest mb-4">
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
                <div className="size-8 rounded-full border border-dashed border-border/40 flex items-center justify-center text-muted-foreground/30 hover:border-primary/20 hover:text-primary transition-all cursor-pointer">
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
        <p className="text-[10px] font-bold text-muted-foreground/40 capitalize tracking-widest leading-none mb-1.5">
          {label}
        </p>
        <p className="text-[13px] font-semibold text-foreground/80">{value}</p>
      </div>
    </div>
  );
}
