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
  variant?: "primary" | "info" | "success" | "warning" | "destructive" | "accent" | "muted";
  sub?: string;
  className?: string;
}

const variantStyles = {
  primary: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  info: "bg-sky-500/10 text-sky-600 border-sky-500/20",
  success: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  warning: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  destructive: "bg-rose-500/10 text-rose-600 border-rose-500/20",
  accent: "bg-indigo-500/10 text-indigo-600 border-indigo-500/20",
  muted: "bg-muted/10 text-muted-foreground/40 border-border/5",
};

export const StatCard = React.memo(function StatCard({
  label,
  value,
  change,
  up = true,
  icon: Icon,
  variant = "primary",
  sub,
  className,
}: StatCardProps) {
  return (
    <Frame className={cn("group/stat h-full", className)}>
      <FramePanel className="p-6 flex flex-col justify-between h-full bg-card shadow-xs">
        <div className="flex items-center justify-between">
          <div
            className={cn(
              "h-9 w-9 rounded-xl flex items-center justify-center border transition-all duration-300 group-hover/stat:scale-110",
              variantStyles[variant]
            )}
          >
            <HugeiconsIcon icon={Icon} size={18} strokeWidth={2} />
          </div>
          {change && (
            <Badge
              variant="muted"
              className={cn(
                "border-none px-1.5 py-0.5 rounded-md font-bold text-[10px] uppercase tracking-widest",
                up ? "text-success bg-success/10" : "text-destructive bg-destructive/10"
              )}
            >
              {change}
            </Badge>
          )}
        </div>
        <div className="mt-6">
          <h3 className="text-3xl font-bold tracking-tight text-foreground/90 tabular-nums leading-none mb-1.5">
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
