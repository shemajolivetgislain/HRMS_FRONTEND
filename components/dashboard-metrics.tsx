"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  UserGroupIcon,
  Calendar01Icon,
  ChartBarLineIcon,
  Briefcase02Icon,
} from "@hugeicons/core-free-icons";
import { Frame, FramePanel } from "@/components/ui/frame";

const metrics = [
  {
    label: "Total Employees",
    value: "143",
    change: "+12%",
    up: true,
    icon: UserGroupIcon,
    accent: "var(--chart-1)",
    sub: "across all departments",
  },
  {
    label: "Today's Attendance",
    value: "20",
    change: "−15%",
    up: false,
    icon: Calendar01Icon,
    accent: "var(--chart-2)",
    sub: "below last week avg",
  },
  {
    label: "Avg. Performance",
    value: "83.4%",
    change: "+4.2%",
    up: true,
    icon: ChartBarLineIcon,
    accent: "var(--chart-3)",
    sub: "vs. monthly target",
  },
  {
    label: "Open Positions",
    value: "14",
    change: "+4",
    up: true,
    icon: Briefcase02Icon,
    accent: "var(--chart-4)",
    sub: "pending assignments",
  },
];

export function DashboardMetrics() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
      {metrics.map((m, i) => (
        <Frame key={i} className="h-full">
          <FramePanel className="flex flex-col gap-5 p-4">
            {/* icon + badge row */}
            <div className="flex items-start justify-between">
              <div
                className="h-9 w-9 rounded-2xl flex items-center justify-center"
                style={{
                  background: `color-mix(in srgb, ${m.accent} 12%, transparent)`,
                }}
              >
                <HugeiconsIcon
                  icon={m.icon}
                  size={18}
                  strokeWidth={2}
                  style={{ color: m.accent }}
                />
              </div>

              <span
                className="inline-flex items-center gap-0.5 rounded-xl px-2 py-0.5 text-[10px] font-semibold tracking-wide"
                style={{
                  background: `color-mix(in srgb, ${m.accent} 10%, transparent)`,
                  color: m.accent,
                }}
              >
                {m.up ? "↑" : "↓"} {m.change}
              </span>
            </div>

            {/* value */}
            <div>
              <div className="text-2xl font-semibold tracking-tight text-foreground/90 leading-none mb-1">
                {m.value}
              </div>
              <div className="text-[11px] font-medium text-muted-foreground/70 truncate">
                {m.label}
              </div>
            </div>

            {/* subtle separator + sub-text */}
            <div className="border-t border-border/20 pt-2.5">
              <p className="text-[10px] text-muted-foreground/50 leading-snug">
                {m.sub}
              </p>
            </div>
          </FramePanel>
        </Frame>
      ))}
    </div>
  );
}
