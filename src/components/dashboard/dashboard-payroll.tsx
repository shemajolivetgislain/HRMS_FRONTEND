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
  Delayed: { label: "Delayed", variant: "destructive" },
};

export function DashboardPayroll() {
  return (
    <Frame className="group/frame">
      <FramePanel className="p-0 overflow-hidden">
        <FrameHeader>
          <div>
            <FrameTitle>Recent Payroll</FrameTitle>
            <FrameDescription>Disbursements for December 2023</FrameDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="font-bold capitalize tracking-wider shadow-none hover:bg-muted/50"
          >
            History
          </Button>
        </FrameHeader>

        <FrameContent className="p-0">
          {/* column headers */}
          <div className="grid grid-cols-[48px_1fr_1fr_120px_100px] items-center gap-0 px-6 py-3 bg-muted/20 border-b border-border/5">
            {["#", "Employee", "Role", "Date", "Status"].map((h) => (
              <span
                key={h}
                className="text-[10px] font-bold text-muted-foreground/40 capitalize tracking-widest first:text-center"
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
                  className="grid grid-cols-[48px_1fr_1fr_120px_100px] items-center gap-0 px-6 py-4 hover:bg-muted/10 transition-colors group"
                >
                  <span className="text-[11px] font-mono text-muted-foreground/30 text-center">
                    {row.id}
                  </span>

                  <div className="flex items-center gap-3 min-w-0">
                    <UserAvatar 
                      name={row.name} 
                      size="sm" 
                      className="shrink-0 rounded-lg shadow-sm"
                    />
                    <span className="text-[13px] font-semibold text-foreground/90 truncate">
                      {row.name}
                    </span>
                  </div>

                  <span className="text-[12px] text-muted-foreground/70 truncate pr-4 font-medium">
                    {row.role}
                  </span>

                  <span className="text-[11px] font-bold text-muted-foreground/50 tabular-nums">
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
        </FrameContent>

        <FrameFooter className="flex items-center justify-between">
          <span className="text-[10px] text-muted-foreground/40 font-bold capitalize tracking-widest">
            Showing 4 of 48 records
          </span>
          <div className="flex items-center gap-1.5">
            <button 
              className="h-7 w-7 flex items-center justify-center rounded-md text-muted-foreground/40 hover:bg-muted/50 hover:text-foreground transition-colors border border-transparent hover:border-border/40"
              aria-label="Previous page"
            >
              <HugeiconsIcon icon={ArrowLeft01Icon} size={12} strokeWidth={2.5} />
            </button>
            {[1, 2, 3].map((p) => (
              <button
                key={p}
                className={`h-7 w-7 flex items-center justify-center rounded-md text-[10px] font-bold transition-all
                  ${p === 1 
                    ? "bg-primary/10 text-primary border border-primary/20" 
                    : "text-muted-foreground/40 hover:bg-muted/50 hover:text-foreground border border-transparent hover:border-border/40"}`}
                aria-label={`Page ${p}`}
                aria-current={p === 1 ? "page" : undefined}
              >
                {p}
              </button>
            ))}
            <button 
              className="h-7 w-7 flex items-center justify-center rounded-md text-muted-foreground/40 hover:bg-muted/50 hover:text-foreground transition-colors border border-transparent hover:border-border/40"
              aria-label="Next page"
            >
              <HugeiconsIcon icon={ArrowRight01Icon} size={12} strokeWidth={2.5} />
            </button>
          </div>
        </FrameFooter>
      </FramePanel>
    </Frame>
  );
}
