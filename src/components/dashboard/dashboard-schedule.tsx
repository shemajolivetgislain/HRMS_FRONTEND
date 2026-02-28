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
import { UserAvatar } from "@/components/dashboard/user-avatar";
import { AvatarGroup, AvatarGroupCount } from "@/components/ui/avatar";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft01Icon, ArrowRight01Icon, Calendar03Icon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

const events = [
  {
    time: "10:00",
    duration: "10:00–11:00",
    title: "Kickoff with Product",
    attendees: ["John", "Alice", "Robert"],
    accent: "var(--chart-1)",
  },
  {
    time: "12:00",
    duration: "12:00–13:00",
    title: "Design Review",
    attendees: ["Michael", "Sarah"],
    accent: "var(--chart-2)",
  },
  {
    time: "13:00",
    duration: "13:00–16:00",
    title: "All Hands Meeting",
    attendees: ["Tom"],
    extra: "+41",
    accent: "var(--chart-4)",
  },
  {
    time: "16:30",
    duration: "16:30–17:30",
    title: "Client Sync: Healthcare",
    attendees: ["Kevin", "Lisa"],
    accent: "var(--chart-3)",
  },
  {
    time: "18:00",
    duration: "18:00–19:00",
    title: "Weekly Wrap-up",
    attendees: ["David", "Emma", "Frank"],
    accent: "var(--chart-5)",
  },
];

export const DashboardSchedule = React.memo(function DashboardSchedule() {
  return (
    <Frame className="h-full group/frame">
      <FramePanel className="flex flex-col h-full overflow-hidden bg-card">
        <FrameHeader>
          <div>
            <FrameTitle>Schedule</FrameTitle>
            <FrameDescription>Upcoming team events</FrameDescription>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 px-1.5 py-1 rounded-lg bg-muted/30 border border-border/5">
              <button 
                type="button"
                className="text-muted-foreground/30 hover:text-foreground transition-colors"
                aria-label="Previous month"
              >
                <HugeiconsIcon icon={ArrowLeft01Icon} size={12} strokeWidth={2.5} />
              </button>
              <span className="text-[10px] font-bold capitalize tracking-wider tabular-nums px-1.5 opacity-60">Dec 2023</span>
              <button 
                type="button"
                className="text-muted-foreground/30 hover:text-foreground transition-colors"
                aria-label="Next month"
              >
                <HugeiconsIcon icon={ArrowRight01Icon} size={12} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </FrameHeader>

        <FrameContent className="p-0 flex-1 overflow-auto">
          {/* tabs */}
          <div className="flex gap-6 px-6 py-2.5 border-b border-border/5 bg-muted/5">
            <button 
              type="button"
              className="relative flex items-center gap-2 text-[10px] font-bold capitalize tracking-widest text-foreground/80"
            >
              Meetings
              <span className="bg-foreground/10 text-foreground/60 rounded px-1 py-0.5 text-[9px] font-black">5</span>
              <span className="absolute -bottom-[11px] left-0 right-0 h-0.5 bg-foreground/40 rounded-full" />
            </button>
            <button 
              type="button"
              className="flex items-center gap-2 text-[10px] font-bold capitalize tracking-widest text-muted-foreground/30 hover:text-muted-foreground/50 transition-colors"
            >
              Tasks
              <span className="bg-muted text-muted-foreground/30 rounded px-1 py-0.5 text-[9px] font-bold">6</span>
            </button>
          </div>

          <div className="p-6 relative">
            {/* timeline line */}
            <div className="absolute left-[31px] top-6 bottom-6 w-px bg-border/10" />

            <div className="flex flex-col gap-5">
              {events.map((ev, i) => (
                <div key={i} className="relative pl-10 group/event">
                  <span className="absolute left-0 top-3 text-[10px] tabular-nums font-bold text-muted-foreground/20">
                    {ev.time}
                  </span>
                  
                  {/* dot */}
                  <div
                    className="absolute left-[28px] top-[14px] h-1.5 w-1.5 rounded-full ring-4 ring-background z-10"
                    style={{ background: ev.accent }}
                  />

                  <div
                    className="rounded-[12px] border border-border/10 p-3.5 transition-[transform,background-color] duration-200 hover:bg-muted/5 group-hover/event:translate-x-0.5"
                    style={{
                      background: `color-mix(in srgb, ${ev.accent} 2%, transparent)`,
                    }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="text-[13px] font-semibold text-foreground/80 truncate leading-none">
                          {ev.title}
                        </p>
                        <p className="text-[10px] text-muted-foreground/40 mt-2 font-medium flex items-center gap-1.5">
                          <HugeiconsIcon icon={Calendar03Icon} size={10} strokeWidth={2.5} />
                          {ev.duration}
                        </p>
                      </div>
                      
                      <div className="flex items-center shrink-0">
                        <AvatarGroup>
                          {ev.attendees.map((name, j) => (
                            <UserAvatar 
                              key={j}
                              name={name}
                              size="sm"
                              className="size-5 border-2 border-background"
                            />
                          ))}
                          {ev.extra ? (
                            <AvatarGroupCount className="size-5 text-[8px] font-black border-2 border-background bg-muted">
                              {ev.extra}
                            </AvatarGroupCount>
                          ) : null}
                        </AvatarGroup>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FrameContent>
      </FramePanel>
    </Frame>
  );
});
