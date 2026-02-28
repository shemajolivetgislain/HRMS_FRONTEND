"use client";

import {
  Frame,
  FramePanel,
  FrameHeader,
  FrameTitle,
} from "@/components/ui/frame";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";

const events = [
  {
    time: "10:00",
    duration: "10:00–11:00",
    title: "Kickoff with Product",
    attendees: ["J", "A", "R"],
    accent: "var(--chart-1)",
  },
  {
    time: "12:00",
    duration: "12:00–13:00",
    title: "Design Review",
    attendees: ["M", "S"],
    accent: "var(--chart-2)",
  },
  {
    time: "13:00",
    duration: "13:00–16:00",
    title: "All Hands",
    attendees: ["T"],
    extra: "+41",
    accent: "var(--chart-4)",
  },
  {
    time: "16:30",
    duration: "16:30–17:30",
    title: "Client Sync",
    attendees: ["K", "L"],
    accent: "var(--chart-3)",
  },
  {
    time: "18:00",
    duration: "18:00–19:00",
    title: "Weekly Wrap-up",
    attendees: ["D", "E", "F"],
    accent: "var(--chart-5)",
  },
  {
    time: "20:00",
    duration: "20:00–21:00",
    title: "Late Night Focus",
    attendees: ["P"],
    accent: "var(--chart-1)",
  },
];

export function DashboardSchedule() {
  return (
    <Frame className="h-full">
      <FramePanel className="flex flex-col h-full p-0 overflow-hidden">
        <FrameHeader className="flex-row flex items-center justify-between px-5 py-4 border-b border-border/10">
          <FrameTitle className="text-sm font-semibold text-foreground/90">
            Schedule
          </FrameTitle>
          <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
            <button className="hover:text-foreground transition-colors p-0.5">
              <HugeiconsIcon icon={ArrowLeft01Icon} size={13} />
            </button>
            <span className="font-medium tracking-wide">Dec 2023</span>
            <button className="hover:text-foreground transition-colors p-0.5">
              <HugeiconsIcon icon={ArrowRight01Icon} size={13} />
            </button>
          </div>
        </FrameHeader>

        {/* tabs */}
        <div className="flex gap-4 px-5 py-2.5 border-b border-border/10">
          <button className="flex items-center gap-1.5 text-[11px] font-semibold text-primary border-b-2 border-primary pb-0.5">
            Meeting{" "}
            <span className="bg-primary/10 text-primary rounded-md px-1.5 py-px text-[10px] font-bold">
              5
            </span>
          </button>
          <button className="flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground pb-0.5">
            Task{" "}
            <span className="bg-muted text-muted-foreground rounded-md px-1.5 py-px text-[10px]">
              6
            </span>
          </button>
        </div>

        {/* timeline */}
        <div className="flex-1 overflow-auto px-5 py-4">
          <div className="relative pl-10 flex flex-col gap-3">
            {/* timeline line */}
            <div className="absolute left-3.5 top-1 bottom-1 w-px bg-border/30" />

            {events.map((ev, i) => (
              <div key={i} className="relative">
                <span className="absolute -left-10 top-3 text-[10px] tabular-nums font-medium text-muted-foreground/50">
                  {ev.time}
                </span>
                <div
                  className="absolute -left-[13px] top-[13px] h-2 w-2 rounded-full ring-2 ring-background"
                  style={{ background: ev.accent }}
                />
                <div
                  className="rounded-xl border p-3 transition-all duration-200 hover:shadow-sm"
                  style={{
                    borderColor: `color-mix(in srgb, ${ev.accent} 20%, transparent)`,
                    background: `color-mix(in srgb, ${ev.accent} 5%, transparent)`,
                  }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-[12px] font-semibold text-foreground/90 truncate">
                        {ev.title}
                      </p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">
                        {ev.duration}
                      </p>
                    </div>
                    <div className="flex items-center shrink-0">
                      <div className="flex -space-x-1.5">
                        {ev.attendees.map((a, j) => (
                          <Avatar
                            key={j}
                            className="h-5 w-5 border-[1.5px] border-background"
                          >
                            <AvatarFallback
                              className="text-[9px] font-bold"
                              style={{
                                background: `color-mix(in srgb, ${ev.accent} 15%, var(--muted))`,
                                color: ev.accent,
                              }}
                            >
                              {a}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                      {ev.extra && (
                        <span className="ml-1 text-[10px] font-bold text-muted-foreground">
                          {ev.extra}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </FramePanel>
    </Frame>
  );
}
