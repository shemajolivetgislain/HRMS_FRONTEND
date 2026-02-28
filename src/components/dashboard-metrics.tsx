"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  UserGroupIcon,
  Calendar01Icon,
  ChartBarLineIcon,
  Briefcase02Icon,
} from "@hugeicons/core-free-icons";
import { Frame, FramePanel } from "@/components/ui/frame";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

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
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((m, i) => (
        <Frame key={i} className="h-full group/frame">
          <FramePanel className="flex flex-col gap-5 p-6">
            {/* icon + badge row */}
            <div className="flex items-start justify-between">
              <div
                className="h-9 w-9 rounded-xl flex items-center justify-center border border-border/10"
                style={{
                  background: `color-mix(in srgb, ${m.accent} 8%, transparent)`,
                }}
              >
                <HugeiconsIcon
                  icon={m.icon}
                  size={18}
                  strokeWidth={2}
                  style={{ color: m.accent }}
                />
              </div>

              <Badge 
                variant="muted" 
                className={cn(
                  "border-none px-1.5 py-0.5 rounded-md font-semibold tracking-tight",
                  m.up ? "text-emerald-600 bg-emerald-500/10 dark:text-emerald-400" : "text-red-600 bg-red-500/10 dark:text-red-400"
                )}
              >
                <span className="text-[10px]">
                  {m.up ? "↑" : "↓"} {m.change}
                </span>
              </Badge>
            </div>

            {/* value */}
            <div>
              <div className="text-2xl font-semibold tracking-tight text-foreground/90 leading-none mb-1.5 tabular-nums">
                {m.value}
              </div>
              <div className="text-[11px] font-semibold text-muted-foreground/40 capitalize tracking-tight truncate">
                {m.label}
              </div>
            </div>

            {/* subtle sub-text */}
            <div className="pt-3 border-t border-border/5">
              <p className="text-[10px] text-muted-foreground/40 font-medium leading-none tracking-tight">
                {m.sub}
              </p>
            </div>
          </FramePanel>
        </Frame>
      ))}
    </div>
  );
}
