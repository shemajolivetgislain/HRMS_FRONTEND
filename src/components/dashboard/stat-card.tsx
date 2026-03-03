import React from "react";
import { Frame, FramePanel } from "@/components/ui/frame";
import { Badge } from "@/components/ui/badge";
import { HugeiconsIcon } from "@hugeicons/react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  change?: string;
  up?: boolean;
  icon: any;
  variant?:
    | "primary"
    | "success"
    | "warning"
    | "destructive"
    | "info"
    | "accent"
    | "muted";
  sub?: string;
  className?: string;
}

export const StatCard = React.memo(function StatCard({
  label,
  value,
  change,
  up,
  icon: Icon,
  variant = "primary",
  sub,
  className,
}: StatCardProps) {
  const variantStyles = {
    primary: "bg-primary/10 text-primary border-primary/20",
    success: "bg-success/10 text-success border-success/20",
    warning: "bg-warning/10 text-warning border-warning/20",
    destructive: "bg-destructive/10 text-destructive border-destructive/20",
    info: "bg-info/10 text-info border-info/20",
    accent: "bg-accent/10 text-accent border-accent/20",
    muted: "bg-muted/10 text-muted-foreground/40 border-border/5",
  };

  return (
    <Frame className={cn("group/stat h-full", className)}>
      <FramePanel className="p-6 flex flex-col justify-between h-full bg-card shadow-xs">
        <div className="flex items-center justify-between">
          <div
            className={cn(
              "h-9 w-9 rounded-xl flex items-center justify-center border transition-all duration-300 group-hover/stat:scale-110",
              variantStyles[variant],
            )}
          >
            <HugeiconsIcon icon={Icon} size={18} strokeWidth={2} />
          </div>
          {change && (
            <Badge
              variant="muted"
              className={cn(
                "border-none px-1.5 py-0.5 rounded-md font-bold text-[10px] uppercase tracking-widest",
                up
                  ? "text-success bg-success/10"
                  : "text-destructive bg-destructive/10",
              )}
            >
              {change}
            </Badge>
          )}
        </div>
        <div className="mt-6">
          <h3 className="text-2xl font-bold tracking-tight text-foreground/90 tabular-nums leading-none mb-1.5">
            {value}
          </h3>
          <p className="text-xs font-bold text-muted-foreground/40 capitalize tracking-widest">
            {label}
          </p>
          {sub && (
            <p className="text-[10px] font-medium text-muted-foreground/30 mt-1 uppercase tracking-tighter">
              {sub}
            </p>
          )}
        </div>
      </FramePanel>
    </Frame>
  );
});
