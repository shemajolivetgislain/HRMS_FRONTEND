"use client";

import { 
  Frame, 
  FramePanel, 
  FrameHeader, 
  FrameTitle, 
  FrameDescription, 
  FrameContent,
  FrameFooter
} from "@/components/ui/frame";
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
    <Frame className="h-full group/frame">
      <FramePanel className="flex flex-col h-full overflow-hidden">
        <FrameHeader>
          <div>
            <FrameTitle>Top Companies</FrameTitle>
            <FrameDescription>Ranked by employee count</FrameDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="h-8 px-3 rounded-lg border-border/50 font-bold capitalize tracking-wider shadow-none hover:bg-muted/50"
          >
            Directory
          </Button>
        </FrameHeader>

        <FrameContent className="p-0 flex-1">
          {/* table headers */}
          <div className="grid grid-cols-[32px_1fr_80px_72px] items-center px-6 py-2.5 bg-muted/20 border-b border-border/5">
            {["#", "Company", "Plan", "Status"].map((h) => (
              <span
                key={h}
                className="text-[10px] font-bold text-muted-foreground/40 capitalize tracking-widest"
              >
                {h}
              </span>
            ))}
          </div>

          {/* rows */}
          <div className="divide-y divide-border/5">
            {topCompanies.map((company, i) => {
              return (
                <div
                  key={i}
                  className="grid grid-cols-[32px_1fr_80px_72px] items-center px-6 py-4 hover:bg-muted/10 transition-colors group"
                >
                  <span className="text-[11px] font-mono text-muted-foreground/30">
                    0{i + 1}
                  </span>
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <span className="text-[13px] font-semibold text-foreground/90 leading-tight truncate group-hover:text-foreground transition-colors">
                      {company.name}
                    </span>
                    <span className="text-[11px] text-muted-foreground/50 flex items-center gap-1 font-medium">
                      <HugeiconsIcon
                        icon={UserMultiple02Icon}
                        strokeWidth={2}
                        size={11}
                      />
                      {company.employees}
                    </span>
                  </div>
                  <Badge variant={planVariant[company.plan] || "secondary"} className="w-fit">
                    {company.plan}
                  </Badge>
                  <div className="flex items-center">
                    <Badge 
                      variant={company.status === "Active" ? "success" : "warning"} 
                      showDot 
                      className="border-none bg-transparent p-0 text-muted-foreground/70"
                    >
                      {company.status}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </FrameContent>

        <FrameFooter>
          <span className="text-[10px] text-muted-foreground/40 font-bold capitalize tracking-widest">
            Showing {topCompanies.length} of 42 companies
          </span>
        </FrameFooter>
      </FramePanel>
    </Frame>
  );
}
