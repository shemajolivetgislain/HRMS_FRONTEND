"use client";

import { Frame, FramePanel } from "@/components/ui/frame";
import { HugeiconsIcon } from "@hugeicons/react";
import { ChartUpIcon } from "@hugeicons/core-free-icons";

export function SectionCards() {
  return (
    <div className="grid grid-cols-1 gap-6 px-4 lg:px-6 md:grid-cols-2 lg:grid-cols-4">
      {/* CARD 1 */}
      <Frame>
        <FramePanel className="flex flex-col h-full p-5 lg:p-6 items-start justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none transition-colors duration-500"></div>
          <h3 className="text-[11px] font-medium text-muted-foreground tracking-widest uppercase relative z-10">
            Verified Companies
          </h3>
          <div className="mt-8 flex flex-col gap-2 w-full relative z-10">
            <div className="text-4xl font-light tabular-nums tracking-tighter text-foreground">
              184
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-500 bg-emerald-500/10 w-fit px-2 py-0.5 rounded-full">
              <HugeiconsIcon
                icon={ChartUpIcon}
                strokeWidth={2.5}
                className="size-3"
              />
              12.5% M/M
            </div>
          </div>
          <div className="w-full flex items-end justify-between h-8 mt-6 gap-0.5 opacity-20 grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-40">
            {[30, 45, 25, 60, 40, 70, 50, 85, 65, 90, 75, 100].map((h, i) => (
              <div
                key={i}
                className="flex-1 bg-emerald-500 rounded-[1px]"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </FramePanel>
      </Frame>

      {/* CARD 2 */}
      <Frame>
        <FramePanel className="flex flex-col h-full p-5 lg:p-6 items-start justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none transition-colors duration-500"></div>
          <h3 className="text-[11px] font-medium text-muted-foreground tracking-widest uppercase relative z-10">
            Pending Verifications
          </h3>
          <div className="mt-8 flex flex-col gap-2 w-full relative z-10">
            <div className="text-4xl font-light tabular-nums tracking-tighter text-foreground">
              12
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-amber-600 dark:text-amber-500 bg-amber-500/10 w-fit px-2 py-0.5 rounded-full">
              <span className="flex size-1.5 rounded-full bg-amber-600 dark:bg-amber-500" />
              Requires Action
            </div>
          </div>
          <div className="w-full flex items-end justify-between h-8 mt-6 gap-0.5 opacity-20 grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-40">
            {[100, 80, 95, 60, 40, 50, 30, 45, 20, 35, 15, 25].map((h, i) => (
              <div
                key={i}
                className="flex-1 bg-amber-500 rounded-[1px]"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </FramePanel>
      </Frame>

      {/* CARD 3 */}
      <Frame>
        <FramePanel className="flex flex-col h-full p-5 lg:p-6 items-start justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none transition-colors duration-500"></div>
          <h3 className="text-[11px] font-medium text-muted-foreground tracking-widest uppercase relative z-10">
            Active Accounts
          </h3>
          <div className="mt-8 flex flex-col gap-2 w-full relative z-10">
            <div className="text-4xl font-light tabular-nums tracking-tighter text-foreground">
              14,282
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-500 bg-emerald-500/10 w-fit px-2 py-0.5 rounded-full">
              <HugeiconsIcon
                icon={ChartUpIcon}
                strokeWidth={2.5}
                className="size-3"
              />
              5.0% Y/Y
            </div>
          </div>
          <div className="w-full flex items-end justify-between h-8 mt-6 gap-0.5 opacity-20 grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-40">
            {[40, 45, 42, 50, 55, 60, 58, 65, 75, 80, 85, 95].map((h, i) => (
              <div
                key={i}
                className="flex-1 bg-emerald-500 rounded-[1px]"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </FramePanel>
      </Frame>

      {/* CARD 4 */}
      <Frame>
        <FramePanel className="flex flex-col h-full p-5 lg:p-6 items-start justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none transition-colors duration-500"></div>
          <h3 className="text-[11px] font-medium text-muted-foreground tracking-widest uppercase relative z-10">
            Security Alerts
          </h3>
          <div className="mt-8 flex flex-col gap-2 w-full relative z-10">
            <div className="text-4xl font-light tabular-nums tracking-tighter text-red-600 dark:text-red-500">
              4
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-red-600 dark:text-red-500 bg-red-500/10 w-fit px-2 py-0.5 rounded-full">
              <span className="flex size-1.5 rounded-full bg-red-600 dark:bg-red-500 animate-pulse" />
              Critical Events
            </div>
          </div>
          <div className="w-full flex items-end justify-between h-8 mt-6 gap-0.5 opacity-20 grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-40">
            {[5, 10, 5, 20, 15, 50, 30, 10, 80, 40, 20, 100].map((h, i) => (
              <div
                key={i}
                className="flex-1 bg-red-500 rounded-[1px]"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </FramePanel>
      </Frame>
    </div>
  );
}
