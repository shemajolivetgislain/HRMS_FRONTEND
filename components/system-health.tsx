"use client";

import { Frame, FramePanel } from "@/components/ui/frame";
import { HugeiconsIcon } from "@hugeicons/react";
import { Activity01Icon } from "@hugeicons/core-free-icons";

export function SystemHealth() {
  const services = [
    { name: "API Gateway", status: "Operational", color: "bg-emerald-500" },
    { name: "Auth Service", status: "Operational", color: "bg-emerald-500" },
    { name: "Database", status: "Operational", color: "bg-emerald-500" },
    { name: "Email Delivery", status: "Degraded", color: "bg-amber-500" },
  ];

  return (
    <Frame className="h-full">
      <FramePanel className="flex h-full flex-col gap-5 p-5 lg:p-6 overflow-hidden relative group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none group-hover:bg-emerald-500/10 transition-colors duration-500"></div>

        <div className="flex items-center justify-between border-b border-border/20 pb-4 relative z-10">
          <h3 className="text-[11px] font-medium text-muted-foreground tracking-widest uppercase">
            System Health
          </h3>
          <div className="flex items-center gap-1.5">
            <HugeiconsIcon
              icon={Activity01Icon}
              className="size-3 text-emerald-500"
            />
            <span className="text-[10px] uppercase tracking-widest text-emerald-600 dark:text-emerald-500 font-medium font-mono">
              99.98%
            </span>
          </div>
        </div>

        <div className="flex flex-col flex-1 justify-center gap-4 relative z-10 w-full pt-1">
          {services.map((service, i) => (
            <div key={i} className="flex items-center justify-between w-full">
              <span className="text-sm font-medium text-foreground/80 tracking-tight">
                {service.name}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground/60 font-medium hidden sm:block">
                  {service.status}
                </span>
                <div className="relative flex size-2">
                  {service.status === "Degraded" && (
                    <span
                      className={`animate-ping absolute inline-flex h-full w-full rounded-full ${service.color} opacity-75`}
                    ></span>
                  )}
                  <span
                    className={`relative inline-flex rounded-full size-2 ${service.color}`}
                  ></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </FramePanel>
    </Frame>
  );
}
