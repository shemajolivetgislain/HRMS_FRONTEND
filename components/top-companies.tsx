"use client";

import { Frame, FramePanel } from "@/components/ui/frame";
import { HugeiconsIcon } from "@hugeicons/react";
import { Building03Icon, UserMultiple02Icon } from "@hugeicons/core-free-icons";

const topCompanies = [
  {
    name: "Acme Corp",
    employees: "1,248",
    plan: "Enterprise",
    status: "Active",
  },
  {
    name: "Global Industries",
    employees: "892",
    plan: "Enterprise",
    status: "Active",
  },
  {
    name: "TechFlow Solutions",
    employees: "450",
    plan: "Growth",
    status: "Active",
  },
  {
    name: "Healthcare Plus",
    employees: "312",
    plan: "Growth",
    status: "Pending",
  },
  {
    name: "Nexus Innovations",
    employees: "155",
    plan: "Startup",
    status: "Active",
  },
];

export function TopCompanies() {
  return (
    <Frame className="h-full">
      <FramePanel className="flex h-full flex-col gap-5 p-5 lg:p-6">
        <div className="flex items-center justify-between border-b border-border/20 pb-4">
          <h3 className="text-[11px] font-medium text-muted-foreground tracking-widest uppercase">
            Top Companies
          </h3>
          <span className="text-[10px] uppercase tracking-widest text-primary cursor-pointer hover:underline transition-colors">
            Directory
          </span>
        </div>
        <div className="flex flex-col gap-5 pt-2">
          {topCompanies.map((company, i) => (
            <div key={i} className="flex items-center justify-between group">
              <div className="flex items-center gap-3.5">
                <div className="text-muted-foreground/50 group-hover:text-primary transition-colors shrink-0">
                  <HugeiconsIcon
                    icon={Building03Icon}
                    strokeWidth={1.5}
                    className="size-5"
                  />
                </div>
                <div className="flex flex-col gap-0.5">
                  <div className="font-semibold tracking-tight text-foreground/90 leading-none text-sm group-hover:text-foreground transition-colors">
                    {company.name}
                  </div>
                  <div className="text-[11px] text-muted-foreground flex items-center gap-1.5 mt-1 font-medium">
                    <HugeiconsIcon
                      icon={UserMultiple02Icon}
                      strokeWidth={2}
                      className="size-3"
                    />
                    {company.employees} users
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-[10px] font-medium tracking-widest uppercase text-muted-foreground">
                  {company.plan}
                </span>
                <div className="flex items-center gap-1.5">
                  <span
                    className={`block size-1.5 rounded-full ${company.status === "Active" ? "bg-emerald-500" : "bg-amber-500"}`}
                  />
                  <span className="text-[10px] tracking-wide text-muted-foreground/70">
                    {company.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </FramePanel>
    </Frame>
  );
}
