"use client";

import { Frame, FramePanel } from "@/components/ui/frame";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Notification01Icon,
  CheckmarkCircle01Icon,
  Clock01Icon,
} from "@hugeicons/core-free-icons";

export function RecentAlerts() {
  return (
    <Frame className="h-full">
      <FramePanel className="flex flex-col gap-5 p-5 lg:p-6 h-full">
        <div className="flex items-center justify-between border-b border-border/20 pb-4">
          <h3 className="text-[11px] font-medium text-muted-foreground tracking-widest uppercase">
            System Alerts
          </h3>
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground/60">
            Live Feed
          </span>
        </div>
        <div className="flex flex-col gap-5 pt-2">
          <div className="flex items-start gap-3">
            <HugeiconsIcon
              icon={CheckmarkCircle01Icon}
              strokeWidth={1.5}
              className="size-4 mt-0.5 text-success shrink-0"
            />
            <div className="flex flex-col gap-0.5">
              <div className="leading-none tracking-tight font-medium text-sm text-foreground/90">
                OTP Verification Success
              </div>
              <div className="text-muted-foreground text-xs mt-0.5">
                Global Finance Corp · 10m ago
              </div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <HugeiconsIcon
              icon={Clock01Icon}
              strokeWidth={1.5}
              className="size-4 mt-0.5 text-amber-500 shrink-0"
            />
            <div className="flex flex-col gap-0.5">
              <div className="leading-none tracking-tight font-medium text-sm text-foreground/90">
                Pending Integration Sync
              </div>
              <div className="text-muted-foreground text-xs mt-0.5">
                Healthcare Plus Inc · 1h ago
              </div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <HugeiconsIcon
              icon={Notification01Icon}
              strokeWidth={1.5}
              className="size-4 mt-0.5 text-destructive shrink-0"
            />
            <div className="flex flex-col gap-0.5">
              <div className="leading-none tracking-tight font-medium text-sm text-foreground/90">
                Suspicious Login Blocked
              </div>
              <div className="text-muted-foreground text-xs mt-0.5">
                admin@techinnovators.com · 2h ago
              </div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <HugeiconsIcon
              icon={Clock01Icon}
              strokeWidth={1.5}
              className="size-4 mt-0.5 text-primary shrink-0"
            />
            <div className="flex flex-col gap-0.5">
              <div className="leading-none tracking-tight font-medium text-sm text-foreground/90">
                API Key Rotation Due
              </div>
              <div className="text-muted-foreground text-xs mt-0.5">
                System Security · In 4 hours
              </div>
            </div>
          </div>
        </div>
      </FramePanel>
    </Frame>
  );
}
