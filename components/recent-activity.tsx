"use client";

import { Frame, FramePanel } from "@/components/ui/frame";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const activities = [
  {
    user: "Sarah Jenkins",
    avatar: "/avatars/01.png",
    fallback: "SJ",
    action: "approved a new company registration",
    target: "TechFlow Solutions",
    time: "2 mins ago",
  },
  {
    user: "Michael Chen",
    avatar: "/avatars/02.png",
    fallback: "MC",
    action: "updated billing settings for",
    target: "Acme Corp",
    time: "15 mins ago",
  },
  {
    user: "Emma Davis",
    avatar: "/avatars/03.png",
    fallback: "ED",
    action: "resolved a support ticket for",
    target: "Global Industries",
    time: "1 hour ago",
  },
  {
    user: "System",
    avatar: "/avatars/04.png",
    fallback: "SY",
    action: "automatically rotated API keys for",
    target: "Payment Gateway",
    time: "3 hours ago",
  },
  {
    user: "David Wilson",
    avatar: "/avatars/05.png",
    fallback: "DW",
    action: "suspended user account in",
    target: "Healthcare Plus",
    time: "5 hours ago",
  },
];

export function RecentActivity() {
  return (
    <Frame className="h-full">
      <FramePanel className="flex h-full flex-col gap-5 p-5 lg:p-6">
        <div className="flex items-center justify-between border-b border-border/20 pb-4">
          <h3 className="text-[11px] font-medium text-muted-foreground tracking-widest uppercase">
            Recent Activity
          </h3>
          <span className="text-[10px] uppercase tracking-widest text-primary cursor-pointer hover:underline transition-colors">
            View All
          </span>
        </div>
        <div className="flex flex-col gap-6 pt-2">
          {activities.map((activity, i) => (
            <div
              key={i}
              className="group flex gap-4 items-start relative before:absolute before:inset-y-0 before:-left-[18px] before:w-px before:bg-border/20 hover:before:bg-primary/50 transition-colors"
            >
              <Avatar className="size-8 rounded-full shrink-0 border border-border/20 bg-background mix-blend-luminosity hover:mix-blend-normal transition-all duration-300">
                <AvatarImage src={activity.avatar} />
                <AvatarFallback className="rounded-full bg-muted/30 text-[10px] font-light tracking-wide text-foreground/70">
                  {activity.fallback}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-1 w-full translate-y-[-2px]">
                <div className="text-sm leading-relaxed text-muted-foreground">
                  <span className="font-semibold text-foreground tracking-tight mr-1">
                    {activity.user}
                  </span>
                  {activity.action}
                  <span className="font-semibold text-foreground tracking-tight ml-1">
                    {activity.target}
                  </span>
                </div>
                <div className="text-[10px] text-muted-foreground/50 uppercase tracking-widest font-medium mt-0.5">
                  {activity.time}
                </div>
              </div>
            </div>
          ))}
        </div>
      </FramePanel>
    </Frame>
  );
}
