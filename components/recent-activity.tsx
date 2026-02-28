"use client";

import { Frame, FramePanel } from "@/components/ui/frame";
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

export function RecentActivity() {
  return (
    <Frame className="h-full">
      <FramePanel className="flex flex-col h-full p-0 overflow-hidden">
        {/* header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border/10">
          <div>
            <h3 className="text-sm font-semibold text-foreground/90">
              Recent Activity
            </h3>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              Admin actions across all tenants
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="h-8 px-3 text-[11px] rounded-lg border-border/50 font-medium shadow-none hover:bg-muted/50"
          >
            View All
          </Button>
        </div>

        {/* activity rows */}
        <div className="flex-1 divide-y divide-border/5">
          {activities.map((activity, i) => (
            <div
              key={i}
              className="flex items-start gap-3.5 px-5 py-3.5 hover:bg-muted/10 transition-colors group"
            >
              <UserAvatar 
                src={activity.avatar} 
                name={activity.user} 
                size="sm" 
                status={activity.status}
                className="shrink-0 mt-0.5"
              />
              <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                <p className="text-[13px] leading-snug text-muted-foreground">
                  <span className="font-semibold text-foreground/90">
                    {activity.user}
                  </span>{" "}
                  {activity.action}{" "}
                  <span className="font-semibold text-foreground/90">
                    {activity.target}
                  </span>
                </p>
              </div>
              <span className="text-[10px] text-muted-foreground/50 shrink-0 mt-0.5 font-medium tabular-nums uppercase tracking-wide">
                {activity.time}
              </span>
            </div>
          ))}
        </div>

        {/* footer */}
        <div className="px-5 py-3 border-t border-border/10 bg-muted/5">
          <span className="text-[10px] text-muted-foreground/50 font-medium">
            Showing {activities.length} of 128 events
          </span>
        </div>
      </FramePanel>
    </Frame>
  );
}
