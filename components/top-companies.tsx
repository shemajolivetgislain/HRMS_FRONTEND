"use client";

import { Frame, FramePanel } from "@/components/ui/frame";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HugeiconsIcon } from "@hugeicons/react";
import { UserMultiple02Icon } from "@hugeicons/core-free-icons";

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

const planVariant: Record<string, "accent" | "info" | "secondary"> = {
  Enterprise: "accent",
  Growth: "info",
  Startup: "secondary",
};

export function TopCompanies() {
  return (
    <Frame className="h-full">
      <FramePanel className="flex flex-col h-full p-0 overflow-hidden">
        {/* header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border/10">
          <div>
            <h3 className="text-sm font-semibold text-foreground/90">
              Top Companies
            </h3>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              Ranked by employee count
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="h-8 px-3 text-[11px] rounded-lg border-border/50 font-medium shadow-none hover:bg-muted/50"
          >
            Directory
          </Button>
        </div>

        {/* column headers */}
        <div className="grid grid-cols-[32px_1fr_80px_72px] items-center px-5 py-2.5 bg-muted/20 border-b border-border/10">
          {["#", "Company", "Plan", "Status"].map((h) => (
            <span
              key={h}
              className="text-[10px] font-semibold text-muted-foreground/60 uppercase tracking-widest"
            >
              {h}
            </span>
          ))}
        </div>

        <div className="flex-1 divide-y divide-border/5">
          {topCompanies.map((company, i) => {
            return (
              <div
                key={i}
                className="grid grid-cols-[32px_1fr_80px_72px] items-center px-5 py-3.5 hover:bg-muted/10 transition-colors group"
              >
                <span className="text-[11px] font-mono text-muted-foreground/40">
                  0{i + 1}
                </span>
                <div className="flex flex-col gap-0.5 min-w-0">
                  <span className="text-[13px] font-medium text-foreground/90 leading-tight truncate group-hover:text-foreground transition-colors">
                    {company.name}
                  </span>
                  <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                    <HugeiconsIcon
                      icon={UserMultiple02Icon}
                      strokeWidth={2}
                      size={11}
                    />
                    {company.employees} employees
                  </span>
                </div>
                <Badge variant={planVariant[company.plan] || "secondary"} className="w-fit">
                  {company.plan}
                </Badge>
                <div className="flex items-center">
                  <Badge 
                    variant={company.status === "Active" ? "success" : "warning"} 
                    showDot 
                    className="capitalize"
                  >
                    {company.status}
                  </Badge>
                </div>
              </div>
            );
          })}
        </div>

        {/* footer */}
        <div className="px-5 py-3 border-t border-border/10 bg-muted/5">
          <span className="text-[10px] text-muted-foreground/50 font-medium">
            Showing {topCompanies.length} of 42 companies
          </span>
        </div>
      </FramePanel>
    </Frame>
  );
}
