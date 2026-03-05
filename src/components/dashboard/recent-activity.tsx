"use client";

import * as React from "react";
import {
  Frame,
  FramePanel,
  FrameHeader,
  FrameTitle,
  FrameDescription,
  FrameContent,
} from "@/components/ui/frame";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/dashboard/user-avatar";

const activities = [
  {
    user: "Alice Umutoni",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&h=120&auto=format&fit=crop",
    action: "added new department:",
    target: "Engineering",
    time: "2m ago",
    status: "online" as const,
  },
  {
    user: "Saddy Nkurunziza",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&h=120&auto=format&fit=crop",
    action: "assigned job title to",
    target: "Jean Paul Nkurunziza",
    time: "15m ago",
    status: "away" as const,
  },
  {
    user: "Sarah Kwizera",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=120&h=120&auto=format&fit=crop",
    action: "moved applicant to Interview stage:",
    target: "Moses Mugisha",
    time: "1h ago",
    status: "online" as const,
  },
  {
    user: "System Admin",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=120&h=120&auto=format&fit=crop",
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
        <FrameHeader>
          <div>
            <FrameTitle>Recent Events</FrameTitle>
            <FrameDescription>Activity log across platform</FrameDescription>
          </div>
          <Button variant="ghost" size="sm">
            All Logs
          </Button>
        </FrameHeader>

        <FrameContent className="p-6 flex-1">
          <div className="relative space-y-6 before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-px before:bg-border/40">
            {activities.map((activity, idx) => (
              <div
                key={`${activity.user}-${idx}`}
                className="relative flex items-start gap-4 group/item"
              >
                <div className="relative z-10">
                  <UserAvatar
                    src={activity.image}
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
