"use client";

import * as React from "react";
import { 
  Frame, 
  FramePanel, 
  FrameHeader, 
  FrameTitle, 
  FrameDescription, 
  FrameContent,
  FrameFooter
} from "@/components/ui/frame";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/dashboard/user-avatar";

const activities = [
  {
    user: "Sarah Jenkins",
    avatar: "/avatars/01.png",
    action: "approved a new company registration for",
    target: "TechFlow Solutions",
    time: "2m ago",
    status: "online" as const,
  },
  {
    user: "Michael Chen",
    avatar: "/avatars/02.png",
    action: "updated billing settings for",
    target: "Acme Corp",
    time: "15m ago",
    status: "away" as const,
  },
  {
    user: "Emma Davis",
    avatar: "/avatars/03.png",
    action: "resolved a support ticket for",
    target: "Global Industries",
    time: "1h ago",
    status: "online" as const,
  },
  {
    user: "System",
    avatar: "/avatars/04.png",
    action: "automatically rotated API keys for",
    target: "Payment Gateway",
    time: "3h ago",
    status: "online" as const,
  },
  {
    user: "David Wilson",
    avatar: "/avatars/05.png",
    action: "suspended user account in",
    target: "Healthcare Plus",
    time: "5h ago",
    status: "offline" as const,
  },
];

export const RecentActivity = React.memo(function RecentActivity() {
  return (
    <Frame className="h-full group/frame">
      <FramePanel className="flex flex-col h-full overflow-hidden">
        <FrameHeader>
          <div>
            <FrameTitle>Recent Activity</FrameTitle>
            <FrameDescription>Latest admin actions across all tenants</FrameDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="font-bold capitalize tracking-wider shadow-none hover:bg-muted/50"
          >
            History
          </Button>
        </FrameHeader>

        <FrameContent className="p-0 flex-1">
          <div className="divide-y divide-border/5">
            {activities.map((activity, i) => (
              <div
                key={i}
                className="flex items-start gap-4 px-6 py-4 hover:bg-muted/10 transition-colors group"
              >
                <UserAvatar 
                  src={activity.avatar} 
                  name={activity.user} 
                  size="sm" 
                  status={activity.status}
                  className="shrink-0 mt-0.5 rounded-lg shadow-sm"
                />
                <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                  <p className="text-[13px] leading-relaxed text-muted-foreground/70">
                    <span className="font-semibold text-foreground/90">
                      {activity.user}
                    </span>{" "}
                    {activity.action}{" "}
                    <span className="font-semibold text-foreground/90">
                      {activity.target}
                    </span>
                  </p>
                  <span className="text-[10px] text-muted-foreground/40 font-bold capitalize tracking-[0.1em] mt-1 tabular-nums">
                    {activity.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </FrameContent>

        <FrameFooter>
          <span className="text-[10px] text-muted-foreground/40 font-bold capitalize tracking-widest">
            Showing {activities.length} of 128 events
          </span>
        </FrameFooter>
      </FramePanel>
    </Frame>
  );
});
