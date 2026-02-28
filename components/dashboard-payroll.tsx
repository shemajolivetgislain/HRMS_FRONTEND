"use client";

import { Frame, FramePanel } from "@/components/ui/frame";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon, ArrowLeft01Icon } from "@hugeicons/core-free-icons";
import { UserAvatar } from "@/components/dashboard/user-avatar";

const rows = [
  {
    id: "001",
    name: "Ahmed Levin",
    role: "Product Manager",
    date: "27 Dec 2023",
    status: "Delayed",
  },
  {
    id: "002",
    name: "Alena Dokidis",
    role: "Product Designer",
    date: "25 Dec 2023",
    status: "Paid",
  },
  {
    id: "003",
    name: "Mira Schleifer",
    role: "Junior UI/UX Designer",
    date: "25 Dec 2023",
    status: "Paid",
  },
  {
    id: "004",
    name: "Marcus Rosser",
    role: "Frontend Engineer",
    date: "24 Dec 2023",
    status: "Processing",
  },
];

const statusMap: Record<string, { label: string; variant: "success" | "warning" | "destructive" | "info" }> = {
  Paid: { label: "Paid", variant: "success" },
  Processing: { label: "Processing", variant: "info" },
  Delayed: { label: "Delayed", accent: "var(--destructive)", variant: "destructive" },
};

export function DashboardPayroll() {
  return (
    <Frame>
      <FramePanel className="p-0 overflow-hidden">
        {/* table header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border/10">
          <div>
            <h3 className="text-sm font-semibold text-foreground/90">
              Recent Payroll
            </h3>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              Disbursements for December 2023
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="h-8 px-3 text-[11px] rounded-lg border-border/50 font-medium shadow-none hover:bg-muted/50"
          >
            View All
          </Button>
        </div>

        {/* column headers */}
        <div className="grid grid-cols-[40px_1fr_1fr_120px_90px] items-center gap-0 px-5 py-2.5 bg-muted/20 border-b border-border/10">
          {["#", "Employee", "Role", "Date", "Status"].map((h) => (
            <span
              key={h}
              className="text-[10px] font-semibold text-muted-foreground/60 uppercase tracking-widest first:text-center"
            >
              {h}
            </span>
          ))}
        </div>

        {/* rows */}
        <div className="divide-y divide-border/5">
          {rows.map((row) => {
            const s = statusMap[row.status];
            return (
              <div
                key={row.id}
                className="grid grid-cols-[40px_1fr_1fr_120px_90px] items-center gap-0 px-5 py-3.5 hover:bg-muted/10 transition-colors group"
              >
                <span className="text-[11px] font-mono text-muted-foreground/40 text-center">
                  {row.id}
                </span>

                <div className="flex items-center gap-2.5 min-w-0">
                  <UserAvatar 
                    name={row.name} 
                    size="sm" 
                    className="shrink-0"
                  />
                  <span className="text-[13px] font-medium text-foreground/90 truncate">
                    {row.name}
                  </span>
                </div>

                <span className="text-[12px] text-muted-foreground truncate pr-4">
                  {row.role}
                </span>

                <span className="text-[11px] font-medium text-muted-foreground/70 tabular-nums">
                  {row.date}
                </span>

                <div>
                  <Badge variant={s.variant} showDot>
                    {s.label}
                  </Badge>
                </div>
              </div>
            );
          })}
        </div>

        {/* footer */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-border/10 bg-muted/5">
          <span className="text-[10px] text-muted-foreground/50 font-medium">
            Showing 4 of 48 records
          </span>
          <div className="flex items-center gap-1">
            <button className="h-7 w-7 flex items-center justify-center rounded-md text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors">
              <HugeiconsIcon icon={ArrowLeft01Icon} size={13} />
            </button>
            {[1, 2, 3, 4, 5].map((p) => (
              <button
                key={p}
                className={`h-7 w-7 flex items-center justify-center rounded-md text-[11px] font-semibold transition-colors
                  ${p === 1 ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"}`}
              >
                {p}
              </button>
            ))}
            <button className="h-7 w-7 flex items-center justify-center rounded-md text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors">
              <HugeiconsIcon icon={ArrowRight01Icon} size={13} />
            </button>
          </div>
        </div>
      </FramePanel>
    </Frame>
  );
}
