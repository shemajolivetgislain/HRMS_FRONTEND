"use client";

import * as React from "react";
import {
  Frame,
  FramePanel,
  FrameHeader,
  FrameTitle,
  FrameContent,
} from "@/components/ui/frame";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/dashboard/user-avatar";

const activities = [
  {
    user: "HR Manager",
    avatar: "",
    action: "added new department:",
    target: "Engineering",
    time: "2m ago",
    status: "online" as const,
  },
  {
    user: "System Admin",
    avatar: "",
    action: "assigned job title to",
    target: "Jean Paul Nkurunziza",
    time: "15m ago",
    status: "away" as const,
  },
  {
    user: "Recruitment Team",
    avatar: "",
    action: "moved applicant to Interview stage:",
    target: "Moses Mugisha",
    time: "1h ago",
    status: "online" as const,
  },
  {
    user: "System",
    avatar: "",
    action: "uploaded contract for",
    target: "Divine Uwase",
    time: "3h ago",
    status: "online" as const,
  },
];

export const RecentActivity = React.memo(function RecentActivity() {
  return (
    <Frame className="h-full group/frame">
      <FramePanel className="flex flex-col h-full bg-card overflow-hidden">
        <FrameHeader className="border-b-0 pb-2">
          <div>
            <FrameTitle className="text-xs uppercase tracking-[0.2em] text-muted-foreground/50">Activity</FrameTitle>
            <FrameTitle className="text-lg normal-case mt-1">Recent Events</FrameTitle>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs font-bold uppercase tracking-widest text-primary hover:bg-primary/5"
          >
            All Logs
          </Button>
        </FrameHeader>

        <FrameContent className="p-6 pt-4 flex-1">
          <div className="relative space-y-6 before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-px before:bg-border/40">
            {activities.map((activity, idx) => (
              <div
                key={`${activity.user}-${idx}`}
                className="relative flex items-start gap-4 group/item"
              >
                <div className="relative z-10">
                  <UserAvatar
                    src={activity.avatar}
                    name={activity.user}
                    size="sm"
                    status={activity.status}
                    className="shrink-0 rounded-lg ring-4 ring-background shadow-sm"
                  />
                </div>
                
                <div className="flex flex-col gap-1 min-w-0 flex-1 pt-0.5">
                  <p className="text-[13px] leading-tight text-muted-foreground font-medium">
                    <span className="font-bold text-foreground transition-colors group-hover/item:text-primary">
                      {activity.user}
                    </span>{" "}
                    {activity.action}{" "}
                    <span className="font-bold text-foreground/90">
                      {activity.target}
                    </span>
                  </p>
                  <span className="text-[10px] text-muted-foreground/40 font-bold uppercase tracking-widest tabular-nums">
                    {activity.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </FrameContent>
      </FramePanel>
    </Frame>
  );
});
